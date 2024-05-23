from django.shortcuts import render,redirect
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError
from .models import Program,Subject
from users.models import Student
from .serializers import SubjectSerializer
from django.http import JsonResponse



@api_view(['GET'])
def get_student_dashboard(request):
    if request.user.is_authenticated:
        if request.user.user_type != 'student':
            raise ValidationError("User is not student....")
        elif request.user.user_type=='student':
            student=Student.objects.get(user=request.user)
            program=Program.objects.get(student=student)
            subjects=Subject.objects.filter(program=program)
            subjectserializer=SubjectSerializer(subjects,many=True)
            return JsonResponse({'user':request.user.username ,'subjects':subjectserializer.data})
        
        
        
    
    






    
    

