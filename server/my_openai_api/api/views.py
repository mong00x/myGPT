from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from my_openai_api.models import Prompt
from .serializer import PromptModelSerializer
import openai
import logging
import os
import json
from dotenv import load_dotenv

import boto3

# local
# load_dotenv()
# openai.api_key = os.getenv("OPENAI_API_KEY")

# server 
client = boto3.client('lambda', region_name='ap-southeast-2')
response = client.invoke(
    FunctionName = 'getParameter',
    InvocationType = 'RequestResponse',
)
payload = json.loads(response['Payload'].read().decode('utf-8'))

# Check if there's an error.
if 'errorMessage' in payload:
    print("Error in lambda execution")
    print(payload['errorMessage'])
else:
    # If no errors, payload is your key.
    openai.api_key = payload

if openai.api_key:
    print("API key loaded successfully")

logger = logging.getLogger(__name__)

MODEL = "gpt-3.5-turbo"  # Or whichever model you want to use

class PromptViewSet(viewsets.ModelViewSet): 
    #prmpt view allows to create a CRUD API without specifying explicit methods for the functionality
    queryset = Prompt.objects.all() 
    serializer_class = PromptModelSerializer
    
    
class ChatGPTView(APIView):
    """
    Post endpoint to generate a response to a given prompt using OpenAI's API
    """

    def post(self, request):
        prompt = request.data.get('prompt')
        if not prompt:
            return Response({"error": "Prompt is required"}, status=400)
        try:
            response = openai.ChatCompletion.create(
                model=MODEL,
                messages=[
                    {"role": "system", "content": "You are a helpful, pattern-following assistant."},
                    {"role": "user", "content": prompt},
                ],
                temperature=0.7,
            )
            translated_text = response.choices[0].message
            return Response({"response": translated_text})
        except Exception as e:
            logger.exception(e) # Log the exception
            return Response({"error": str(e)}, status=500)




