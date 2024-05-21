from rest_framework import serializers
from .models import Program,Course

class ProgramSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=Program
        fields=['name','year','college','student']
        
class CourseSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=Course
        fields=['name','teacher','student']
        
        
    