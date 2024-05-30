# User Model Logic
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver
from random import randint




class User(AbstractUser):
    """
    Custom user model.
    """
    USER_TYPES = [
        ("student", "Student"),
        ("teacher", "Teacher"),
        ("admin", "Admin"),
    ]
    user_type = models.CharField(max_length=100, choices=USER_TYPES)
    college = models.ForeignKey('api.College', on_delete=models.PROTECT, null=True)
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._original_password = self.password
    
    def save(self, *args, **kwargs):
        """
        Override save method to hash password only if it's set or changed.
        """
        if self.password and (not self.pk or self._state.adding or self.password != self._original_password):
            self.set_password(self.password)
        super().save(*args, **kwargs)

class Student(models.Model):
    """
    Model representing a student.
    """
    user = models.OneToOneField(User, on_delete=models.PROTECT)
    name = models.CharField(max_length=300)
    student_id=models.CharField(max_length=100)
    program=models.ForeignKey('api.Program',on_delete=models.PROTECT,null=True)
    def save(self, *args, **kwargs):
        """
        Override save method to set the student's name based on the user's username.
        """
        self.student_id=f"{self.user.college}{randint(10000,99999)}"
        self.name = self.user.username
        super().save(*args, **kwargs)
        
    def __str__(self):
        return self.name

class Teacher(models.Model):
    """
    Model representing a teacher.
    """
    user = models.OneToOneField(User, on_delete=models.PROTECT)
    name = models.CharField(max_length=300)
    
    def save(self, *args, **kwargs):
        """
        Override save method to set the teacher's name based on the user's username.
        """
        self.name = self.user.username
        super().save(*args, **kwargs)
        
    def __str__(self):
        return self.name

@receiver(post_save, sender=User)
def custom_user_created(sender, instance, created, **kwargs):
    """
    Signal handler for custom user creation.
    """
    if created:
        if instance.user_type == 'student':
            student = Student.objects.create(user=instance)
            student.save()
        elif instance.user_type == 'teacher':
            teacher = Teacher.objects.create(user=instance)
            teacher.save()



























































































# from django.db import models
# from django.contrib.auth.models import AbstractUser
# from django.db.models.signals import post_save
# from django.dispatch import receiver

# class User(AbstractUser):
    
#     types=[
#         ("student","student"),
#         ("teacher","teacher"),
#         ("admin","admin"),
        
#     ]
#     user_type=models.CharField(max_length=100,choices=types)
#     college=models.ForeignKey('api.College',on_delete=models.PROTECT,null=True)
    
#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self._original_password = self.password
    
#     def save(self, *args, **kwargs):
#         # Hash the password only if it's set and it's a new user or the password has changed
#         if self.password and (not self.pk or self._state.adding or self.password != self._original_password):
#             self.set_password(self.password)
#         super().save(*args, **kwargs)
        
        
# class Student(models.Model):
#     user=models.OneToOneField(User,on_delete=models.PROTECT)
#     name=models.CharField(max_length=300)
    
#     def save(self,*args,**kwargs):
#         self.name=self.user.username
#         super().save(*args,**kwargs)
        
#     def __str__(self):
#         return self.name

# class Teacher(models.Model):
#     user=models.OneToOneField(User,on_delete=models.PROTECT)
#     name=models.CharField(max_length=300)
    
#     def save(self,*args,**kwargs):
#         self.name=self.user.username
#         super().save(*args,**kwargs)
        
#     def __str__(self):
#         return self.name        
        

        
        
# @receiver(post_save, sender=User)
# def custom_user_created(sender, instance, created, **kwargs):
#     """
#     Signal handler for custom user creation.
#     """
#     if created:
#         if instance.user_type=='student':
#             student = Student.objects.create(user=instance)
#             student.save()
#         if instance.user_type=='teacher':
#             teacher=Teacher.objects.create(user=instance)
#             teacher.save()
            
    