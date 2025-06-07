"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 1: Add column with allowNull: true
    await queryInterface.addColumn("Employees", "name", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Step 2: Populate name field with default/filler values (optional)
    await queryInterface.sequelize.query(`
      UPDATE "Employees"
      SET "name" = 'Unnamed'
      WHERE "name" IS NULL;
    `);

    // Step 3: Alter the column to set NOT NULL
    await queryInterface.changeColumn("Employees", "name", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert: Remove the name column
    await queryInterface.removeColumn("Employees", "name");
  },
};
