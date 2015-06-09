/**
 * Created by sang on 01/06/14.
 */

var User = require('../models/user');

exports.list = function (req, res, next) {
  console.log(req.method + ' /users => list, query: ' + JSON.stringify(req.query));
  User.getAll(function(err, users){
    console.log(users);
    res.render('users/index', {
      users : users
    })
  });
};

exports.new = function (req, res, next) {
  console.log(req.method + ' /users/new => new, query: ' + JSON.stringify(req.query));
  
  res.render('users/new', {
    user : {
      "_action" : "new"
    }
  })
};

exports.show = function (req, res, next) {
  console.log(req.method + ' /users/:id => show, query: ' + JSON.stringify(req.query) + 
    ', params: ' + JSON.stringify(req.params));
  var id = req.params.id;
  
  User.getById(id, function(err, user) {
    console.log(user);
    res.render('users/show', {
      user : user
    })
  });
};

exports.edit = function (req, res, next) {
  console.log(req.method + ' /users/:id/edit => edit, query: ' + JSON.stringify(req.query) + 
    ', params: ' + JSON.stringify(req.params));
    
  var id = req.params.id; 
  
  User.getById(id, function (err, user) {
    console.log(user);
    user._action = 'edit';
    
    res.render('users/edit', {
      user : user
    })
  });
};

exports.create = function (req, res, next) {
  console.log(req.method + ' /users => create, query: ' + JSON.stringify(req.query) + 
    ', params: ' + JSON.stringify(req.params) + ', body: ' + JSON.stringify(req.body));
  
    User.create({name: req.body.name,password: req.body.password}, function (err, user) {
      console.log(user);
      res.render('users/show', {
        user : user
      })
    });
};

exports.update = function (req, res, next) {
  console.log(req.method + ' /users/:id => update, query: ' + JSON.stringify(req.query) + 
    ', params: ' + JSON.stringify(req.params) + ', body: ' + JSON.stringify(req.body));
    
    var id = req.params.id; 
  
    User.updateById(id,{name: req.body.name,password: req.body.password}, function (err, user) {
      console.log(user);
    
      res.json({
        data:{
          redirect : '/users/' + id
        },
        status:{
          code : 0,
          msg  : 'delete success!'
        }
      });
    });
};

exports.destroy = function (req, res, next) {
  console.log(req.method + ' /users/:id => destroy, query: ' + JSON.stringify(req.query) + 
    ', params: ' + JSON.stringify(req.params) + ', body: ' + JSON.stringify(req.body));

  var id = req.params.id;
  User.deleteById(id, function (err) {
    console.log(err);
    res.json({
      data:{},
      status:{
        code : 0,
        msg  : 'delete success!'
      }
    });
  });
};