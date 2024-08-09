// src/components/About.js

import React from 'react';
import axios from 'axios';

class About extends React.Component {
  state = {
    aboutInfo: {}
  };

  componentDidMount() {
    axios.get('/about')
      .then(response => {
        this.setState({ aboutInfo: response.data });
      })
      .catch(error => {
        console.error('Error fetching about data:', error);
      });
  }

  render() {
    const { name, description, author } = this.state.aboutInfo;
    return (
      <div>
        <h2>About This App</h2>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Description:</strong> {description}</p>
        <p><strong>Author:</strong> {author}</p>
      </div>
    );
  }
}

export default About;
