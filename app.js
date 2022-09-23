// @ts-check

const Koa = require('koa');
const websockify = require('koa-websocket');
const route = require('koa-route');
const serve = require('koa-static');
const mount = require('koa-mount');

const app = websockify(new Koa());
const PORT = 4500;

app.use(mount('/public', serve('public')));

const Pug = require('koa-pug');
const path = require('path');
const pug = new Pug({
  viewPath: path.resolve(__dirname, './views'),
  app,
});

app.use(async (ctx) => {
  await ctx.render('chat');
});

app.ws.use(
  route.all('/chat', (ctx) => {
    const { server } = app.ws;

    server.clients.forEach((client) => {
      // client.send('Send Data to All Clients! Right now!!');
    });

    // ctx.websocket.send('This speaking is the Server! Do you hear me?');
    ctx.websocket.on('message', (message) => {
      server?.clients.forEach((client) => {
        client.send(message.toString());
      });
    });
  })
);

app.use(async (ctx, next) => {
  console.log(ctx.request);
  console.log(ctx.response);
  ctx.body = 'Hello, koa world!';
});
app.listen(PORT);
