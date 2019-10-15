//로그아웃, 이미지 업로더, 마이페이지 등 페이지 접근 
exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요!');
    }
};

//회원가입, 로그인 라우터 접근 
exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
}