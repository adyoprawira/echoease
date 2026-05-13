from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve

# Serve the frontend HTML file directly in development to avoid template loader issues.
urlpatterns = [
    path('', serve, {'path': 'Code/frontend/Chat/pages/chat.html', 'document_root': str(settings.BASE_DIR)}),
    path('admin/', admin.site.urls),
    path('styles/<path:path>', serve, {'document_root': str(settings.BASE_DIR / 'Code' / 'frontend' / 'Chat' / 'styles')}),
    path('scripts/<path:path>', serve, {'document_root': str(settings.BASE_DIR / 'Code' / 'frontend' / 'Chat' / 'scripts')}),
    path('image/<path:path>', serve, {'document_root': str(settings.BASE_DIR / 'Code' / 'frontend' / 'image')}),
    # Development-only: serve any file under Code/frontend (so /professional-selection.html works)
    # Try serving page files from Chat/pages first (so /professional-selection.html resolves)
    path('<path:path>', serve, {'document_root': str(settings.BASE_DIR / 'Code' / 'frontend' / 'Chat' / 'pages')}),
    # Fallback to serving from Code/frontend root
    path('frontend/<path:path>', serve, {'document_root': str(settings.BASE_DIR / 'Code' / 'frontend')}),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=str(settings.BASE_DIR / 'Code' / 'frontend'))
