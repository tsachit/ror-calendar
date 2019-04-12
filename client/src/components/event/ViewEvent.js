import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import Dialog from "react-bootstrap-dialog";
import { getScheduleFromToken } from "../../actions/calendarActions";
import { filterSingleScheduleDates } from "../../utils/helper";
import moment from "moment";
import { scheduleDate } from "../../utils/helper";

class ViewEvent extends Component {
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

  openConfirmationModal = () => {
    this.dialog.show({
      title: "Confirm Delete",
      body:
        "Are you sure you want to reject this invitation? You can only see this event but you won't be able to change your answer.",
      actions: [
        Dialog.DefaultAction(
          "Hell No!",
          () => {},
          "btn-default btn-outline-secondary"
        ),
        Dialog.DefaultAction(
          "Yes, absolutely!",
          () => {
            this.props.deleteSchedule(
              this.props.match.params.id,
              this.props.history
            );
          },
          "btn-primary"
        )
      ],
      bsSize: "small",
      onHide: dialog => {
        dialog.hide();
      }
    });
  };

  componentDidMount() {
    if (this.props.match.params.token) {
      this.props.getScheduleFromToken(
        this.props.match.params.token,
        this.props.history
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    // checking if schedule is empty object
    if (nextProps.calendar && Object.keys(nextProps.calendar.schedule).length) {
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
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-primary">{this.state.title}</h5>
                <small>
                  Duration:{" "}
                  <i>
                    {scheduleDate(this.state.starts_at)} -{" "}
                    {scheduleDate(this.state.ends_at)}
                  </i>
                </small>
                <p className="card-text">{this.state.description}</p>
                <form onSubmit={this.onSubmit} noValidate>
                  <div className="row">
                    <div className="col">
                      <Button
                        className="btn btn-danger"
                        onClick={this.openConfirmationModal}
                      >
                        Reject
                      </Button>
                    </div>
                    <div className="col text-right">
                      <Button className="btn btn-primary" type="submit">
                        Accept
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* {starts_at} - {ends_at} */}
            <Dialog
              ref={el => {
                this.dialog = el;
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

ViewEvent.propTypes = {
  errors: PropTypes.object.isRequired,
  calendar: PropTypes.object.isRequired,
  getScheduleFromToken: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  calendar: state.calendar,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getScheduleFromToken }
)(withRouter(ViewEvent));
