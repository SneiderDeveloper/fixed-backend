const { Model, DataTypes } = require('sequelize')
const { CITIES_TABLE } = require('./cities.model')

const LOCATIONS_TABLE = 'locations'

const LocationSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    address: {
        allowNull: false,
        type: DataTypes.STRING(70),
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(50)
    },
    phoneNumber: {
        allowNull: false,
        field: 'phone_number',
        type: DataTypes.BIGINT,
    },
    additionalData: {
        allowNull: true,
        field: 'additional_data',
        type: DataTypes.STRING,
    },
    citiesId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'cities_id',
        references: {
            model: CITIES_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',   
    }
}

class Location extends Model {
    static associate(models){
        this.hasMany(models.Request, { 
            as: 'request',
            foreignKey: 'locationsId'
        })
        this.belongsTo(models.City, { as: 'city', foreignKey: 'id'})
    }

    static config(sequelize){
        return {
            sequelize,
            modelName: 'Location',
            tableName: LOCATIONS_TABLE,
            timestamps: false,
        }
    }
}

module.exports = { LOCATIONS_TABLE, LocationSchema, Location }