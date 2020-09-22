const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                firstname: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                },
                lastname: {
                    type: Sequelize.STRING(200),
                    allowNull: false
                },
                email: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                    unique: true,
                    validate: {
                        isEmail: true
                    }
                },
                password: {
                    type: Sequelize.STRING(150),
                    allowNull: false
                },
                photo: {
                    type: Sequelize.STRING(200),
                    allowNull: true
                },
                phone: {
                    type: Sequelize.STRING(50),
                    allowNull: true
                },
                resetPasswordToken: {
                    type: Sequelize.TEXT,
                    allowNull: true
                },
                resetPasswordExpires: {
                    type: Sequelize.DATE,
                    allowNull: true
                },
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE,
            },
            { sequelize, modelName: 'user', underscored: true, tableName: 'users', timestamps: true, paranoid: true, 
        hooks: {
            beforeCreate: (user, options) => {
                return new Promise((resolve, rejected) => {
                    user.password = bcrypt.hashSync(
                        user.password,
                        bcrypt.genSaltSync(10),
                        null
                    );
                    resolve(user, options);
                });
            }
        }
        }
        );
    }

    static associate(models) {
        this.role = this.belongsTo(models.Role);
        this.agency = this.belongsTo(models.Agency);
        this.vehicle = this.belongsTo(models.Vehicle);
    }

    get fullName() {
        return this.firstname + ' ' + this.lastname;
    }

    //This will check if an unhashed password entered by the 
    //user can be compared to the hashed password stored in our database
    validPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    beforeCreate(user) {
        return new Promise((resolve, rejected) => {
            user.password = bcrypt.hashSync(
                user.password,
                bcrypt.genSaltSync(10),
                null
            );
            resolve(user);
        });
    }

}

module.exports = User;