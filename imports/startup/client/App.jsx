import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import MainLayout from '/imports/components/MainLayout';

const App = () => (
  <Router>
    <Route path="/" component={MainLayout} />
  </Router>
);

Meteor.startup(() => {
  render(
    <App />,
    document.getElementById('app'),
  );
});
