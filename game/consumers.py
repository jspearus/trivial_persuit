import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from core.trivia_api import get_trivia

from .models import Player, GameData
from .views import update_current_player


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
        print(f"data {text_data_json}")
        username = text_data_json['username']
        message = text_data_json['message']
        data = text_data_json['data']
        player = Player.objects.filter(player=username).first()
        gameData = GameData.objects.filter(name='game').first()
        
        if message == 'Correct':
            player.completed_category += data
            player.completed_category += ','
            player.score = player.score + 1
            player.q_status = 'done'
            if player.score >= gameData.max_score:
                print(f"{username}: WON!!!")
                message = "won"
                data = player.player_number
            player.save()
            update_current_player(1)

        elif message == 'Incorrect':
            player.q_status = 'done'
            player.save()
            update_current_player(1)
            

        elif message == 'game':
            if data == 'reset':
                players = Player.objects.all()
                players.delete()
                gameData = GameData.objects.filter(name='game').first()
                gameData.num_players = 0
                gameData.current_player = 0
                gameData.save()

            elif data == 'start':
                gameData.current_player = 1
                gameData.save()
                player = Player.objects.filter(player_number=1).first()
                player.q_status = 'next'
                player.save()
        elif message == 'test':
            username = 'server'
            message = 'rec...'
            data = 'works'

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'game_message',
                'username': username,
                'message': message,
                'data': data,
            }
        )

    def game_message(self, event):
        username = event['username']
        message = event['message']
        data = event['data']

        self.send(text_data=json.dumps({
            'username': username,
            'message': message,
            'data': data,

        }))

    # def disconnect(self, close_code):
    #     pass
