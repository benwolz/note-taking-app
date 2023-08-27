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

### Edge Case Responses
- If a note whose ID does not exist is queried, a 404 error will be returned. 
- A note's title cannot be empty, but its content can be. This is enforced on the frontend by preventing users to save if the title is empty, and returns a 400 if a query with an empty title is sent to the backend API.
- Only the text of the most recent note can be edited. This is enforced on the frontend and the update API will only add a new version, so editing old versions is not supported.

## Improvements & Retrospective
Given more time, I would have taken more time to surface specific errors from the backend API, added a more interactive note creation form on the frontend, and included more validation in the `Note.js` class. 

I spent far longer than I would have expected setting up the frontend, but my experience with React is a bit rusty, so I had to take some time to refamliarize myself with building components and styling. **Disclaimer:** I have limited experience with the visual design/layout of frontend components with CSS, so I leveraged ChatGPT for the setup and design of the Tailwind CSS components used in this app.

