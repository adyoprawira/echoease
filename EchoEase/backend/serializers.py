import re

from django.utils.html import strip_tags
from rest_framework import serializers

from .models import EmergencyResource, ForumPost, ForumReport, Tag


EMAIL_PATTERN = re.compile(r"\b[^@\s]+@[^@\s]+\.[^@\s]+\b")
PHONE_PATTERN = re.compile(r"(?:\+?\d[\d\s().-]{7,}\d)")
TAG_PATTERN = re.compile(r"^#?[A-Za-z][A-Za-z0-9 -]{0,29}$")


def validate_public_text(value, field_label, minimum_length=1):
    cleaned = value.strip()
    if cleaned != strip_tags(cleaned):
        raise serializers.ValidationError(f"{field_label} must not contain HTML markup.")
    if len(cleaned) < minimum_length:
        raise serializers.ValidationError(f"{field_label} is too short.")
    if EMAIL_PATTERN.search(cleaned) or PHONE_PATTERN.search(cleaned):
        raise serializers.ValidationError(
            f"{field_label} must not include email addresses or phone numbers."
        )
    return cleaned


class TagListField(serializers.ListField):
    def to_representation(self, value):
        return [tag.name for tag in value.all()]


class ForumPostSerializer(serializers.ModelSerializer):
    tags = TagListField(
        child=serializers.CharField(max_length=30),
        required=False,
        allow_empty=True,
    )
    author_label = serializers.SerializerMethodField()

    class Meta:
        model = ForumPost
        fields = ["id", "title", "content", "tags", "author_label", "is_anonymous", "created_at"]
        read_only_fields = ["id", "author_label", "is_anonymous", "created_at"]

    def get_author_label(self, obj):
        return "Anonymous Student"

    def validate_title(self, value):
        return validate_public_text(value, "Title", minimum_length=3)

    def validate_content(self, value):
        return validate_public_text(value, "Content", minimum_length=10)

    def validate_tags(self, value):
        normalized = []
        for tag in value:
            clean_tag = tag.strip()
            if not TAG_PATTERN.fullmatch(clean_tag):
                raise serializers.ValidationError(
                    "Tags may contain letters, numbers, spaces, and hyphens only."
                )
            clean_tag = clean_tag.lstrip("#").strip()
            if clean_tag.lower() not in {entry.lower() for entry in normalized}:
                normalized.append(clean_tag)
        if len(normalized) > 5:
            raise serializers.ValidationError("Use no more than five tags.")
        return normalized

    def create(self, validated_data):
        tag_names = validated_data.pop("tags", [])
        post = ForumPost.objects.create(**validated_data)
        for name in tag_names:
            tag, _ = Tag.objects.get_or_create(name=name)
            post.tags.add(tag)
        return post


class EmergencyResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyResource
        fields = ["id", "name", "phone_number", "description", "category", "source_url"]
        read_only_fields = fields


class ForumReportSerializer(serializers.ModelSerializer):
    post_id = serializers.PrimaryKeyRelatedField(
        queryset=ForumPost.objects.all(),
        source="post",
    )
    acknowledgement = serializers.SerializerMethodField()

    class Meta:
        model = ForumReport
        fields = ["id", "post_id", "reason", "details", "created_at", "acknowledgement"]
        read_only_fields = ["id", "created_at", "acknowledgement"]

    def validate_details(self, value):
        if not value.strip():
            return ""
        return validate_public_text(value, "Report details")

    def get_acknowledgement(self, obj):
        return "Report recorded. No active moderation or response workflow is configured."
