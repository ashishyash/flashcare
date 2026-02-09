# Mock Data Server

## Start JSON Server

Run the following command to start the mock API server:

```bash
npm run json-server
```

The server will run on `http://localhost:3000`

## Available Endpoints

- GET /users
- GET /patients
- GET /appointments
- GET /dashboard

## Example Usage

```bash
# Get all patients
curl http://localhost:3000/patients

# Get specific patient
curl http://localhost:3000/patients/1

# Login (POST)
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"email":"admin@flashcare.com","password":"admin123"}'
```
