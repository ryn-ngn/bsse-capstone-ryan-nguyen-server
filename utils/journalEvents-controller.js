const knex = require("knex")(require("../knexfile"));
const uuid = require("uuid").v4;
const { getOwnershipId } = require("./helper");

// retrieve service entries for a carID
// expected body { userId: userId}
const getAllJournalEventsByCarId = async (req, res) => {
  const { carId } = req.params;
  const { userId } = req.body;
  if (!carId) {
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
  const { carId } = req.params;
  if (!carId) {
    res.status(400).send("car id is empty");
  }
  const { userId, eventType, eventCost, eventNotes } = req.body;

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

// edit service entry for a car ID

module.exports = { getAllJournalEventsByCarId, createJournalEvent };
