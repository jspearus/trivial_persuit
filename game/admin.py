from django.contrib import admin

from .models import Player, GameData, Question
# Register your models here.
admin.site.register(Player)
admin.site.register(GameData)
admin.site.register(Question)
