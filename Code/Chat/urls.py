from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from support_platform.views import ForumPostViewSet, EmergencyResourceViewSet

router = DefaultRouter()
router.register(r'posts', ForumPostViewSet)
router.register(r'emergency', EmergencyResourceViewSet)

urlpatterns = [
    path('admin/', admin.site.admin_site.urls),
    path('api/', include(router.urls)),
]