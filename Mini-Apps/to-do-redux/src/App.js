import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus,faTimesCircle,faPen } from '@fortawesome/free-solid-svg-icons';
import Layout from './containers/Layout/Layout'

library.add(faPlus,faTimesCircle,faPen);

class App extends Component {
  render() {
    return (
      <div >
        <Layout></Layout>
      </div>
    );
  }
}

export default App;
