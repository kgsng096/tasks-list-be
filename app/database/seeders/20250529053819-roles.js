"use strict";

const USER_ROLES = {
  ADMIN: "Admin",
  MEMBER: "Member",
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userTypeList = Object.values(USER_ROLES);
    const roles = userTypeList.map((role) => ({
      name: role,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    /* Check if roles already exist */
    const existingRoles = await queryInterface.sequelize.query(
      `SELECT name FROM roles WHERE name IN (:names)`,
      {
        replacements: { names: userTypeList },
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );

    const existingRoleNames = existingRoles.map((role) => role.name);

    /* Filter out roles that already exist */
    const newRoles = roles.filter(
      (role) => !existingRoleNames.includes(role.name)
    );

    console.log("Roles to add", newRoles);

    if (newRoles.length > 0) {
      await queryInterface.bulkInsert("roles", newRoles, {});
    }

    return;
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
