import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import Scheduler from "./Scheduler";
import { createSchedule, getSchedules } from "../../actions/calendarActions";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timegridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// must manually import the stylesheets for each plugin
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      calendarEvents: [],
      showScheduleCreator: false,
      selectedDate: new Date()
    };
    this.addEvent = this.addEvent.bind(this);
  }

  handleDateClick = arg => {
    this.setState({
      showScheduleCreator: true,
      selectedDate: new Date(arg.date)
    });
  };

  addEvent = newSchedule => {
    const { calendarEvents } = this.state;
    calendarEvents.push({
      // creates a new array
      title: newSchedule.title,
      start: newSchedule.startDateTime,
      end: newSchedule.endDateTime
    });
    this.setState({ calendarEvents, showScheduleCreator: false });
  };

  componentDidMount() {
    this.props.getSchedules();
  }

  render() {
    const { showScheduleCreator, selectedDate } = this.state;
    const { schedules, loading } = this.props.calendar;

    let calendarContent = <Spinner />;
    if (schedules === null || loading || Object.keys(schedules).length === 0) {
      calendarContent = (
        <FullCalendar
          themeSystem="bootstrap4"
          defaultView="dayGridMonth"
          header={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          plugins={[dayGridPlugin, timegridPlugin, interactionPlugin]}
          // ref={this.calendarComponentRef}
          // weekends={this.state.calendarWeekends}
          events={this.state.calendarEvents}
          dateClick={this.handleDateClick}
        />
      );
    }

    return (
      <div className="calendar">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{calendarContent}</div>
          </div>
        </div>
        <Scheduler
          addEvent={this.addEvent}
          showScheduleCreator={showScheduleCreator}
          selectedDate={selectedDate}
        />
      </div>
    );
  }
}

Calendar.propTypes = {
  // showScheduleCreator: PropTypes.object.isRequired,
  getSchedules: PropTypes.func.isRequired,
  createSchedule: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  calendar: state.calendar
});

export default connect(
  mapStateToProps,
  { createSchedule, getSchedules }
)(Calendar);
