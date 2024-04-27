/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const carsData = require("./seed_compactCarsData.json");
const userCarsSampleData = require("./seed_userCarsSample.json");
const journalEventsSampleData = require("./seed_journalEventsSample.json");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("cars").del();
  await knex("users").del();
  await knex("userCars").del();
  await knex("journalEvents").del();

  await knex("cars").insert(carsData);
  await knex("userCars").insert(userCarsSampleData);
  await knex("journalEvents").insert(journalEventsSampleData);
};
