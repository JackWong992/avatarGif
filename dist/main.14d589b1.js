// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"main.js":[function(require,module,exports) {
var canvas = new fabric.Canvas("iAvatar", {
  preserveObjectStacking: true
});
canvas.backgroundColor = "rgba(255,255,255,1)";
fabric.Image.fromURL("./img/avatar.png", function (oImg) {
  canvas.insertAt(oImg, 0);
}); //设置外卖头盔图层的位置为最下面


//双击图片显示粘贴
function eventit() {
  $(canvas.getObjects()).each(function (t, e) {
    e.on("mousedblclick", function (t) {
      var e = t.target;
      console.log(e.type);
      canvas.bringToFront(e);
      canvas.discardActiveObject();
      canvas.renderAll();
    });
  });
}
//图片的颜色改变
function control_init() {
  var t = canvas.getObjects();
  $(t).each(function (t, e) {
    e.set({
      cornerSize: 15,
      padding: 5,
      transparentCorners: !0,
      cornerStyle: "circle",
      cornerColor: "#CD853F",
      borderColor: "#CD853F"
    });
  });
}

//设置头盔上面图片的位置信息
fabric.Image.fromURL("./img/python.png", function (oImg) {
  canvas.insertAt(oImg, 1);
  oImg.set("top", 91);
  oImg.set("left", 98);
  oImg.set("angle", 320);
  oImg.set("scaleX", 0.3);
  oImg.set("scaleY", 0.3);
  oImg.set({
    cornerSize: 15,
    padding: 5,
    transparentCorners: true,
    CornerStyle: "circle",
    cornerColor: "#CD853F",
    borderColor: "#CD853F"
  });
});
//设置文字旋转
var text = new fabric.Text("人生苦短，我用python", {
  top: 182,
  left: 145,
  angle: 321,
  scaleX: 0.4,
  scaleY: 0.38
});
text.set("fill", "white");
text.set({
  cornerSize: 15,
  padding: 5,
  transparentCorners: true,
  CornerStyle: "circle",
  cornerColor: "#CD853F",
  borderColor: "#CD853F"
});
canvas.insertAt(text, 2);

$("#downloadPic").on("click", function () {
  download(canvas.toDataURL("png"), "avatar.png", "image/png");
});

//旋转图片  获取图片得坐标
$("#debug").on("click", function () {
  var obj = canvas.getActiveObject(); //获取选中的素材
  console.log("top=" + obj.top);
  console.log("left=" + obj.left);
  console.log("angle=" + obj.angle);
  console.log("scaleX=" + obj.scaleX);
  console.log("scaleY=" + obj.scaleY);
});
$(function () {
  var listener = new window.keypress.Listener();

  //点击delete按钮实现删除图片
  listener.simple_combo("delete", function () {
    var obj = canvas.getActiveObject();
    if (obj) {
      canvas.remove(obj);
    }
  });
  //点击[ 向左平移图片
  listener.simple_combo("[", function () {
    var obj = canvas.getActiveObject();
    if (obj) {
      canvas.bringForward(obj);
    }
  });
  //点击]向右平移图片
  listener.simple_combo("]", function () {
    var obj = canvas.getActiveObject();
    if (obj) {
      canvas.sendBackwards(obj);
    }
  });
  text_init();
});

//文字打印
function text_init() {
  $(canvas.getObjects()).each(function (index, item) {
    if (item.type == "text") {
      item.on("selected", function () {
        $("#userText").val(item.text);
        $("#userText").prop("disabled", false);
      });
    }
  });
}
//修改输入文本，改变头像文字:输入框增加onchange事件
$("#userText").on("change", function () {
  var newText = $("#userText").val();
  console.log(newText);
  if (newText.length > 0) {
    var obj = canvas.getActiveObject();
    if (obj && obj.type == "text") {
      obj.set("text", newText);
      canvas.renderAll();
    }
  }
});

$("#pic_add").on("click", function () {
  var data_url = canvas.toDataURL("png");
  var li = $("<li><img  src='" + data_url + "'></li>");
  $(".image-list").append(li);
});
$("#pic_build").on("click", function () {
  var gif = new GIF({
    workers: 2,
    quality: 10,
    width: 460,
    height: 460
  });
  $(".image-list li img").each(function (index, item) {
    gif.addFrame(item, { delay: 1000 });
  });

  gif.on("finished", function (blob) {
    download(blob), "avatar.gif", "image/gif";
  });
  gif.render();
});

//双击图片加入头像制作区
$(function () {
  $(".image-list").on("dblclick", "li", function () {
    $(this).remove();
  }), $(".bg-list>li img").on("dblclick", function () {
    fabric.Image.fromURL(this.src, function (t) {
      canvas.add(t);
      eventit();
      control_init();
    });
  });
  //  clipboard_init()
  //key_init()
});
},{}],"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '54341' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.14d589b1.map