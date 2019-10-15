module.exports = (sequelize, DataTypes) => (
    //게시글 저장 위한 모델 정의 
    //필요한 정보  content, img + 시간 (추가, 수정, 삭제)
    sequelize.define('post', {
        content : {
            type : DataTypes.STRING(140), 
            allowNull : false,
        },
        img : {
            type : DataTypes.STRING(200),
            allowNull : true,
        },
    }, {
        timestamps : true,
        paranoid : true,
        //createdAt, updatedAt, deletedAt 컬럼 생성 
    })
);