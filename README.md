# aui

### js常用方法库
  
`使用说明：`

#### 安装

npm i aui-1.0

#### 引入
   
   ```javascrilt
      import aui from 'aui-1.0'
       
      Vue.prototype.aui = aui
   ```

#### 示例

extend 对象合并(可实现多层对象深度合并)
   ```javascript
      this.aui.extend("原始参数", "新参数", true);
   ```
isDefine 判断字符串是否为空
   ```javascript
      this.aui.isDefine(str);
   ```
space 去除字符串中空格
   ```javascript
      this.aui.space(str, true);
   ```
uniq 数组去重
   ```javascript
      this.aui.uniq(arr);
   ```
setLocal 本地存储(可设置存储时间)
   ```javascript
      this.aui.setLocal('items', items, 1*24*60*60);
      //获取缓存
      this.aui.getLocal('items');
      //移除缓存，一般情况不手动调用，缓存过期自动调用
      this.aui.removeLocal('items');
      //清空所有缓存
      this.aui.clearLocal();
   ```