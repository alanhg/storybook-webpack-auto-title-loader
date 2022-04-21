# storybook-webpack-auto-title-loader
> sb标题自动追加前后缀，存在需求自动将组件函数名称追加到标题上，位置为前或后，当前sb没有提供口子，因此采用webpack插件方式解决该需求

<a href="https://badge.fury.io/js/@stacker%2Fstorybook-webpack-auto-title-loader"><img src="https://badge.fury.io/js/@stacker%2Fstorybook-webpack-auto-title-loader.svg" alt="npm version" height="18"></a>

## 使用

`npm i @stacker/storybook-webpack-auto-title-loader --save-dev`

.storybook/main.js

### 说明
appendTitle为回调函数，当前暴露2个参数

title为当前设定标题，componentName为组件函数名称

### 例子

```js
const path = require('path');
module.exports = {
    webpackFinal: async (config, {configType}) => {
    config.module.rules.push({
      test: /\.stories\.(jsx?$|tsx?$)/, use: [{
        loader: path.resolve(__dirname, './auto-title.loader.js'), options: {
          appendTitle: ({title, componentName}) => `${title}-${componentName}`
        }
      }], include: path.resolve(__dirname, '../lib'),
    });
    return config;
}
  },
};

```
