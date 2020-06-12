import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundary from '../error-boundary';
import DummySwapiService from '../../services/dummy-swapi-service';

import { SwapiServiceProvider } from '../swapi-service-context';

import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from '../sw-components';

import './app.css';
import SwapiService from '../../services/swapi-service';

export default class App extends Component {
  state = {
    showRandomPlanet: true,
    swapiService: new SwapiService()
  };

  toggleRandomPlanet = () => {
    this.setState(state => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      };
    });
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
    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <div className='stardb-app'>
            <Header onServiceChange={this.onServiceChange} />
            {planet}
            <PersonDetails itemId={11} />

            <PlanetDetails itemId={5} />

            <StarshipDetails itemId={9} />

            <PersonList />

            <StarshipList />

            <PlanetList />
          </div>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
}
