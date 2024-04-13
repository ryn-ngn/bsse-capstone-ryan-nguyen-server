/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("cars", (table) => {
    table.increments("id").primary();
    table.string("basemodel").notNullable();
    table.string("drive").notNullable();
    table.string("make").notNullable();
    table.string("model").notNullable();
    table.string("trany").notNullable();
    table.string("vclass").notNullable();
    table.string("year").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  // Drop tables in migrate:rollback
  return knex.schema.dropTable("cars");
};
