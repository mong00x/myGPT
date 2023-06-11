
from django.urls import include, path
from rest_framework import routers
from .views import PromptViewSet


router = routers.DefaultRouter()
router.register(r'prompts', PromptViewSet)

urlpatterns = [
    path('', include(router.urls)),
]