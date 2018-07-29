from django.conf.urls import url, include
from rest_framework import routers
from . import views


class PostsRouter(routers.SimpleRouter):
    routes = [
        routers.Route(
            url=r'^{prefix}{trailing_slash}$',
            mapping={'get': 'list'},
            name='{basename}-list',
            initkwargs={'suffix': 'List'},
            detail=False
        ),
        routers.Route(
            url=r'^{prefix}/{lookup}{trailing_slash}$',
            mapping={'get': 'retrieve'},
            name='{basename}-detail',
            initkwargs={'suffix': 'Detail'},
            detail=True
        ),
        routers.Route(
            url=r'^{prefix}/create{trailing_slash}$',
            mapping={'post': 'create'},
            name='{basename}-create',
            initkwargs={'suffix': 'Detail'},
            detail=True
        ),
        routers.Route(
            url=r'^{prefix}/{lookup}/update{trailing_slash}$',
            mapping={'put': 'update'},
            name='{basename}-update',
            initkwargs={'suffix': 'Detail'},
            detail=True
        ),

    ]


router = PostsRouter()
router.register(r'users', views.UserViewSet)
router.register(r'', views.PostsViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
               ]
