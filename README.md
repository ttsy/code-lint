# 项目简介:
  
  js 代码规范检测
  
## 相关路径
  
- **repo：** [https://github.com/ttsy/ttsy-lint.git](https://github.com/ttsy/ttsy-lint.git)
  
## 技术说明
  
- 构建工具：gulp
- 库：gulp-eslint
  
## 运行

- npm run test
  
## 其它说明

- eslint 配置（.eslintrc.js）参考 eslint-config-google 。
- 若有配置修改，则会注释掉原先配置，后注明 ttsy comment，并增加新的配置项，后注明 ttsy increase

## 注意事项
  
- 提交代码后要注意 CI 平台看代码检测是否通过。