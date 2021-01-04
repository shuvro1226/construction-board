import './assets/js/fontawesome';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import ConstructionBoard from './containers/ConstructionBoard/ConstructionBoard';
import Project from './containers/Project/Project';

function App() {
  return (
    <div>
        <Layout>
          <Switch>
            <Route path="/project/:id/:year" component={Project} />
            <Route path="/" component={ConstructionBoard} />
          </Switch>
        </Layout>
    </div>
  );
}

export default App;