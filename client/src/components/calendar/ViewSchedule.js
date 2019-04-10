import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { getSchedule } from "../../actions/calendarActions";
import { scheduleDate } from "../../utils/helper";

class ViewSchedule extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      showScheduleViewer: props.showScheduleViewer,
      selectedSchedule: props.selectedSchedule
    };
  }

  handleClose() {
    this.setState({ showScheduleViewer: false, selectedSchedule: null });
  }

  handleShow() {
    this.setState({ showScheduleViewer: true });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showScheduleViewer) {
      this.setState({ showScheduleViewer: nextProps.showScheduleViewer });
    }
    if (nextProps.selectedSchedule) {
      this.setState({ selectedSchedule: nextProps.selectedSchedule });
    }
  }

  render() {
    const { showScheduleViewer } = this.state;
    const { schedule } = this.props.calendar;
    const { user } = this.props.auth;
    let footerContent = "";
    if (user.id == schedule.user_id) {
      footerContent = (
        <Link to={`/event/${schedule.id}`} className="btn btn-sm btn-info">
          More Actions
        </Link>
      );
    }
    return (
      <Modal show={showScheduleViewer} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {schedule.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="media p-3">
            <div className="media-body">
              <small>
                Duration:{" "}
                <i>
                  {scheduleDate(schedule.starts_at)} -{" "}
                  {scheduleDate(schedule.ends_at)}
                </i>
              </small>
              <p>{schedule.description}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-sm" onClick={this.handleClose}>
            Close
          </Button>
          {footerContent}
        </Modal.Footer>
      </Modal>
    );
  }
}

ViewSchedule.propTypes = {
  getSchedule: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  calendar: state.calendar
});

export default connect(
  mapStateToProps,
  { getSchedule }
)(withRouter(ViewSchedule));
