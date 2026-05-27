from django.apps import AppConfig


class BackendConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "EchoEase.backend"
    label = "backend"
    verbose_name = "EchoEase Safe API"
