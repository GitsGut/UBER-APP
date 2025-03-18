# UBER-APP Frontend Documentation

## Frontend Structure

```
frontend/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/        # Page components
│   ├── context/      # React context providers
│   ├── App.jsx       # Main application component
│   └── main.jsx      # Application entry point
├── public/           # Static assets
└── index.html        # HTML template
```

## Frontend Routes & Workflows

### 1. Landing Page (`/`)
**Component:** `Start.jsx`
**Purpose:** Entry point of application

**Workflow:**
1. Displays Uber logo
2. Shows "Get Started" button
3. Redirects to login page on button click

### 2. User Authentication

#### User Login (`/login`)
**Component:** `UserLogin.jsx`
**Purpose:** Authenticate existing users

**Input Data Example:**
```javascript
{
  "email": "user@example.com",
  "password": "securepass123"
}
```

**Workflow:**
1. User enters email and password
2. Frontend validates input
3. Sends POST request to `/users/login`
4. On success:
   - Stores JWT token in localStorage
   - Updates UserContext
   - Redirects to `/home`
5. On error: Displays error message

#### User Signup (`/signup`)
**Component:** `UserSignup.jsx`

**Input Data Example:**
```javascript
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Workflow:**
1. User fills registration form
2. Frontend validates all fields
3. Sends POST request to `/users/register`
4. On success:
   - Stores JWT token
   - Updates UserContext
   - Redirects to `/home`
5. On error: Shows validation messages

### 3. Captain Authentication

#### Captain Login (`/captain-login`)
**Component:** `CaptainLogin.jsx`

**Input Data Example:**
```javascript
{
  "email": "captain@example.com",
  "password": "driverpass123"
}
```

**Workflow:**
1. Captain enters credentials
2. Validates input
3. Sends POST request to `/captains/login`
4. On success:
   - Stores JWT token
   - Updates CaptainContext
   - Redirects to `/captain-home`
5. On error: Shows error message

#### Captain Signup (`/captain-signup`)
**Component:** `CaptainSignup.jsx`

**Input Data Example:**
```javascript
{
  "fullName": {
    "firstName": "Mike",
    "lastName": "Driver"
  },
  "email": "mike@example.com",
  "password": "secure123",
  "vehicle": {
    "color": "Black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Workflow:**
1. Captain fills registration form with vehicle details
2. Validates all fields including vehicle information
3. Sends POST request to `/captains/register`
4. On success:
   - Stores JWT token
   - Updates CaptainContext
   - Redirects to `/captain-home`
5. On error: Shows detailed validation messages

### 4. Protected Routes
Routes requiring authentication are wrapped with:
- `UserProtectedWrapper` for user routes
- `CaptainProtectedWrapper` for captain routes

### 5. Logout Routes

#### User Logout (`/user/logout`)
**Component:** `UserLogout.jsx`

**Workflow:**
1. Sends GET request to `/users/logout`
2. Clears localStorage token
3. Resets UserContext
4. Redirects to login page

#### Captain Logout (`/captain/logout`)
**Component:** `CaptainLogout.jsx`

**Workflow:**
1. Updates captain status to inactive
2. Sends GET request to `/captains/logout`
3. Clears localStorage token
4. Resets CaptainContext
5. Redirects to captain login page

## Context Providers

### UserContext
```javascript
const { user, setuser } = useContext(userDataContext);
```

### CaptainContext
```javascript
const { captain, setCaptain } = useContext(CaptainDataContext);
```

## Development Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Environment setup:
```
VITE_BASE_URL=http://localhost:3000
```

3. Start development server:
```bash
npm run dev
```

## Technologies Used
- React
- React Router DOM
- Axios
- TailwindCSS
- Vite
