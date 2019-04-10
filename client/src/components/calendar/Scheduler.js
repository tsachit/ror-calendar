import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import classnames from "classnames";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import isAfter from "date-fns/isAfter";
import { datepickerDisplayFormat } from "../../utils/helper";
import "react-datepicker/dist/react-datepicker.css";

class Scheduler extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      showScheduleCreator: props.showScheduleCreator,
      title: "",
      starts_at: props.selectedDate,
      ends_at: props.selectedDate,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleDateChange = ({ startDate, endDate }) => {
    startDate = startDate || this.state.starts_at;
    endDate = endDate || this.state.ends_at;

    if (isAfter(startDate, endDate)) {
      endDate = startDate;
    }

    this.setState({ starts_at: startDate, ends_at: endDate });
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

    const schedule = {
      title: this.state.title,
      starts_at: this.state.starts_at,
      ends_at: this.state.ends_at
    };

    this.props.addEvent(schedule);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showScheduleCreator: nextProps.showScheduleCreator,
      starts_at: nextProps.selectedDate,
      ends_at: nextProps.selectedDate
    });
  }

  render() {
    const { showScheduleCreator, starts_at, ends_at, errors } = this.state;
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
                    name="starts_at"
                    className={classnames("form-control", {
                      "is-invalid": errors.starts_at
                    })}
                    selected={starts_at}
                    selectsStart
                    timeInputLabel="Time:"
                    dateFormat={datepickerDisplayFormat}
                    showTimeInput
                    startDate={starts_at}
                    endDate={ends_at}
                    onChange={this.handleDateChangeStart}
                  />
                  {errors.starts_at && (
                    <div className="invalid-feedback">{errors.starts_at}</div>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <DatePicker
                    name="ends_at"
                    className={classnames("form-control", {
                      "is-invalid": errors.ends_at
                    })}
                    selected={ends_at}
                    selectsStart
                    timeInputLabel="Time:"
                    dateFormat={datepickerDisplayFormat}
                    showTimeInput
                    startDate={starts_at}
                    endDate={ends_at}
                    onChange={this.handleDateChangeEnd}
                  />
                  {errors.ends_at && (
                    <div className="invalid-feedback">{errors.ends_at}</div>
                  )}
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
