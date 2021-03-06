import React, { Component } from "react";
import Block from "./Block";

class BlockList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.urls.length ? "" : "no_endpoints"}>
        {this.props.urls.map((url, i) => {
          return (
            /*<span>{url.url} {i}</span>*/
            <div id={"block_"+i}><Block
              url={url.url}
              key={i}
              remove={() => this.props.removeBlock(i)}
            /></div>
          );
        })}
      </div>
    );
  }
}

export default BlockList;
