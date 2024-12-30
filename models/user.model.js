const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db.config');

// Define the User class by extending Model
class User extends Model { }

// initializing user model

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phonenumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},
    {
        sequelize, // sequelize instance
        modelName: 'User',
        tableName: 'users',
        timestamps: false // This will disable createdAt and updatedAt
    },

);
// Define the association
User.associate = (models) => {
    User.belongsToMany(models.Company, {
        through: 'UserCompany',
        foreignKey: 'user_id'
    });
};

module.exports = User;