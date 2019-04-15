import React, { Component } from "react";
import ReactNotification from "react-notifications-component";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ActionCableConsumer } from "react-actioncable-provider";
import { sendPushNotificationMessage } from "../../actions/authActions";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.notificationDOMRef = React.createRef();

    this.handleReceived = this.handleReceived.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.state = {
      display: false,
      message: "",
      type: "info"
    };
  }

  handleReceived(message) {
    this.setState({ display: true, message: message, type: "success" });
    this.props.sendPushNotificationMessage(message);
  }

  addNotification(notification) {
    if (notification.display) {
      this.notificationDOMRef.current.addNotification({
        message: notification.message,
        type: notification.type,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: { duration: 2000 },
        dismissable: { click: true }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notification) {
      this.setState({
        message: nextProps.notification.message,
        display: nextProps.notification.display,
        type: nextProps.notification.type
      });
    }

    this.addNotification(nextProps.notification);
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    let actionCableContent = "";
    if (isAuthenticated) {
      actionCableContent = (
        <ActionCableConsumer
          channel={{ channel: "ActivityChannel", id: this.props.auth.user.id }}
          onReceived={this.handleReceived}
        />
      );
    }
    return (
      <div>
        {actionCableContent}
        <ReactNotification ref={this.notificationDOMRef} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  notification: state.notification
});

export default connect(
  mapStateToProps,
  { sendPushNotificationMessage }
)(withRouter(Notification));
