# React技术栈项目结构探究

> [参考链接1](http://www.jianshu.com/p/7de6ccb7b76d?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)
> [参考链接2](https://segmentfault.com/a/1190000010951171)

## React+Redux项目结构探索
整理学习react技术栈相关知识，在写了一个[电商AppDemo](https://github.com/Nealyang/React-Fullstack-Dianping-Demo)后，开始思考起该如何高效的组织react项目的项目结构。

### 按照类型划分(redux官方实例采用的方式)
目录结构如下：

    app/
        actions/
            a.js
            b.js
        components/
            a.js
            b.js
        containers/
            a.js
            b.js
        reducers/
            a.js
            b.js
        index.js
   
这是官网demo中的示例写法，在刚开始学习的时候，我的[很多学习demo](很多学习demo)也是按照这种方式去组织的代码结构
这种结构最直观的就是，*看起来*非常的简单明了。当然，这也可能就是官网为了给我最直接的引导所采用的项目结构。但是在慢慢后面的使用中你会发现很多的弊端。

其中最主要的就是在每次增加一个新的功能的开发一个功能模块的时候，你要各种目录下操作。container里写容器，component里写该功能模块的组件。action、reducer...一系列都得改动。

所以如此这般的频繁的切换路径，修改不同的文件。当项目比较大的时候，这种目录结构是非常不方便的

### 按照功能划分
按照功能模块划分其实就是目前我这个项目所用到的。当然，此项目目录结构真的不咋滴。乱七八糟。

framework.png