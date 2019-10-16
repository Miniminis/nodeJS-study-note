const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

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
    res.render('main', {
        title : '메인 - NodeBird',
        twits : [],
        user : req.user,
        loginError : req.flash('loginError'),   //에러메시지
    });
});

module.exports = router;