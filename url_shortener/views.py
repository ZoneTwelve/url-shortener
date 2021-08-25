from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from api.models import serve_url
import random
# Create your views here.

def home( request ):
  return render( request, 'index.html' )

def create_url( request ):
  if request.method == "POST":
    rhash = hash_url( )
    serve_url.objects.create( user='anonymous', url=request.POST['url'], rhash=rhash )
    return HttpResponse( 'https://12url.me/s/'+rhash )
  return JsonResponse( { 'error':'Method is not support' }, status=400 )

def redirect( request ):
  print( serve_url.objects.all() )
  return HttpResponse( request, 'Hello' )

def hash_url( ):
  return ''.join([random.choice('abcdefghijklmnopqrstuvwxyz0987654321') for _ in range(10)])
