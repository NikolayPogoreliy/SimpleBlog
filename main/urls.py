from django.conf.urls import url, include
from django.contrib import admin
from .views import MainView

urlpatterns = [
    url(r'', MainView.as_view(), name='home'),
]
