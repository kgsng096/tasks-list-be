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
      name: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: true,
        unique: true,
        indexes: [{ unique: true, fields: ["email"] }],
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
