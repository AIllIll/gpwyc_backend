
Application created by [ThinkJS](http://www.thinkjs.org)

## Install dependencies

```
npm install
```

## Start server

```
启动mongodb
    mongod --dbpath D:/mongodb/data
查看mongodb用户
    use gpwyc
    show users
如果没有则创建
    db.createUser({ user: 'wyc', pwd: 'gpwyc', roles: ['dbAdmin', 'readWrite']});

启动后端
    npm start
```

## Deploy with pm2

Use pm2 to deploy app on production enviroment.

```
pm2 startOrReload pm2.json
```