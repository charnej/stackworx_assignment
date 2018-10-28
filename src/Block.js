import React, { Component } from "react";
import "./App.css";

class Block extends Component {
  constructor(props) {
    super(props);

    this.state = {
      previousStatus: "",
      previousPayload: "",
      currentStatus: "",
      currentPayload: "",
    };

    this.doFetchData = this.doFetchData.bind(this);
  }

  componentDidMount() {
    this.doFetchData();
    this.interval = setInterval(() => this.doFetchData(), 1000 * 6);
  }

  doFetchData() {
    //alert('Success!')

    if (this.state.currentStatus !== "") {
      this.setState({ previousStatus: this.state.currentStatus });
    }

    const request = require("request");
    request(
      {
        uri: this.props.url,
        method: "GET"
      },
      function(error, response, body) {
        let result = null;

        if (error) {
          result = "OTHER";
        } else if (response.statusCode === 200) {
          result = "UP";
        }else if (response.statusCode === 503) {
            result = "DOWN";
        }
        else {
          result = "DOWN";
        }

        this.setState({ currentStatus: result });
        //alert(result)
        console.log(JSON.stringify(response));
      }.bind(this)
    );
  }

  render() {

    return (
      //<span>{this.props.url}</span>
      <div className="block-container" >
          <div><h3>URL: {this.props.url}</h3></div>
        <div className={
            this.state.currentStatus === "UP"
                ? "green"
                : this.state.currentStatus === "DOWN"
                ? "red"
                : "grey"
        }>Current State: {this.state.currentStatus}</div>
        <div className="hidden" >Previous State: {this.state.previousStatus}</div>
        <span onClick={this.props.remove}>&#10005;</span>
          {!this.state.isHidden && <div />}
      </div>
    );
  }
}

export default Block;
