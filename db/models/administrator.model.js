const { Model, DataTypes, Sequelize } = require('sequelize')

const ADMINISTRATOR_TABLE = 'administrators'

const AdministratorSchema = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    names: {
        allowNull: false,
        type: DataTypes.STRING(25),
    },
    lastNames: {
        allowNull: false,
        field: 'last_names',
        type: DataTypes.STRING(25)
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING(50),
        unique: true,
    },
    isActive: {
        allowNull: false,
        field: 'is_active',
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    level: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    phoneNumber: {
        allowNull: false,
        type: DataTypes.BIGINT,
        field: 'phone_number',
        unique: true,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    startDate: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'start_date',
        defaultValue: Sequelize.NOW,
    },
    avatar: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    address: {
        allowNull: true,
        type: DataTypes.STRING(70)
    },
    citiesId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'cities_id'
    }
}

class Administrator extends Model {

    static associate() {
        
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ADMINISTRATOR_TABLE,
            modelName: 'Administrator',
            timestamps: false
        }
    }
}

module.exports = { ADMINISTRATOR_TABLE, AdministratorSchema, Administrator }