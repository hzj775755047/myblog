
# 一、问题背景
最近在项目上做一个退出功能，退出之后要回到一个**嵌套**的二维码登录页面(由于不能放二维码)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83f4c267f37b41318ae29fb4de27ed4e~tplv-k3u1fbpfcp-watermark.image?)

在项目中搜索不到这个页面，于是多方打听下，发现这个页面是由**网关监控**弹出来出来的，而现在的功能就是我需要点击退出按钮，使其再次弹出这个页面

# 二、问题复现
  好的，那么问题来了，依照以前代码的逻辑，我只需要路由跳转到登录页面即可，但是这个嵌套的是监控在项目中的，于是开始研究监控触发的条件，经过一系列控制变量法、勾股定理、代码分析之后，我通过登录之前和之后的对比，将依据锁定在了cookies登录前后的值上，皇天不负有心人，终于在那么多的cookies中发现了一个与众不同的
  
![cookie.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3498b783b584cf19b96a2e158dab474~tplv-k3u1fbpfcp-watermark.image?)
就是这个SSO-PDID。在我手动删除掉这个值刷新页面之后，达到了预期效果，嵌套的网关页面出来啦！

# 三、解决办法
找到问题就简单了，由于是VUE项目，引用js-cookie 或者 vue-cookies 使用remove('SSO-PDID')方法不就行了，
## 1.引入 vue-cookies
```js
import cookies from "vue-cookies";
```
## 2.清除cookies.remove('SSO-PDID')
```js
cookies.remove('SSO-PDID')
```
## 3.下班
***ok，本地自测完，搞定下班***

## 4.然而终究还是被cookies拖住了下班的脚步
奇怪，明明本地测完了，怎么环境上还是不行，睁开我的火眼金睛，发现这个SSO-PDID 有了**httpOnly**属性，在掘金上翻了一下cookies的信息
**httpOnly** | **如果给某个 cookie 设置了 httpOnly 属性，则无法通过 JS 脚本 读取到该 cookie 的信息，但还是能通过 Application 中手动修改 cookie，所以只是在一定程度上可以防止 XSS 攻击，不是绝对的安全** |
| ------------ | --------------------------------------------------------------------------------------------------------------------------

原来后端配置了这个属性，蛋疼，于是控制台调试，发现果然如这个**httpOnly**所言，不仅改不了，而且都不能读取得到。没有办法，只能调用后端接口，让后端清除了。

## 5.再次下班
***ok，交给后端，我下班***

## 6.“调用了这个接口，后端有事不在回家了，你再想想办法，明天要上线，紧急需求。。。”
然后终究还是被拦在了公司门口。
然后发现确实调用了一个logout的接口，这个接口也确实返回了ok，cookies的值也确实没有清掉，麻了

## 7.开始继续调试
怎么会清不掉咧？网关就是判断这个字段啊？它确实加了**httpOnly**这个属性啊，我前端我有什么办法？

继续调用cookies的三个方法remove()、set()、get(),居然在测试环境凑巧回到了网关登陆页面

终于，发现了一个漏洞
### 漏洞

```js
cookies.set('SSO-PDID','',-1)  //设置过期  这里我是想修改，结果变成了增加
```
然后再看浏览器cookies

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c2c30f179a54640b7e94a8d4e47dfa9~tplv-k3u1fbpfcp-watermark.image?)
卧槽？两个SSO-PDID ？卧槽？真的有用？

## 8.下班下班
刚走到门口，又拉回来了
“你这个确实实现了退出到登录页面，但是只能搞一次啊！我再登录，它又退出不了了！”

## 9.小问题小问题
再次打打开控制台cookies页面，果然第二次退出的时候那个空的SSO-PDID 掉到了有值的那个下面。
卧槽？这也可以的嘛，这么不想让我下班

想了下cookies的机制又想了下**httpOnly**这个属性

咦？网关的SSO-PDID删不掉，我自己加的那个讲道理是可以删除修改的呀
继续调用cookies的三个方法remove()、set()、get(),我的可以删掉欸，按照这个新加cookies放在前面的排队机制
### 我先删除掉我自己加的，再添加
```js
cookies.remove('SSO-PDID') //清除过期   
cookies.set('SSO-PDID','',-1)//这里我就是想增加一个新的
```

果然这个空的又放到了前面

完美

## 10.终于下班 及 后续
原来是接口调错了，和后端协调之后给出了正确的接口

![a830ba5b560dfe6e74720bd21430cf3.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f48a5bb45bc14a94b829070c5261fad9~tplv-k3u1fbpfcp-watermark.image?)



