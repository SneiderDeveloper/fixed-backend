const { DataTypes, Model } = require('sequelize')

const FEEDBACK_TABLE = 'feedback'

const FeedbackSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    fixThis: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'fix_this'
    },
    date: {
        allowNull: false,
        type: DataTypes.DATE,
    },
}

class Feedback extends Model {
    
    static associate(models) {
        
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: FEEDBACK_TABLE,
            modelName: 'Feedback',
            timestamps: false
        }
    }
}

module.exports = { FEEDBACK_TABLE, FeedbackSchema, Feedback }