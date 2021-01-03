import './assets/js/fontawesome';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import ConstructionBoard from './containers/ConstructionBoard/ConstructionBoard';
import Project from './containers/Project/Project';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route path="/project/:id/:year" component={Project} />
          <Route path="/" component={ConstructionBoard} />
        </Switch>
      </header>
    </div>
  );
}

export default App;