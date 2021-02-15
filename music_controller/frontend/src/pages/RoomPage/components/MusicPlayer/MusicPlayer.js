import React from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";

const MusicPlayer = ({song}) => {
    console.log(song)
    const {image_url: imageUrl, title, artists, is_playing: isPlaying, time, duration} = song
    const songProgress = (time/duration) * 100
    return (
        <Card>
            <Grid container  alignItems={"center"} direction={"row"}>
                <Grid item xs={4}>
                    <img src={imageUrl} height={"100%"} width={"100%"}/>
                </Grid>
                <Grid item align="center" xs={8}>
                    <Typography component={"h5"} variant={"h5"}>
                        {title}
                    </Typography>
                    <Typography component={"h5"} variant={"subtitle1"} color={"textSecondary"}>
                        {artists}
                    </Typography>
                    <div>
                        <IconButton>
                            {isPlaying ? <PauseIcon/> : <PlayArrowIcon/>}
                        </IconButton>
                        <IconButton>
                            <SkipNextIcon/>
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress variant={"determinate"} value={songProgress}/>
        </Card>
    )
}

export default MusicPlayer