# Roomer

## Table of content
* [Project Description](#project-description)
  - [Motivation](#motivation)
  - [What is the project about?](#what-is-the-project-about)
  - [Me vs Tutorial](#me-vs-tutorial)
* [Demo](#demo)
* [Features](#features)
* [New things learned](#new-things-learned)
* [TODO](#todo)
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
and give the Roomer the appropriate permissions. The user can join the room if he knows the code. 
In the room, the user will see a simple music player that will show the current song on the host's spotify.
Host and users(if they have permission if no they vote) can pause/play/skip song.
### Me vs Tutorial
I've made some changes to the tutorials. They are as follows:
* functional components instead of class components
* usage react-hook-form
* more complex usage of react-rooter-dom
* usage of environment variables
##Demo
Application will be hosted online soon.
## Features
* create/update/join room
* change room settings if user is host
* integration with Spotify
* pause or start current playing song, depends on room settings(Spotify Premium required)
* skip or vote to skip a song, depends on room settings( Spotify Premium required)
## New things learned
* Django - basics of new framework
* material-ui
* how to use useEffect with interval
* how to integrate an app with SpotifyAPI
## TODO
* add default view when no song is played
* add notification when user can't pause/start/skip song
* add notification when room is full and user can't join
* add tests
* host app on e.g. heroku
* improve website view