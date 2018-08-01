from  rest_framework import permissions


class IsAuthor(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        print(request.method)
        if (request.method in permissions.SAFE_METHODS or request.user and
            request.user.is_authenticated()):
            return True
        return obj.author == request.user


class MyPermission(permissions.BasePermission):

    allowed_methods = ['POST', 'PUT', 'GET', 'HEAD', 'OPTIONS']

    def has_permission(self, request, view):
        return request.method in self.allowed_methods
