module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        //useBuiltIns,corejs建议自己开发时使用
        "useBuiltIns": "usage",
        "corejs": 3,
        "modules": false,
        "targets": {
          "browsers": [
            "> 1%",
            "last 2 versions",
            "not ie <= 8"
          ]
        }
      }
    ]
  ],
  // 打包时遇到Cannot assign to read only property 'exports' of object '#<Object>'问题的解决方法。sourceType:'unambiguous',
  sourceType:'unambiguous',
  "env": {
    "test": {
      "presets": [
        "@babel/preset-env"
      ],
      "plugins": [
        "transform-vue-jsx",
        "@babel/plugin-transform-modules-commonjs",
        "dynamic-import-node",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-syntax-import-meta",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-json-strings",
        [
          "@babel/plugin-proposal-decorators",
          {
            "legacy": true
          }
        ],
        "@babel/plugin-proposal-function-sent",
        "@babel/plugin-proposal-export-namespace-from",
        "@babel/plugin-proposal-numeric-separator",
        "@babel/plugin-proposal-throw-expressions"
      ]
    }
  },
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-json-strings",
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",
    // 开发插件使用以下转换机制较好
    // [
    //   "@babel/plugin-transform-runtime",{
    //       "corejs": 3
    //   }
    // ]
  ]
}
