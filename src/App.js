import React, { Component } from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import './App.css';

import MyComponent from './MyComponent';

class App extends Component {
  constructor(...args) {
    super(...args);

    const networkInterface = createNetworkInterface('https://swapi.apis.guru');
    this.client = new ApolloClient({
      networkInterface,
      dataIdFromObject: r => r.id,
    });
  }
  render() {
    return (
      <ApolloProvider client={this.client}>
        <MyComponent />
      </ApolloProvider>
    );
  }
}

export default App;
