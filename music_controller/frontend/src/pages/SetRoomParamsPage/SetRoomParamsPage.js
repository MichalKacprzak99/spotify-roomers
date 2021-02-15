import React, {useState} from 'react'
import { Link, useHistory } from "react-router-dom"
import {
    Button,
    Grid,
    Typography,
    TextField,
    FormHelperText,
    FormControl,
    Radio,
    FormControlLabel,
    RadioGroup,
    Collapse,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import {useForm, Controller} from "react-hook-form";


const SetRoomParamsPage = (props) => {
    const {
        roomCode = null,
        update=false,
        guestCanPause = 'false',
        votesToSkip = 1,
        updateCallback,
    } = props


    const { handleSubmit, control} = useForm();
    const [errorMsg, setErrorMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")

    let history = useHistory();
    const createRoom = data => {
        fetch('/api/create-room',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        }).then(response => {
            if(response.ok){
                return response.json()
            }
            alert("Bad response")
        }).then((data)=> history.push('/room/'+data.code))
    };

    const updateRoom = data => {
        data['code'] = roomCode
        fetch('/api/update-room',{
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        }).then(response => {
            if(response.ok){
                setSuccessMsg("Room Updated")
            } else {
                setErrorMsg("Failed to update")
            }
            updateCallback()
        })


    };
    const title = update ? "Update room" : "Create Room"

    const renderBackButton = () => {
        return (
            <Grid item xs={12} align={"center"}>
                <Button color={"secondary"} variant={"contained"} to={"/"} component={Link}>
                    Back
                </Button>
            </Grid>
        )
    }

    return (

        <Grid container spacing={1} alignItems={"flex-start"} alignContent={"flex-start"}>

            <Grid item xs={12} align={"center"}>
                <Collapse in={errorMsg !== "" || successMsg !== ""}>
                    {successMsg !== "" ? (
                        <Alert severity={"success"} onClose={()=>{setSuccessMsg("")}}>{successMsg}</Alert>
                    ) : (
                        <Alert severity={"error"} onClose={()=>{setErrorMsg("")}}>{errorMsg}</Alert>
                    )}
                </Collapse>
            </Grid>
            <Grid item xs={12} align={"center"}>
                <Typography component={"h4"} variant={"h4"}>
                    {title}
                </Typography>
            </Grid>

            <Grid xs={12} align={"center"}>
                <form onSubmit={handleSubmit(update ? updateRoom : createRoom)}>

                    <Grid item xs={12} align={"center"}>
                        <FormControl component={"fieldset"}>
                            <FormHelperText>
                                <div align={'center'}>
                                    Guest Control of Playback State
                                </div>
                            </FormHelperText>
                            <Controller
                                name={"guest_can_pause"}
                                as={
                                    <RadioGroup row defaultValue={guestCanPause.toString()}>
                                        <FormControlLabel
                                            control={<Radio color="primary"/>}
                                            label={"Play/Pause"}
                                            value={'true'}
                                            labelPlacement={"bottom"}>

                                        </FormControlLabel>
                                        <FormControlLabel
                                            control={<Radio color="secondary"/>}
                                            label={"No control"}
                                            value={'false'}
                                            labelPlacement={"bottom"}>
                                        </FormControlLabel>
                                    </RadioGroup>
                                }
                                defaultValue={guestCanPause.toString()}
                                control={control}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} align="center">
                        <FormControl>
                            <Controller
                                name={"votes_to_skip"}
                                as={
                                    <TextField
                                        id={"requiredVotes"}
                                        type={"number"}
                                        defaultValue={votesToSkip}
                                        inputProps={{
                                            min: 1,
                                            style: { textAlign: "center"}
                                        }}
                                    />
                                }
                                defaultValue={votesToSkip}
                                control={control}
                                rules={{
                                    required: 'Required'
                                }}
                            />
                            <FormHelperText>
                                <div align={'center'}>Votes required to skip song</div>
                            </FormHelperText>

                        </FormControl>
                    </Grid>

                    <Grid item xs={12} align={"center"}>
                        <Button color={"primary"} variant={"contained"} type={"submit"}>
                            {title}
                        </Button>
                    </Grid>
                </form>
            </Grid>
            {!update ? renderBackButton() : null}
        </Grid>
    );
}

export default SetRoomParamsPage