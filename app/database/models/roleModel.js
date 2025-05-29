module.exports = (sequelize, Sequelize) => {
  const RoleModel = sequelize.define(
    "RoleModel",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
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
      tableName: "roles",
    }
  );

  /* -------------------------------------------------------------------------- */
  /*                                Associations                                */
  /* -------------------------------------------------------------------------- */

  return RoleModel;
};
