const { Model, DataTypes } = require('sequelize')

const { USER_TABLE } = require('./user.model')
const { CITIES_TABLE } = require('./cities.model')

const ADDRESSES_TABLE = 'addresses'

const AddressSchema = {
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
    isActive: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active'
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
    usersId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'users_id',
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
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
        onDelete: 'CASCADE'
    }
}

class Address extends Model {
    static associate(models) {
        this.belongsTo(models.User, { as: 'user', foreignKey: 'id'})
        this.belongsTo(models.City, { as: 'city', foreignKey: 'id' })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ADDRESSES_TABLE,
            modelName: 'Address',
            timestamps: false
        }
    }
}

module.exports = { ADDRESSES_TABLE, AddressSchema, Address }