const express = require('express');

const router = express.Router();

router.get('/profile', (req, res)=>{
    res.render('profile', {title : '내정보 | NodeBird', user : null});
});

router.get('/join', (req, res)=>{
    res.render('/join', {
        title : '회원가입 - NodeBird',
        user : null,
        joinError : req.flash('joinError'), //에러메시지
    });
});

router.get('/', (req, res, next)=>{
    res.render('main', {
        title : '메인 - NodeBird',
        twits : [],
        user : null,
        loginError : req.flash('loginError'),   //에러메시지
    });
});

module.exports = router;