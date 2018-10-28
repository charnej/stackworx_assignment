import React, { Component } from "react";

class BlockForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  handleSubmit(event) {
    // Stop the form from refreshing the page
    event.preventDefault();

    // Don't add the endpoint url if it's only whitespace
    if (this.state.input.trim().length) {
      this.props.addBlock(this.state.input);
      this.setState({ input: "" });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input className="searchBox"
          type="search"
          value={this.state.input}
          onChange={this.handleChange}
          placeholder="Add endpoint..."
        />
      </form>
    );
  }
}

export default BlockForm;
