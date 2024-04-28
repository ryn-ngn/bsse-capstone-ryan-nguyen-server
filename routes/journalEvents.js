const router = require("express").Router();
const {
  getAllJournalEventsByCarId,
  createJournalEvent,
  deleteJournalEventById,
} = require("../utils/journalEvents-controller");

// retrieve service journal event for carId and userId
// expected params: { userId, carId}
router
  .route("/:userId/:carId")
  .get(getAllJournalEventsByCarId)
  .post(createJournalEvent);

router.route("/:userId/:carId/:eventId").delete(deleteJournalEventById);

module.exports = router;
