# React技术栈实现大众点评Demo项目结构探究

> [参考链接1](http://www.jianshu.com/p/7de6ccb7b76d?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)
> [参考链接2](https://segmentfault.com/a/1190000010951171)

>[项目地址](https://github.com/Nealyang/React-Fullstack-Dianping-Demo)

## 项目截图
![首页](https://github.com/Nealyang/React-Fullstack-Dianping-Demo/blob/master/record/home_1.jpg)

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

![项目结构](https://github.com/Nealyang/React-Fullstack-Dianping-Demo/blob/master/record/framework.png)

    feature1/
        components/
            actions.js
            container.js
            index.js
            reducer.js
    feature2/
        components/
            actions.js
            container.js
            index.js
            reducer.js
    index.js
    rootReducer.js
    
在《深入浅出React和Redux》一本书中，推荐的就是这种方式，真正的做到组件化，划分到组件、状态和行为都在同一个文件夹里。方便开发，也易于扩展。组件中只要一个index.js去暴露出接口就行。

但是这种结构存在一个问题，就是随着应用扩大（即使我这个应用没有几个页面，但是依旧存在了问题）。

因为redux会将整个应用状态作为一个store来管理，不同的模块之间可以共享state中的任何一个部分，这种情况下，可能feature1中的dispatch会影响到feature2中的reducer，正如这个demo中出现的。

这种情况下，不同模块间的功能被耦合到了一起。

### [Ducks](https://github.com/erikras/ducks-modular-redux)

github上这么介绍的：A proposal for bundling reducers, action types and actions when using Redux.

所以这里，我们翻一下。

在创建redux应用时，按照功能性划分，每次会都添加`{actionTypes, actions, reducer}`这样的组合。我之前会把它们分成不同的文件，甚至分到不同的文件夹，但是95%的情况下，只有一对 reducer/actions 会用到对应的 actions。 
对我来说，把这些相关的代码放在一个独立的文件中更方便，这样做还可以很容易的打包到软件库／包中。

    // widgets.js
    
    // Actions
    const LOAD   = 'my-app/widgets/LOAD';
    const CREATE = 'my-app/widgets/CREATE';
    const UPDATE = 'my-app/widgets/UPDATE';
    const REMOVE = 'my-app/widgets/REMOVE';
    
    // Reducer
    export default function reducer(state = {}, action = {}) {
      switch (action.type) {
        // do reducer stuff
        default: return state;
      }
    }
    
    // Action Creators
    export function loadWidgets() {
      return { type: LOAD };
    }
    
    export function createWidget(widget) {
      return { type: CREATE, widget };
    }
    
    export function updateWidget(widget) {
      return { type: UPDATE, widget };
    }
    
    export function removeWidget(widget) {
      return { type: REMOVE, widget };
    }
    
#### 规则

一个模块 ...
* 必须 export default 函数名为 reducer() 的 reducer
* 必须 作为函数 export 它的 action creators
* 必须 把 action types 定义成形为 npm-module-or-app/reducer/ACTION_TYPE 的字符串
* 如果有外部的reducer需要监听这个action type，或者作为可重用的库发布时， 可以 用 UPPER_SNAKE_CASE 形式 export 它的 action types。

上述规则也推荐用在可重用的redux 库中用来组织{actionType, action, reducer}

本质上是以应用的状态作为模块的划分依据，而不是以界面功能作为划分模块的依据。这样，管理相同状态的依赖都在同一个文件中，不管哪个容器组件需要使用这部分状态，只需要在这个组件中引入这个状态对应的文件即可。

整体的目录结构如下：

    components/  (应用级别的通用组件)
    containers/  
      feature1/
        components/  (功能拆分出的专用组件)
        feature1.js  (容器组件)
        index.js     (feature1对外暴露的接口)
    redux/
      index.js (combineReducers)
      module1.js (reducer, action types, actions creators)
      module2.js (reducer, action types, actions creators)
    index.js

在前两种项目结构中，当container需要使用actions时，可以通过import * as actions from 'path/to/actions.js'方式，一次性把一个action文件中的所有action creators都引入进来。
但在使用Ducks结构时，action creators和reducer定义在同一个文件中，import *的导入方式会把reducer也导入进来（如果action types也被export，那么还会导入action types）。
我们可以把action creators和action types定义到一个命名空间中，解决这个问题。修改如下：

    // widget.js
    
    // Actions
    export const types = {
      const LOAD   : 'widget/LOAD',
      const CREATE : 'widget/CREATE',
      const UPDATE : 'widget/UPDATE',
      const REMOVE : 'widget/REMOVE'
    }
    
    const initialState = {
      widget: null,
      isLoading: false,
    }
    
    // Reducer
    export default function reducer(state = initialState, action = {}) {
      switch (action.type) {
        types.LOAD: 
          //...
        types.CREATE:
          //...
        types.UPDATE:
          //...
        types.REMOVE:
          //...
        default: return state;
      }
    }
    
    // Action Creators
    export actions = {
      loadWidget: function() {
        return { type: types.LOAD };
      },
      createWidget: createWidget(widget) {
        return { type: types.CREATE, widget };
      },
      updateWidget: function(widget) {
        return { type: types.UPDATE, widget };
      },
      removeWidget: function(widget) {
        return { type: types.REMOVE, widget };
      }
    }
    
这样，我们在container中使用actions时，可以通过import { actions } from 'path/to/module.js'引入，
避免了引入额外的对象，也避免了import时把所有action都列出来的繁琐。

**[下一个项目]((https://github.com/Nealyang/React-Express-Blog-Demo))将会采用第三种方式去组织代码**
