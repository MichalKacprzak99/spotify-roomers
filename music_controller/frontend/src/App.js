import React from "react"
import {HomePage, RoomJoinPage, CreateRoomPage, RoomPage} from './pages'
import {
    BrowserRouter as Router, 
    Switch,
    Route
} from 'react-router-dom'
const App = () => {


    return (
    <Router>
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/join" component={RoomJoinPage}/>
            <Route path="/create" component={CreateRoomPage}/>
            <Route path="/room/:roomCode" component={RoomPage}/>
        </Switch>
    </Router>
    )
}

export default App;