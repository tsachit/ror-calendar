import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";

class Calendar extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <div className="calendar">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div id="calendar" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Calendar);
