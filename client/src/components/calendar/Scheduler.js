import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
// import { createSchedule } from "../../actions/authActions";

class Scheduler extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="modal" id="scheduler">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Schedule</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={this.onSubmit} noValidate>
                <TextFieldGroup
                  placeholder="Title"
                  name="title"
                  type="text"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <div
                        class="input-group date"
                        id="datetimepickerStart"
                        data-target-input="nearest"
                      >
                        <input
                          placeholder="Start DateTime"
                          type="text"
                          class="form-control datetimepicker-input"
                          data-target="#datetimepickerStart"
                        />
                        <div
                          class="input-group-append"
                          data-target="#datetimepickerStart"
                          data-toggle="datetimepicker"
                        >
                          <div class="input-group-text">
                            <i class="fa fa-calendar" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <div
                        class="input-group date"
                        id="datetimepickerEnd"
                        data-target-input="nearest"
                      >
                        <input
                          placeholder="End DateTime"
                          type="text"
                          class="form-control datetimepicker-input"
                          data-target="#datetimepickerEnd"
                        />
                        <div
                          class="input-group-append"
                          data-target="#datetimepickerEnd"
                          data-toggle="datetimepicker"
                        >
                          <div class="input-group-text">
                            <i class="fa fa-calendar" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Scheduler.propTypes = {
  // loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    /**loginUser**/
  }
)(withRouter(Scheduler));
