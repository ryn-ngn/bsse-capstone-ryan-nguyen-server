# bsse-capstone-ryan-nguyen-server

Server Repo for BrainStation capstone project

BE Tasks:

- Setup back-end repo, mysql, migration, seeds
- Handler for POST '/register'
- Handler for GET '/', POST '/login'

- Handler for GET '/collection',
- Handler for POST '/collection'

- Handler for GET '/collection/:id'
- Handler for DELETE '/collection/:id',
- Handler for PUT '/collection/:id',

- Handler for GET '/collection/:id/service-record'
- Handler for POST '/collection/:id/service-record'

- Handler for GET '/collection/:id/service-record/:recordId'
- Handler for DELETE '/collection/:id/service-record/:recordId'
- Handler for PUT '/collection/:id/service-record/:recordId'

Database structure:
Database includes 05 tables:

- Cars
- Users: UserID (PK), userName, firstName, hashedPassword
- UserCars: ownershipId (PK), carId, userId
- JournalEvents: eventId, ownershipId, eventType, eventDate, eventCost, eventNotes
- UserCarInfo: infoId (PR), ownershipId, infoKey, infoValue
