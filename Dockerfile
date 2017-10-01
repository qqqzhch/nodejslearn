#设置基础镜像,如果本地没有该镜像，会从Docker.io服务器pull镜像
FROM node:8.5.0
#创建app目录,保存我们的代码
RUN mkdir -p /usr/src/node
#设置工作目录
WORKDIR /usr/src/node

#复制所有文件到 工作目录。
COPY . /usr/src/node

#编译运行node项目，使用npm安装程序的所有依赖,利用taobao的npm安装
ENV NODE_ENV development

WORKDIR /usr/src/node/
RUN npm install --registry=https://registry.npm.taobao.org

#暴露container的端口
EXPOSE  8080

#运行命令
CMD ["npm", "run","getdata"]
