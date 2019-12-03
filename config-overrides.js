const {
    override,
    fixBabelImports,
    addLessLoader
} = require("customize-cra");

module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        // style:'css',
        style: true //自动打包相关的样式
    }),

    //自定义样式
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#1da57a'
        }
    })
);
//安装，按需打包配置
//yarn add react-app-rewired customize-cra babel-plugin-import

//需要修改package.json中
// "start": "react-app-rewired start",
//         "build": "react-app-rewired build",
//         "test": "react-app-rewired test",