const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('./db.json');

const userdb = JSON.parse(fs.readFileSync('./db.json', 'UTF-8')).users;

server.use(bodyParser.urlencoded({extended: true}));

server.use(bodyParser.json());

const SECRET_KEY = '123456789';
const expiresIn = '168h';

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err);
}

// Check if the user exists in database
function isAuthenticated({email, password}) {
  return userdb.findIndex(user => user.email === email && user.password === password) !== -1
}

server.post('/auth/login', (req, res) => {
  const {email, password} = req.body;
  if (isAuthenticated({email, password}) === false) {
    const status = 401;
    const message = 'Incorrect workers-list or password';
    res.status(status).json({status, message});
    return
  }
  const access_token = createToken({email, password});
  const {id, name} = userdb.find(user => user.email === email);
  res.status(200).json({
    user: {id, name},
    access_token
  });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401;
    const message = 'Bad authorization header';
    console.log('Bad authorization header', req.headers);
    res.status(status).json({status, message});
    return
  }
  try {
    verifyToken(req.headers.authorization.split(' ')[1]);
    next();
  } catch (err) {
    const status = 401;
    const message = 'Error: access_token is not valid';
    res.status(status).json({status, message});
  }
});

server.use(function(req, res, next){
  setTimeout(next, 1000);
});
server.use('/api', router);

server.listen(4444, () => {
  console.log('server running on port 4444...');
});
