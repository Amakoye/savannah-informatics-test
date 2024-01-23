from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import AlbumSerializer, PhotoSerializer
from .models import Album as AlbumModel, Photo as PhotoModel
from rest_framework.response import Response


# Create your views here.
class Album(APIView):
    def get(self, request):
        query_set = AlbumModel.objects.all()
        serializer = AlbumSerializer(query_set, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user if request.user.is_authenticated else None

        request.data["user"] = user.id if user else None

        serializer = AlbumSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class Photo(APIView):
    def get(self, request):
        query_set = PhotoModel.objects.all()
        serializer = PhotoSerializer(query_set, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user if request.user.is_authenticated else None
        request.data["user"] = user.id if user else None

        serializer = PhotoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def patch(self, request, pk):
        photo = Photo.objects.get(pk=pk)
        serializer = PhotoSerializer(photo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
