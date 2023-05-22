import React, {lazy} from 'react';
// import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

const Home = lazy(() => import('./modules/home/Home'));
const Login = lazy(() => import('./Login'));
const PostAuthRedirect = lazy(() => import('./PostAuthRedirect'));

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <ProtectedRoute path="/" exact>
              <Home />
          </ProtectedRoute>
          <PublicRoute path="/login" exact>
            <Login />
          </PublicRoute>
          <PublicRoute path="/post_auth" exact>
            <PostAuthRedirect />
          </PublicRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
