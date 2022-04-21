# storybook-webpack-auto-title-loader
> sb标题自动追加前后缀，存在需求自动将组件函数名称追加到标题上，位置为前或后，当前sb没有提供口子，因此采用webpack插件方式解决该需求


## 使用

.storybook/main.js
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
