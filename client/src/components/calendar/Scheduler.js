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
      showScheduleCreator: props.showScheduleCreator
    };
  }

  handleClose() {
    this.setState({ showScheduleCreator: false });
  }

  handleShow() {
    this.setState({ showScheduleCreator: true });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ showScheduleCreator: nextProps.showScheduleCreator });
  }

  render() {
    const { showScheduleCreator } = this.state;
    return (
      <Modal show={showScheduleCreator} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          {/* <TextFieldGroup
            placeholder="Title"
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.onChange}
            error={errors.title}
          /> */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
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
