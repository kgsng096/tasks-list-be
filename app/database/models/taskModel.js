module.exports = (sequelize, Sequelize) => {
  const TaskModel = sequelize.define(
    "TaskModel",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        field: "user_id",
        allowNull: false,
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
      tableName: "tasks",
    }
  );

  /* -------------------------------------------------------------------------- */
  /*                                Associations                                */
  /* -------------------------------------------------------------------------- */

  TaskModel.associate = (models) => {
    TaskModel.belongsTo(models.UserModel, {
      foreignKey: "userId",
      as: "tasks",
    });
  };

  return TaskModel;
};
