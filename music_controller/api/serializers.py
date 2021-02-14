from rest_framework import serializers
from .models import Room
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'quest_can_pose', 'votes_to_skip', 'created_at')