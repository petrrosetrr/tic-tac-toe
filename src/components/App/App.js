import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import StartPage from "../StartPage/StartPage";
import Game from "../Game/Game";
import './App.css';

export const GameContext = React.createContext(null);
function App() {

    return (
        <div className='App'>
            <Router basename='/tic-tac-toe/'>
                <Switch>
                    <Route exact path='/'>
                        <StartPage />
                    </Route>
                    <Route exact path='/game'>
                        <Game />
                    </Route>
                    <Route path='*'>
                        <Redirect to='/' />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
