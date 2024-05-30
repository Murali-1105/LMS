from django.urls import path
from api import views as api_views

urlpatterns = [
    path("user/token/",api_views.MyTokenObtainPairView.as_view()),
    path('user/subject',api_views.get_subject),
    
    
]

