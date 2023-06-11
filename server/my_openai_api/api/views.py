from rest_framework import viewsets

from .serializer import PromptModelSerializer
from my_openai_api.models import Prompt


class PromptViewSet(viewsets.ModelViewSet): 
    #prmpt view allows to create a CRUD API without specifying explicit methods for the functionality
    queryset = Prompt.objects.all() 
    serializer_class = PromptModelSerializer