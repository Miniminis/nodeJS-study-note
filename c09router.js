var express = require('express');
var router = express.Router();

router.get('/hello', sayhello);
router.get('/howareyou/:who', sayhowareyou);

function sayhello (req, res){
    res.send('hello from the other side! '); 
}

function sayhowareyou(req, res) {
    var who = req.params.who;
    res.send('i am fine, thank you , and you? ' + who);
}

module.exports = router;