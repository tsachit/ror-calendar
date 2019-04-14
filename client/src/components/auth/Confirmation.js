import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { confirmRegistration } from "../../actions/authActions";

class Confirmation extends Component {
  componentDidMount() {
    this.props.confirmRegistration(
      this.props.match.params.token,
      this.props.history
    );
  }

  render() {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
}

export default connect(
  null,
  { confirmRegistration }
)(withRouter(Confirmation));
