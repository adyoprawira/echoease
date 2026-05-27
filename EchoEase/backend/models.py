from django.conf import settings
from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class ForumPost(models.Model):
    title = models.CharField(max_length=120)
    content = models.TextField(max_length=2000)
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(Tag, blank=True)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="forum_posts",
    )
    is_anonymous = models.BooleanField(default=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class ForumReport(models.Model):
    REASON_CHOICES = [
        ("safety", "Safety concern"),
        ("privacy", "Personal information"),
        ("harassment", "Harassment"),
        ("other", "Other"),
    ]

    post = models.ForeignKey(ForumPost, on_delete=models.CASCADE, related_name="reports")
    reason = models.CharField(max_length=20, choices=REASON_CHOICES)
    details = models.CharField(max_length=300, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.get_reason_display()} report for post {self.post_id}"


class EmergencyResource(models.Model):
    CATEGORY_CHOICES = [
        ("emergency", "Emergency"),
        ("crisis", "Crisis"),
        ("university", "University"),
    ]

    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    description = models.TextField(max_length=300)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    source_url = models.URLField()

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.name
