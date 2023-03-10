from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('react/', views.index, name='index'),
    path('dash/', views.dash, name='dash'),
    path('join/', views.join, name='join'),
    path('question/<str:name>/', views.question, name='question'),
]
