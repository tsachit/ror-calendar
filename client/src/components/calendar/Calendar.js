import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import Scheduler from "./Scheduler";
import ViewSchedule from "./ViewSchedule";
import { getSchedules, getSchedule } from "../../actions/calendarActions";
import moment from "moment";
import { filterSingleScheduleDates } from "../../utils/helper";

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
      showScheduleViewer: false,
      selectedDate: moment().toDate(),
      selectedSchedule: null
    };
    this.addEvent = this.addEvent.bind(this);
  }

  handleDateClick = arg => {
    this.setState({
      showScheduleCreator: true,
      showScheduleViewer: false,
      selectedDate: moment(arg.date).toDate()
    });
  };

  handleEventClick = arg => {
    this.setState({
      showScheduleCreator: false,
      showScheduleViewer: true,
      selectedSchedule: arg.event.id
    });

    this.props.getSchedule(arg.event.id);
  };

  addEvent = schedule => {
    const { calendarEvents } = this.state;
    calendarEvents.push(filterSingleScheduleDates(schedule));
    this.setState({ calendarEvents });
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
        calendarSchedule = filterSingleScheduleDates(calendarSchedule);
      });
      this.setState({ calendarEvents: newProps.calendar.schedules });
    }
  }

  render() {
    const {
      showScheduleCreator,
      showScheduleViewer,
      selectedDate,
      selectedSchedule
    } = this.state;
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
          editable={true}
          eventClick={this.handleEventClick}
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
        <ViewSchedule
          showScheduleViewer={showScheduleViewer}
          selectedSchedule={selectedSchedule}
        />
      </div>
    );
  }
}

Calendar.propTypes = {
  getSchedules: PropTypes.func.isRequired,
  getSchedule: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  calendar: state.calendar
});

export default connect(
  mapStateToProps,
  { getSchedules, getSchedule }
)(Calendar);
