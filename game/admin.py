from django.contrib import admin

from .models import Player, GameData, Question, CurrentQuestion, PreQuestion
# Register your models here.
admin.site.register(Player)
admin.site.register(GameData)
admin.site.register(Question)
admin.site.register(CurrentQuestion)
admin.site.register(PreQuestion)
