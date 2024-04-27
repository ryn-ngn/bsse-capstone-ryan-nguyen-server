const knex = require("knex")(require("../knexfile"));
const uuid = require("uuid").v4;
const { getOwnershipId } = require("./helper");

// retrieve service entries for a carID
// expected body { userId: userId}
const getAllJournalEventsByCarId = async (req, res) => {
  const { carId, userId } = req.params;

  if (!carId || !userId) {
    res.status(400).send("car id is empty");
  }

  try {
    const ownershipId = await getOwnershipId(carId, userId);
    const journalEvents = await knex("journalEvents").where(
      "ownershipId",
      ownershipId
    );
    return res.status(200).json(journalEvents);
  } catch (error) {
    res
      .status(400)
      .res.status(400)
      .send("Failed to retrieve service journal events");
  }
};

// create service entry for a car ID
const createJournalEvent = async (req, res) => {
  const { carId, userId } = req.params;

  if (!carId || !userId) {
    res.status(400).send("car id is empty");
  }
  const { eventType, eventCost, eventNotes } = req.body;

  try {
    const ownershipId = await getOwnershipId(carId, userId);
    const journalEventData = {
      eventId: uuid(),
      ownershipId: ownershipId,
      eventType: eventType,
      eventDate: Date.now(),
      eventCost: eventCost,
      eventNotes: eventNotes,
    };

    await knex("journalEvents").insert(journalEventData);

    return res.status(200).json(journalEventData);
  } catch (error) {
    res.status(400).res.status(400).send("Failed to create service journal event");
  }
};

// delete service entry for a car ID
const deleteJournalEventById = async (req, res) => {
  const { eventId } = req.params;

  if (!eventId) {
    res.status(400).send("journal event empty");
  }

  try {
    await knex("journalEvents").where("eventId", eventId).delete();

    return res.status(200).json("Journal entry deleted").end();
  } catch (error) {
    res.status(400).send("Failed to delete service journal event");
  }
};
// edit service entry for a car ID

module.exports = {
  getAllJournalEventsByCarId,
  createJournalEvent,
  deleteJournalEventById,
};
