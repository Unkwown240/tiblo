from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import NewUser
from .serializers import CustomUserSerializer
from rest_framework.permissions import AllowAny

class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response({
                    'message': "User Profile Created"
                },
                    status=status.HTTP_201_CREATED,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, format='json'):
        user = NewUser.objects.get(id=request.user.id)
        print(request.user)
        data = CustomUserSerializer(user, request.data, partial=True)
        data.is_valid(raise_exception=True)
        data.save()
        return Response({
            'message': "User Profile Updated"
        },
            status=status.HTTP_200_OK,
        )