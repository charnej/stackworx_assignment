import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import BlockList from "./BlockList";
import BlockForm from "./BlockForm";

class App extends Component {
  constructor() {
    super();

    this.state = {
      urls: [
        {
          url: "https://ord.dev.stackworx.io/health"
        },
        {
          url: "https://cognition.dev.stackworx.cloud/api/status"
        },
          {
              url: "https://api.durf.dev.stackworx.io/health"
          },
          {
              url: "https://prima.run/health"
          },
          {
              url: "https://stackworx.io/"
          },

      ]
    };

    this.addUrl = this.addUrl.bind(this);
    this.removeBlock = this.removeBlock.bind(this);
  }

  addUrl(inputURL) {
    this.setState({
      urls: [
        ...this.state.urls,
        {
          url: inputURL
        }
      ]
    });
  }

  removeBlock(index) {
    //alert("hi");
    this.setState({
      urls: this.state.urls.filter((url, i) => index !== i)
    });
  }

  render() {
    return (
      <div className="App">
          <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to React</h2>
          </div>
        <br />
        <h2>
          Please add an endpoint:
          <BlockForm addBlock={this.addUrl} />
        </h2>
        <h1>Endpoints</h1>
        <BlockList urls={this.state.urls} removeBlock={this.removeBlock} />
      </div>
    );
  }
}

export default App;
