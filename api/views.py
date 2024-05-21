from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Program,Course
from .serializers import ProgramSerializer,CourseSerializer


@api_view(['GET'])
@login_required
def get_course(request):
    queryset=Course.objects.filter(student__id__contains=request.user.id)
    serializer=CourseSerializer(queryset,many=True)
    return Response(serializer.data)

    
    






    
    

