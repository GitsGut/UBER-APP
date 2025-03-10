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
| Parameter        | Type     | Required | Description                     |
|-----------------|----------|----------|---------------------------------|
| fullName        | object   | Yes      | User's full name object        |
| fullName.firstName | string | Yes      | User's first name (min 3 chars) |
| fullName.lastName  | string | Yes      | User's last name (min 3 chars)  |
| email           | string   | Yes      | User's email address           |
| password        | string   | Yes      | User's password (min 6 chars)  |

### Example Request
```json
{
    "fullName": {
        "firstName": "John",
        "lastName": "Doe"
    },
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
- Email must be a valid email format and at least 6 characters
- Password must be at least 6 characters long
- First name must be at least 3 characters long
- Last name must be at least 3 characters long

## POST /users/login

Authenticate an existing user.

### Description
This endpoint allows users to login to their account using their email and password.

### Request
- Method: `POST`
- URL: `/users/login`
- Content-Type: `application/json`

### Request Body Parameters
| Parameter | Type   | Required | Description                    |
|-----------|--------|----------|--------------------------------|
| email     | string | Yes      | User's registered email       |
| password  | string | Yes      | User's password (min 6 chars) |

### Example Request
```json
{
    "email": "john.doe@example.com",
    "password": "securepass123"
}
```

### Response

#### Success Response
- Status Code: `200 OK`
- Content-Type: `application/json`

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "_id": "12345",
        "email": "john.doe@example.com",
        "fullName": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "socketId": null
    }
}
```

#### Error Responses

##### Invalid Credentials
- Status Code: `401 Unauthorized`
```json
{
    "message": "invalid email or password"
}
```

