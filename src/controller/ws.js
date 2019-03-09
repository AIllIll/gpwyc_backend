const Base = require('./base.js');
var wsList = [];
module.exports = class extends Base {
  async openAction() {
    const openId = this.header('openid');
    this.emit('joined', 'There is a new client joined successfully!');
    wsList.push({openId: openId, ws: this});
    console.log(wsList);
    // await this.mongo('wsList').add({ws: this});
    return this.success();
  }
  closeAction() {
    console.log('ws close');
    return this.success();
  }
  async addUserAction() {
    console.log('addUserAction ...');
    this.emit('send', 'addUser');
    // console.log(this.wsData.event); // this.req.websocketData, 'thinkjs'
    // console.log(this.websocket); // this.req.websocket, websocket instance
    // console.log(this.isWebsocket); // this.isMethod('WEBSOCKET'), true
    // const ws = wsList[0];
    /* for (var i in wsList) {
      try {
        wsList[i].ws.emit(i);
      } catch (err) {
        console.log(i, '发送失败la', err);
      }
    }; */
    return this.success();
  }
  async errorAction() {
    console.log('error la');
  }
};
