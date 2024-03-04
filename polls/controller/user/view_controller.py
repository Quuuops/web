from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from polls.serializers.user import UserSerializer


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
