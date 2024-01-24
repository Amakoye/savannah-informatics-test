from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import UserAccount
from .serializers import UserSerializer


class UserListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        query_set = UserAccount.objects.all()
        serializer = UserSerializer(query_set, many=True)
        return Response(serializer.data)
