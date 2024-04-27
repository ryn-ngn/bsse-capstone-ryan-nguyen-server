const router = require("express").Router();
const {
  getAllJournalEventsByCarId,
  createJournalEvent,
} = require("../utils/journalEvents-controller");

// retrieve service journal event for carId and userId
// expected body: { userId}
router
  .route("/:userId/:carId")
  .get(getAllJournalEventsByCarId)
  .post(createJournalEvent);

module.exports = router;
