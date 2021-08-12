/** effects with cleanup */
class ChatApi {
  static intervals = {};
  static statuses = {};
  static subscribeToFriendStatus(id, callback) {
    const intervalId = setInterval(() => {
      const status = { isOnline: Math.random() < 0.5 };
      this.statuses[id] = status;
      callback(status);
    }, 1000);
    this.intervals[id] = intervalId;
    console.log(`friend ${id} status subscribed`);
  }
  static unsubscribeFromFriendStatus(id, callback) {
    const intervalId = this.intervals[id];
    if (!intervalId) {
      console.log(`friend ${id} status unsubscribed`);
      return;
    }
    clearInterval(intervalId);
    callback(this.statuses[id]);
    console.log(`friend ${id} status unsubscribed`);
  }
}

export { ChatApi };
