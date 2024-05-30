from rest_framework_simplejwt.views import TokenObtainPairView
from api import serializers as api_serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
import jwt
from django.conf import settings
from .models import  Program,Subject


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=api_serializers.MyTokenObtainSerializer
    
@api_view(['GET'])
def get_subject(request):
    if request.method=='GET':
        token=request.headers.get('Authorization')
        scheme,token=token.split(" ")
        
        if scheme!='Bearer':
            return Response({'message':"Wrong Scheme...."})
        decoded_token=jwt.decode(token,settings.SECRET_KEY,["HS256"])
        college_name=decoded_token['college']
        program_name=decoded_token['program']
        
        program=Program.objects.get(college__name=college_name,name=program_name)
        
        subjects=Subject.objects.filter(program=program)
        
        subjectserializer = api_serializers.SubjectSerializer(subjects,many=True)
        
        return Response({'subjects':subjectserializer.data})
    
    

    
    

    
    
        
        
        
        
        
    

        
        
        
    
    






    
    

