module.exports = class extends think.Logic {
  loginAction() {
    this.allowMethods = 'get';
    // this.allowMethods = 'post'; //  只允许 POST 请求类型
  }
};
