/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("journalEvents", (table) => {
    table.string("eventId").primary();
    table.string("ownershipId").notNullable();
    table.string("eventType").notNullable();
    table.string("eventDate").notNullable();
    table.string("eventCost").notNullable();
    table.string("eventNotes").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("journalEvents");
};
