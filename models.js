import { Sequelize, Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import config from './config/config';

const sequelize = new Sequelize(config.postgres.url, {
    dialect: 'postgres',
    logging: false //Set this to true to see the SQL queries when debugging
});

class User extends Model {};

User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    session_token: {
        type: DataTypes.STRING,
    },
    session_expiry: {
        type: DataTypes.DATEONLY
    }
},
{
    sequelize,
    modelName: 'user',
    timestamps: false,

    // We add a hook here to hash the password before it is saved to the database
    hooks: {
        beforeCreate: async (user) => {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            user.password = await bcrypt.hash(user.password, salt);
        }
    }
}
);

User.prototype.isPasswordValid = async function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = { User, sequelize }