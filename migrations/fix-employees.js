// migrations/fix-employees.js
"use strict";

module.exports = {
  async up(queryInterface) {
    // Just rename columns to match your model
    await queryInterface.renameColumn("employees", "employerId", "employer_id");
    await queryInterface.renameColumn("employees", "nationalId", "national_id");
    await queryInterface.renameColumn(
      "employees",
      "phoneNumber",
      "phone_number",
    );
    await queryInterface.renameColumn("employees", "roleId", "role_id");
  },

  async down(queryInterface) {
    // Undo the renames if needed
    await queryInterface.renameColumn("employees", "employer_id", "employerId");
    await queryInterface.renameColumn("employees", "national_id", "nationalId");
    await queryInterface.renameColumn(
      "employees",
      "phone_number",
      "phoneNumber",
    );
    await queryInterface.renameColumn("employees", "role_id", "roleId");
  },
};
