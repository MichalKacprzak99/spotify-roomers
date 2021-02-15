import React, {useEffect, useState} from "react"
import {HomePage, RoomJoinPage, CreateRoomPage, RoomPage} from './pages'
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
        console.log(currentRoomCode ? "ala": "basia")
    }, [])

    return (
        <div className={"center"}>
            <Router>
                <Switch>
                    <Route exact path="/" render={() => {
                        return currentRoomCode ? <Redirect to={`/room/${currentRoomCode}`}/>: <HomePage/>
                    }}
                    />
                    <Route path="/join" component={RoomJoinPage}/>
                    <Route path="/create" component={CreateRoomPage}/>
                    <Route path="/room/:roomCode" component={RoomPage}/>
                </Switch>
            </Router>
        </div>
    )
}

export default App;