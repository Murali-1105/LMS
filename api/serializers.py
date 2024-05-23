from rest_framework.serializers import ModelSerializer
from .models import Subject


class SubjectSerializer(ModelSerializer):
    class Meta:
        model = Subject
        fields=['name','image']
        
        
    