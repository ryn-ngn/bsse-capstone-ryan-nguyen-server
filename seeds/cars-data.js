/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const carsData = require("./compactCarsData.json");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("cars").del();
  await knex("cars").insert(carsData);
};
