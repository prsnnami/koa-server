import koa from 'koa';
import koaRouter from 'koa-router'; //router
import koaBody from 'koa-body';  //to get request body
import session from 'koa-session'; //session
import passport from 'koa-passport'; //authentication
import {graphqlKoa, graphiqlKoa} from 'graphql-server-koa';
import logger from 'koa-logger'; //for development, logs all request to console

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
//USE ANOTHER BETTER ONE, THIS IS ONLY BECAUSE THE SECURE ONE IS HARD TO DO IN WINDOWS//
// for hashing the user password // 
import bcrypt from 'bcrypt-nodejs';
//____________________________________________________________________________________//

//GRAPHQL SCHEMA
import schema from './src/data/schema';

import User from './src/data/models/user';

//THIS TO GET DATA FROM .ENV FILES
require('dotenv').config();
require('./src/auth');

const app = new koa();
const PORT = 3000;

app.keys = [process.env.SESSION_SECRET];

//need to initialie the router
let router = koaRouter();

// koaBody is needed just for POST.

// POST and GET requests will be redirected to GraphQL schema
/**
 * Some Explanations needed here
 * the second parameter in the return statement is the context for all the graphql queries
 * so there will be a viewer in the context that represents the person viewing the query
 * it makes it easier to customize what a user sees 
 * viewer : { type: "user"/"public", ....}
 * so we can show few data to public and more data to user and etc
 */
router.get('/graphql', graphqlKoa((ctx) => {
  return { 
    schema: schema,
    context: ctx.state.user ? ctx.state.user : { type: 'public' }
  };
}));
router.post('/graphql', graphqlKoa((ctx) => {
  return { 
    schema: schema,
    context: ctx.state.user ? ctx.state.user : { type: 'public' }
  };
}));

//local login and logout using passport
router.post('/login', passport.authenticate('local', {}));

router.get('/session', (ctx) => {
  ctx.body = ctx.state
})

router.get('/logout', (ctx) => {
  ctx.logout()
});

router.post('/signup', async function(ctx) {
  
  let {email, password} = ctx.request.body;
  let hashedPass = User.generateHash(password);
  await User.create({ email, password: hashedPass, name: 'Pras', username: 'Prasanna'});
  ctx.body = 'Success';
});


// Tool for test your queries: localhost:3000/graphiql
router.get('/graphiql', graphiqlKoa({endpointURL: '/graphql'}));

app.listen(PORT, () => {
 console.log('GraphQL server listening on port %s', PORT);
});

//log requests and responces to console
app.use(logger())
// body parser
  .use(koaBody())
//CONFOG available
  .use(session({}, app))
// authentication
  .use(passport.initialize())
  .use(passport.session())
// finally adding all the routes to the app 
  .use(router.routes())