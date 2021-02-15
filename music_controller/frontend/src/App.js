import React, {useEffect, useState} from "react"
import {HomePage, RoomJoinPage, SetRoomParamsPage, RoomPage} from './pages'
import {
    BrowserRouter as Router, 
    Switch,
    Route,
    Redirect
} from 'react-router-dom'

const App = () => {

    const [currentRoomCode, setCurrentRoomCode] = useState(null)

    useEffect(() =>{
        fetch(`/api/user-in-room`)
            .then(response => response.json())
            .then(data => setCurrentRoomCode(data.code))
    }, [])

    const leaveRoom = () => {
        setCurrentRoomCode(null)
    }

    return (
        <div className={"center"}>
            <Router>
                <Switch>
                    <Route exact path="/" render={() => {
                        return currentRoomCode ? <Redirect to={`/room/${currentRoomCode}`}/>: <HomePage/>
                    }}
                    />
                    <Route path="/join" component={RoomJoinPage}/>
                    <Route path="/create" component={SetRoomParamsPage}/>
                    <Route path="/room/:roomCode" render={(props) => {
                        return <RoomPage {...props} leaveRoomCallback = {leaveRoom}/>
                    }}/>
                </Switch>
            </Router>
        </div>
    )
}

export default App;