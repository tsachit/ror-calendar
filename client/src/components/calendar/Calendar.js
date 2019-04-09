import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import Scheduler from "./Scheduler";

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
      showScheduleCreator: false,
      selectedDate: new Date()
    };
  }

  // calendarComponentRef = React.createRef();

  // state = {
  //   calendarWeekends: true,
  //   calendarEvents: [
  //     // initial event data
  //     { title: "Event Now", start: new Date() }
  //   ]
  // };

  handleDateClick = arg => {
    this.setState({
      showScheduleCreator: true,
      selectedDate: new Date(arg.date)
    });
  };

  render() {
    const { showScheduleCreator, selectedDate } = this.state;
    return (
      <div className="calendar">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
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
                // events={this.state.calendarEvents}
                dateClick={this.handleDateClick}
              />
              {/* <div id="calendar" /> */}
            </div>
          </div>
        </div>
        <Scheduler
          showScheduleCreator={showScheduleCreator}
          selectedDate={selectedDate}
        />
      </div>
    );
  }
}

// Calendar.propTypes = {
//   showScheduleCreator: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  showScheduleCreator: state.showScheduleCreator,
  selectedDate: state.selectedDate
});

export default connect(
  mapStateToProps,
  {}
)(Calendar);
