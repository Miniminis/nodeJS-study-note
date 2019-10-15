module.exports = (sequelize, DataTypes) => (
    //해시태그를 통한 검색을 위해 별도의 해시태그 모델 생성 
    sequelize.define('hashtag', {
        title : {
            type : DataTypes.STRING(15),
            allowNull : false, 
            unique : true,
        },
    }, {
        timestamps : true, 
        paranoide : true,
    })
);