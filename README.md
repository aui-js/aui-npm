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
   参数  |  类型  |  描述  | 默认值 | 必选
   ----  | ------ | ------ | ----- | ----
   opts  | Object | 原始参数 | 无 | 是
   opt  | Object | 新参数 | 无 | 是
   override  | Boolean | 是否合并重置 | 无 | 否
   ```javascript
      this.aui.extend("原始参数", "新参数", true);
   ```
isDefine 判断字符串是否为空
   参数  |  类型  |  描述  | 默认值 | 必选
   ----  | ------ | ------ | ----- | ----
   str  | string | 字符串 | 无 | 是
   ```javascript
      this.aui.isDefine(str);
   ```
space 删除字符串中指定字符
   参数  |  类型  |  描述  | 默认值 | 必选
   ----  | ------ | ------ | ----- | ----
   str  | string | 字符串 | 无 | 是
   flag  | Boolean | 是否去除前后空格[false: 去除前后空格 \ true: 去除全部空格] | 无 | 否
   ```javascript
      this.aui.space(str, true);
   ```
replaceStr 去除字符串中空格
      参数  |  类型  |  描述  | 默认值 | 必选
      ----  | ------ | ------ | ----- | ----
      str  | string | 字符串 | 无 | 是
      assignStr  | string | 指定字符串 | 无 | 否
   ```javascript
      this.aui.replaceStr('原字符串', '指定字符');
   ```
uniq 数组去重
   参数  |  类型  |  描述  | 默认值 | 必选
   ----  | ------ | ------ | ----- | ----
   array  | array | 去重数组 | 无 | 是
   ```javascript
      this.aui.uniq(array);
   ```
getUrlstr 截取URL中参数(可获取中文内容)
   参数  |  类型  |  描述  | 默认值 | 必选
   ----  | ------ | ------ | ----- | ----
   str  | string | 参数名称 | 无 | 是
   ```javascript
      this.aui.getUrlstr('id');
   ```
random 生成随机数
   参数  |  类型  |  描述  | 默认值 | 必选
   ----  | ------ | ------ | ----- | ----
   Min  | number | 最小值 | 无 | 是
   Max  | number | 最大值 | 无 | 是
   ```javascript
      this.aui.random(10, 100);
   ```
copy 复制到剪切板
   参数  |  类型  |  描述  | 默认值 | 必选
   ----  | ------ | ------ | ----- | ----
   str  | string | 要复制的文本 | 无 | 是
   ```javascript
      this.aui.copy('213421');
   ```
checkIsDeveloper 验证是否是开发者
   参数  |  类型  |  描述  | 默认值 | 必选
   ----  | ------ | ------ | ----- | ----
   isDeveloper  | Boolean | 是否是开发者 | 无 | 否
   ```javascript
      this.aui.checkIsDeveloper(false);
   ```
setLocal 本地存储(可设置存储时间)
   参数  |  类型  |  描述  | 默认值 | 必选
   ----  | ------ | ------ | ----- | ----
   key  | string | 存储的名称 | 无 | 是
   value | string | 存储的内容 | 无 | 是
   time | number | 存储时间 | 无 | 否
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
   参数  |  类型  |  描述  | 默认值 | 必选
   ----  | ------ | ------ | ----- | ----
   url  | string / array | 文件path | 无 | 是
   ```javascript
      this.aui.import('aui.js')
      this.aui.import(['aui.js', 'aui.css'])
   ```
loading加载动画
   参数  |  类型  |  描述  | 默认值 | 必选
   ---- | ----- | ------ | ----- | ----
   warp  | string | 父容器元素 | 'body' | 否
   type  | number | 1: 常用风格;</br> 2: 点击按钮后在按钮内显示加载动画;</br> 3: 四个方块旋转;</br> 4: 圆点放大缩小动画(全屏首次加载过度动画); </br>5: 圆点背景过度动画-微信小程序效果(全屏首次加载过度动画) | 1 | 否
   msg  | string | 提示内容 | '' | 否
   mask  | boolean | 是否显示遮罩蒙版 | true | 否
   direction  | string | 横向("row")或纵向("col")控制 | 'col' | 否
   theme  | number | type=3时，控制全屏或小窗展示（1：小窗; 2：全屏） | 1 | 否
   style  | object | {</br>    bg: '背景',</br>  color: '文字颜色', </br>    maskBg: '遮罩层颜色', </br>  zIndex: '层级'</br>} | '' | 否

   ```javascript
      this.aui.showload({
          msg: "加载中"
      });
      this.aui.hideload();
   ```