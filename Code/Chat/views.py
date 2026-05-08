from rest_framework import viewsets, permissions
from .models import ForumPost, ChatMessage, EmergencyResource, Tag
from .serializers import ForumPostSerializer, EmergencyResourceSerializer

class ForumPostViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows forum posts to be viewed or created.
    """
    queryset = ForumPost.objects.all()
    serializer_class = ForumPostSerializer
    # Allow anyone to read, but require authentication to post? 
    # Based on MVP, we want low friction, so we might allow anonymous posts.
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(author=self.request.user)
        else:
            serializer.save(author=None, is_anonymous=True)

class EmergencyResourceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for quick access to emergency resources.
    """
    queryset = EmergencyResource.objects.all()
    serializer_class = EmergencyResourceSerializer
    permission_classes = [permissions.AllowAny]