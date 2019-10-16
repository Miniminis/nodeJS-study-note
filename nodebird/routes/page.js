const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');


const router = express.Router();

router.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile', {title : '내정보 | NodeBird', user : req.user});
});

router.get('/join', isNotLoggedIn, (req, res)=>{
    res.render('join', {
        title : '회원가입 - NodeBird',
        user : req.user,
        joinError : req.flash('joinError'), //에러메시지
    });
});

router.get('/', (req, res, next)=>{
    Post.findAll({
        inclue : {
            model : User,
            attributes : ['id', 'nick'],
        },
        order : [['createdAt', 'DESC']],
    })
    .then((posts) => {
        res.render('main', {
            title : 'NodeBird',
            twits : posts,
            user : req.user,
            loginError : req.flash('login error 발생하였습니다!'), //error message
        });
    })
    .catch((error)=> {
        console.error('error 발생!');
        next(error);
    }); 
});

module.exports = router;