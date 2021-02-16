import React, {useState} from "react";
import {
    Grid,
    Typography,
    Card,
    IconButton,
    LinearProgress, Collapse,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import Alert from "@material-ui/lab/Alert";
import defaultAlbumCover from './images/default-album-art.png'


const MusicPlayer = ({song, votesRequired}) => {
    const [playerMessage, setPlayerMessage] = useState("")
    const {
        imageUrl = defaultAlbumCover,
        title = "No song",
        artists,
        isPlaying,
        time, duration,
        votes=0,
    } = song
    const songProgress = (time/duration) * 100

    const pauseSong = () => {
        fetch('/spotify/pause', {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
        }).then((response) => {
            if (response.status === 405){
                setPlayerMessage("Premium required")
            }
        })
    }

    const playSong = () => {
        fetch('/spotify/play', {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
        }).then((response) => {
            if (response.status === 405){
                setPlayerMessage("Premium required")
            }
        })
    }

    const skipSong = () => {
        fetch('/spotify/skip', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
        }).then((response) => {
            if (response.status === 405){
                setPlayerMessage("Premium required")
            }
        })
    }

    const renderPlayerMessage = () => {
        return (
            <Collapse in={playerMessage !== ""}>
                <Alert severity={"error"} onClose={()=>{setPlayerMessage("")}}>{playerMessage}</Alert>
            </Collapse>
        )
    }

    const renderSongControl = () => {
        return (
            <div>
                <IconButton onClick={() => isPlaying ? pauseSong() : playSong()}>
                    {isPlaying ? <PauseIcon /> : <PlayArrowIcon/>}
                </IconButton>
                <IconButton onClick={() => skipSong()}>
                    <SkipNextIcon/>{votes} /{" "} {votesRequired}
                </IconButton>
            </div>
        )
    }

    return (
        <Card>
            <Grid container  alignItems={"center"} direction={"row"}>
                <Grid item xs={4}>
                    <img src={imageUrl} height={"100%"} width={"100%"} alt={"Album Cover"}/>
                </Grid>
                <Grid item align="center" xs={8}>
                    <Typography component={"h5"} variant={"h5"}>
                        {title}
                    </Typography>
                    <Typography component={"h5"} variant={"subtitle1"} color={"textSecondary"}>
                        {artists}
                    </Typography>
                    {Object.keys(song).length !== 0 ? renderSongControl() : null}
                    {renderPlayerMessage()}
                </Grid>
            </Grid>
            <LinearProgress variant={"determinate"} value={songProgress}/>
        </Card>
    )
}

export default MusicPlayer