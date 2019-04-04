const UserController = require('../Controllers/UserController');
const ArticlesController = require('../Controllers/ArticlesController');
const {reqValidation , logValidation, ArticleValidation} = require('../Controllers/Validation');


module.exports = function (app) {
    app.get('/Welcome', (req, res) => res.send({Welcome : 'Welcome'}));

    app.post('/api/registration',reqValidation, UserController.Registration);
    app.post('/api/login', logValidation, UserController.Login);
    app.put('/api/updateUser/:id' ,reqValidation, UserController.updateUser);

    app.get('/api/user' , UserController.authenticateUser , UserController.getAuthenticateUserName);
    app.get("/api/currentUser", UserController.currentUser);
    app.get("/api/logout", UserController.logOut);
    
    app.get('/api/getAllUsers', UserController.authenticateUser , UserController.getAllUsers);
    app.get("/api/getAllUsers/:name", UserController.authenticateUser , UserController.findOneUser);
   
    app.post('/api/newPost',ArticleValidation,ArticlesController.CreateArticle);
    app.post('/api/postUpVote/:id',ArticlesController.auth, ArticlesController.postUpVote);

    app.get('/api/getAllArticles' , UserController.authenticateUser , ArticlesController.getAllArticles);
    app.get('/api/getAllArticles/:id', UserController.authenticateUser , ArticlesController.getArticleById);
    app.get('/api/getAllPostsOneUser/:id', UserController.authenticateUser , ArticlesController.getAllPostsOneUser )

    app.delete('/api/deletePostById/:id',ArticlesController.auth, ArticlesController.deletePostById);
    app.put('/api/updatePost/:id' ,ArticlesController.auth, ArticlesController.updatePost);

    app.post('/api/:id/comment' , ArticlesController.comment)

    app.get('/api/session', (req, res) => res.json({session: req.session.user}));
}