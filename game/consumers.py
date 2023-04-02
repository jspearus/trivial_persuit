import json, time
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from core.trivia_api import get_trivia

from .models import Player, GameData
from .gamelogic import update_current_player, question, CurrentQuestion


class GameConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = 'game'

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        username = text_data_json['username']
        data_type = text_data_json['data_type']
        data = text_data_json['data']
        # player = Player.objects.filter(player=username).first()
        # gameData = GameData.objects.filter(name='game').first()
                # update_current_player('game', 1)

        if data_type == 'status':
            if data == 'start':
                print("starting...")
                update_current_player('game', 1)
                question()
                
            elif data == 'reset':
                print("reset...")
                game = GameData.objects.filter(name='game').first()
                game.current_player = 0
                game.save()
                players = Player.objects.all()
                for player in players:
                    player.score = 0
                    player.completed_category = ','
                    player.q_status = 'new'
                    player.save()
                curQuestion = CurrentQuestion.objects.filter(name='game').first()
                curQuestion.category = ''
                curQuestion.question = ''
                curQuestion.answer = ''
                curQuestion.answer_a = ''
                curQuestion.answer_b = ''
                curQuestion.answer_c = ''
                curQuestion.answer_d = ''
                curQuestion.save()
                    
            elif data == 'nextc':
                # todo check to see if this works
                print("correct updating next...")
                game = GameData.objects.filter(name='game').first()
                player = Player.objects.filter(player=username).first()
                player.completed_category = player.completed_category + player.category + ','
                player.score += 1
                if player.score >= game.max_score:
                    # todo winner function here
                    print('winner')
                    game = GameData.objects.filter(name='game').first()
                    game.current_player = 0
                    game.save()
                    curQuestion = CurrentQuestion.objects.filter(name='game').first()
                    curQuestion.category = ''
                    curQuestion.question = ''
                    curQuestion.answer = ''
                    curQuestion.answer_a = ''
                    curQuestion.answer_b = ''
                    curQuestion.answer_c = ''
                    curQuestion.answer_d = ''
                    curQuestion.save()
                    data = player.player
                    
                    players = Player.objects.all()
                    for player in players:
                        player.score = 0
                        player.completed_category = ','
                        player.q_status = 'new'
                        player.save()
                    time.sleep(1.5)
                    data_type = 'winner'
                else:
                    print('next')
                    player.save()
                    update_current_player('game', 1)
                    question()
                    data = 'nextplayer'
                
            elif data == 'nextw':
                # todo check to see if this works
                print("wrong updating next...")
                update_current_player('game', 1)
                question()
                data = 'nextplayer'
                
        elif data_type == 'setup':
            if data == 'players':
                game = GameData.objects.filter(name='game').first()
                game.num_players = game.num_players + 1
                game.save()
                data= 'game'
        else:
            username = username
            data_type = data_type
            data = data

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'game_message',
                'username': username,
                'data_type': data_type,
                'data': data,
            }
        )

    def game_message(self, event):
        username = event['username']
        data_type = event['data_type']
        data = event['data']

        self.send(text_data=json.dumps({
            'username': username,
            'data_type': data_type,
            'data': data,

        }))

    # def disconnect(self, close_code):
    #     pass
