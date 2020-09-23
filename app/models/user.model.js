const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        lastname: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: Sequelize.STRING(150),
          allowNull: false,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      },
      {
        sequelize,
        modelName: 'user',
        underscored: true,
        tableName: 'users',
        timestamps: true,
        paranoid: true,
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
          },
        },
      }
    );
  }

  static associate(models) {
    // Agregar acá las relaciones
  }

  //Valida el password ingresado con el hasheado en la BD
  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
  
  // Hook que hashea la pass del usuario antes de ser creado
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
