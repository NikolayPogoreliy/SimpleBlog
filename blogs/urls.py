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
            url=r'^{prefix}/{lookup}/update/$',
            mapping={'put': 'update'},
            name='{basename}-update',
            initkwargs={'suffix': 'Detail'},
            detail=True
        ),

    ]


router = routers.DefaultRouter()
router.register(r'', views.UserViewSet, base_name='user')
routerPosts = PostsRouter()
routerPosts.register(r'', views.PostsViewSet, base_name='posts')

urlpatterns = [
    url(r'^users/', include(router.urls)),
    url(r'^create/$', views.PostsViewSet.as_view({'post': 'create'}), name='posts-create'),
    url(r'', include(routerPosts.urls)),
               ]
