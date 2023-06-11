from django.db import models

# Create your models here.
class Prompt(models.Model):
    prompt_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return self.prompt_text
