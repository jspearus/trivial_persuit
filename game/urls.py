
from django.urls import path, include, re_path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'players', views.PlayerView)
router.register(r'game', views.GameDataView)
router.register(r'courq', views.CurrentQuestionView)
router.register(r'preq', views.PreQuestionView)
router.register(r'q', views.QuestionView)

urlpatterns = [
    path('api/', include(router.urls)),
    re_path('.*/', views.index, name='index'),
    path('', views.index, name='index'),
    path('old/', views.home, name='home'),
    path('dash/', views.dash, name='dash'),
    # path('join/', views.join, name='join'),
    path('question/<str:name>/', views.question, name='question'),
]
