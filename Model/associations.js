const Role = require("./Role");
const User = require("./User");
const Category = require("./Category");
const Comment = require("./Comment");
const Images = require("./Images");
const Post = require("./Post");

//one to many relation with role and user

Role.hasOne(User,{
    foreignKey: "role_id"
});
User.belongsTo(Role,{
    foreignKey: "role_id"
});

//one to many relation with user and post

User.hasOne(Post,{
    foreignKey: "user_id"
})

Post.belongsTo(User,{
    foreignKey: "user_id"
})




module.exports = {
    User,Role
}

