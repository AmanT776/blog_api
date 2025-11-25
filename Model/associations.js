const Role = require("./Role");
const User = require("./User");
const Category = require("./Category");
const Comment = require("./Comment");
const Images = require("./Images");
const Post = require("./Post");

//one to one relation with role and user

Role.hasOne(User,{
    foreignKey: "role_id"
});
User.belongsTo(Role,{
    foreignKey: "role_id"
});

//one to many relation with user and post

User.hasMany(Post,{
    foreignKey: "user_id"
});

Post.belongsTo(User,{
    foreignKey: "user_id"
});

//one to many relation with post and category
Category.hasMany(Post,{
    foreignKey: "category_id"
});

Post.belongsTo(Category,{
    foreignKey: "category_id"
});

//one to many relation with post and comment 
Post.hasMany(Comment,{
    foreignKey: "post_id",
});

Comment.belongsTo(Post,{
    foreignKey: "post_id"
});

//one to many relation with post and images
Post.hasMany(Images,{
    foreignKey: "post_id"
});

Images.belongsTo(Post,{
    foreignKey: "post_id"
});

module.exports = {
    User,
    Role,
    Post,
    Comment,
    Images,
    Category
}

