const { Model, DataTypes } = require('sequelize')
const { STATE_TABLE } = require('./state.model')

const CITIES_TABLE = 'cities'

const CitiesSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    cityName: {
        allowNull: false,
        type: DataTypes.STRING(40),
        field: 'city_name'
    },
    weAreHere: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'we_are_here'
    },
    statesId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'states_id',
        references: {
            model: STATE_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    }
}

class Cities extends Model {
    static associate(models){
        this.hasMany(models.Address, {
            as: 'address',
            foreignKey: 'citiesId'
        })
        this.hasMany(models.Location, {
            as: 'location',
            foreignKey: 'citiesId'
        })
        this.belongsTo(models.State, { as: 'state', foreignKey: 'id' })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CITIES_TABLE,
            modelName: 'City',
            timestamps: false
        }
    }
}

module.exports = { CITIES_TABLE, CitiesSchema, Cities }