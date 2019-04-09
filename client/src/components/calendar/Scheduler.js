import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

class Scheduler extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      showScheduleCreator: props.showScheduleCreator,
      title: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleClose() {
    this.setState({ showScheduleCreator: false });
  }

  handleShow() {
    this.setState({ showScheduleCreator: true });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newSchedule = {
      title: this.state.title,
      startDateTime: this.state.startDateTime,
      endDateTime: this.state.endDateTime
    };

    console.log("============================", newSchedule);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ showScheduleCreator: nextProps.showScheduleCreator });
  }

  render() {
    const { showScheduleCreator, errors } = this.state;
    return (
      <Modal show={showScheduleCreator} onHide={this.handleClose}>
        <form onSubmit={this.onSubmit} noValidate>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Modal heading
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TextFieldGroup
              placeholder="Title"
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.onChange}
              error={errors.title}
            />
          </Modal.Body>
          <Modal.Footer>
            <input type="submit" className="btn btn-info" />
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default Scheduler;

// Scheduler.defaultProps = {
//   showScheduleCreator: false
// };

// Scheduler.propTypes = {
//   // createSchedule: PropTypes.func.isRequired,
//   showScheduleCreator: PropTypes.object.isRequired
// };

// const mapStateToProps = state => {
//   console.log("==========================", state);
//   return {
//     showScheduleCreator: state.showScheduleCreator
//   };
// };

// export default connect(
//   mapStateToProps,
//   {
//     /*createSchedule*/
//   }
// )(withRouter(Scheduler));
