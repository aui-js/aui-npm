/*global module define*/
/*eslint-disable no-unused-vars */

'use strict';
var aui = new Object();

!(function(document, window, undefined) {
   aui = {
      /***对象合并(可实现多层对象深度合并)
         @param {Object} opts 原始参数
         @param {Object} opt 新参数
         @param {bool} override 是否合并重置
         @example: aui.extend('原始参数', '新参数', true);
       */
      extend: function(opts, opt, override) {
         var _this = this;
         for(var p in opt) {
            try {
               // Property in destination object set; update its value.
               if(opt[p].constructor == Object) {
                  opts[p] = _this.extend(opts[p], opt[p]);
               } else {
                  opts[p] = opt[p];
               }
            } 
            catch(e) {
               // Property in destination object not set; create it and set its value.
               opts[p] = opt[p];
            }
         }
         return opts;
      },
      
      /***判断字符串是否为空
         @param {string} str 变量
         @example: aui.isDefine(str);
      */
      isDefine: function(str) {
         if(str == null 
            || str == '' 
            || str == 'undefined' 
            || str == undefined 
            || str == 'null' 
            || str == '(null)' 
            || str == 'NULL' 
            || typeof (str) == 'undefined'
         ) {
            return false;
         }
         else {
            str = str + '';
            str = str.replace(/\s/g, '');
            
            if(str == '') {return false;}
            
            return true;
         }
      },
      
      /***去除字符串中空格
         @param {string} str 字符串
         @param {Boolean} flag [false: 去除前后空格 | true: 去除全部空格]
         @example: aui.space(str, true);
      */
      space: function(str, flag) {
         var result;
         result = str.replace(/(^\s+)|(\s+$)/g, '');
         //flag==false -->去除前后空格；flag==true -->去除全部空格
         if(flag) {
            result = result.replace(/\s/g, '');
         }
         
         return result;
      },
      
      /***删除字符串中指定字符
         @param {string} str 字符串
         @param {string} assignStr 指定字符
         @example: aui.replaceStr(str, 'xxx');
      */
      replaceStr: function(str, assignStr) {
         return str.replace(assignStr, '');
      },
      
      /***数组去重
         @param {array} array 要去重的数组
         @example: aui.uniq([1, 2, 2, 2, 3]);
      */
      uniq: function(array) {
         var temp = []; //一个新的临时数组
         
         for(var i = 0; i < array.length; i++) {
            if(temp.indexOf(array[i]) == -1) {
               temp.push(array[i]);
            }
         }
         
         return temp;
      },
      
      /***截取URL中字符串(可获取中文内容)
         aui.getUrlstr('id');
      */
      getUrlstr: function(str) {
         var reg = new RegExp('(^|&)' + str + '=([^&]*)(&|$)', 'i');
         var r = window.location.search.substr(1).match(reg);
         if(r != null) return decodeURI(r[2]); return null;
      },
      
      /***生成随机数
         @param {number} Min 最小数
         @param {number} Max 最大数
         @example: aui.random(0, 10);
      */
      random: function(Min, Max) {
         var Range = Max - Min;
         var Rand = Math.random();
         
         if(Math.round(Rand * Range) == 0) 
         {
            return Min + 1;
         }
         else if(Math.round(Rand * Max) == Max)
         {
            return Max - 1;
         }
         else
         {
            var num = Min + Math.round(Rand * Range) - 1;
            return num;
         }
      },
      
      /***复制到剪切板
         @param {string} str 要复制的文本
         @example: aui.copy('4312421421');
      */
      copy: function(str) {
         var save = function(e) {
            e.clipboardData.setData('text/plain', str);//clipboardData对象
            e.preventDefault();//阻止默认行为
         };
         
         document.addEventListener('copy', save);
         return document.execCommand('copy');//使文档处于可编辑状态，否则无效
      },
      
      /***验证是否是开发者
         @param {bool} isDeveloper true | false 是否是开发者
         @example: aui.checkIsDeveloper(false);
      */
      checkIsDeveloper: function(isDeveloper) {
         if(!isDeveloper)
         { //不是开发者  关闭打开控制台权限
            window.document.oncontextmenu = function() {
               return false;	
            };
            
            document.oncontextmenu = new Function('event.returnValue=false');
            document.onselectstart = new Function('event.returnValue=false');
            
            document.onkeydown = document.onkeyup = document.onkeypress = function(event) {
               var e = event || window.event || arguments.callee.caller.arguments[0];
               if(e && e.keyCode == 123) {
                  e.returnValue = false;
                  return (false);
               }
            };
         }
      },
   };
   
   // 将插件对象暴露给全局对象
   if(typeof module !== 'undefined' && typeof exports === 'object' && define.cmd) { module.exports = aui; } 
   else if(typeof define === 'function' && define.amd) { define(function() { return aui; }); } 
   else { window.aui = aui; }
})(document, window);

