import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus,faTimesCircle,faPen, faArrowCircleRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Layout from './containers/Layout/Layout'


library.add(faPlus,faTimesCircle,faPen,faArrowCircleRight,faArrowCircleLeft);

class App extends Component {

  render() {
    return (
      <div>
        <Layout></Layout>
      </div>
    );
  }
}

export default App;
