# Message Storage Application

A full-stack web application that allows users to store and retrieve messages using a React TypeScript frontend and Java Spring Boot backend with SQLite database.

## Features

- **Message Storage**: Submit messages through a web form
- **Real-time Display**: View all stored messages in a list
- **Input Sanitization**: Both frontend and backend sanitize user input for security
- **Persistent Storage**: Messages are stored in SQLite database
- **RESTful API**: Clean API endpoints for message operations

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Backend**: Java 21 with Spring Boot 3.3.0
- **Database**: SQLite
- **Build Tools**: Maven (backend), npm (frontend)

## Prerequisites

Before running the application, ensure you have the following installed:

- **Java 21** (JDK)
- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **Maven** (v3.6 or higher)
- **SQLite3** (for database management)

## Project Structure

```
Project/
├── frontend/          # React TypeScript application
│   ├── src/
│   ├── package.json
│   └── ...
├── backend/           # Spring Boot Java application
│   ├── src/
│   ├── pom.xml
│   └── ...
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Project
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Build the Spring Boot application:
```bash
mvn clean package
```

This will:
- Download all Maven dependencies
- Compile the Java code
- Create an executable JAR file in `target/` directory

### 3. Frontend Setup

Navigate to the frontend directory:
```bash
cd frontend
```

Install Node.js dependencies:
```bash
npm install
```

## Running the Application

### Start the Backend Server

In the `backend` directory:
```bash
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

The Spring Boot server will start on `http://localhost:8080`

**Expected output:**
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.3.0)
```

### Start the Frontend Server

In the `frontend` directory (in a new terminal):
```bash
npm start
```

The React development server will start on `http://localhost:3000`

**Expected output:**
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

## Using the Application

1. Open your browser and navigate to `http://localhost:3000`
2. You'll see the "Message Storage App" interface
3. Enter a message in the input field
4. Click "Send" to store the message
5. The message will appear in the "Stored Messages" list below

## API Endpoints

The backend provides the following REST endpoints:

- **GET** `/api/messages` - Retrieve all stored messages
- **POST** `/api/messages` - Store a new message

### Example API Usage

**Get all messages:**
```bash
curl http://localhost:8080/api/messages
```

**Store a message:**
```bash
curl -X POST http://localhost:8080/api/messages \
  -H "Content-Type: application/json" \
  -d '{"content":"Hello World"}'
```

## Database Management

The application uses SQLite with a file named `messages.db` in the backend directory.

### Access Database via Command Line

Navigate to the backend directory:
```bash
cd backend
sqlite3 messages.db
```

**Common SQLite commands:**
```sql
-- View all messages
SELECT * FROM messages;

-- Clear all messages
DELETE FROM messages;

-- Reset auto-increment counter
DELETE FROM sqlite_sequence WHERE name='messages';

-- Exit SQLite
.quit
```

### Clear Database (One-liner)
```bash
cd backend && sqlite3 messages.db "DELETE FROM messages; DELETE FROM sqlite_sequence WHERE name='messages';"
```

## Security Features

- **Input Sanitization**: Both frontend and backend sanitize user input
- **CORS Configuration**: Backend allows cross-origin requests from frontend
- **SQL Injection Prevention**: Uses parameterized queries via JdbcTemplate

## Development

### Backend Development
- Main application: `backend/src/main/java/com/example/BackendApplication.java`
- REST Controller: `backend/src/main/java/com/example/MessageController.java`
- Database operations: `backend/src/main/java/com/example/MessageRepository.java`
- Configuration: `backend/src/main/resources/application.properties`

### Frontend Development
- Main component: `frontend/src/App.tsx`
- Styles: `frontend/src/App.css`

## Troubleshooting

### Common Issues

1. **Port already in use**: 
   - Backend: Change port in `application.properties`
   - Frontend: React will automatically suggest an alternative port

2. **Database connection issues**:
   - Ensure SQLite is installed
   - Check file permissions for `messages.db`

3. **CORS errors**:
   - Verify backend is running on port 8080
   - Check that `@CrossOrigin` annotation is present in controller

4. **Build failures**:
   - Backend: Run `mvn clean` then `mvn package`
   - Frontend: Delete `node_modules` and run `npm install`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Submit a pull request

## License

This project is for educational purposes.