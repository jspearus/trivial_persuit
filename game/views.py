from django.shortcuts import render, redirect
from core.trivia_api import get_trivia
from .models import Player, CompletedCategory
import random

questions = []
catagories = ['general_knoladge', 'sciences', 'history', 'arts_and_literatures',
              'film_and_tv', 'food_and_drinks', 'geography', 'music',
              'society_and_culture', 'sport_and_leisure']

# Create your views here.


def index(request):
    return render(request, 'index.html', {

    })


def join(request):
    if request.method == "POST":
        name = request.POST['player_name']
        diff = request.POST['diff']
        if not Player.objects.filter(player=name).exists():
            Player.objects.create(player=name, difficulty=diff)
        return redirect(f'/question/{name}')
    return render(request, 'join.html', {})


def question(request, name):
    global questions, catagories
    cat = random.sample(range(10), 10)
    category = catagories[cat[0]]
    player = Player.objects.filter(player=name).first()
    diff = player.difficulty
    trivia_data = get_trivia(diff, category, '10')
    question_id = trivia_data[0]['id']
    category = trivia_data[0]['category']
    question = trivia_data[0]['question']
    answer = trivia_data[0]['correctAnswer']
    answers = trivia_data[0]['incorrectAnswers']
    answers.append(answer)
    random.shuffle(answers, random.random)
    answera = trivia_data[0]['incorrectAnswers'][0]
    answerb = trivia_data[0]['incorrectAnswers'][1]
    answerc = trivia_data[0]['incorrectAnswers'][2]
    answerd = trivia_data[0]['incorrectAnswers'][3]
    if player.score > 2:
        category = "You Win!!"
    return render(request, 'question.html', {
        'name': name,
        'question_id': question_id,
        'diff': diff,
        'category': category,
        'question': question,
        'answera': answera,
        'answerb': answerb,
        'answerc': answerc,
        'answerd': answerd,
        'answer': answer,
    })


def result(request):
    trivia_data = get_trivia('hard', 'history', '1')
    category = trivia_data[0]['category']
    question = trivia_data[0]['question']
    answer = trivia_data[0]['correctAnswer']
    return render(request, 'question.html', {
        'category': category,
        'question': question,
        'answer': answer,
        'result': result,
    })


def dash(request):
    playerlist = []
    players = Player.objects.all()

    return render(request, 'dash.html', {
        'players': players,
    })
