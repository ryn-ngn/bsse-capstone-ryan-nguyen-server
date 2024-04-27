# bsse-capstone-ryan-nguyen-server

Server Repo for BrainStation capstone project

BE Tasks:

- Setup back-end repo, mysql, migration, seeds
- Handler for POST '/api/users/register'
- Handler for POST '/api/users/login'

- Handler for GET '/userCars',
- Handler for POST '/userCars'

- Handler for GET '/userCars/:id'
- Handler for DELETE '/userCars/:id',
- Handler for PUT '/userCars/:id',

- Handler for GET '/userCars/:id/service-record'
- Handler for POST '/userCars/:id/service-record'

- Handler for GET '/userCars/:id/service-record/:recordId'
- Handler for DELETE '/userCars/:id/service-record/:recordId'
- Handler for PUT '/userCars/:id/service-record/:recordId'

Database structure:
Database includes 05 tables:

- Cars
- Users: UserID (PK), userName, firstName, hashedPassword
- UserCars: ownershipId (PK), carId, userId
- JournalEvents: eventId, ownershipId, eventType, eventDate, eventCost, eventNotes
- UserCarInfo: infoId (PR), ownershipId, infoKey, infoValue

Helper functions:

-
