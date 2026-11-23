# CampusFix — ICT251 Activity 7 Backend

Independent Node.js/Express REST API for the CampusFix Campus Maintenance Requests System.

## Requirements
- Node.js 20 or later (active LTS recommended)
- npm
- A PostgreSQL database
- Postman or another API client

## 1. Install
Open a terminal in this folder and run:

```bash
npm install
```

## 2. Configure the database
Create a PostgreSQL database named `campusfix` (or use a hosted PostgreSQL database).
Copy `.env.example` to `.env` and put your database connection URL in `DATABASE_URL`.
Never upload `.env` to GitHub.

Run `schema.sql` against your database to create the table. Then run `seed.sql` once to insert the eight fictional sample records. Do not run `seed.sql` again unless you intentionally want duplicate sample records.

For example, with the PostgreSQL command-line tool:

```bash
psql "YOUR_DATABASE_URL" -f schema.sql
psql "YOUR_DATABASE_URL" -f seed.sql
```

For a hosted database that requires SSL, set `DATABASE_SSL=true`.

## 3. Start the API
```bash
npm start
```
Open http://localhost:3000. The root page is the API guide.

## 4. API routes
| Method | URL | Purpose |
|---|---|---|
| GET | `/` | API guide |
| GET | `/health` | API/database health |
| GET | `/api/records` | Get all records |
| GET | `/api/records/:id` | Get one record |
| POST | `/api/records` | Create record |
| PUT | `/api/records/:id` | Replace all editable fields |
| DELETE | `/api/records/:id` | Delete record |

Record fields are `id`, `title`, `category`, `description`, `status`. The database generates `id`. POST and PUT require the other four fields:

```json
{
  "title": "Broken classroom light",
  "category": "Electrical",
  "description": "The light in Room B12 does not switch on.",
  "status": "Pending"
}
```

Validation:
- title: 3–80 characters
- category: 2–40 characters
- description: 5–300 characters
- status: exactly `Pending`, `In progress`, or `Completed`

Success codes: GET/PUT/DELETE 200; POST 201.
Error codes: invalid input/malformed JSON 400; missing record or route 404; unexpected error 500; database health failure 503.

## 5. Test with Postman
Use `http://localhost:3000` as the base URL.

1. GET `/health`
2. GET `/api/records`
3. POST `/api/records` with Body → raw → JSON and the sample JSON above. Save the returned `id`.
4. GET `/api/records/ID` using the returned id.
5. PUT `/api/records/ID` with all four editable fields.
6. DELETE `/api/records/ID`.
7. GET that id again; it should return 404.
8. Try a POST with an invalid status; it should return 400.

## 6. Deploy to Render
1. Push this backend folder to a GitHub repository. Include `package.json` and `package-lock.json`; do not include `.env` or `node_modules`.
2. Create a PostgreSQL database using a provider/plan available to you. Copy its **internal** connection URL for a Render web service where supported; otherwise use the provider's external URL.
3. Create a Render Web Service connected to the repository. If the backend is in the repository root, leave Root Directory blank.
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables in Render:
   - `DATABASE_URL` = your PostgreSQL connection URL
   - `DATABASE_SSL` = `true` if required by your database provider
   - `STUDENT_NAME` = your full name
   - `STUDENT_NUMBER` = your student number
   - `CLIENT_ORIGINS` = your frontend origin when needed (comma-separated); for API-only testing it may be left blank
7. Deploy and open the assigned HTTPS URL. Test `/`, `/health`, and every CRUD route using the hosted URL.

Render's free web services may sleep while idle. The first request after inactivity can take time. Keep database storage separate from the web service filesystem so records persist.

## Activity 7 form
The live base URL to submit is the root URL of your deployed Render service, for example `https://your-service.onrender.com` (not a route ending in `/api/records`). The lecturer's form asks for your own student number and student name. Do not submit passwords or database credentials.
