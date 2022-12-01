const { Model, DataTypes, Sequelize } = require('sequelize')

const USER_TABLE = 'users'

const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    names: {
        allowNull: false,
        type: DataTypes.STRING(25),
    },
    lastNames: {
        allowNull: false,
        type: DataTypes.STRING(25),
        field: 'last_names',
    },
    email: {
        allowNull: true,
        type: DataTypes.STRING(50),
        unique: true,
    },
    isActive: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        field: 'is_active',
        defaultValue: true,
    },
    isApproved: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        field: 'is_approved',
        defaultValue: false,
    },
    isTechnical: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'is_technical',
        defaultValue: false,
    },
    isVerified: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        field: 'is_verified',
        defaultValue: false,
    },
    phoneNumber: {
        allowNull: false,
        type: DataTypes.BIGINT,
        field: 'phone_number',
        unique: true,
    },
    password: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    startDate: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        field: 'start_date'
    },
    avatar: {
        allowNull: true,
        type: DataTypes.STRING, 
    }
}

class User extends Model {
    static associate(models) {
        this.hasMany(models.Address, { 
            as: 'address',
            foreignKey: 'usersId'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        }
    }
}

module.exports = { USER_TABLE, UserSchema, User }