const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField : 'email',    //form 에 있는 input 의 id 와 일치시킴 
        passwordField : 'password',
    }, async (email, password, done) => {
        try {
            const exUser = await User.find({ where : { email } });
            if(exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if(result) {
                    done(null, exUser);
                } else {
                    done (null, false, { message : '비밀번호가 일치하지 않습니다!'});   //done(서버상 에러, ㄹ민ㄷ, )
                }
            } else {
                done (null, false, {message : '가입되지 않은 회원입니다!'});
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};