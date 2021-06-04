import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import StartPage from "../StartPage/StartPage";
import Game from "../Game/Game";
import './App.css';

export const GameContext = React.createContext(null);
function App() {
    const [fieldSize, setFieldSize] = useState('3');

    return (
        <GameContext.Provider
            value={{
                fieldSize,
                setFieldSize,
            }}
        >
            <div className='App'>
                <Router>
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
        </GameContext.Provider>
    );
}

export default App;
