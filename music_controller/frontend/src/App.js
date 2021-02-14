import React from "react"
import {HomePage, RoomJoinPage, CreateRoomPage} from './pages'
import {
    BrowserRouter as Router, 
    Switch, 
    Link, 
    Redirect,
    Route
} from 'react-router-dom'
const App = () => {

    return (
    <Router>
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/join" component={RoomJoinPage}/>
            <Route path="/create" component={CreateRoomPage}/>
        </Switch>
    </Router>
    )
}

export default App;