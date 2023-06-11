'''
The serializer will turn the Prompt model into a JSON representation so the API user can parse them
'''

from rest_framework import serializers
from my_openai_api.models import Prompt


class PromptModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prompt
        fields = '__all__'