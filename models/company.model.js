const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db.config');

// Define the User class by extending Model
class Company extends Model { }

// initializing user model

Company.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        sequelize, // sequelize instance
        modelName: 'Company',
        tableName: 'companies',
        timestamps: false // This will disable createdAt and updatedAt
    }
);
// Define the association
Company.associate = (models) => {
    Company.belongsToMany(models.User, {
        through: 'UserCompany',
        foreignKey: 'company_id'
    });
};

module.exports = Company;