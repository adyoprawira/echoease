from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, re_path
from django.views.static import serve

frontend_root = settings.BASE_DIR / 'Code' / 'frontend'

urlpatterns = [
    path('', serve, {'path': 'Landing Page/blackboard.html', 'document_root': str(frontend_root)}),
    path('admin/', admin.site.urls),
    re_path(r'^(?P<path>.+)$', serve, {'document_root': str(frontend_root)}),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=str(frontend_root))
