import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import { getGuests, addGuest } from "../../actions/invitationActions";
import { invitationStatus, invitationNotified } from "../../utils/helper";
import Spinner from "../common/Spinner";

class Invitation extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      guests: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addGuestToList = this.addGuestToList.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.props.match.params.id) {
      const invitationData = {
        email: this.state.email
      };
      this.props.addGuest(
        this.props.match.params.id,
        invitationData,
        this.addGuestToList
      );
    }
  }

  addGuestToList(guest) {
    const { guests } = this.state;
    guests.unshift(guest);
    this.setState({ email: "", guests, errors: {} });
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getGuests(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (
      nextProps.invitations &&
      nextProps.invitations.guests &&
      nextProps.invitations.guests.length
    ) {
      this.setState({ guests: nextProps.invitations.guests });
    }
  }

  render() {
    const { errors } = this.state;
    const { guests, loading } = this.props.invitations;
    let guestsContent = <Spinner />;
    if (guests !== null && !loading) {
      guestsContent = guests.map(guest => (
        <tr key={guest.id}>
          <td>{guest.email}</td>
          <td dangerouslySetInnerHTML={invitationStatus(guest.status)} />
          <td dangerouslySetInnerHTML={invitationNotified(guest.is_notified)} />
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
  { getGuests, addGuest }
)(withRouter(Invitation));
