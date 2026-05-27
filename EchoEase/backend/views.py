from rest_framework import mixins, permissions, viewsets

from .models import EmergencyResource, ForumPost, ForumReport
from .serializers import EmergencyResourceSerializer, ForumPostSerializer, ForumReportSerializer
from .throttles import ForumPostCreateThrottle, ForumReportCreateThrottle


class ForumPostViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    """Anonymous, plain-text community posts for the minimal MVP."""

    queryset = ForumPost.objects.prefetch_related("tags").all()
    serializer_class = ForumPostSerializer
    permission_classes = [permissions.AllowAny]
    throttle_classes = [ForumPostCreateThrottle]

    def perform_create(self, serializer):
        serializer.save(author=None, is_anonymous=True)


class ForumReportViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """Records a concern; it does not represent an active moderation workflow."""

    queryset = ForumReport.objects.all()
    serializer_class = ForumReportSerializer
    permission_classes = [permissions.AllowAny]
    throttle_classes = [ForumReportCreateThrottle]


class EmergencyResourceViewSet(viewsets.ReadOnlyModelViewSet):
    """Read-only official contact data for urgent-help UI."""

    queryset = EmergencyResource.objects.all()
    serializer_class = EmergencyResourceSerializer
    permission_classes = [permissions.AllowAny]
