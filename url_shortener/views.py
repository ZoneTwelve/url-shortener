from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from api.models import serve_url
import random, json
# Create your views here.

ROOT = "https://12url.me"

def home( request ):
  return render( request, 'index.html' )

def create_url( request ):
  if request.method == "POST":
    try:
      data = json.loads(request.body)
      #data = request.POST
      url = data['url']
      rhash = hash_url( )
      serve_url.objects.create( user='anonymous', url=url, rhash=rhash )
      return JsonResponse( { 'url': (ROOT + "/" + rhash) } )
    except(e):
      return JsonResponse({"msg":"Something failed!"})

  return JsonResponse( { 'error':'Method is not support' }, status=400 )

def redirect_short( request, rhash ):
  res = serve_url.objects.filter( rhash=rhash )
  print( len(res) )
  if len(res) == 1:
    return HttpResponse( res[0].url )
  else:
    return HttpResponse( 'Url not found' )

def hash_url( ):
  return ''.join([random.choice('abcdefghijklmnopqrstuvwxyz-0987654321') for _ in range(10)])
