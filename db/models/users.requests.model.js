const { Model, DataTypes, Sequelize } = require('sequelize')

const USERS_REQUESTS = 'users_requests'

const UsersRequestsSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    usersId: {
        allowNull: false,
        field: 'users_id',
        type: DataTypes.INTEGER,
    },
    requestId: {
        allowNull: false,
        field: 'request_id',
        type: DataTypes.INTEGER
    }
}

class UsersRequests extends Model {
    static associate() {

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USERS_REQUESTS,
            modelName: 'UsersRequests',
            timestamps: false,
        }
    }
}

module.exports = { USERS_REQUESTS, UsersRequestsSchema, UsersRequests }