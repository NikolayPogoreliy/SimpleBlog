from django.contrib.auth.models import User
from rest_framework import permissions, viewsets

from .models import Posts
from .serializers import PostDetailSerializer, UserSerializer
from .permissions import IsAuthor
# Create your views here.


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.exclude(is_staff=True).select_related()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated, IsAuthor)


class PostsViewSet(viewsets.ModelViewSet):
    queryset = Posts.objects.filter(is_published=True).select_related()
    serializer_class = PostDetailSerializer
    permission_classes = (permissions.IsAuthenticated, IsAuthor)
    http_method_names = [u'get', u'post', u'put', u'patch', u'delete', u'head', u'options', u'trace']

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


