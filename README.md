# Note Taker Application

## Description

This application can be used to write, save, and delete notes. This application uses `express` backend and saves and retrieve note data from a JSON file.

The application provides the following API routes:

- GET `/api/notes` - reads the `db.json` file and returns all saved notes as JSON
- POST `/api/notes` - recieves a new note to save on the request body, adds it to the `db.json` file, and then returns the new note to the client.
- DELETE `/api/notes/:id` - recieves a query paramter containing the id of a note to delete. This means an id is created for each note when the note is added to `db.json`.

![Splash Screen](public/assets/images/screenshot.PNG)
![Splash Screen](public/assets/images/screenshot2.PNG)
