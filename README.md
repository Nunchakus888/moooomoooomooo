# StartKit 使用文档

##### 本文将介绍 StartKit 的下载方式和基本的用法。
----
#### 从git上clone该项目
  git目录地址：http://git.sumscope.com:7990/scm/mw/reactstartkit.git

#### 简介
##### 项目目录
```
  文件命名：只有components、containers 下的文件名开头需要大写
  scripts
    |---actions     //有操作的 Action（entityAction.js ）
    |---actionType  //Action的类型（ entityTypes.js ）
    |---components  //所有的组件（ Entity.js ）
    |---containers  //组件链接 redux（ EntityContainer.js ）
    |---page        //项目中的所有页面 （loadPage.js）
    |---reducers    //处理Action的文件（entityReducer.js）
    |---router      //这个文件一般只有一个，描述项目的路由解构（projectRouter.js）
    |---sagas       //处理 请求接口的 Action （entitySagas.js）
    |---services    //请求接口相关的文件（自定义）
    |---store       //生成redux tree（configureStore.js）
    |---util        //存放工具类（entityUtil.js）
    |---.eslintrc   //eslintrc 规范
    |---config.js   //项目配置，api 等
    |---main.js     //项目js代码的入口
  server
    |---html        //项目运行时的模板文件
    |---public      //项目运行时的模板文件
  styles
    |---custom        //包含主要的scss代码
        |---components//组件的样式
        |---frame     //框架的样式
        |---page      //每一个页面的单独
    |---img           //媒体文件
    |---util          //scss 的一些工具
    |---main.scss     //引入所有的scss文件
  test
    |---actions       //测试Action（entityAction.js）
    |---components    //测试组件（entity.js）
    |---pages         //测试页面（entityPage.js）
    |---reducers      //测试reducers（entityReducers.js）
  |---.babelrc            //babel配置文件
  |---index.template.ejs  //打包时的模板文件
  |---karma.conf.js       //测试的配置文件
  |---package.json        //npm配置文件
  |---server.js           //本地测试的node后台
  |---tests.webpack.js    //测试用的webpack文件
  |---webpack.config.js   //运行时的webpack配置
  |---webpack.prod.config.js//打包时的webpack配置
```
##### redux store
```js
  {
    server: {
      entity: {
        entities: {},
        ids: []
      }
    },
    client: {
      router: {
        routerName: '首页',
        routerDirection: 'forthcome'
      }
    },
    form: {}
  }
  server:用来存储api返回的数据，等连接需要连接后台的操作
  client:用来存储页面之间的交互数据
  form:用来存储 reduxForm 的数据
```
##### sagas使用方法
###### 在sagas文件夹定义personSagas.js文件，代码如下：
```js
  // push
  function* pushPerson(action) {
    try {
      put({ type: ActionTypes.PERSON_PUSH_REQUEST })
      const json = yield call(callApi, 'mockPush', 'POST', { command: 'push' })
      const result = normalize(json, schema.arrayOfPersons)
      yield put({ type: ActionTypes.PERSON_PUSH_SUCCEEDED, ...result })
      yield action.resolve()
    } catch (e) {
      yield put({ type: ActionTypes.PERSON_PUSH_FAILED, message: e.message })
      yield action.reject('pull fail')
    }
  }

  function* pushWatcher() {
    yield takeLatest(ActionTypes.PRESON_PUSH_REQUESTED, pushPerson)
  }

  pushWatcher:定义一个Watcher来监听action，当监听到指定action时，执行pushPerson方法
  pushPerson:调用api接口
```

###### 在configureStore.js中执行personSagas，代码如下：
```js
  const sagaMiddleware = createSagaMiddleware()

  export default () => {
    const enhancers = []
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }

    const store = createStore(
      rootReducer,
      compose(
        applyMiddleware(
          thunk
        ),
        applyMiddleware(
          sagaMiddleware
        ),
        ...enhancers
      )
    )
    sagaMiddleware.run(personSagas)
    return store
  }

  如果有多个saga文件，可以参照以下代码：
  sagaMiddleware.run(personSagas)
  sagaMiddleware.run(newSagas)
```

##### server.js使用方法
##### 需要文件中定义文本类型、跨域访问、后台端口和api，代码如下：
```js
  var express = require('express')
  var bodyParser = require('body-parser')

  var app = express()

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())

  // parse application/vnd.api+json as json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

  //设置跨域访问
  app.all('*', function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });

    //查
  app.get('/api/getData', function (req, res) {
  	res.send(getData());
  })

  app.post('/api/mockPull', function(req, res){
  	person.unshift({ id: 'id' + person.length, name: person.length, age: person[0].age - 1 })
  	res.send(person);
  })

  var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
  })

  访问后台的api接口为http://localhost:8081
```

##### 关于事件绑定
```js
  建议在绑定事件的时候使用touch事件
  onTouchTap    相当于onClick
  onTouchStart  手指按下
  onTouchMove   按下后移动
  onTouchEnd    按下后松开
```
##### 常用命令
```js
  启动
  npm start
  编译
  npm run build:prod
  eslint
  npm run lint > test.txt
```
