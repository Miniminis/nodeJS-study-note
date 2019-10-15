const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config, 
);

db.sequelize = sequelize;
db.Sequelize = Sequelize; 

//모델과 연결 
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);

//모델 간 관계설정 
//user - post : 1 대 다
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

//post - hashtag : 다 대 다 
// 중간의 관계 테이블 : PostHashtag
//시퀄라이즈에 의해 자동으로 서로의 setter, getter 가 각각의 model 에 생성된다. 
db.Post.belongsToMany(db.Hashtag, {through : 'PostHashtag'});
db.Hashtag.belongsToMany(db.Post, {through : 'PostHashtag'});

//one user - another user : 다 대 다 관계 
//관계 테이블 : Follow 
//두 user 테이블 간의 id 가 중복되므로 따로 foreign key와 테이블 이름을 설정 
//as : JOIN 작업시 사용하는 이름 - 두 테이블 이름이 같으므로, Followers와 Followings 로 각각 지정함 
db.User.belongsToMany(db.User, {
  foreighKey : 'followingId',
  as : 'Followers',
  through : 'Follow',
});

db.User.belongsToMany(db.User, {
  foreighKey : 'followerId',
  as : 'Followings',
  through : 'Follow',
});

module.exports = db;

