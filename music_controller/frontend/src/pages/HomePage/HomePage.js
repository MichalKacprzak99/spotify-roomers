import React from 'react'
import {Button, ButtonGroup, Grid, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

const HomePage = () => {
    const renderTitle = () => {
        return (
            <Grid item xs={12}>
                <Typography variant="h3" compact="h3">
                    Spotify Roomers
                </Typography>
            </Grid>
        )
    }
    const renderMenu = () => {
        return (
            <Grid item xs={12}>
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button color="primary" to="/join" component={Link}>
                    Join a Room
                    </Button>
                    <Button color="secondary" to="/create" component={Link}>
                    Create a Room
                    </Button>
                </ButtonGroup>
            </Grid>
        )
    }
    const renderHomePage = () => {
        return (
            <Grid container spacing={3} alignItems={"center"} direction={"column"}>
                {renderTitle()}
                {renderMenu()}
            </Grid>
        );
    }

    return (
        <>
            {renderHomePage()}
        </>
    );
}

export default HomePage