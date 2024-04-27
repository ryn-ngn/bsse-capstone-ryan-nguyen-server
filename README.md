# bsse-capstone-ryan-nguyen-server

Server Repo for BrainStation capstone project

.env variable <must be created locally>:
JWT_SECRET=<add here>
JWT_SALT_ROUNDS=<add here>

.env variable can be used or created locally:
PORT=8080
DB_HOST=127.0.0.1
DB_LOCAL_DBNAME=bsse-capstone-ryan-nguyen
DB_LOCAL_USER=root
DB_LOCAL_PASSWORD=8808

BE Tasks:

- Setup back-end repo, mysql, migration, seeds
  user routes:
- Handler for POST '/api/users/register'
- Handler for POST '/api/users/login'

userCars routes:

- Handler for GET '/api/userCars/:userId',
- Handler for POST '/api/userCars/:userId'
- Handler for DELETE '/api/userCars/:userId'

journalEvents routes:

- Handler for GET '/api/journalEvents/:userId/:carId'
- Handler for POST '/api/journalEvents/:userId/:carId'
- Handler for DELETE '/api/journalEvents/:userId/:carId/:eventId'

Database structure:
Database includes 05 tables:

- Cars
- Users: UserID (PK), userName, firstName, hashedPassword
- UserCars: ownershipId (PK), carId, userId
- JournalEvents: eventId, ownershipId, eventType, eventDate, eventCost, eventNotes
- UserCarInfo: infoId (PR), ownershipId, infoKey, infoValue

Helper functions:

-
