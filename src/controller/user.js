const Base = require('./base.js');
const request = require('request');

module.exports = class extends Base {
  async loginAction() {
    const openId = this.get('openId');
    const userInfo = JSON.parse(this.get('userInfo'));
    let user = await this.mongo('user').where({openId}).select();
    if (user.length === 0) {
      console.log('新用户', userInfo.nickName, openId, '注册');
      await this.mongo('user').add({openId, userInfo});
      user = await this.mongo('user').where({openId}).select();
    } else {
      console.log('用户', userInfo.nickName, openId, '登录');
      const num = await this.mongo('user').where({openId}).update({userInfo});
      if (num) {
        console.log(num, '并更新了用户信息', userInfo);
      }
      user = await this.mongo('user').where({openId}).select();
    }
    return this.json(user);
  };
  async getOpenIdAction() {
    const APPID = 'wx27628cb0fc846df1';
    const SECRET = 'ec242aedd2c092065d15d31d9d17b1b4';
    const code = this.get('code');
    var test = await new Promise(function(resolve, reject) {
      request({
        url: `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`,
        method: 'GET'
      }, function(err, res, body) {
        if (err) {
          console.log('getOpenId访问微信api出错', err);
          reject(this.json({err: err, status: 'error'}));
        } else {
          resolve({openId: JSON.parse(body).openid, status: 'success'});
        }
      });
    });
    return this.json(test);
  };
  async getContactAction() {
    console.log();
  };
  async getUserInfoAction() {
    console.log();
  };
};
