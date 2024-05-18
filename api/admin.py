from typing import Any
from django.contrib import admin
from django.db.models.query import QuerySet
from django.http import HttpRequest
from .models import College,Program,Course,CourseItem


class ProgramAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        queryset=super().get_queryset(request)
        if request.user.has_perm('api.view_specific_data'):
            queryset=queryset.filter(college__name=request.user.user_type)
        return queryset

    
class CourseAdmin(admin.ModelAdmin):
    #exclude = ['college']
    def get_queryset(self, request):
        queryset=super().get_queryset(request)
        if request.user.has_perm('api.view_specific_data'):
            queryset=queryset.filter(college__name=request.user.user_type)
        return queryset
    
    
class CourseItemAdmin(admin.ModelAdmin):
    #exclude = ['college']
    def get_queryset(self, request):
        queryset=super().get_queryset(request)
        if request.user.has_perm('api.view_specific_data'):
            queryset=queryset.filter(college__name=request.user.user_type)
        return queryset
    




admin.site.register(College)
admin.site.register(Program,ProgramAdmin)
admin.site.register(Course,CourseAdmin)
admin.site.register(CourseItem,CourseItemAdmin)
