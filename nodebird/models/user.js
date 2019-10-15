module.exports = (sequelize, DataTypes)=> (
    //사용자의 정보를 저장하는 모델 정의
    //필요정보 : email, nick, password, snsId
    sequelize.define('user', {  
        email : {
            type : DataTypes.STRING(40),
            allowNull : false,
            unique : true,
        }, 
        nick : {
            type : DataTypes.STRING(15),
            allowNull : false,
        },
        password : {
            type : DataTypes.STRING(100),
            allowNull : true,
        },
        provider : {
            type : DataTypes.STRING(10), 
            allowNull : false,
            defaultValue : 'local', //or kakao
        },
        snsId : {
            type : DataTypes.STRING(30),
            allowNull : true, 
        },
    }, {
        timestamps : true,  
        paranoid : true,
        //결과 : createdAt, updatedAt, deletedAt 컬럼 생성됨 
    })
);