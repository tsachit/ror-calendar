import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import Scheduler from "./Scheduler";
import { createSchedule, getSchedules } from "../../actions/calendarActions";
import moment from "moment";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timegridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { datetimeSaveFormat } from "../../utils/helper";

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
      selectedDate: moment().toDate()
    };
    this.addEvent = this.addEvent.bind(this);
  }

  handleDateClick = arg => {
    this.setState({
      showScheduleCreator: true,
      selectedDate: moment(arg.date).toDate()
    });
  };

  addEvent = schedule => {
    const { calendarEvents } = this.state;
    calendarEvents.push({
      // creates a new array
      title: schedule.title,
      start: schedule.starts_at,
      end: schedule.ends_at
    });
    this.setState({ calendarEvents, showScheduleCreator: false });
  };

  componentDidMount() {
    this.props.getSchedules();
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps.calendar &&
      newProps.calendar.schedules &&
      Object.keys(newProps.calendar.schedules).length > 0
    ) {
      newProps.calendar.schedules.forEach((calendarSchedule, index) => {
        // start date conversion
        calendarSchedule["start"] = moment(calendarSchedule.starts_at).toDate();
        delete calendarSchedule.starts_at;
        // end date conversion
        calendarSchedule["end"] = moment(calendarSchedule.ends_at).toDate();
        delete calendarSchedule.ends_at;
        return calendarSchedule[index];
      });
      this.setState({ calendarEvents: newProps.calendar.schedules });
    }
  }

  render() {
    const { showScheduleCreator, selectedDate } = this.state;
    const { schedules, loading } = this.props.calendar;
    let calendarContent = <Spinner />;
    if (schedules !== null && !loading) {
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
