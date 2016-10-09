const WebNotifications = {
  subscribe(received) {
    this.unsubscribe();
    window.App.WebNotificationsSubscription = window.App.cable.subscriptions.create({
      channel: "WebNotificationsChannel",
    }, {
      received: received
    });
  },

  unsubscribe() {
    if (window.WebNotificationsSubscription === undefined) {
      return false;
    }

    window.App.cable.subscriptions.remove(window.App.WebNotificationsSubscription);
    delete window.App.WebNotificationsSubscription
  }
}

export default WebNotifications
