/**
 * created by liu
 * https://www.123465.plus;
 * 基于 rrweb二次开发的项目。地址： https://github.com/rrweb-io/rrweb 
 * 后端基于nodejs 地址：https://github.com/asdjgfr/operationRecord
 */
//Record类
class Record {
  constructor(options) {
    this.url = options.url;
    this.projectName = options.projectName;
    this.isReport = options.isReport || 0;
    this.name = options.name || 'unknow';
    this.interval = options.interval || 10000;
    this.ajaxFn = options.ajax || axios;
    options.msg.length >= 255 ? options.msg = options.msg.substring(0, 255) : '';
    this.msg = options.msg || '';
    this.success = options.success || function () { };
    this.error = options.error || function () { };
    this.interval = options.interval || 10000;
    this.events = [];
    this.create = this.create.bind(this);
    this.ajax = this.ajax.bind(this);
    this.destroy = this.destroy.bind(this);
    this.timeOutFn = this.timeOutFn.bind(this);
    this.timeOut = null;
    this.create();
    this.timeOutFn();
    options.commitBug === undefined ? options.commitBug = true : '';
    if (options.commitBug) {
      this.bugBtn();
    };
  }
  bugBtn() {
    const btn = document.createElement('div');
    btn.innerText = '提交';
    btn.title = '点击提交bug';
    btn.setAttribute('class', 'bug-commit-btn');
    const styles = {
      'width': '40px',
      'height': '40px',
      'fontSize': '12px',
      'borderRadius': '50%',
      'cursor': 'pointer',
      'border': '1px solid #666',
      'textAlign': 'center',
      'lineHeight': '40px',
      'position': 'fixed',
      'right': '20px',
      'bottom': '20px',
    };
    for (const key in styles) {
      btn.style[key] = styles[key];
    };
    document.body.appendChild(btn);
    const that = this;
    btn.addEventListener('click', function (params) {
      const msg = prompt('请言输入bug上报原因，最多255个字符。多余字符将被截取不会提交。');
      that.isReport = 1;
      if (msg !== null) {
        msg.length > 255 ? that.msg = msg.substring(0, 255) : that.msg = msg;
        that.ajax();
      };
    });
  }
  timeOutFn() {
    if (this.timeOut !== null) {
      clearTimeout(this.timeOut);
      this.ajax();
    };
    this.timeOut = setTimeout(() => {
      this.timeOutFn();
    }, this.interval);
  }
  create() {
    const that = this;
    this.rrewb = rrweb.record({
      emit(event) {
        // 将 event 存入 events 数组中
        that.events.push(event);
      },
    });
  }
  ajax() {
    this.ajaxFn.post(this.url, {
      data: JSON.stringify(this.events),
      table: this.projectName,
      name: this.name,
      msg: this.msg,
      isReport: this.isReport,
    }).then((res) => {
      this.success(res);
    }).catch((err) => {
      this.error(err);
    });
  }
  destroy() {
    this.rrewb();
  }
};
