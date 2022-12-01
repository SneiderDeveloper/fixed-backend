const { DataTypes, Model } = require('sequelize')

const { USER_TABLE } = require('./user.model')

const DOCUMENT_TABLE = 'documents'

const DocumentSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    idFront: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'id_front'
    },
    idBack: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'id_back'
    },
    usersId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        field: 'users_id',
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}

class Document extends Model {
    
    static associate(models) {
        // this.belongsTo(models.Users, { as: 'user' })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: DOCUMENT_TABLE,
            modelName: 'Document',
            timestamps: false
        }
    }
}

module.exports = { DOCUMENT_TABLE, DocumentSchema, Document }