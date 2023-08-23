const { expressjwt: jwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.secret;
  const api= process.env.URL;
  return jwt({
    secret,
    algorithms: ['HS256'],
    isRevoked: isRevoked
}).unless({
    path: [
        {url: /\/public\/uploads(.*)/ , methods: ['GET', 'OPTIONS'] },
        {url: /\/api\/eshop\/products(.*)/ , methods: ['GET', 'OPTIONS'] },
        {url: /\/api\/eshop\/categories(.*)/ , methods: ['GET', 'OPTIONS'] },
        {url: /\/api\/eshop\/orders(.*)/,methods: ['GET', 'OPTIONS', 'POST','DELETE','PUT']},
        `${api}/users/login`,
        `${api}/users/register`,
    ]
})
}

async function isRevoked(req, token){
    if(!token.payload.isAdmin) {
       return true;
    }
}

module.exports = authJwt;
