import React, { Component } from "react";
import ReactNotification from "react-notifications-component";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.notificationDOMRef = React.createRef();

    const notification = {
      display: false,
      message: "",
      type: "info"
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notification) {
      this.setState({ notification: nextProps.notification });
    }

    if (nextProps.notification.display) {
      this.notificationDOMRef.current.addNotification({
        message: nextProps.notification.message,
        type: nextProps.notification.type,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: { duration: 2000 },
        dismissable: { click: true }
      });
    }
  }

  render() {
    return (
      <div>
        <ReactNotification ref={this.notificationDOMRef} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notification: state.notification
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(Notification));
