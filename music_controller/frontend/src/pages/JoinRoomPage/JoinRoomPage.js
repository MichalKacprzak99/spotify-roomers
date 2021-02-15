import React, {useState} from 'react'
import {Button, FormControl, Grid, TextField, Typography} from "@material-ui/core";
import {useForm, Controller} from "react-hook-form";
import {Link, useHistory} from "react-router-dom";

const JoinRoomPage = () => {

    const { handleSubmit, control} = useForm();
    const [error, setError] = useState("")
    const [helpText, setHelpText] = useState("Code needed to enter the room")
    let history = useHistory();

    const joinRoom = async(data) =>{
        const response = await fetch('/api/join-room',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        });

        if(response.ok){
            history.push('/room/'+data.code)
        } else {
            setError("error")
            setHelpText("Invalid room code")
        }
    }

    return (
        <Grid container spacing={1} alignItems={"center"} direction={"column"}>
            <Grid item xs={12}>
                <Typography variant={"h4"} component={"h4"}>
                    Join a room
                </Typography>
            </Grid>
            <Grid item xs={12} >
                <form onSubmit={handleSubmit(joinRoom)}>
                    <Grid item xs={12}  >
                        <FormControl>
                            <Controller
                                name={"code"}
                                as={
                                    <TextField
                                        error={error}
                                        label={"Code"}
                                        placeholder={"Enter a room code"}
                                        helperText={helpText}
                                        variant={"outlined"}
                                        color={"primary"}
                                    />
                                }
                                defaultValue={''}
                                control={control}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align={"center"}>
                        <Button color={"primary"} variant={"contained"} type={"submit"}>
                            Join Room
                        </Button>
                    </Grid>
                </form>
            </Grid>

            <Grid item xs={12} >
                <Button color={"secondary"} variant={"contained"} to={"/"} component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    )
}

export default JoinRoomPage