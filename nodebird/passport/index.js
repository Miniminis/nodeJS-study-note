const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    //req.session 개체에 어떤 데이터를 저장할지 선택. 
    //done(에러발생시 사용할 것, user의 id만 저장하여 용량절약)

    passport.deserializeUser((id, done)=> {
        User.findOne({ 
            where : { id }, //세션에 저장된 아이디로 사용자 정보 조회 
            include : [{
                    model : User, 
                    attributes : ['id', 'nick'],
                    as : 'Followers', //팔로워 목록 
                }, {
                    model : User, 
                    attributes : ['id', 'nick'],
                    as : 'Followings', //팔로잉 목록 조회 
                }],
            })
            .then(user => done(null, user))
            .catch(err => done(err));
    });
    //매 요청시 passport.session() 에 의해 실행됨.
    //serializeUser 에서 세션에 저장한 user id 를 받아서 데이터 베이스에서 사용자 정보를 조회함. 
    //req.user 에 조회한 정보를 저장 --> 이후에도 이를 통해 사용자 정보 받아올 수 있음 


    local(passport);
    kakao(passport);
}