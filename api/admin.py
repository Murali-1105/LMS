#Entire admin configuration is here

from django.contrib import admin
from .models import *
from users.models import User,Teacher

class BaseAdmin(admin.ModelAdmin):
    def formfield_for_foreignkey(self, db_field, request, **kwargs):   
        if request.user.user_type == 'admin': 
            if hasattr(self.model, 'college'):
                # Filter the queryset based on the user's college(college)
                kwargs["queryset"] = College.objects.filter(name=request.user.college.name)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
    def formfield_for_manytomany(self, db_field, request, **kwargs):
        if request.user.user_type == 'admin':
            # Filter the queryset based on the users college(users)
            if hasattr(self.model, 'college'):
                kwargs["queryset"] = User.objects.filter(college=request.user.college,user_type='student') 
        return super().formfield_for_manytomany(db_field, request, **kwargs)
    
    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if request.user.user_type == 'admin':
            if hasattr(self.model, 'college'):
                queryset = queryset.filter(college=request.user.college)
        return queryset

class ProgramAdmin(BaseAdmin):
    pass

class SubjectAdmin(admin.ModelAdmin):
    
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if request.user.user_type == 'admin':
            if hasattr(self.model, 'program') and db_field.name == 'program':
                # Filter the queryset based on the user's program
                kwargs["queryset"] = Program.objects.filter(college=request.user.college)
            if hasattr(self.model, 'teacher') and db_field.name == 'teacher':
                # Filter the queryset based on the user's college and user_type='teacher'
                kwargs["queryset"] = Teacher.objects.filter(user__college=request.user.college)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if request.user.user_type == 'teacher':
            if hasattr(self.model, 'teacher'):
                teacher=Teacher.objects.get(user=request.user)
                queryset = queryset.filter(teacher=teacher)
        return queryset

class ChapterAdmin(BaseAdmin):
    pass

class ChapterItemAdmin(BaseAdmin):
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if request.user.user_type == 'admin':
            # Filter the queryset based on the user's college
            if hasattr(self.model, 'chapter'):
                kwargs["queryset"] = Chapter.objects.filter(program__college=request.user.college)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

admin.site.register(College)
admin.site.register(Program, ProgramAdmin)
admin.site.register(Subject,SubjectAdmin)
admin.site.register(Chapter,ChapterAdmin)
admin.site.register(ChapterItem,ChapterItemAdmin)







































































































































# from django.contrib import admin
# from .models import College,Program,Course,CourseItem
# from users.models import User

# class ProgramAdmin(admin.ModelAdmin):
    
#     def formfield_for_foreignkey(self, db_field, request, **kwargs):   
          
#         if db_field.name == "college":
#             if request.user.user_type == 'admin': 
#                 # Filter the queryset based on the user's college(college)
#                 kwargs["queryset"] = College.objects.filter(name=request.user.college.name)
                
#         return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
#     def formfield_for_manytomany(self, db_field, request, **kwargs):
        
#         if db_field.name == "user":
#             if request.user.user_type == 'admin':
#                 # Filter the queryset based on the users college(users)
#                 kwargs["queryset"] = User.objects.filter(college=request.user.college) 
                
#         return super().formfield_for_manytomany(db_field, request, **kwargs)
        
    
#     def get_queryset(self, request):
        
#         queryset=super().get_queryset(request)
#         if request.user.user_type=='admin':
#             queryset=queryset.filter(college=request.user.college)
#             print(queryset)
#         return queryset

    
# class CourseAdmin(admin.ModelAdmin):
    
#     def formfield_for_foreignkey(self, db_field, request, **kwargs):
        
#         if db_field.name == "program":
#             if request.user.user_type == 'admin':
#                 # Filter the queryset based on the user's college
#                 kwargs["queryset"] = Program.objects.filter(college=request.user.college)
#         return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
#     def formfield_for_manytomany(self, db_field, request, **kwargs):
        
#         if db_field.name == "user":
#             if request.user.user_type == 'admin':
#                 # Filter the queryset based on the users college(users)
#                 kwargs["queryset"] = User.objects.filter(college=request.user.college) 
                
#         return super().formfield_for_manytomany(db_field, request, **kwargs)

    
#     def get_queryset(self, request):
        
#         queryset=super().get_queryset(request)
#         if request.user.user_type=='admin':
#             queryset=queryset.filter(college=request.user.college)
#             print(queryset)
#         return queryset
    
    
# class CourseItemAdmin(admin.ModelAdmin):
    
#     def formfield_for_foreignkey(self, db_field, request, **kwargs):
#         if db_field.name == "course":
#             if request.user.user_type == 'admin':
#                 # Filter the queryset based on the user's college
#                 kwargs["queryset"] = Course.objects.filter(program__college=request.user.college)
#         return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
    
#     def get_queryset(self, request):
#         queryset=super().get_queryset(request)
#         if request.user.user_type=='admin':
#             queryset=queryset.filter(college__name=request.user.user_type)
#         return queryset
    

# admin.site.register(College)
# admin.site.register(Program,ProgramAdmin)
# admin.site.register(Course,CourseAdmin)
# admin.site.register(CourseItem,CourseItemAdmin)
