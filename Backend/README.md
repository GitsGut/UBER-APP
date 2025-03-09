# User Registration API Documentation

## POST /users/register

Register a new user in the system.

### Description
This endpoint allows new users to create an account by providing their personal information and credentials.

### Request
- Method: `POST`
- URL: `/users/register`
- Content-Type: `application/json`

### Request Body Parameters
| Parameter  | Type     | Required | Description                     |
|------------|----------|----------|---------------------------------|
| name       | string   | Yes      | User's full name               |
| email      | string   | Yes      | User's email address           |
| password   | string   | Yes      | User's password (min 6 chars)  |
| phone      | string   | Yes      | User's phone number            |

### Example Request
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "securepass123"
}
```

### Response

#### Success Response
- Status Code: `201 Created`
- Content-Type: `application/json`

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "_id": "12345",
        "email": "john.doe@example.com",
        "firstName": "John",
        "lastName": "Doe"
    }
}
```

**Note:**
- `token`: JWT authentication token for subsequent API requests
- `user`: Object containing user details
  - `_id`: Unique identifier for the user
  - `email`: User's email address
  - `firstName`: User's first name
  - `lastName`: User's last name

#### Error Responses

##### Email Already Exists
- Status Code: `409 Conflict`
```json
{
    "status": "error",
    "message": "Email already registered"
}
```

##### Invalid Input
- Status Code: `400 Bad Request`
```json
{
    "status": "error",
    "message": "Invalid input data",
    "errors": {
        "email": "Invalid email format",
        "password": "Password must be at least 6 characters"
    }
}
```

##### Server Error
- Status Code: `500 Internal Server Error`
```json
{
    "status": "error",
    "message": "Internal server error"
}
```

### Validation Rules
- Email must be a valid email format
- Password must be at least 6 characters long
- Name must not be empty
- Phone number must be a valid format
