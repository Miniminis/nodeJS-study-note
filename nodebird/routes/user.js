// 다른 사용자를 follow 할 수 있는 라우터 
const express = require('express');

const { isLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, async(req, res, next) => {
    try {
        const user = await User.findOne({ where : { id : req.user.id }});
        await user.addFollowing(parseInt(req.params.id, 10)); //req.params.id = :id
        res.send('success');
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;