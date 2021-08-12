/** effects with cleanup */
class ChatApi {

  static truthIntervals = {}
  static statuses = {};


/*
 * when needed, generate the ground truth
 *
 * also needs an interval
 */


  static subscriptionIntervals = {}

/*
 * observe here, 
 *
 * using another intervals,
 *
 * an id can have serverl intervals.
 *
 *
 */



  static subscribeToFriendStatus(id, callback) {
    if (!(id in this.intervals)) {
      this.intervals[id] = setInterval(() => {
        this.statuses[id] = { isOnline: Math.random() < 0.5 };
      }, 1000);
    }
    /*
     *  this api is wrong.
     *
     *  update ground truth (randomly)
     *
     *  nothing to do with the subscription
     *
     */


    callback(this.statuses[id]);

    console.log(`friend ${id} status subscribed`);
  }
  static unsubscribeFromFriendStatus(id, callback) {
    if (this.intervals[id]) {
      clearInterval(this.intervals[id])
    }
    callback(this.statuses[id])
    console.log(`friend ${id} status unsubscribed`);
  }
}

export { ChatApi };
