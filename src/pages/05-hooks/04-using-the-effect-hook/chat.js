class ChatApi {
  static intervals = {};
  static statuses = {};
  static subscribeToFriendStatus(id, callback) {
    if (id in this.intervals) {
      console.log('Error!');
      return;
    }
    this.intervals[id] = setInterval(() => {
      this.statuses[id] = { isOnline: Math.random() < 0.5 };
      callback(this.statuses[id]);
    }, 1000);
    console.log(`Friend ${id} status is subscribed.`);
  }
  static unsubscribeFromFriendStatus(id, callback) {
    if (this.intervals[id]) {
      clearInterval(this.intervals[id]);
      delete this.intervals[id]
    }
    callback(this.statuses[id]);
    console.log(`Friend ${id} status is unsubscribed.`);
  }
}

export { ChatApi };
