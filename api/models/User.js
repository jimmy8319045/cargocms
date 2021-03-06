module.exports = {
  attributes: {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    locale: {
      type: Sequelize.STRING,
      defaultValues: 'zh_TW'
    },
    displayName: {
      type: Sequelize.VIRTUAL,
      get: function() {
        const locale = this.getDataValue('locale');
        const firstName = this.getDataValue('firstName');
        const lastName = this.getDataValue('lastName');

        let displayName = firstName + lastName;
        if (locale === 'zh_TW') displayName = lastName + firstName;

        return displayName;
      }
    },
    RolesArray: {
      type: Sequelize.VIRTUAL,
      get: function() {
        try {
          const roles = this.Roles ? this.Roles.map((role) => role.authority) : [];
          return roles;
        } catch (e) {
          sails.log.error(e);
        }
      }
    },
    userAgent: {
      type: Sequelize.STRING,
    },
    lastLogin: {
      type: Sequelize.DATE,
    }
  },
  associations: function() {
    User.hasMany(Post);
    User.hasMany(Passport);
    User.belongsToMany(Role, {through: 'UserRole'});
  },
  options: {
    classMethods: {
      findOneWithPassport: async function({userId}) {
        sails.log.info("findOneWithPassport userId=>", userId);
        return await User.findOne({
          where: {
            id: userId
          },
          include: [ Role, {
              model: Passport,
              where: { provider: 'local' }
          }],
        });
      },
      deleteById: async (id) => {
        try {
          return await User.destroy({ where: { id } });
        } catch (e) {
          sails.log.error(e);
          throw e;
        }
      },
    },
    instanceMethods: {
      loginSuccess: async function({ userAgent }) {
        const now = new Date();
        this.userAgent = userAgent;
        this.lastLogin = now.getTime();
        await this.save();
      }
    },
    hooks: {
      afterCreate: async function(user, options) {
        const userRole = await Role.findOne({where: {authority: 'user'}});
        sails.log.info(userRole.toJSON());
        await user.addRole(userRole);
      }
    }
  }
};
