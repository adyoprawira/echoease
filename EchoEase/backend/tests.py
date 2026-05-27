from django.core.cache import cache
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import ForumPost, ForumReport


class EmergencyResourceApiTests(APITestCase):
    def test_emergency_resources_are_public_and_include_seeded_contacts(self):
        response = self.client.get(reverse("emergency-resource-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        numbers = {resource["phone_number"] for resource in response.data}
        self.assertEqual(numbers, {"000", "13 11 14", "1300 851 998"})

    def test_emergency_resources_are_read_only(self):
        response = self.client.post(
            reverse("emergency-resource-list"),
            {"name": "Unverified number", "phone_number": "123"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)


class AnonymousForumPostApiTests(APITestCase):
    def setUp(self):
        cache.clear()
        self.payload = {
            "title": "Managing study pressure",
            "content": "Taking one small break helped me reset before revising.",
            "tags": ["Study", "#Self-Care"],
        }

    def test_anonymous_post_can_be_created_and_read_without_identity(self):
        created = self.client.post(reverse("forum-post-list"), self.payload, format="json")

        self.assertEqual(created.status_code, status.HTTP_201_CREATED)
        self.assertEqual(created.data["author_label"], "Anonymous Student")
        self.assertTrue(created.data["is_anonymous"])
        self.assertEqual(set(created.data["tags"]), {"Study", "Self-Care"})
        post = ForumPost.objects.get(pk=created.data["id"])
        self.assertIsNone(post.author)

        listed = self.client.get(reverse("forum-post-list"))
        self.assertEqual(listed.status_code, status.HTTP_200_OK)
        self.assertEqual(listed.data[0]["title"], self.payload["title"])

    def test_html_and_personal_contact_details_are_rejected(self):
        html_response = self.client.post(
            reverse("forum-post-list"),
            {**self.payload, "content": "<script>alert('x')</script> unsafe text here"},
            format="json",
        )
        contact_response = self.client.post(
            reverse("forum-post-list"),
            {**self.payload, "content": "Contact me on student@example.com for details."},
            format="json",
        )

        self.assertEqual(html_response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(contact_response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(ForumPost.objects.count(), 0)

    def test_post_creation_is_rate_limited(self):
        responses = [
            self.client.post(
                reverse("forum-post-list"),
                {**self.payload, "title": f"Study strategy {index}"},
                format="json",
            )
            for index in range(6)
        ]

        self.assertEqual([response.status_code for response in responses[:5]], [201] * 5)
        self.assertEqual(responses[5].status_code, status.HTTP_429_TOO_MANY_REQUESTS)


class ForumReportApiTests(APITestCase):
    def setUp(self):
        cache.clear()
        self.post = ForumPost.objects.create(
            title="Example post",
            content="A sufficiently long example post for reporting.",
            is_anonymous=True,
        )

    def test_report_records_concern_without_moderation_claim(self):
        response = self.client.post(
            reverse("forum-report-list"),
            {"post_id": self.post.id, "reason": "privacy", "details": "Possible identity disclosure."},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("No active moderation", response.data["acknowledgement"])
        self.assertEqual(ForumReport.objects.count(), 1)

    def test_report_details_reject_contact_data(self):
        response = self.client.post(
            reverse("forum-report-list"),
            {"post_id": self.post.id, "reason": "privacy", "details": "Phone is 0412 345 678."},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class ExcludedSensitiveApiTests(APITestCase):
    def test_chat_and_journal_routes_do_not_exist(self):
        self.assertEqual(self.client.post("/api/chat/", {}, format="json").status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(self.client.post("/api/journal/", {}, format="json").status_code, status.HTTP_404_NOT_FOUND)
