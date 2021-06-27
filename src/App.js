import { createContext, useState } from "react"
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Home from './views/Home'
import { Login } from './views/Login/Login';
import Search from "./views/Search";

const useAuth = () => {
  const token = localStorage.getItem('token');
  return { token }
}

export const TeamContext = createContext({});
function App() {
  const [team, setTeam] = useState([])
  return (
    <TeamContext.Provider value={{ team: team, setTeam }}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search">Search</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/search">
              <Search />
            </PrivateRoute>
            <PrivateRoute path="/">
              <Home />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </TeamContext.Provider>
  );
}

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.token ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

export default App;
