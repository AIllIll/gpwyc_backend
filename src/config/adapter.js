const fileCache = require('think-cache-file');
const nunjucks = require('think-view-nunjucks');
const fileSession = require('think-session-file');
// const mysql = require('think-model-mysql');
const {Console, File, DateFile} = require('think-logger3');
const path = require('path');
const isDev = think.env === 'development';
// const socketio = require('think-websocket-socket.io');
const ws = require('think-websocket-ws');
/**
 * cache adapter config
 * @type {Object}
 */
exports.cache = {
  type: 'file',
  common: {
    timeout: 24 * 60 * 60 * 1000 // millisecond
  },
  file: {
    handle: fileCache,
    cachePath: path.join(think.ROOT_PATH, 'runtime/cache'), // absoulte path is necessarily required
    pathDepth: 1,
    gcInterval: 24 * 60 * 60 * 1000 // gc interval
  }
};

/**
 * model adapter config
 * @type {Object}
 */
exports.model = {
  type: 'mongo', // 默认使用的类型，调用时可以指定参数切换
  common: { // 通用配置
    logConnect: isDev, // 是否打印数据库连接信息
    logger: msg => think.logger.info(msg) // 打印信息的 logger
  },
  mongo: {
    prefix: 'think_',
    host: '127.0.0.1',
    port: 27017,
    user: 'wyc',
    password: 'gpwyc',
    database: 'gpwyc', // 数据库名称
    encoding: 'utf8'
  }
};
/* exports.model = {
  type: 'mysql',
  common: {
    logConnect: isDev,
    logSql: isDev,
    logger: msg => think.logger.info(msg)
  },
  mysql: {
    handle: mysql,
    database: '',
    prefix: 'think_',
    encoding: 'utf8',
    host: '127.0.0.1',
    port: '',
    user: 'root',
    password: 'root',
    dateStrings: true
  }
}; */

/**
 * session adapter config
 * @type {Object}
 */
exports.session = {
  type: 'file',
  common: {
    cookie: {
      name: 'thinkjs'
      // keys: ['werwer', 'werwer'],
      // signed: true
    }
  },
  file: {
    handle: fileSession,
    sessionPath: path.join(think.ROOT_PATH, 'runtime/session')
  }
};

/**
 * view adapter config
 * @type {Object}
 */
exports.view = {
  type: 'nunjucks',
  common: {
    viewPath: path.join(think.ROOT_PATH, 'view'),
    sep: '_',
    extname: '.html'
  },
  nunjucks: {
    handle: nunjucks
  }
};

/**
 * logger adapter config
 * @type {Object}
 */
exports.logger = {
  type: isDev ? 'console' : 'dateFile',
  console: {
    handle: Console
  },
  file: {
    handle: File,
    backups: 10, // max chunk number
    absolute: true,
    maxLogSize: 50 * 1024, // 50M
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  },
  dateFile: {
    handle: DateFile,
    level: 'ALL',
    absolute: true,
    pattern: '-yyyy-MM-dd',
    alwaysIncludePattern: true,
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  }
};

/**
 * websocket adapter config
 * @type {Object}
 */
exports.websocket = {
  type: 'ws',
  common: {
    // common config
  },
  ws: {
    handle: ws,
    // allowOrigin: '127.0.0.1:8360', // 默认所有的域名都允许访问
    path: '/ws', // 默认 '/socket.io'
    // adapter: null, // 默认无 adapter
    messages: {
      open: '/ws/open',
      close: '/ws/close',
      addUser: '/ws/addUser',
      error: '/ws/error'
    }
  }
};
