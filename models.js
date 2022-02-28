import { Sequelize, Model, DataTypes } from 'sequelize';
import config from './config/config';

const sequelize = new Sequelize(config.postgres.url, {
    dialect: 'postgres',
    logging: false //Set this to true to see the SQL queries when debugging
});

export class User extends Model {};

User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sessionToken: {
        type: DataTypes.STRING,
    },
    sessionExpiry: {
        type: DataTypes.DATEONLY
    }
},
{
    sequelize,
    modelName: 'user',
    timestamps: false
}
)