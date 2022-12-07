import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home.jsx'
import LandingPage from './components/LandingPage/LandingPage';
import Recipe from './components/Recipe/Recipe.jsx';
import RecipeDetail from './components/RecipeDetail/RecipeDetail.jsx';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/recipeDetail/:id">
            <RecipeDetail />
          </Route>
          <Route exact path="/recipe">
            <Recipe />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
