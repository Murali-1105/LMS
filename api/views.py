from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Program,Course
from .serializers import ProgramSerializer,CourseSerializer


@api_view(['GET'])
@login_required
def get_course(request):
    if request.user.user_type=='student':
        user_id=request.user.student.id

    queryset = Course.objects.filter(student__id=user_id)
    serializer=CourseSerializer(queryset,many=True)
    return Response(serializer.data)

    
    






    
    

