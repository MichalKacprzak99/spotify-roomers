# Spotify Roomers
![GitHub](https://img.shields.io/github/license/MichalKacprzak99/spotify-roomers)
![GitHub last commit](https://img.shields.io/github/last-commit/MichalKacprzak99/spotify-roomers)
![GitHub top language](https://img.shields.io/github/languages/top/MichalKacprzak99/spotify-roomers)
![GitHub language count](https://img.shields.io/github/languages/count/MichalKacprzak99/spotify-roomers)
![GitHub followers](https://img.shields.io/github/followers/MichalKacprzak99?style=social)
## Table of content
* [Project Description](#project-description)
  - [Motivation](#motivation)
  - [What is the project about?](#what-is-the-project-about)
  - [Me vs Tutorial](#me-vs-tutorial)
* [Demo](#demo)
* [Features](#features)
* [New things learned](#new-things-learned)
* [Further development](#further-development)
## Project Description
### Motivation
The main goal of creating this application was to learn the basics of Django 
and gain another experience related to React. I also wanted to focus more on 
the visual side of the app as this is my Achilles' heel.
### What is the project about?
This is a project based on a series of tutorials available on 
[here](https://www.youtube.com/watch?v=JD-age0BPVo&list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j&index=1).
Roomer is a simple Full Stack Web App. It's enable user to create room with random generated code.
Host can decide how many guest can join to the room and what permissions the guests will have (
inside room host can modify these settings). After creating the room, the host needs to log in to Spotify
and give an app the appropriate permissions. The user can join the room if he knows the code. 
In the room, the user will see a simple music player that will show the current song on the host's spotify.
Host and users(if they have permission if no they vote) can pause/play/skip song.
### Me vs Tutorial
I've made some changes to the tutorials. They are as follows:
* functional components instead of class components
* usage react-hook-form
* more complex usage of react-rooter-dom
* usage of environment variables

## Demo
Application will be hosted online soon.
## Features
* create/update/join room
* change room settings if user is host
* integration with Spotify
* pause or start current playing song, depends on room settings(Spotify Premium required)
* skip or vote to skip a song, depends on room settings( Spotify Premium required)
## New things learned
* Django - basics of new framework
* How to connect Django with React
* pros and cons of material-ui
* how to use useEffect with interval
* how to integrate an app with SpotifyAPI
## Further development
After completing the tutorial, I plan to develop this project further. 
I want to focus primarily on:
- [x] add default view when no song is played
- [x] add notification when user can't pause/start/skip song :
- [x] add basic tests 
- [ ] host app on e.g. heroku
- [ ] improve website view
