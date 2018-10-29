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
        displayShow: "none"
    };

    this.doFetchData = this.doFetchData.bind(this);
    this.changeClass = this.changeClass.bind(this);
  }

  componentDidMount() {
    this.doFetchData();
    this.interval = setInterval(() => this.doFetchData(), 1000 * 6);
  }

  doFetchData() {
    //alert('Success!')

    if (this.state.currentStatus !== "" && this.state.currentPayload!=="") {
      this.setState({ previousStatus: this.state.currentStatus });
        this.setState({previousPayload: this.state.currentPayload});
    }

    const request = require("request");
    request(
      {
        uri: this.props.url,
        method: "GET",

      },
      function(error, response, body) {
        let result = null;

        if (error) {
          result = "OTHER";
        } else if (response.statusCode === 200) {
          result = "UP";
        }
        else {
          result = "DOWN";
        }

        this.setState({ currentStatus: result });

        if (!error){
            this.setState({currentPayload: JSON.stringify(response)});
        }else{
            this.setState({currentPayload: "No previous payload"});
        }
        //console.log(JSON.stringify(body));
        console.log(JSON.stringify(response));
      }.bind(this)
    );
  }

  changeClass(){

      if (this.state.previousStatus !== ""){
          if (this.state.displayShow === "none") {
              this.setState({displayShow: "block"});
          }else
          {
              this.setState({displayShow: "none"});
          }
      }
  }

  render() {

    return (
      //<span>{this.props.url}</span>
      <div className={this.state.currentStatus === "UP"
          ? "block-container-green"
          : this.state.currentStatus === "DOWN"
              ? "block-container-red"
              : "block-container-grey"} >
          <div><h3>URL: {this.props.url}</h3></div>

          <div>Current State: {this.state.currentStatus}</div>
        <br/>

        <div style={{display: this.state.displayShow}}>Previous State: {this.state.previousStatus}
        <br/>
        Previous Payload: {this.state.previousPayload}
        </div>
          <div>
              <button className="button-class" onClick={this.changeClass}>
                  Click to show previous state and payload
              </button>
          </div>
        <button className="remove-button" onClick={this.props.remove}>&#10005;</button>
      </div>
    );
  }
}

export default Block;
