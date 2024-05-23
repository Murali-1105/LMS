from django.shortcuts import render,redirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate,login,logout
from rest_framework.response import Response
from django.http import JsonResponse
from django.middleware import csrf



def login_view(request):
    if request.method=='POST':
        form=AuthenticationForm(data=request.POST)
        if form.is_valid():
            username=form.cleaned_data.get('username')
            password=form.cleaned_data.get('password')
            user=authenticate(request,username=username,password=password)
            if user is not None:
                login(request,user)
                return render(request,"login_success.html")

    else:
        form=AuthenticationForm()
        
    return render(request, 'login.html', {'form': form})

def get_csrftoken(request):
    csrf_token=csrf.get_token(request)
    return JsonResponse({'csrftoken':csrf_token})
    
            
                
        

