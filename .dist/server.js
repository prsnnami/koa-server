'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _src = require('./src');

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();

app.use(function (ctx) {
  ctx.body = _src2.default;
});

app.listen(3000);