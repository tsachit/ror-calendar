import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import isAfter from "date-fns/isAfter";
import "react-datepicker/dist/react-datepicker.css";

class Scheduler extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      showScheduleCreator: props.showScheduleCreator,
      title: "",
      startDateTime: props.selectedDate,
      endDateTime: props.selectedDate,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleDateChange = ({ startDate, endDate }) => {
    startDate = startDate || this.state.startDateTime;
    endDate = endDate || this.state.endDateTime;

    if (isAfter(startDate, endDate)) {
      endDate = startDate;
    }

    this.setState({ startDateTime: startDate, endDateTime: endDate });
  };

  handleDateChangeStart = startDate => this.handleDateChange({ startDate });

  handleDateChangeEnd = endDate => this.handleDateChange({ endDate });

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

    this.props.addEvent(newSchedule);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showScheduleCreator: nextProps.showScheduleCreator,
      startDateTime: nextProps.selectedDate,
      endDateTime: nextProps.selectedDate
    });
  }

  render() {
    const {
      showScheduleCreator,
      startDateTime,
      endDateTime,
      errors
    } = this.state;
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
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <DatePicker
                    selected={startDateTime}
                    selectsStart
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                    startDate={startDateTime}
                    endDate={endDateTime}
                    onChange={this.handleDateChangeStart}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <DatePicker
                    selected={endDateTime}
                    selectsStart
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                    startDate={startDateTime}
                    endDate={endDateTime}
                    onChange={this.handleDateChangeEnd}
                  />
                </div>
              </div>
            </div>
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

Scheduler.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(Scheduler));
