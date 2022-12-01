const { Model, DataTypes } = require('sequelize')

const STATE_TABLE = 'states'

const StateSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    stateName: {
        allowNull: false,
        field: 'state_name',
        type: DataTypes.STRING(25)
    },
    countriesId: {
        allowNull: false,
        field: 'countries_id',
        type: DataTypes.INTEGER
    }
}

class State extends Model{
    static associate(models) {
        this.hasMany(models.City, { 
            as: 'city',
            foreignKey: 'statesId'
         })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: STATE_TABLE,
            modelName: 'State',
            timestamps: false
        }
    }
}

module.exports = { STATE_TABLE, StateSchema, State }