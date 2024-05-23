from django.urls import path
from .views import login_view,get_csrftoken

urlpatterns = [
    path('login',login_view,name='login'),
    path('get_csrf',get_csrftoken,name='get_csrf')
]