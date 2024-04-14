/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("userCarInfo", (table) => {
    table.string("infoId").primary();
    table.string("ownershipId").notNullable();
    table.string("infoKey").notNullable();
    table.string("infoValue").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("userCarInfo");
};
