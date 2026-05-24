from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from django.views.static import serve

frontend_root = settings.BASE_DIR / 'Code' / 'frontend'

urlpatterns = [
    path('', serve, {'path': 'wellbeing-landing.html', 'document_root': str(frontend_root / 'Landing Page')}),
    path('admin/', admin.site.urls),
    path('chat/', serve, {'path': 'chat.html', 'document_root': str(frontend_root / 'Chat' / 'pages')}),
    path('styles/<path:path>', serve, {'document_root': str(frontend_root / 'Chat' / 'styles')}),
    path('scripts/<path:path>', serve, {'document_root': str(frontend_root / 'Chat' / 'scripts')}),
    path('image/<path:path>', serve, {'document_root': str(frontend_root / 'image')}),
    path('<path:path>', serve, {'document_root': str(frontend_root / 'Chat' / 'pages')}),
    path('frontend/<path:path>', serve, {'document_root': str(frontend_root)}),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=str(frontend_root))
