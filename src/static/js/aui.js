/*global module define*/
/*eslint-disable no-unused-vars */
!(function(document, window, undefined) {
   'use strict';
   var aui = new Object();
   aui = {
      
   };
   // 将插件对象暴露给全局对象
   if(typeof module !== 'undefined' && typeof exports === 'object' && define.cmd) {
      module.exports = aui;
   }
   else if(typeof define === 'function' && define.amd) {
      define(function() {return aui;});
   }
   else {
      window.aui = aui;
   }
})(document, window);
