
from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'players', views.PlayerView)
router.register(r'game', views.GameDataView)
router.register(r'courq', views.CurrentQuestionView)
router.register(r'preq', views.PreQuestionView)
router.register(r'q', views.QuestionView)


urlpatterns = [
    path('', views.home, name='home'),
    path('api/', include(router.urls)),
    path('react/', views.index, name='index'),
    path('dash/', views.dash, name='dash'),
    path('join/', views.join, name='join'),
    path('question/<str:name>/', views.question, name='question'),
]
