import React, {useState, useEffect} from 'react'
import {Link, useParams, useHistory} from 'react-router-dom';
import {Button, Grid, Typography} from "@material-ui/core";
const RoomPage = (props) => {
    const [roomInfo, setRoomInfo] = useState(null)

    const {roomCode} = useParams();
    let history = useHistory();

    useEffect(() => {
        fetch(`/api/get-room?code=${roomCode}`)
            .then(response => {
                if(!response.ok){
                    props.leaveRoomCallback()
                    history.push('/')
                }
                return response.json()
            })
            .then(data => setRoomInfo(data))
    }, []);

    const leaveRoom = () => {
        fetch('/api/leave-room', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
        }).then(_response =>{
            props.leaveRoomCallback()
            history.push('/')
        })

    }

    const renderRoomPage = () => {
        const {guest_can_pose: guestCanPose, votes_to_skip: votesToSkip, is_host: isHost } = roomInfo
        return (
            <Grid container spacing={1} alignItems={"center"} direction={"column"}>
                <Grid item xs={12} >
                    <Typography variant={"h4"} component={"h4"}>
                        Code: {roomCode}
                    </Typography>
                </Grid>
                <Grid item xs={12} >
                    <Typography variant={"h6"} component={"h4"}>
                        Code: {guestCanPose}
                    </Typography>
                </Grid>
                <Grid item xs={12} >
                    <Typography variant={"h6"} component={"h4"}>
                        Code: {votesToSkip}
                    </Typography>
                </Grid>
                <Grid item xs={12} >
                    <Typography variant={"h6"} component={"h4"}>
                        Code: {isHost.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button color={"secondary"} variant={"contained"} onClick={leaveRoom} >
                        Leave Room
                    </Button>
                </Grid>
            </Grid>
        )
    }

    return (
        <>
            {roomInfo ? renderRoomPage(): null}
        </>
    );
}

export default RoomPage