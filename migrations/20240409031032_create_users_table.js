/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.string("id").primary();
    table.string("userName").notNullable();
    table.string("hashedPassword").notNullable();
    table.string("firstName").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  // Drop tables in migrate:rollback
  return knex.schema.dropTable("users");
};
