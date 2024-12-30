const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db.config'); // Ensure this points to your sequelize instance

class UserCompany extends Model { }

UserCompany.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // Name of the referenced table
                key: 'id',      // Referencing the `id` field in the users table
            },
            onDelete: 'CASCADE', // If the user is deleted, the associations are also removed
        },
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'companies', // Name of the referenced table
                key: 'id',          // Referencing the `id` field in the companies table
            },
            onDelete: 'CASCADE', // If the company is deleted, the associations are also removed
        }
    },
    {
        sequelize,           // Sequelize instance
        modelName: 'UserCompany',  // Model name
        tableName: 'user_companies', // Corresponding table name in the DB
        timestamps: false,    // Disable `createdAt` and `updatedAt` fields
        indexes: [
            {
                unique: true,    // Ensure the combination of user_id and company_id is unique
                fields: ['user_id', 'company_id'],
            }
        ]
    }
);

module.exports = UserCompany;
