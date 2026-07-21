import './App.css';
import { Route, Switch } from 'react-router-dom';
import Posts from './pages/Posts/Posts';
import Profile from './pages/Profile/Profile';
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route strict exact path="/posts" component={Posts} />
        <Route strict exact path="/signup" component={Signup} />
        <Route strict exact path="/signin" component={Signin} />
        <Route strict exact path="/profile/:id" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
