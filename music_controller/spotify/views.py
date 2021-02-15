from django.shortcuts import redirect
from .credentials import Credentials
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response

import spotify.utils as utils

from api.models import Room


class AuthURL(APIView):
    def get(self, request, fornat=None):
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'

        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': Credentials.REDIRECT_URI,
            'client_id': Credentials.CLIENT_ID
        }).prepare().url

        return Response({'url': url}, status=status.HTTP_200_OK)


def spotify_callback(request, format=None):
    code = request.GET.get('code')
    error = request.GET.get('error')

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': Credentials.REDIRECT_URI,
        'client_id': Credentials.CLIENT_ID,
        'client_secret': Credentials.CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')

    if not request.session.exists(request.session.session_key):
        request.session.create()

    utils.update_or_create_user_tokens(
        request.session.session_key, access_token, token_type, expires_in, refresh_token)

    return redirect('frontend:')


class IsAuthenticated(APIView):
    def get(self, request, format=None):
        is_authenticated = utils.is_spotify_authenticated(
            self.request.session.session_key)
        return Response({'status': is_authenticated}, status=status.HTTP_200_OK)


class CurrentSong(APIView):
    def get(self, request, format=None):
        room_code = self.request.session.get('room_code')
        queryset = Room.objects.filter(code=room_code)
        if queryset.exists():
            room = queryset[0]
        else:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

        host = room.host
        endpoint = "player/currently-playing"
        response = utils.execute_spotify_api_request(host, endpoint)
        if 'error' in response or 'item' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        item = response.get('item')
        duration = item.get('duration_ms')
        progress = response.get('progress_ms')
        album_cover = item.get('album').get('images')[0].get('url')
        is_playing = response.get('is_playing')
        song_id = item.get('id')

        artists_string = ""

        for i, artist in enumerate(item.get('artists')):
            if i > 0:
                artists_string += ", "
            artists_string += artist.get('name')

        song = {
            'title': item.get('name'),
            'artists': artists_string,
            'duration': duration,
            'time': progress,
            'image_url': album_cover,
            'is_playing': is_playing,
            'votes': 0,
            'id': song_id,
        }

        return Response(song, status=status.HTTP_200_OK)


class PauseSong(APIView):
    def put(self, request, format=None):
        room_code = self.request.session.get('room_code')
        queryset = Room.objects.filter(code=room_code)
        if queryset.exists():
            room = queryset[0]
        else:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

        if self.request.session.session_key == room.host or room.guest_can_pause:
            utils.pause_song(room.host)
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        return Response({}, status=status.HTTP_403_FORBIDDEN)


class PlaySong(APIView):
    def put(self, request, format=None):
        room_code = self.request.session.get('room_code')
        queryset = Room.objects.filter(code=room_code)
        if queryset.exists():
            room = queryset[0]
        else:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

        if self.request.session.session_key == room.host or room.guest_can_pause:
            utils.play_song(room.host)
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        return Response({}, status=status.HTTP_403_FORBIDDEN)



