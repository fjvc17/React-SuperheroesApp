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
import HeroDetail from "./views/HeroDetail";

const useAuth = () => {
  const token = localStorage.getItem('token');
  return { token }
}

export const TeamContext = createContext({});
function App() {
  const [context, setContext] = useState({ selectedHero: null, team: [] })
  return (
    <TeamContext.Provider value={{ context, setContext }} >
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">Heroes</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <a className="nav-link" href="/">Team</a>
                  <a className="nav-link" href="/search">Search</a>
                </div>
              </div>
            </div>
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
            <PrivateRoute path="/hero/:heroId">
              <HeroDetail />
            </PrivateRoute>
            <PrivateRoute path="/">
              <Home />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ TeamContext.Provider>
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