##### Invalid Input
- Status Code: `400 Bad Request`
```json
{
    "errors": [
        {
            "msg": "The Email Is Not Valid",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "The Password Should Have Atleast Six Characters",
            "param": "password",
            "location": "body"
        }
    ]
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

### Validation Rules for Login
- Email must be in  valid email format
- Password must be at least 6 characters long

## GET /users/profile

Get the authenticated user's profile information.

### Description
This endpoint returns the profile information of the currently authenticated user.

### Request
- Method: `GET`
- URL: `/users/profile`
- Authentication: Required (Bearer Token)

### Headers
| Header          | Type   | Required | Description                    |
|----------------|--------|----------|--------------------------------|
| Authorization  | string | Yes      | Bearer {token}                 |

### Response

#### Success Response
- Status Code: `200 OK`
- Content-Type: `application/json`

```json
{
    "_id": "12345",
    "email": "john.doe@example.com",
    "fullName": {
        "firstName": "John",
        "lastName": "Doe"
    },
    "socketId": null
}
```

#### Error Responses

##### Unauthorized Access
- Status Code: `401 Unauthorized`
```json
{
    "message": "Unauthorized Access"
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

### Authentication
This endpoint requires a valid JWT token to be included in the Authorization header or as a cookie.

## GET /users/logout

Logout the currently authenticated user.

### Description
This endpoint logs out the user by invalidating their current token and clearing the cookie.

### Request
- Method: `GET`
- URL: `/users/logout`
- Authentication: Required (Bearer Token)

### Headers
| Header          | Type   | Required | Description                    |
|----------------|--------|----------|--------------------------------|
| Authorization  | string | Yes      | Bearer {token}                 |

### Response

#### Success Response
- Status Code: `200 OK`
- Content-Type: `application/json`

```json
{
    "message": "logged out"
}
```

#### Error Responses

##### Unauthorized Access
- Status Code: `401 Unauthorized`
```json
{
    "message": "Unauthorized Access"
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

### Authentication
This endpoint requires a valid JWT token to be included in the Authorization header or as a cookie. After successful logout, the token will be blacklisted and the cookie will be cleared.

## POST /captain/register

Register a new captain in the system.

### Description
This endpoint allows new captains to create an account by providing their personal information, credentials, and vehicle details.

### Request
- Method: `POST`
- URL: `/captains/register`
- Content-Type: `application/json`

### Request Body Parameters
| Parameter               | Type     | Required | Description                           |
|------------------------|----------|----------|---------------------------------------|
| fullName               | object   | Yes      | Captain's full name object           |
| fullName.firstName     | string   | Yes      | Captain's first name (min 3 chars)   |
| fullName.lastName      | string   | Yes      | Captain's last name (min 3 chars)    |
| email                  | string   | Yes      | Captain's email address (min 6 chars) |
| password               | string   | Yes      | Captain's password (min 6 chars)     |
| vehicle               | object   | Yes      | Vehicle details object               |
| vehicle.color         | string   | Yes      | Vehicle color (min 3 chars)          |
| vehicle.plate         | string   | Yes      | Vehicle plate number (min 3 chars)    |
| vehicle.capacity      | number   | Yes      | Vehicle capacity (min 1)             |
| vehicle.vehicleType   | string   | Yes      | Type of vehicle (car/bike/auto)      |

### Example Request
```json
{
    "fullName": {
        "firstName": "John",
        "lastName": "Doe"
    },
    "email": "john.captain@example.com",
    "password": "securepass123",
    "vehicle": {
        "color": "Black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```

### Response

#### Success Response
- Status Code: `201 Created`
- Content-Type: `application/json`

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
        "_id": "12345",
        "email": "john.captain@example.com",
        "fullName": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "vehicle": {
            "color": "Black",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "status": "inactive"
    }
}
```

#### Error Responses

##### Email Already Exists
- Status Code: `401 Unauthorized`
```json
{
    "message": "User Already Exists"
}
```

##### Invalid Input
- Status Code: `401 Unauthorized`
```json
{
    "message": "Invalid Data Entered",
    "status": "error",
    "errors": {
        "email": "The Email Is Not Valid",
        "password": "The Password Should Have Atleast Six Characters",
        "vehicle.color": "The Vehicle Color Should Have Atleast Three Characters",
        "vehicle.plate": "The Vehicle plate code Should Have Atleast Three Characters",
        "vehicle.capacity": "The Vehicle Capacity Should be Atleast 1",
        "vehicle.vehicleType": "Not A Valid Vehicle"
    }
}
```

### Validation Rules
- Email must be a valid email format and at least 6 characters
- Password must be at least 6 characters long
- First name must be at least 3 characters long
- Vehicle color must be at least 3 characters
- Vehicle plate must be at least 3 characters
- Vehicle capacity must be at least 1
- Vehicle type must be one of: car, bike, auto

## POST /captains/login

Authenticate an existing captain.

### Description
This endpoint allows captains to login to their account using their email and password.

### Request
- Method: `POST`
- URL: `/captains/login`
- Content-Type: `application/json`

### Request Body Parameters
| Parameter | Type   | Required | Description                    |
|-----------|--------|----------|--------------------------------|
| email     | string | Yes      | Captain's registered email    |
| password  | string | Yes      | Captain's password (min 6 chars) |

### Example Request
```json
{
    "email": "john.captain@example.com",
    "password": "securepass123"
}
```

### Response

#### Success Response
- Status Code: `200 OK`
- Content-Type: `application/json`

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
        "_id": "12345",
        "email": "john.captain@example.com",
        "fullName": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "vehicle": {
            "color": "Black",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "status": "inactive"
    },
    "message": "Login Successfull"
}
```

#### Error Responses

##### Invalid Credentials
- Status Code: `401 Unauthorized`
```json
{
    "message": "Invalid Email Or Password"
}
```

##### Invalid Input
- Status Code: `401 Unauthorized`
```json
{
    "message": "Invalid Data Entered",
    "status": "error",
    "errors": {
        "email": "The Email Is Not Valid",
        "password": "The Password Should Have Atleast Six Characters"
    }
}
```

## GET /captains/profile

Get the authenticated captain's profile information.

### Description
This endpoint returns the profile information of the currently authenticated captain.

### Request
- Method: `GET`
- URL: `/captains/profile`
- Authentication: Required (Bearer Token)

### Headers
| Header          | Type   | Required | Description                    |
|----------------|--------|----------|--------------------------------|
| Authorization  | string | Yes      | Bearer {token}                 |

### Response

#### Success Response
- Status Code: `200 OK`
- Content-Type: `application/json`

```json
{
    "_id": "12345",
    "email": "john.captain@example.com",
    "fullName": {
        "firstName": "John",
        "lastName": "Doe"
    },
    "vehicle": {
        "color": "Black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
    },
    "status": "inactive",
    "socketId": null
}
```

#### Error Responses

##### Unauthorized Access
- Status Code: `400 Bad Request`
```json
{
    "message": "Unauthorized Access"
}
```

## GET /captains/logout

Logout the currently authenticated captain.

### Description
This endpoint logs out the captain by invalidating their current token and clearing the cookie.

### Request
- Method: `GET`
- URL: `/captains/logout`
- Authentication: Required (Bearer Token)

### Headers
| Header          | Type   | Required | Description                    |
|----------------|--------|----------|--------------------------------|
| Authorization  | string | Yes      | Bearer {token}                 |

### Response

#### Success Response
- Status Code: `200 OK`
- Content-Type: `application/json`

```json
{
    "message": "Logout Successful"
}
```

#### Error Responses

##### Token Blacklisted
- Status Code: `400 Bad Request`
```json
{
    "message": "The Token Is BlackListed"
}
```

##### Unauthorized Access
- Status Code: `400 Bad Request`
```json
{
    "message": "Unauthorized Access"
}
```

### Authentication
This endpoint requires a valid JWT token to be included in the Authorization header or as a cookie. After successful logout, the token will be blacklisted and the cookie will be cleared.
