import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import { getGuests } from "../../actions/invitationActions";
import { invitationStatus, invitationNotified } from "../../utils/helper";
import Spinner from "../common/Spinner";

class Invitation extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("submitted", this.state);
    // const invitation = {
    //   email: this.state.email
    // };
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getGuests(this.props.match.params.id);
    }
  }

  render() {
    const { errors } = this.state;
    const { guests, loading } = this.props.invitations;
    let guestsContent = <Spinner />;
    if (guests !== null && !loading) {
      guestsContent = guests.map(guest => (
        <tr key={guest._id}>
          <td>{guest.email}</td>
          <td>{invitationStatus(guest.status)}</td>
          <td>{invitationNotified(guest.is_notified)}</td>
        </tr>
      ));
    }
    return (
      <div className="col">
        <h4>Guests</h4>
        <form onSubmit={this.onSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1" />
            <TextFieldGroup
              placeholder="Email"
              label="Email address"
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
          </div>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Guests</th>
              <th scope="col">Status</th>
              <th scope="col">Notified?</th>
            </tr>
          </thead>
          <tbody>{guestsContent}</tbody>
        </table>
      </div>
    );
  }
}

Invitation.propTypes = {
  getGuests: PropTypes.func.isRequired,
  invitations: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  invitations: state.invitations,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getGuests }
)(withRouter(Invitation));
