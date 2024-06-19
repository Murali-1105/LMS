from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import Token

from .models import *
from users.models import *
from rest_framework import serializers
from django.conf import settings

class MyTokenObtainSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls,user):
        token=super().get_token(user)
        
        token['user_id'] = user.user_id 
        token['username'] = user.username
        token['user_type']=user.user_type 
        token['user_image'] = settings.BASE_URL+user.user_image.url
        token['college']=user.college.name
        token['program']=Student.objects.get(user=user).program.name 
            
        
        return token

class SubjectSerializer(ModelSerializer):
    
    def calc_student_subject_progress(self,instance):
        user=self.context.get('user')
        student=Student.objects.get(user=user)
        # subject_id=self.data.get('id')
        subject_id=instance.id
        try:
            subject_progress=SubjectProgress.objects.get(student=student,subject__id=subject_id)
        except SubjectProgress.DoesNotExist:
            return 0
        return subject_progress.progress
    
    progress=serializers.SerializerMethodField(method_name="calc_student_subject_progress")
    
    class Meta:
        model = Subject
        fields=['id','img','title','description','progress']

    def to_representation(self, instance):
        
        ret = super().to_representation(instance)

        ret['img']=settings.BASE_URL+ret['img']

        return ret
        
        
class ChapterItemSerializer(ModelSerializer):
    
    class Meta:
        model=ChapterItem
        fields=['description','video','ppt']
        
    def to_representation(self, instance):
        
        ret = super().to_representation(instance)

        ret['video']=settings.BASE_URL+ret['video']  
         
        ret['ppt']=settings.BASE_URL+ret['ppt']

        return ret
        
        
class ChapterSerializer(ModelSerializer):
    
    items = serializers.SerializerMethodField(method_name='get_items')
    
    class Meta:
        model=Chapter
        fields=['name','description','items']

    def get_items(self,obj):
        items=obj.items.all()
        serializer=ChapterItemSerializer(items,many=True)
        return serializer.data
        
                 
class ChapterQuizSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=ChapterQuiz
        fields='__all__'
        
    