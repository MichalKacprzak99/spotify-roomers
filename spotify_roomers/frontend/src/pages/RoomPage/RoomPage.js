import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom';
import {Button, Grid, Typography} from "@material-ui/core";
import {SetRoomParamsPage} from '../index'
import {MusicPlayer} from './components'

const RoomPage = (props) => {
    const [roomInfo, setRoomInfo] = useState(null)
    const [showSettings, setShowSettings] = useState(false)
    const [song, setSong] = useState({})
    const {roomCode} = useParams();
    let history = useHistory();

    const authenticateSpotify = () =>{
        fetch("/spotify/is-authenticated")
            .then((response) => response.json())
            .then((data) => {
              if (!data.status) {
                  fetch("/spotify/get-auth-url")
                      .then((response) => response.json())
                      .then((data) => {
                          window.location.replace(data.url);
                      })
              }
            });
    }

    const getCurrentSong = () => {
        fetch('/spotify/current-song')
            .then((response) => {
                if(response.status !== 200){
                    return {};
                } else {
                    return response.json()
                }
            })
            .then((data) => {
                setSong(data)
            })
    }

    const getRoomDetails = () =>{
        fetch(`/api/get-room?code=${roomCode}`)
            .then(response => {
                if(!response.ok){
                    props.leaveRoomCallback()
                    history.push('/')
                }
                return response.json()
            }).then(data => {
                setRoomInfo(data)
                if(data){
                    authenticateSpotify()
                }
            })
    }


    useEffect(() => {
        getRoomDetails()
    }, []);

    useEffect(() =>{
        const interval = setInterval(() =>{
            getCurrentSong()
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const leaveRoom = () => {
        fetch('/api/leave-room', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
        }).then(_response =>{
            props.leaveRoomCallback()
            history.push('/')
        })

    }

    const renderSettings = () => {
        return (
            <Grid container spacing={1} alignItems={"center"} direction={"column"}>
                <Grid item xs={12}>
                    <SetRoomParamsPage
                        roomCode = {roomCode}
                        update={true}
                        guestCanPause = {roomInfo['guest_can_pause']}
                        votesToSkip = {roomInfo['votes_to_skip']}
                        updateCallback={getRoomDetails}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button color={"secondary"} variant={"contained"} onClick={() => setShowSettings(false)}>
                    Close settings
                    </Button>
                </Grid>
            </Grid>
        )
    }

    const renderSettingsButton = () => {
        return (
            <Grid item xs={12}>
                <Button color={"primary"} variant={"contained"} onClick={() => setShowSettings(true)}>
                    Show settings
                </Button>
            </Grid>
        );
    }


    const renderRoomPage = () => {
        const {isHost} = roomInfo
        return (
            <Grid container spacing={1} alignItems={"center"} direction={"column"}>
                <Grid item xs={12} >
                    <Typography variant={"h4"} component={"h4"}>
                        Code: {roomCode}
                    </Typography>
                </Grid>
                <MusicPlayer song = {song} votesRequired = {roomInfo['votesToSkip']}/>
                {isHost ? renderSettingsButton() : null}
                <Grid item xs={12}>
                    <Button color={"secondary"} variant={"contained"} onClick={leaveRoom} >
                        Leave Room
                    </Button>
                </Grid>
            </Grid>
        )
    }

    if(showSettings){
        return (<>{renderSettings()}</>);
    }

    return (<>{roomInfo ? renderRoomPage() : null}</>);


}

export default RoomPage