from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import EmergencyResourceViewSet, ForumPostViewSet, ForumReportViewSet


router = DefaultRouter()
router.register("posts", ForumPostViewSet, basename="forum-post")
router.register("reports", ForumReportViewSet, basename="forum-report")
router.register("emergency", EmergencyResourceViewSet, basename="emergency-resource")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
]
