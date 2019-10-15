//passport-kakao 모듈로부터 Strategy 생성자 불러와 사용
const KakaoStragety = require('passport-kakao').Strategy;

//models 폴더로부터 User 객체 받아오기 
const {User} = require('../models');

//kakao() : module 만들기 
module.exports = (passport) => {
    //미들웨어 설정 
    passport.use(new KakaoStragety({
        clientID : process.env.KAKAO_ID,
        callbackURL : '/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {    //카카오 인증 성공하면 callback : 3가지 정보 전달 
        try {
            const exUser = await User.find({where : {snsId: profile.id, provider: 'kakao'}});
            if(exUser) {
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    //profile 에 사용자 정보 담김 : 원하는 정보 꺼내와 회원가입하면 됨!
                    email : profile._json && profile._json.kaccount_email,
                    nick : profile.displayName, 
                    snsId: profile.id,
                    provier : 'kakao',
                });
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};