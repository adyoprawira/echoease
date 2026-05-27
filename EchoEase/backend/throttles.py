from rest_framework.throttling import SimpleRateThrottle


class CreateOnlyThrottle(SimpleRateThrottle):
    def get_cache_key(self, request, view):
        if request.method != "POST":
            return None
        return self.cache_format % {
            "scope": self.scope,
            "ident": self.get_ident(request),
        }


class ForumPostCreateThrottle(CreateOnlyThrottle):
    scope = "forum_post_create"


class ForumReportCreateThrottle(CreateOnlyThrottle):
    scope = "forum_report_create"
