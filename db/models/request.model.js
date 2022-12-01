const { DataTypes, Sequelize, Model } = require('sequelize')
const { LOCATIONS_TABLE } = require('./locations.model')

const REQUEST_TABLE = 'requests'

const RequestSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    crux:{
        allowNull: false,
        type: DataTypes.STRING(255),
    },
    technicianObservation: {
        allowNull: true,
        type: DataTypes.STRING(255),
        field: 'technician_observation',
    },
    isCanceled: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_canceled'
    },
    isRejected: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_rejected'
    },
    isOpen: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_open'
    },
    atHome: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'at_home'
    },
    atBusiness: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'at_business',
    },
    atRemote: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'at_remote'
    },
    missionCompletedDate: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'mission_completed_date',
    },
    requestDate: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        field: 'request_date'
    },
    dateOfVisit: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'date_of_visit'
    },
    status: {
        allowNull: true,
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    serviceValue: {
        allowNull: true,
        type: DataTypes.DOUBLE,
        defaultValue: 0,
        field: 'service_value'
    },
    locationsId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'locations_id',
        references: {
            model: LOCATIONS_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    }
}

class Request extends Model {

    static associate(models) {
        this.belongsTo(models.Location, { as: 'location' })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: REQUEST_TABLE,
            modelName: 'Request',
            timestamps: false,
        }
    }
}

module.exports = { REQUEST_TABLE, RequestSchema, Request }
