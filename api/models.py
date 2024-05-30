"""Models for College, Program, Subject, and Chapter."""

from django.db import models
from users.models import Teacher, Student


class College(models.Model):
    """Model representing a college."""

    NAME_CHOICES = [
        ("Vels University", "Vels University"),
        ("Crescent", "Crescent"),
        ("Jamal Mohamad", "Jamal Mohamad"),
        ("Malla Reddy", "Malla Reddy"),
    ]

    name = models.CharField(max_length=100, choices=NAME_CHOICES)

    def __str__(self):
        """String representation of the college."""
        return self.name


class Program(models.Model):
    """Model representing a program."""

    college = models.ForeignKey(College, on_delete=models.PROTECT)
    name = models.CharField(max_length=300)
    year = models.SmallIntegerField(
        choices=[(1, '1'), (2, '2'), (3, '3'), (4, '4')], default=1
    )
    student = models.ManyToManyField(Student, related_name='programs')

    def __str__(self):
        """String representation of the program."""
        return f"{self.name}-{self.college}"


class Subject(models.Model):
    """Model representing a Subject."""
    image=models.ImageField(upload_to='path-to-upload')
    college = models.ForeignKey(College, on_delete=models.PROTECT, editable=False)
    program = models.ForeignKey(Program, on_delete=models.PROTECT)
    name = models.CharField(max_length=300)
    teacher = models.ForeignKey(Teacher, on_delete=models.PROTECT)
    

    def save(self, *args, **kwargs):
        """Override the save method to set the college based on the program."""
        self.college = self.program.college
        super().save(*args, **kwargs)

    def __str__(self):
        """String representation of the Subject."""
        return self.name


class Chapter(models.Model):
    """Model representing a Chapter."""
    
    name=models.CharField(max_length=200)
    college = models.ForeignKey(College, on_delete=models.PROTECT, editable=False)
    Subject = models.ForeignKey(Subject, on_delete=models.PROTECT)
    description = models.TextField()
    

    def save(self, *args, **kwargs):
        """Override the save method to set the college based on the Subject."""
        self.college = self.Subject.college
        super().save(*args, **kwargs)

    def __str__(self):
        """String representation of the Chapter."""
        return self.name

class ChapterItem(models.Model):
    
    description=models.TextField()
    chapter=models.ForeignKey(Chapter,on_delete=models.PROTECT)
    ppt=models.FileField(upload_to='path-to-upload')
    video=models.FileField(upload_to='path-to-upload')
    
    def __str__(self):
        return f"{self.chapter}-item{self.id}"
    










































































































# from django.db import models
# from users.models import Teacher,Student
# class College(models.Model):
#     Name=[
#          ("Vels University","Vels University"),
#          ("Crescent","Crescent"),
#          ("Jamal Mohamad","Jamal Mohamad"),
#          ("Malla Reddy","Malla Reddy"),
#      ]
    
#     name = models.CharField(max_length=100, choices=Name,editable=False)
    
#     def __str__(self):
#         return self.name

# class Program(models.Model):

#     college = models.ForeignKey(College, on_delete=models.PROTECT)
#     name = models.CharField(max_length=300)
#     year = models.SmallIntegerField(choices=[(1, '1'), (2, '2'), (3, '3'), (4, '4')], default=1)
#     student = models.ManyToManyField('users.User', related_name='programs')  

#     def __str__(self):
#         return f"{self.name}-{self.college}"

# class Course(models.Model):
    
#     college = models.ForeignKey(College, on_delete=models.PROTECT, editable=False)
#     program = models.ForeignKey(Program, on_delete=models.PROTECT)
#     name = models.CharField(max_length=300)
#     # user = models.ManyToManyField('users.User', related_name='courses')
#     teacher=models.ForeignKey(Teacher,on_delete=models.PROTECT)
#     student=models.ManyToManyField(Student,related_name='courses')
    
    
    
#     def save(self, *args, **kwargs):
#         self.college = self.program.college
#         super().save(*args, **kwargs)

#     def __str__(self):
#         return self.name

# class CourseItem(models.Model):
 
#     college = models.ForeignKey(College, on_delete=models.PROTECT, editable=False)
#     course = models.ForeignKey(Course, on_delete=models.PROTECT)
#     description = models.TextField()
#     pdf = models.FileField(upload_to='path-to-file')
#     videos = models.FileField(upload_to='path-to-file')
    

#     def save(self, *args, **kwargs):
#         self.college = self.course.college
#         super().save(*args, **kwargs)

#     def __str__(self):
#         return f"{self.course} - item"



























































































# from django.db import models
# # from users.models import User


# class College(models.Model):
    
#     Name=[
#         ("Vels University","Vels University"),
#         ("Crescent","Crescent"),
#         ("Jamal Mohamad","Jamal Mohamad"),
#         ("Malla Reddy","Malla Reddy"),
#     ]
    
#     name=models.CharField(max_length=100,choices=Name)  
    
    
        
#     def __str__(self):
#         return self.name

# class Program(models.Model):
#     class Meta:
#         permissions = [
#             ("view_specific_data", "Can view specific data"),  #Custom Permission for Admin
#             # Add more permissions as needed
#         ]
#     college=models.ForeignKey(College,on_delete=models.PROTECT)
#     student=models.ForeignKey("users.User",on_delete=models.PROTECT)
#     Year=[
#         (1,1),
#         (2,2),
#         (3,3),
#         (4,4),
#     ]
    
#     name=models.CharField(max_length=300)
#     year=models.SmallIntegerField(choices=Year,default=1)

#     def __str__(self):
#         return self.name
    
# class Course(models.Model):
#     class Meta:
#         permissions = [
#             ("view_specific_data", "Can view specific data"),
#             # Add more permissions as needed
#         ]
#     program=models.ForeignKey(Program,on_delete=models.PROTECT)
#     name=models.CharField(max_length=300)
        
#     def __str__(self):
#         return self.name
    
# class CourseItem(models.Model):
#     class Meta:
#         permissions = [
#             ("view_specific_data", "Can view specific data"),
#             # Add more permissions as needed
#         ]
        
#     college=models.ForeignKey(College,on_delete=models.PROTECT,editable=False)
#     course=models.ForeignKey(Course,on_delete=models.PROTECT)
#     description=models.TextField()
#     pdf=models.FileField(upload_to='path-to-file')
#     videos=models.FileField()
    
#     def save(self,*args,**kwargs):
#         self.college=self.course.college
#         super().save(*args,**kwargs)
        
#     def __str__(self):
#         return f"{self.course}-item"
    
