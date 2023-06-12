
from django.urls import include, path
from rest_framework import routers
from .views import PromptViewSet, ChatGPTView


router = routers.DefaultRouter()
router.register(r'prompts', PromptViewSet, basename='prompts')


urlpatterns = [
    # ... your other url patterns ...
    path('chat/', ChatGPTView.as_view(), name='chat-gpt'),
] + router.urls