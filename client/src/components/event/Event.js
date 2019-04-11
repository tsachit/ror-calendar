import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import classnames from "classnames";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import isAfter from "date-fns/isAfter";
import Invitation from "./Invitation";
import { datepickerDisplayFormat } from "../../utils/helper";
import { getSchedule, updateSchedule } from "../../actions/calendarActions";
import { filterSingleScheduleDates } from "../../utils/helper";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      starts_at: moment().toDate(),
      ends_at: moment().toDate(),
      description: "",
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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const schedule = {
      title: this.state.title,
      starts_at: this.state.starts_at,
      ends_at: this.state.ends_at,
      description: this.state.description
    };
    this.props.updateSchedule(
      this.props.match.params.id,
      schedule,
      this.props.history
    );
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getSchedule(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.calendar && nextProps.calendar.schedule) {
      const schedule = filterSingleScheduleDates(nextProps.calendar.schedule);

      this.setState({
        title: schedule.title,
        description: schedule.description,
        starts_at: schedule.starts_at,
        start: schedule.start,
        ends_at: schedule.ends_at,
        end: schedule.end
      });
    }
  }

  render() {
    const { starts_at, ends_at, errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <form onSubmit={this.onSubmit} noValidate>
              <TextFieldGroup
                placeholder="Title"
                name="title"
                type="text"
                value={this.state.title}
                onChange={this.onChange}
                error={errors.title}
              />
              <div className="row">
                <div className="col">
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
                <div className="col">
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
              <TextAreaFieldGroup
                placeholder="Write a short description"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
              />

              <div className="row">
                <div className="col">
                  <Button className="btn btn-danger" onClick={this.deleteEvent}>
                    Delete
                  </Button>
                </div>
                <div className="col text-right">
                  <Button className="btn btn-primary" type="submit">
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <Invitation />
        </div>
      </div>
    );
  }
}

Event.propTypes = {
  errors: PropTypes.object.isRequired,
  calendar: PropTypes.object.isRequired,
  getSchedule: PropTypes.func.isRequired,
  updateSchedule: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  calendar: state.calendar,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getSchedule, updateSchedule }
)(withRouter(Event));
