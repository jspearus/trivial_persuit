from .models import Player, GameData, Question, CurrentQuestion, PreQuestion
from core.trivia_api import get_trivia
import random

questions = []
catagories = {"Geography": "geography",
              "Film & TV": "film_and_tv",
              "Music": "music",
              "History": "history",
              "Arts & Literature": "arts_and_literature",
              "Science": "science",
              "Sport & Leisure": "sport_and_leisure",
              "Society & Culture": "society_and_culture",
              "General Knowledge": "general_knowledge",
              "Food & Drink": "food_and_drink"}



def update_current_player(gName, value):
    gameData = GameData.objects.filter(name=gName).first()
    gameData.current_player = gameData.current_player  + value
    if gameData.current_player > gameData.num_players:
        gameData.current_player = 1
    gameData.save()
    gameData = GameData.objects.filter(name=gName).first()
    player = Player.objects.filter(player_number=gameData.current_player).first()
    print(player)
    curQuestion = CurrentQuestion.objects.filter(name=gName).first()
    preQuestion = PreQuestion.objects.filter(name=gName).first()
    preQuestion.pre_category = curQuestion.category
    preQuestion.pre_question = curQuestion.question
    preQuestion.pre_answer = curQuestion.answer
    preQuestion.save()
    curQuestion.save()
    # player = Player.objects.filter(player_number=gameData.current_player).first()
    player.q_status = 'next'
    player.save()
    
    
def question_filter(comp_cat, diff, player):
    global questions, catagories
    i = 0
    new_cat = []
    category_list = list(catagories.keys())
    for cat in category_list:
        if cat not in comp_cat:
            new_cat.append(cat)
    if len(new_cat) > 1:
        cat = random.randint(0, len(new_cat)-1)
    else:
        cat = 0
    print(f"cat: {catagories[new_cat[cat]]}")
    trivia_data = get_trivia(diff, catagories[new_cat[cat]], '20')
    for q in range(20):
        if not Question.objects.filter(question_id=trivia_data[q]['id']):
            question = Question.objects.create(
                question_id=trivia_data[q]['id'],
                player=player.player,
                category=trivia_data[q]['category'],
                difficulty=diff,
                question=trivia_data[q]['question'],
                answer=trivia_data[q]['correctAnswer'],
                wrong_answers=trivia_data[q]['incorrectAnswers']
            )
            question.save()
            i = q
            break
    return trivia_data[i]


def question():
    global questions, catagories
    gameData = GameData.objects.filter(name='game').first()
    player = Player.objects.filter(player_number=gameData.current_player).first()
    print(f"cart: {player.completed_category}")
    comp_cat = player.completed_category.split(',')
    for cat in comp_cat:
        if cat == '':
            comp_cat.remove(cat)
    if player.q_status == 'next':
        trivia_data = question_filter(comp_cat, player.difficulty.lower(), player)
        question_id = trivia_data['id']
        category = trivia_data['category']
        question = trivia_data['question']
        answer = trivia_data['correctAnswer']
        answers = trivia_data['incorrectAnswers']
        answers.append(answer)
        random.shuffle(answers, random.random)
        answera = trivia_data['incorrectAnswers'][0]
        answerb = trivia_data['incorrectAnswers'][1]
        answerc = trivia_data['incorrectAnswers'][2]
        answerd = trivia_data['incorrectAnswers'][3]
        curQuestion = CurrentQuestion.objects.filter(name='game').first()
        curQuestion.category = category
        curQuestion.question = question
        curQuestion.answer = answer
        curQuestion.answer_a = answera
        curQuestion.answer_b = answerb
        curQuestion.answer_c = answerc
        curQuestion.answer_d = answerd
        curQuestion.save()
        player.category = category
        player.question = question
        player.answer = answer
        player.answer_a = answera
        player.answer_b = answerb
        player.answer_c = answerc
        player.answer_d = answerd
        player.q_status = 'active'
        player.save()
        question_status = 'active'
        
    elif player.q_status == 'active':
        question_status = player.q_status
        category = player.category
        question = player.question
        answer = player.answer
        answera = player.answer_a
        answerb = player.answer_b
        answerc = player.answer_c
        answerd = player.answer_d
        
    else:
        question_status = player.q_status
        category = player.category
        question = player.question
        answer = player.answer
        answers = ' '
        answera = ' '
        answerb = ' '
        answerc = ' '
        answerd = ' '
    print(f"quest status = {question_status}")