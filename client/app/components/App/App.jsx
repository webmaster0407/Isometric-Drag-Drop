import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../Home/Home";
import {createBrowserHistory} from 'history';

// eslint-disable-next-line react/prop-types
class App extends React.Component {

  render() {
    var history = createBrowserHistory();
    return (
      <>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
      </>
    );
  }
}

export default App;
