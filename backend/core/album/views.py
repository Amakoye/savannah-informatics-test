from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from .serializers import AlbumSerializer, PhotoSerializer
from .models import Album, Photo
from rest_framework.response import Response
from rest_framework import status


User = get_user_model()


# Create your views here.
class AlbumView(APIView):
    def get(self, request, user_id=None):
        if user_id:
            user = get_object_or_404(User, id=user_id)
            query_set = Album.objects.filter(user=user)
        else:
            query_set = Album.objects.all()

        serializer = AlbumSerializer(query_set, many=True)
        return Response(serializer.data)

    def post(self, request):
        try:
            email = request.user
            data = request.data
            title = data["title"]

            Album.objects.create(title=title, user=email)

            return Response(
                {"success": "Album created successfully"},
                status=status.HTTP_201_CREATED,
            )

        except ValueError:
            return Response(
                {"error": "Something went wrong"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class PhotoView(APIView):
    def get(self, request):
        album_id = request.GET.get("album_id")
        if album_id:
            query_set = Photo.objects.filter(album=album_id)
        else:
            query_set = Photo.objects.all()
        serializer = PhotoSerializer(query_set, many=True, context={"request": request})
        return Response(serializer.data)

    def post(self, request):
        serializer = PhotoSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def patch(self, request, pk):
        photo = Photo.objects.get(pk=pk)
        serializer = PhotoSerializer(
            photo, data=request.data, partial=True, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