/***本地定时缓存（一段时间内有效）
    @example: aui.setLocal('items', items, 1*24*60*60); 缓存一天内有效
*/
!(function($, document, window, undefined) {
   $.setLocal = function(key, value, time) {
      try {
         if(!localStorage) {return false;}
         if(!time || isNaN(time)) {time=60;}
         
         var cacheExpireDate = (new Date() - 1) + time * 1000;
         var cacheVal = {data: value, exp: cacheExpireDate};
         localStorage.setItem(key, JSON.stringify(cacheVal));//存入缓存值
         //console.log(key+':存入缓存，'+new Date(cacheExpireDate)+'到期');
      }
      catch(e) {
         //console.log(e);
      }
   };
   
   /**获取缓存*/
   $.getLocal = function(key) {
      try {
         if(!localStorage) {return false;}
         
         var cacheVal = localStorage.getItem(key);
         var result = JSON.parse(cacheVal);
         var now = new Date()-1;
         
         if(!result) {return null;}//缓存不存在
         
         if(now>result.exp) {//缓存过期
            $.remove(key);
            return '';
         }
         //console.log('get cache:'+key);
         return result.data;
      }
      catch(e) {
         $.removeLocal(key);
         return null;
      }
   };
   
   /**移除缓存，一般情况不手动调用，缓存过期自动调用*/
   $.removeLocal = function(key) {
      if(!localStorage) {return false;}
      localStorage.removeItem(key);
   };
   
   /**清空所有缓存*/
   $.clearLocal = function() {
      if(!localStorage) {return false;}
      localStorage.clear();
   };
})(aui, document, window);

/***引入 js / css 文件
   @example: aui.import('js/aui.picker.js')
   @example: aui.import(['js/aui.picker.js', 'css/aui.picker.css'])
*/
!(function($, document, window, undefined) {
   $.import = function(url) {
      var _this = this;
      
      switch(url.constructor) {
         case Array:
            url.entries().map(function(item) {
               creat(item);
            });
            break;
         case String:
            creat(url);
            break;
         default:
            break;
      }
      
      function creat(file) {
         if(/^.+?\.js$/.test(file)) 
         { //JS文件引入
            var script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', file);
            document.querySelector('head').appendChild(script);
         }
         if(/^.+?\.css$/.test(file))
         { //CSS文件引入
            var css = document.createElement('link');
            css.rel = 'stylesheet';
            css.type = 'text/css';
            css.href = file;      
            document.querySelector('head').appendChild(css);   
         }
      }
   };
})(aui, document, window);

