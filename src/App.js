
import { useReducer } from 'react';
import { Route, Switch } from 'react-router';
import './App.scss';
import AuthContext from './auth/AuthContext';
import firebase, { FirebaseContext } from './firebase';
import Home from './pages/home/Home';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import AuthReducer from './auth/AuthReducers';
import Header from './components/header/Header';

const initialAuthState = {
  email: "",
  urlHistory: []
};


const App = () => {
  const [authState, authDispatch] = useReducer(AuthReducer, initialAuthState);
  return (
    <div>
      <FirebaseContext.Provider value={firebase}>
        <AuthContext.Provider value={{ authState, authDispatch }}>
        <Header />
        <main>
          <Switch>
            <Route exact path="/signin" component={SignIn}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
            <Route path="/:slug?" component={Home} />
          </Switch>
        </main>
        <footer>
        &copy; 2020-2021 by shortify
        </footer>
        </AuthContext.Provider>
      </FirebaseContext.Provider>
    </div>
  );
}

export default App;
