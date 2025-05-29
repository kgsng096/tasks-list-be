module.exports = (sequelize, Sequelize) => {
  const UserModel = sequelize.define(
    "UserModel",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        field: "first_name",
      },
      lastName: {
        type: Sequelize.STRING,
        field: "last_name",
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: true,
        unique: true,
        indexes: [{ unique: true, fields: ["email"] }],
      },
      password: {
        type: Sequelize.STRING,
        get() {
          return () => this.getDataValue("password");
        },
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Role",
          key: "id",
        },
        validate: {
          isInt: true,
        },
        field: "role_id",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.fn("now"),
        field: "created_at",
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.fn("now"),
        field: "updated_at",
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: "users",
    }
  );

  /* -------------------------------------------------------------------------- */
  /*                                Associations                                */
  /* -------------------------------------------------------------------------- */

  UserModel.associate = (models) => {
    UserModel.belongsTo(models.RoleModel, { foreignKey: "roleId", as: "role" });
  };

  return UserModel;
};
