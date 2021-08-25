from django.db import models

# Create your models here.

class serve_url( models.Model ):
  url        = models.URLField(blank=True) # redirect url
  user       = models.CharField(max_length=64) # from which user (default: )
  rhash      = models.CharField(max_length=16, default='') # short url be like: /s/${rhash}, rhash mean random hash
  uhash      = models.CharField(max_length=16, default='') # short url be like: /u/${user}/${uhash} uhash mean user hash
  created_at = models.DateTimeField(auto_now_add=True)
