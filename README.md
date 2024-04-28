# bsse-capstone-ryan-nguyen-server

Server Repo for BrainStation capstone project

.env variable <must be created locally>:
JWT_SECRET=<add here>
JWT_SALT_ROUNDS=<add here>
OPENAI_API_KEY=<add here>

.env variable can be used or created locally:
PORT=8080
DB_HOST=127.0.0.1
DB_LOCAL_DBNAME=bsse-capstone-ryan-nguyen
DB_LOCAL_USER=root
DB_LOCAL_PASSWORD=8808

BE Tasks:

- Setup back-end repo, mysql, migration, seeds

cars route:

- Handler for GET '/api/cars/lookup',
  Expected body: {
  "make": make,
  "model": model,
  "year": year
  }
- Handler for GET '/api/cars/:carId',
  Sample response:
  {
  "id": 654795,
  "basemodel": "John Cooper Works",
  "drive": "Front-Wheel Drive",
  "make": "MINI",
  "model": "John Cooper Works Convertible",
  "trany": "Manual 6-spd",
  "vclass": "Minicompact Cars",
  "year": "2017"
  }

---

user routes:

- Handler for POST '/api/users/register'
  expected body: {
  userName: userName,
  firstName: firstName,
  password: password
  }

- Handler for POST '/api/users/login'
  Sample login response:
  {
  "Bearer": "token"
  }

---

userCars routes:

- Handler for GET '/api/userCars/:userId',
  sample response:
  [
  {
  "ownershipId": "abc123",
  "carId": "83042",
  "userId": "3a90cc02-4b09-41c6-a94e-aaf05a983437"
  },
  {
  "ownershipId": "def456",
  "carId": "84038",
  "userId": "3a90cc02-4b09-41c6-a94e-aaf05a983437"
  }
  ]

- Handler for POST '/api/userCars/:userId'

- Handler for DELETE '/api/userCars/:userId'

---

journalEvents routes:

- Handler for GET '/api/journalEvents/:userId/:carId'
- Handler for POST '/api/journalEvents/:userId/:carId'
- Handler for DELETE '/api/journalEvents/:userId/:carId/:eventId'

---

Database structure:
Database includes 05 tables:

- Cars
- Users: UserID (PK), userName, firstName, hashedPassword
- UserCars: ownershipId (PK), carId, userId
- JournalEvents: eventId, ownershipId, eventType, eventDate, eventCost, eventNotes
- UserCarInfo: infoId (PR), ownershipId, infoKey, infoValue

Helper functions:

-
