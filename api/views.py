from rest_framework_simplejwt.views import TokenObtainPairView
from api import serializers as api_serializers



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=api_serializers.MyTokenObtainSerializer
    

        
        
        
    
    






    
    

