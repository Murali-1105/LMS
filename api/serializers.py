from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import Token
from .models import *
from users.models import *
from rest_framework import serializers

class MyTokenObtainSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls,user):
        token=super().get_token(user)
        
        token['user_id'] = user.user_id
        token['user_type']=user.user_type
        token['college']=user.college.name
        token['program']=Student.objects.get(user=user).program.name 
            
        
        return token

class SubjectSerializer(ModelSerializer):
    
    def calc_student_subject_progress(self,instance):
        user=self.context.get('user')
        student=Student.objects.get(user=user)
        # subject_id=self.data.get('id')
        subject_id=instance.id
        
        subject_progress=SubjectProgress.objects.get(student=student,subject__id=subject_id)
        return subject_progress.progress
    
    progress=serializers.SerializerMethodField(method_name="calc_student_subject_progress")
    
    class Meta:
        model = Subject
        fields=['id','img','title','description','progress']
        
        
class ChapterSerializer(ModelSerializer):
    class Meta:
        model=Chapter
        fields='__all__'

class ChapterItemSerializer(ModelSerializer):
    class Meta:
        model=ChapterItem
        fields='__all__'
        
                
        
        
    