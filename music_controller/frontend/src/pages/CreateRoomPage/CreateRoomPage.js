import React from 'react'
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
    RadioGroup
} from '@material-ui/core'

import {useForm, Controller} from "react-hook-form";


const CreateRoomPage = () => {
    const defaultVotes = 1
    const { handleSubmit, control} = useForm();
    let history = useHistory();
    const createRoom = async data => {

        const response = await fetch('/api/create-room',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        });

        const res = await response.json()
        if(response.status === 201 || response.status === 200){
          history.push('/room/'+res.code)
        } else {
            alert(res)
        }
    };

    return (
        <Grid container spacing={1} alignItems={"flex-start"} alignContent={"flex-start"}>
            <Grid item xs={12} align={"center"}>
                <Typography component={"h4"} variant={"h4"}>
                    Create a room
                </Typography>
            </Grid>

            <Grid xs={12} align={"center"}>
                <form onSubmit={handleSubmit(createRoom)}>

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
                                    <RadioGroup row defaultValue={'true'}>
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
                                defaultValue={'true'}
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
                                        inputProps={{
                                            min: 1,
                                            style: { textAlign: "center"}
                                        }}
                                    />
                                }
                                defaultValue={defaultVotes}
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
                            Create Room
                        </Button>
                    </Grid>
                </form>
            </Grid>

            <Grid item xs={12} align={"center"}>
                <Button color={"secondary"} variant={"contained"} to={"/"} component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    );
}

export default CreateRoomPage