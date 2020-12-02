# aui

### js常用方法库

#### 安装

```javascript
   npm i aui-1.0
```

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
space 删除字符串中指定字符
   ```javascript
      this.aui.space(str, true);
   ```
replaceStr 去除字符串中空格
   ```javascript
      this.aui.replaceStr('原字符串', '指定字符');
   ```
uniq 数组去重
   ```javascript
      this.aui.uniq(arr);
   ```
getUrlstr 截取URL中字符串(可获取中文内容)
   ```javascript
      this.aui.getUrlstr('id');
   ```
random 生成随机数
   ```javascript
      this.aui.random(10, 100);
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
import 引入 js / css 文件
   ```javascript
      this.aui.import('aui.js')
      this.aui.import(['aui.js', 'aui.css'])
   ```