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
            url=r'^{prefix}/create/$',
            mapping={'post': 'create'},
            name='{basename}-create',
            initkwargs={'suffix': 'List'},
            detail=False
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
router.register(r'users', views.UserViewSet, base_name='user')
# router.register(r'', views.PostsViewSet)
routerPosts = PostsRouter()
router.register(r'', views.PostsViewSet, base_name='posts')

urlpatterns = [
    # url(r'^create/$', views.PostList.as_view(), name='posts-create'),
    # url(r'^$', views.PostList.as_view(), name='posts-list'),
    # url(r'^(?P<pk>[0-9]+)/$', views.PostDetail.as_view(), name='posts-retrieve'),
    # url(r'^(?P<pk>[0-9]+)/update/$', views.PostDetail.as_view(), name='posts-update'),
    url(r'^', include(router.urls)),
    url(r'', include(routerPosts.urls)),
    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
               ]
