# README

## How to Setup & Run

### Backend Setup

```bash
cd server
npm install
```

### Frontend Setup

```bash
cd client
npm install
```

### Run App

```bash
npm install
npm start
``` 

Make sure to run the commands in the order specified above.

## Design Decisions and Edge Case Handling
This app was built an express backend with two classes, `Note.js`, which handles data for an individual note object, and `NoteManager.js`, which manages the list of notes for a given client session. API calls interact with the `NoteManager.js` class, which then interacts with the `Note.js` class to perform the CRUD action. The frontend is hosted at https://localhost/3000, and interacts with the server hosted at https://localhost/3000.



