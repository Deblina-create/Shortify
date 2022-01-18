
import { Route, Switch } from 'react-router';
import './App.css';
import firebase, { FirebaseContext } from './firebase';
import Home from './pages/home/Home';


const App = () => {
  return (
    <div>
      <FirebaseContext.Provider value={firebase}>
        <header>Shortify</header>
        <main>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </main>
        <footer>
        &copy; 2020-2021 by shortify
        </footer>
      </FirebaseContext.Provider>
    </div>
  );
}

export default App;