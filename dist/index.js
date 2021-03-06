'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    let sync, scripts, roots, version;

    roots = ['./views'];
    sync = _browserSync2.default.create();
    version = require('browser-sync/package').version;

    sync.init({
        ui: false,
        logSnippet: false
    });

    roots = roots.map(root => {
        return (0, _path.normalize)((0, _path.resolve)(root));
    });

    scripts = ['<script type="text/javascript" id="__bs_script__">', 'document.write("<script async src=\'http://HOST:3000/browser-sync/browser-sync-client.' + version + '.js\'><\\/script>".replace("HOST", location.hostname));', '</script>', '</body>'].join('');

    _chokidar2.default.watch(roots, {
        ignored: /[\/\\]\./
    }).on('all', (event, path) => {
        if (event === 'change') {
            sync.reload();
        }
    });

    return function* (next) {
        yield next;

        if (~this.type.indexOf('html') && this.body) {
            this.body = ('' + this.body).replace('</body>', scripts);
        }
    };
};

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }