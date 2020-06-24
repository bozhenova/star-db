import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundary from '../error-boundary';
import DummySwapiService from '../../services/dummy-swapi-service';
import SwapiService from '../../services/swapi-service';

import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';
import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StarshipDetails } from '../sw-components';

export default class App extends Component {
  state = {
    showRandomPlanet: true,
    swapiService: new SwapiService()
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      return {
        swapiService: new Service()
      };
    });
  };

  render() {
    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className='stardb-app'>
              <Header onServiceChange={this.onServiceChange} />
              <RandomPlanet />
              <Switch>
                <Route
                  exact
                  path='/'
                  render={() => <h2>Welcome to Star Database</h2>}
                />
                <Route path='/people/:id?' component={PeoplePage} />
                <Route path='/planets' component={PlanetsPage} />
                <Route exact path='/starships' component={StarshipsPage} />
                <Route
                  path='/starships/:id'
                  render={({ match }) => {
                    const { id } = match.params;
                    return <StarshipDetails itemId={id} />;
                  }}
                />
                <Route
                  render={() => (
                    <h2 style={{ textAlign: 'center' }}>Page not found</h2>
                  )}
                />
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
}
