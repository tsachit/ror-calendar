import React, { Component } from "react";
import Spinner from "../common/Spinner";
import { confirmRegistration } from "../../actions/authActions";

class Confirmation extends Component {
  componentDidMount() {
    confirmRegistration(this.props.match.params.token, this.props.history);
  }

  render() {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
}

export default Confirmation;