/***  loading 加载动画  */
!(function($, document, window, undefined) {
   var loading = new Object();
   loading = {
      opts: function(opt) {
         var opts = {
            warp: 'body', // --可选参数，父容器元素
            type: 1, //--可选参数，默认圆环风格(<1>、1:toast圆环风格，<2>、2:点击按钮后在按钮内显示加载动画) <3>、3:四方块水平方向旋转，
            msg: '', //--可选参数，描述内容
            mask: false, //--可选参数，是否显示遮罩，默认false
            direction: 'col', //--可选参数，横向("row")或纵向("col")控制，默认纵向
            theme: 1, //--可选参数，控制风格
            style: {
               bg: '', // --可选参数，.aui-loading-main背景色(rgba(0,0,0,.6))
               color: '', //--可选参数，文字颜色
               maskBg: '', //--可选参数，遮罩层背景色(rgba(0,0,0,.3))
               zIndex: '', //--可选参数，加载弹窗.aui-loading层级
            }
         };
         
         return $.extend(opts, opt, true);
      },
      creat: function(opt) { //创建
         var _this = this;
         var _opts = _this.opts(opt);
         var _html = '';
         switch(Number(_opts.type)) {
            case 1: //常用风格
               _html = '<div class="aui-loading aui-loading-ring">'
                  +'<div class="aui-mask"></div>'
                  +'<div class="aui-loading-main">'
                     +'<div class="aui-loading-animate">';
               for(var i = 0; i < 12; i++) {
                  _html += '<span class="span"></span>';
               }
               _html +=
                     '</div>'
                     +'<div class="aui-loading-msg">'+ _opts.msg +'<span class="dotting"></span></div>'
                  +'</div>'
               +'</div>';
               break;
            case 2: //点击按钮后在按钮内显示加载动画
               _html += '<div class="aui-loading aui-loading-button">'
                  +'<div class="aui-loading-main">'
                     +'<div class="aui-loading-animate">';
               for(var j = 0; j < 12; j++) {
                  _html += '<span class="span"></span>';
               }
               _html +=
                     '</div>'
                     +'<div class="aui-loading-msg">'+ _opts.msg +'</div>'
                  +'</div>'
               +'</div>';
               break;
            case 3: //四个方块旋转
               _html = '<div class="aui-loading aui-loading-squarefour">'
                  +'<div class="aui-mask"></div>'
                  +'<div class="aui-loading-main">'
                     +'<div class="aui-loading-animate"><span class="span1"></span><span class="span2"></span><span class="span3"></span><span class="span4"></span></div>'
                     +'<div class="aui-loading-msg">'+ _opts.msg +'<span class="dotting"></span></div>'
                  +'</div>'
               +'</div>';
               break;
            case 4: //圆点放大缩小动画(全屏首次加载过度动画)
               _html = '<div class="aui-loading aui-loading-dots">'
               +'<div class="aui-mask"></div>'
                  +'<div class="aui-loading-main">'
                     +'<div class="aui-loading-dot-items">'
                        +'<div class="aui-loading-dot-item" id="dot_one"></div>'
                        +'<div class="aui-loading-dot-item" id="dot_two"></div>'
                        +'<div class="aui-loading-dot-item" id="dot_three"></div>'
                     +'</div>'
                  +'</div>'
               +'</div>';
               break;
            case 5: //圆点背景过度动画-微信小程序效果(全屏首次加载过度动画)
               _html = '<div class="aui-loading aui-loading-dots-opacity">'
               +'<div class="aui-mask"></div>'
                  +'<div class="aui-loading-main">'
                     +'<div class="aui-loading-dot-items">'
                        +'<div class="aui-loading-dot-item" id="dot_one"></div>'
                        +'<div class="aui-loading-dot-item" id="dot_two"></div>'
                        +'<div class="aui-loading-dot-item" id="dot_three"></div>'
                     +'</div>'
                  +'</div>'
               +'</div>';
               break;
            default:
               break;
         }
         //if(document.querySelector(".aui-loading")) return;
         document.querySelector(_opts.warp).insertAdjacentHTML('beforeend', _html);
         var ui = {
            msg: document.querySelector('.aui-loading-msg'),
            mask: document.querySelector('.aui-loading .aui-mask'),
         };
         !$.isDefine(_opts.mask) && ui.mask ? ui.mask.parentNode.removeChild(ui.mask) : '';
         !$.isDefine(_opts.msg) && ui.msg ? ui.msg.parentNode.removeChild(ui.msg) : '';
         document.querySelector('.aui-mask,.aui-loading').addEventListener('touchmove', function(e) {
            e.preventDefault();
         });
         _this.css(opt);
      },
      css: function(opt) { //样式设置
         var _this = this;
         var _opts = _this.opts(opt);
         var ui = {
            warp: document.querySelector(_opts.warp),
            loading: document.querySelector('.aui-loading'),
            main: document.querySelector('.aui-loading-main'),
            button: document.querySelector('.aui-loading.aui-loading-button'),
            buttonMain: document.querySelector('.aui-loading.aui-loading-button .aui-loading-main'),
            ring: document.querySelector('.aui-loading.aui-loadig-ring'),
            ringMain: document.querySelector('.aui-loading.aui-loading-ring .aui-loading-main'),
            ringSpans: document.querySelector('.aui-loading.aui-loading-ring .span'),
            squarefour: document.querySelector('.aui-loading.aui-loading-squarefour'),
            squarefourMain: document.querySelector('.aui-loading.aui-loading-squarefour .aui-loading-main'),
            animate: document.querySelector('.aui-loading-animate'),
            msg: document.querySelector('.aui-loading-msg'),
            mask: document.querySelector('.aui-loading .aui-mask'),
            spans: document.querySelector('.aui-loading.aui-loading-button .span')
         };
         $.isDefine(_opts.style.bg) ? ui.main.style.background = _opts.style.bg : '';
         $.isDefine(_opts.style.color) && ui.msg ? ui.msg.style.color = _opts.style.color : '';
         $.isDefine(_opts.style.zIndex) ? ui.main.style.zIndex = _opts.style.zIndex : '';
         $.isDefine(_opts.style.maskBg) && ui.mask ? ui.mask.style.background = _opts.style.maskBg : '';
         switch(Number(_opts.type)) {
            case 1: //ring全屏布局加载动画
               $.isDefine(_opts.msg) ? ui.main.style.minWidth = ui.main.offsetHeight + 10 + 'px' : '';
               if(_opts.direction == 'row')
               { //水平布局样式设置
                  ui.main.style.cssText = 'width: auto; min-height: auto; padding: 10px 15px 9px 15px';
                  ui.ringMain.style.whiteSpace = 'nowrap';
                  if(ui.msg) {
                     ui.msg.style.cssText = 'width: auto; max-width: auto; display: inline-block; height: 24px; line-height: 24px; margin: 0 0 0 10px; font-size: 15px;';
                     ui.animate.style.cssText = 'display: inline-block; width: 25px; height: 25px;';
                  }
               }
               for(var i = 0; i < 12; i++) {
                  $.isDefine(_opts.style.color) ? ui.ringSpans.parentElement.children[i].style.borderColor = _opts.style.color : '';
               }
               break;
            case 2: //button按钮加载动画
               ui.warp.style.position = $.getStyle(ui.warp).position == 'static' ? 'relative' : '';
               ui.button.style.cssText = 'width: ' + ui.warp.offsetWidth + 'px; height: ' + ui.warp.offsetHeight + 'px';
               ui.animate.style.marginTop = (ui.warp.offsetHeight - ui.animate.offsetHeight) / 2 - parseInt($.getStyle(ui.warp).borderWidth) + 'px';
               ui.msg ? ui.msg.style.marginTop = (ui.warp.offsetHeight - ui.animate.offsetHeight) / 2 - parseInt($.getStyle(ui.warp).borderWidth) - 1 + 'px' : '';
               ui.button.style.marginLeft = $.getStyle(ui.warp).border != '0px none rgb(0, 0, 0)' ? - parseInt($.getStyle(ui.warp).borderWidth) + 'px' : '';
               ui.button.style.marginTop = $.getStyle(ui.warp).border != '0px none rgb(0, 0, 0)' ? - parseInt($.getStyle(ui.warp).borderWidth) + 'px' : '';
               ui.buttonMain.style.borderRadius = parseInt($.getStyle(ui.warp).borderRadius) > 0 ? parseInt($.getStyle(ui.warp).borderRadius) + 'px' : '';
               ui.buttonMain.style.background = $.getStyle(ui.warp).backgroundColor;
               ui.msg ? ui.msg.style.color = $.getStyle(ui.warp).color : '';
               for(var j = 0; j < 12; j++) {
                  ui.spans.parentElement.children[j].style.borderColor = $.getStyle(ui.warp).color;
               }
               ui.msg ? ui.msg.style.fontSize = $.getStyle(ui.warp).fontSize : '';
               ui.button.addEventListener('touchstart', function(e) {
                  e.preventDefault();
               });
               break;
            case 3: //squarefour四方块旋转加载动画
               if(_opts.theme == 1)
               { //小窗（可设置mask）
                  ui.squarefour.classList.add('aui-loading-squarefour-style-1');
                  $.isDefine(_opts.msg) ? ui.squarefourMain.style.width = ui.squarefourMain.offsetHeight + 10 + 'px' : '';
               }
               else if(_opts.theme == 2)
               { //全屏覆盖
                  ui.squarefour.classList.add('aui-loading-squarefour-style-2');
               }
               break;
            default:
               break;
         }
      },
      show: function(opt, callback) { //显示
         var _this = this;
         var _opts = _this.opts(opt);
         _this.creat(opt);
         var _timer = setTimeout(function() {
            typeof callback == 'function' ? callback() : '';
            clearTimeout(_timer);
         }, 200);
      },
      hide: function(opt, callback) { //隐藏
         var _this = this;
         var _opts = _this.opts(opt);
         var _timer = setTimeout(function() {
            document.querySelector('.aui-loading') ? document.querySelector('.aui-loading').parentNode.removeChild(document.querySelector('.aui-loading')) : '';            
            typeof callback == 'function' ? callback() : '';
            clearTimeout(_timer);
         }, 300);
      }
   };
   $.showload = function(opt, callback) {
      loading.show(opt, callback);
   };
   $.hideload = function(opt, callback) {
      loading.hide(opt, callback);
   };
})(aui, document, window);