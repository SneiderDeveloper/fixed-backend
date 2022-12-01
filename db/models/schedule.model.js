const { Model, DataTypes } = require('sequelize')

const SCHEDULE_TABLE = 'schedules'

const ScheduleSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    everyday: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    weekday: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    weekends: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    from: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    to: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    usersId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'users_id'
    }
}

class Schedule extends Model {
    static associate() {

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: SCHEDULE_TABLE,
            modelName: 'Schedule',
            timestamps: false
        }
    }
}

module.exports = { SCHEDULE_TABLE, ScheduleSchema, Schedule }