import React, { Component } from 'react';
import Client from './Client';
import logo from './logo.jpg';
import './App.css';
import { Button, Grid, Row, Col } from 'react-bootstrap';

class App extends Component {
  state = {
    catImage: ''
  }

  refreshCatImage = () => {
    function handleClick(e) {
      e.preventDefault();
      console.log('The link was clicked.');
    }

    Client.refresh(image => {
      this.setState({ catImage: image });
    });
  }

  render() {
    const { catImage } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Grumpy Cats</h1>
        </header>

        <Grid>
          <Row className="show-grid">
            <Col md={12}>
              &nbsp;
            </Col>
          </Row>
          <Row className="show-grid">
            <Col md={12}>
              <Button bsStyle="primary" onClick={this.refreshCatImage}>Refresh</Button>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col md={12}>
              &nbsp;
            </Col>
          </Row>
          <Row className="show-grid">
            <Col md={6} mdOffset={3}>
              <img src={ catImage.image_url }/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
