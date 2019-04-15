import React, { Component } from "react";
import ReactNotification from "react-notifications-component";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ActionCableConsumer } from "react-actioncable-provider";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.notificationDOMRef = React.createRef();

    this.handleReceived = this.handleReceived.bind(this);
    this.state = {
      display: false,
      message: "",
      type: "info"
    };
  }

  handleReceived(message) {
    console.log("i rea ceived some message loud anc dlear", message);
    this.setState({ message: message });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notification) {
      this.setState({
        message: nextProps.notification.message,
        display: nextProps.notification.display,
        type: nextProps.notification.type
      });
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
    const { isAuthenticated } = this.props.auth;
    let actionCableContent = (
      <ReactNotification ref={this.notificationDOMRef} />
    );
    if (isAuthenticated) {
      actionCableContent = (
        <ActionCableConsumer
          channel={{ channel: "ActivityChannel", id: this.props.auth.user.id }}
          onReceived={this.handleReceived}
        >
          <ReactNotification ref={this.notificationDOMRef} />
        </ActionCableConsumer>
      );
    }
    return <div>{actionCableContent}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  notification: state.notification
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(Notification));
