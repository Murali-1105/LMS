# Entire admin configuration is here

from django.contrib import admin
from .models import College,Program,Course,CourseItem
from users.models import User

class ProgramAdmin(admin.ModelAdmin):
    
    def formfield_for_foreignkey(self, db_field, request, **kwargs):   
          
        if db_field.name == "college":
            if request.user.has_perm('api.view_specific_data') and request.user.user_type == 'admin': 
                # Filter the queryset based on the user's college(college)
                kwargs["queryset"] = College.objects.filter(name=request.user.college.name)
                
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
    def formfield_for_manytomany(self, db_field, request, **kwargs):
        
        if db_field.name == "user":
            if request.user.has_perm('api.view_specific_data') and request.user.user_type == 'admin':
                # Filter the queryset based on the users college(users)
                kwargs["queryset"] = User.objects.filter(college=request.user.college) 
                
        return super().formfield_for_manytomany(db_field, request, **kwargs)
        
    
    def get_queryset(self, request):
        
        queryset=super().get_queryset(request)
        if request.user.has_perm('api.view_specific_data') and request.user.user_type=='admin':
            queryset=queryset.filter(college=request.user.college)
            print(queryset)
        return queryset

    
class CourseAdmin(admin.ModelAdmin):
    
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        
        if db_field.name == "program":
            if request.user.has_perm('api.view_specific_data') and request.user.user_type == 'admin':
                # Filter the queryset based on the user's college
                kwargs["queryset"] = Program.objects.filter(college=request.user.college)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
    def formfield_for_manytomany(self, db_field, request, **kwargs):
        
        if db_field.name == "user":
            if request.user.has_perm('api.view_specific_data') and request.user.user_type == 'admin':
                # Filter the queryset based on the users college(users)
                kwargs["queryset"] = User.objects.filter(college=request.user.college) 
                
        return super().formfield_for_manytomany(db_field, request, **kwargs)

    
    def get_queryset(self, request):
        
        queryset=super().get_queryset(request)
        if request.user.has_perm('api.view_specific_data') and request.user.user_type=='admin':
            queryset=queryset.filter(college=request.user.college)
            print(queryset)
        return queryset
    
    
class CourseItemAdmin(admin.ModelAdmin):
    
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "course":
            if request.user.has_perm('api.view_specific_data') and request.user.user_type == 'admin':
                # Filter the queryset based on the user's college
                kwargs["queryset"] = Course.objects.filter(program__college=request.user.college)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
    
    def get_queryset(self, request):
        queryset=super().get_queryset(request)
        if request.user.has_perm('api.view_specific_data'):
            queryset=queryset.filter(college__name=request.user.user_type)
        return queryset
    

admin.site.register(College)
admin.site.register(Program,ProgramAdmin)
admin.site.register(Course,CourseAdmin)
admin.site.register(CourseItem,CourseItemAdmin)
