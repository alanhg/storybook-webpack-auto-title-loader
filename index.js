const parser = require('@babel/parser');
const traverse = require("@babel/traverse").default;
const generate = require('@babel/generator').default;
const loader_name = 'storybook-webpack-auto-title-loader';
module.exports = function (source) {
  const options = this.getOptions();
  if (typeof options.appendTitle !== 'function') {
    throw Error(`${loader_name}：title modify function,for example: appendTitle: ({title, componentName}) => \`$\{title}-$\{componentName}\``)
  }
  const ast = parser.parse(source, {sourceType: 'module', plugins: ['jsx', 'typescript']});
  traverse(ast, {
    enter(path) {
      if (path.parentPath && path.parentPath.type === 'ExportDefaultDeclaration') {
        let parentNode = path.node;
        while (parentNode.type === 'TSAsExpression') {
          parentNode = parentNode.expression;
        }
        const properties = parentNode.properties;
        const [titleNode, componentNode] = properties.reduce((res, item) => {
          if (item.key.type === 'Identifier' && item.key.name === 'title') {
            res[0] = item;
          } else if (item.key.type === 'Identifier' && item.key.name === 'component') {
            res[1] = item;
          }
          return res;
        }, []);

        if (titleNode.value.type === 'StringLiteral') {
          titleNode.value.value = options.appendTitle({
            title: titleNode.value.value, componentName: componentNode.value.name
          });
        } else if (titleNode.value.type === 'TemplateLiteral') {
          let value = titleNode.value.quasis[titleNode.value.quasis.length - 1].value;
          value.raw = options.appendTitle({title: value.raw, componentName: componentNode.value.name});
          value.cooked = options.appendTitle({title: value.cooked, componentName: componentNode.value.name});
        }
      }
    },
  })
  return generate(ast).code;
}
