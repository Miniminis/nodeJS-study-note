const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

//회원가입 post 요청 
router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
        //이미 DB에 존재하는 user 정보라면, redirect 처리 
        const exUSer = await User.find({ where : { email } });
        if(exUSer) {
            req.flash('joinError', '이미 가입된 이메일입니다.');
            return res.redirect('/join');
        }
        //위의 경우가 아니라면, 비밀번호 암호화 처리 후, 회원가입처리 bcrypt.hash(암호화할 대상, 암호화정도12+/~31); 
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password : hash,
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

//로그인 post 요청 
router.post('/login', isNotLoggedIn, (req, res, next) => {
    //local login 시 
    passport.authenticate('local', (authError, user, info) => {
        //로그인 실패 
        if(authError) {
            console.error(authError);
            return next(authError);
        } 
        //DB에 일치하는 user 정보가 없는 경우 
        if(!user) {
            req.flash('loginError', info.message);
            return res.redirect('/');
        }
        //마침내 login 성공한 경우 
        //Passport 에 의해 req에 추가된 login() 매서드
        return req.login(user, (loginError) => {    
            if(loginError) {
                console.log(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next); //미들웨어 안의 미들웨어에는 (req, res, next) 붙임 
});

//로그아웃 get 요청 
router.get('/logout', isLoggedIn, (req, res)=> {
    req.logout();   //Passport 에 의해 req에 추가된 logout() 매서드
    req.session.destroy();  //현재 세션에 있는 사용자 정보 파괴 
    res.redirect('/');  //메인 페이지로 리다이렉트 
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect : '/',
}), (req, res) => {
    res.redirect('/');
});

module.exports = router;