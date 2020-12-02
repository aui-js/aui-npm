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