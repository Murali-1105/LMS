from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import Token
from .models import Subject,Chapter,ChapterItem
from users.models import User,Student,Teacher

class MyTokenObtainSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls,user):
        token=super().get_token(user)
        
        token['username'] = user.username
        token['user_type']=user.user_type
        token['college']=user.college.name
        token['program']=Student.objects.get(user=user).program.name
            
        
        return token

class SubjectSerializer(ModelSerializer):
    class Meta:
        model = Subject
        fields='__all__'
        
        
class ChapterSerializer(ModelSerializer):
    class Meta:
        model=Chapter
        fields='__all__'

class ChapterItemSerializer(ModelSerializer):
    class Meta:
        model=ChapterItem
        fields='__all__'
        
                
        
        
    