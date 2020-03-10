require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const next = require('next');
const nextRoutes = require('./next-routes');

const port = parseInt(process.env.PORT, 10) || 8889;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = nextRoutes.getRequestHandler(app);

const axios = require('axios');
const Cookies = require('universal-cookie');

function isNextRoute(url) {
  if (url.indexOf('/_next') === 0) return false;
  if (
    ['jpg', 'jpeg', 'png', 'gif', 'js', 'css', 'map', 'json', 'hash', 'mp4', 'mov', 'mp3', 'mpeg'].indexOf(
      url.split('.').pop(),
    ) > -1
  )
    return false;
  return true;
}

async function getAuthUser(context) {
  if (isNextRoute(context.req.url)) {
    try {
      const cookies = new Cookies(context.req.headers.cookie);
      const token = cookies.get(process.env.COOKIE_TOKEN_KEY);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      // const response = await axios.get(process.env.API_HOST + '/v1/profile');
      // const user = response.data;
      return {
        user: null,
        token,
      };
    } catch (error) {}
  }
}

app
  .prepare()
  .then(() => {
    const server = new Koa();
    const router = new Router();

    router.get('*', async context => {
      context.req.auth = await getAuthUser(context);
      await handle(context.req, context.res);
      context.respond = false;
    });

    server.use(async (context, next) => {
      context.res.statusCode = 404;
      await next();
    });

    // API
    server.use(router.routes());
    // server.use(handle);
    server.listen(port, () => {
      console.info(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.warn(ex);
    process.exit(1);
  });
