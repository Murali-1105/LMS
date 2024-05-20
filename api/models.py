# api/models.py
from django.db import models

class College(models.Model):
    Name=[
         ("Vels University","Vels University"),
         ("Crescent","Crescent"),
         ("Jamal Mohamad","Jamal Mohamad"),
         ("Malla Reddy","Malla Reddy"),
     ]
    
    name = models.CharField(max_length=100, choices=Name,editable=False)
    
    def __str__(self):
        return self.name

class Program(models.Model):
    class Meta:
        permissions = [
            ("view_specific_data", "Can view specific data"),  #Custom Permission for Admin
            # Add more permissions as needed
        ]
    college = models.ForeignKey(College, on_delete=models.PROTECT)
    name = models.CharField(max_length=300)
    year = models.SmallIntegerField(choices=[(1, '1'), (2, '2'), (3, '3'), (4, '4')], default=1)
    user = models.ManyToManyField('users.User', related_name='programs')  

    def __str__(self):
        return f"{self.name}-{self.college}"

class Course(models.Model):
    
    college = models.ForeignKey(College, on_delete=models.PROTECT, editable=False)
    program = models.ForeignKey(Program, on_delete=models.PROTECT)
    name = models.CharField(max_length=300)
    user = models.ManyToManyField('users.User', related_name='courses')

    def save(self, *args, **kwargs):
        self.college = self.program.college
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class CourseItem(models.Model):
 
    college = models.ForeignKey(College, on_delete=models.PROTECT, editable=False)
    course = models.ForeignKey(Course, on_delete=models.PROTECT)
    description = models.TextField()
    pdf = models.FileField(upload_to='path-to-file')
    videos = models.FileField()
    

    def save(self, *args, **kwargs):
        self.college = self.course.college
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.course} - item"



























































































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
    
