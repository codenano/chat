
/**
 * Module dependencies.
 */
//��ʼ�����ݿ�����Ӧ���ڵ���routes֮ǰ������Ϊʲô
var express = require('express')
  , db = require('./db')  
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , sio = require('socket.io');
  
var app = express();

//�����app.use�е�cookieParser()��sessionʹÿ��������cookie��session����
app.configure(function(){
  app.set('port', process.env.PORT || 80);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret:'keyboard cat'}));	
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/**
 * �������index.js�ж���Ĵ�������ӳ��
 *
 */

//ӳ����ҳ����
app.get('/', routes.getIndex);
//app.get('/users', user.list);

//ӳ���¼ҳ������	
app.get('/login', routes.getLogin);


function authorizationUser(req, res, next){
	//console.log(req.body.user.id);
	//console.log(req.body.user.password);	
	//��������ݴ������ݿ�����֤�û�����
	next();
}
//�����������û���Ϣ
app.post('/login', authorizationUser, routes.postLogin);

//ӳ���˳�����
app.get('/logout',routes.getLogout);

//ӳ��ע���û�ҳ������
app.get('/register/user', routes.getRegisterUser);


function registerUser(req, res, next){
	//console.log(req.body.user);
	//console.log(req.body.user.password);
	//��������ݴ������ݿ���
	next();
}

//����������ע���û���Ϣ
app.post('/register/user', registerUser, routes.postRegisterUser);

//ӳ�䴴��Ⱥҳ������
app.get('/create/group', routes.getCreateGroup);

//���������Ĵ���Ⱥ��Ϣ
app.post('/create/group', routes.postCreateGroup);
/*
//app.get('/user/:userID')��Ԥ������
app.param('userID', function(req, res, next, id){
	//��id���ҵ��û��������û�����req.user��
	next();
});
*/

//��ò�ѯҳ��
//app.get('/query', routes.getQuery);

//���������Ĳ�ѯ��Ϣ����
app.post('/query/friends', routes.postQueryFriends);

//�����ϸ�ҳ������
app.get('/back', routes.getBack);

app.get('/chat', routes.getChat);
/*
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
*/


var server = http.createServer(app);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

/**
 * ����soket.io
 �� ������socket.js�ļ��еļ�������
 *
 */

exports.io = sio.listen(server);
require('./routes/socket');
  
 

/*
 app.connect = function (path, callback){
	var namespace = io.of(path).on('connection', callback);
 }
 app.connect('/friend', routes.connectFriend);

 var chat = io.of('/load/friends').on('connection', function(socket){
	socket.on('loadFriends', function(userID){
		//�����ݿ��ѯuserID
		//�����û������б�
		socket.emit(userID, {});
	});
});

 io.sockets.on('connection', function(socket){
	socket.on('private_message', function(data){
		data.senderID
		data.msg
		data.receiverID
		socket.emit(receiverID, {'senderID':data.senderID, 'msg':data.msg});
	});

	socket.on('success', function(data){
		console.log(data);
	});

 });
*/

