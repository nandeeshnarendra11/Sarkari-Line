# Sarkari Line API Documentation

## Base URL
```
http://localhost:5000/api
```

## Content-Type
All requests should include:
```
Content-Type: application/json
```

## Authentication
Protected endpoints require:
```
Authorization: Bearer {JWT_TOKEN}
```

---

## Authentication Endpoints

### 1. Register User
Register a new user account with email and phone number.

**Endpoint:** `POST /auth/register`  
**Auth Required:** No

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123",
  "confirmPassword": "password123",
  "state": "Karnataka",
  "district": "Chikkaballapura",
  "taluk": "Chikkaballapura",
  "aadharNumber": "123456789012" // Optional
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully. OTP sent to your phone.",
  "data": {
    "userId": "64f1234567890abcdef",
    "email": "john@example.com",
    "phone": "9876543210",
    "requiresOTPVerification": true
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

### 2. Verify OTP
Verify the OTP sent to user's phone to complete registration.

**Endpoint:** `POST /auth/verify-otp`  
**Auth Required:** No

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "OTP verified successfully. Registration complete!",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "64f1234567890abcdef",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "state": "Karnataka",
      "district": "Chikkaballapura",
      "taluk": "Chikkaballapura",
      "role": "user"
    }
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Invalid or expired OTP"
}
```

---

### 3. Resend OTP
Resend OTP to user's phone if first one expires.

**Endpoint:** `POST /auth/resend-otp`  
**Auth Required:** No

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "data": {
    "email": "john@example.com"
  }
}
```

---

### 4. Login
Login with email and password.

**Endpoint:** `POST /auth/login`  
**Auth Required:** No

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "64f1234567890abcdef",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "role": "user",
      "accountVerified": true
    }
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### 5. Get Current User
Get logged-in user details.

**Endpoint:** `GET /auth/me`  
**Auth Required:** Yes

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "64f1234567890abcdef",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "state": "Karnataka",
    "district": "Chikkaballapura",
    "role": "user",
    "accountVerified": true,
    "phoneVerified": true,
    "emailVerified": true,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 6. Logout
Logout the user (client-side token removal recommended).

**Endpoint:** `POST /auth/logout`  
**Auth Required:** Yes

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Queue Endpoints

### 1. Generate Queue Token
Generate a new queue token for a government office.

**Endpoint:** `POST /queue/generate-token`  
**Auth Required:** Yes

**Request Body:**
```json
{
  "officeId": "64f1234567890abcdef",
  "serviceType": "Passport",
  "priority": "normal"
}
```

**Service Types:**
- Passport
- Aadhar
- Ration Card
- Birth Certificate
- Death Certificate
- Land Records
- Driving License
- Vehicle Registration
- Other

**Priority Options:**
- normal
- senior_citizen
- pwd
- pregnant
- reserved

**Success Response (201):**
```json
{
  "success": true,
  "message": "Token generated successfully",
  "data": {
    "token": {
      "id": "64f1234567890abcdef",
      "tokenNumber": 45,
      "position": 8,
      "estimatedWaitTime": 30,
      "office": {
        "id": "64f1234567890abcdef",
        "name": "DC Office (District Collectorate)",
        "address": "Chikkaballapura, Karnataka"
      }
    }
  }
}
```

**Note:** SMS notification is automatically sent to user's registered phone number.

---

### 2. Get My Tokens
Get all queue tokens created by current user.

**Endpoint:** `GET /queue/my-tokens`  
**Auth Required:** Yes

**Query Parameters:** None

**Success Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "64f1234567890abcdef",
      "tokenNumber": 45,
      "serviceType": "Passport",
      "status": "waiting",
      "priority": "normal",
      "position": 8,
      "estimatedWaitTime": 30,
      "office": {
        "_id": "64f1234567890abcdef",
        "name": "Passport Seva Kendra",
        "address": "Chikkaballapura"
      },
      "rating": null,
      "feedback": null,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 3. Get Token Details
Get detailed information about a specific token.

**Endpoint:** `GET /queue/token/{tokenId}`  
**Auth Required:** Yes

**Path Parameters:**
- `tokenId` (required): MongoDB ObjectId of the token

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "64f1234567890abcdef",
    "tokenNumber": 45,
    "serviceType": "Passport",
    "status": "called",
    "priority": "normal",
    "position": 0,
    "estimatedWaitTime": 30,
    "actualWaitTime": 28,
    "calledTime": "2024-01-15T10:50:00.000Z",
    "serviceStartTime": "2024-01-15T10:51:00.000Z",
    "office": {
      "_id": "64f1234567890abcdef",
      "name": "Passport Seva Kendra",
      "phone": "08148-123456",
      "address": "Chikkaballapura"
    },
    "user": {
      "_id": "64f1234567890abcdef",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com"
    }
  }
}
```

---

### 4. Get Office Queue Status
Get current queue status for an office.

**Endpoint:** `GET /queue/office/{officeId}/status`  
**Auth Required:** No

**Path Parameters:**
- `officeId` (required): MongoDB ObjectId of the office

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "office": {
      "id": "64f1234567890abcdef",
      "name": "DC Office",
      "status": "busy"
    },
    "queue": {
      "waiting": 12,
      "called": 2,
      "completed": 43,
      "averageWaitTime": 32,
      "estimatedWaitTime": 35
    }
  }
}
```

---

### 5. Cancel Token
Cancel a waiting queue token.

**Endpoint:** `POST /queue/token/{tokenId}/cancel`  
**Auth Required:** Yes

**Path Parameters:**
- `tokenId` (required): MongoDB ObjectId of the token

**Success Response (200):**
```json
{
  "success": true,
  "message": "Token cancelled successfully",
  "data": {
    "_id": "64f1234567890abcdef",
    "tokenNumber": 45,
    "status": "cancelled"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Can only cancel tokens that are waiting in queue"
}
```

---

### 6. Rate Service
Rate a completed service and provide feedback.

**Endpoint:** `POST /queue/token/{tokenId}/rate`  
**Auth Required:** Yes

**Path Parameters:**
- `tokenId` (required): MongoDB ObjectId of the token

**Request Body:**
```json
{
  "rating": 5,
  "feedback": "Great service, staff was very helpful and professional"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Thank you for your feedback!",
  "data": {
    "_id": "64f1234567890abcdef",
    "tokenNumber": 45,
    "rating": 5,
    "feedback": "Great service, staff was very helpful and professional"
  }
}
```

---

### 7. Get Office Tokens (Admin)
Get all tokens for a specific office (admin/moderator only).

**Endpoint:** `GET /queue/office/{officeId}/tokens`  
**Auth Required:** Yes (Admin/Moderator)

**Query Parameters:**
- `status` (optional): Filter by status (waiting, called, completed, etc.)
- `date` (optional): Filter by date (YYYY-MM-DD format)

**Success Response (200):**
```json
{
  "success": true,
  "count": 45,
  "data": [
    {
      "_id": "64f1234567890abcdef",
      "tokenNumber": 1,
      "serviceType": "Passport",
      "status": "completed",
      "user": {
        "firstName": "John",
        "lastName": "Doe",
        "phone": "9876543210"
      }
    }
  ]
}
```

---

### 8. Update Token Status (Admin)
Update the status of a queue token (admin/moderator only).

**Endpoint:** `PUT /queue/token/{tokenId}/status`  
**Auth Required:** Yes (Admin/Moderator)

**Request Body:**
```json
{
  "status": "in_service"
}
```

**Valid Statuses:**
- waiting
- called
- in_service
- completed
- cancelled
- no_show

**Success Response (200):**
```json
{
  "success": true,
  "message": "Token status updated",
  "data": {
    "_id": "64f1234567890abcdef",
    "tokenNumber": 45,
    "status": "in_service",
    "serviceStartTime": "2024-01-15T10:51:00.000Z"
  }
}
```

---

## Office Endpoints

### 1. Get All Offices
Get list of all verified offices with optional filters.

**Endpoint:** `GET /offices`  
**Auth Required:** No

**Query Parameters:**
- `state` (optional): Filter by state
- `district` (optional): Filter by district
- `taluk` (optional): Filter by taluk
- `officeType` (optional): Filter by office type
- `serviceType` (optional): Filter by service provided

**Success Response (200):**
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "_id": "64f1234567890abcdef",
      "name": "DC Office (District Collectorate)",
      "officeType": "District Collectorate",
      "state": "Karnataka",
      "district": "Chikkaballapura",
      "taluk": "Chikkaballapura",
      "address": "Main Road, Chikkaballapura",
      "phone": "08148-123456",
      "latitude": 13.4370,
      "longitude": 77.7310,
      "status": "open",
      "currentWaitTime": 45,
      "operatingHours": {
        "opening": "09:00",
        "closing": "17:00"
      },
      "services": ["Passport", "Aadhar"],
      "workingDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    }
  ]
}
```

---

### 2. Search Offices
Search for offices by name, type, or address.

**Endpoint:** `GET /offices/search`  
**Auth Required:** No

**Query Parameters:**
- `query` (required): Search query (name, type, address)
- `state` (optional): Filter by state

**Success Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "64f1234567890abcdef",
      "name": "Passport Seva Kendra",
      "officeType": "Passport Office",
      "address": "Chikkaballapura"
    }
  ]
}
```

---

### 3. Get Office Details
Get detailed information about a specific office.

**Endpoint:** `GET /offices/{officeId}`  
**Auth Required:** No

**Path Parameters:**
- `officeId` (required): MongoDB ObjectId of the office

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "64f1234567890abcdef",
    "name": "DC Office (District Collectorate)",
    "officeType": "District Collectorate",
    "state": "Karnataka",
    "district": "Chikkaballapura",
    "taluk": "Chikkaballapura",
    "address": "Main Road, Chikkaballapura",
    "phone": "08148-123456",
    "email": "dc@ckb.gov.in",
    "latitude": 13.4370,
    "longitude": 77.7310,
    "status": "open",
    "description": "District Collectorate office handles all district level services",
    "services": ["Passport", "Aadhar", "Land Records"],
    "operatingHours": {
      "opening": "09:00",
      "closing": "17:00"
    },
    "workingDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "averageWaitTime": 30,
    "currentWaitTime": 45,
    "maxQueue": 100,
    "isVerified": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 4. Create Office (Admin)
Create a new office record.

**Endpoint:** `POST /offices`  
**Auth Required:** Yes (Admin only)

**Request Body:**
```json
{
  "name": "New Passport Office",
  "officeType": "Passport Office",
  "state": "Karnataka",
  "district": "Chikkaballapura",
  "taluk": "Chikkaballapura",
  "address": "Near Bus Stand, Chikkaballapura",
  "phone": "08148-234567",
  "email": "passport@ckb.gov.in",
  "latitude": 13.4355,
  "longitude": 77.7315,
  "services": ["Passport"],
  "operatingHours": {
    "opening": "09:00",
    "closing": "17:00"
  },
  "workingDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  "maxQueue": 80,
  "description": "Passport Services"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Office created successfully",
  "data": {
    "_id": "64f1234567890abcdef",
    "name": "New Passport Office",
    "status": "open",
    "isVerified": true
  }
}
```

---

### 5. Update Office
Update office details (admin/manager only).

**Endpoint:** `PUT /offices/{officeId}`  
**Auth Required:** Yes (Admin/Manager)

**Request Body (any fields to update):**
```json
{
  "phone": "08148-999999",
  "currentWaitTime": 50,
  "status": "busy"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Office updated successfully",
  "data": {
    "_id": "64f1234567890abcdef",
    "name": "New Passport Office",
    "phone": "08148-999999",
    "status": "busy"
  }
}
```

---

### 6. Update Office Status
Update office status (open, busy, partial, closed).

**Endpoint:** `POST /offices/{officeId}/update-status`  
**Auth Required:** Yes (Admin/Moderator)

**Request Body:**
```json
{
  "status": "closed"
}
```

**Valid Statuses:**
- open (accepting new tokens)
- busy (operating but with wait time)
- partial (some services available)
- closed (not accepting new tokens)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Office status updated",
  "data": {
    "_id": "64f1234567890abcdef",
    "status": "closed"
  }
}
```

---

### 7. Get Office Analytics (Admin)
Get analytics and statistics for an office.

**Endpoint:** `GET /offices/{officeId}/analytics`  
**Auth Required:** Yes (Admin/Moderator)

**Query Parameters:**
- `startDate` (optional): Start date (YYYY-MM-DD)
- `endDate` (optional): End date (YYYY-MM-DD)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "office": {
      "id": "64f1234567890abcdef",
      "name": "DC Office",
      "status": "open"
    },
    "statistics": {
      "totalTokens": 150,
      "completedTokens": 140,
      "cancelledTokens": 5,
      "noShowTokens": 5,
      "completionRate": "93.33%",
      "averageRating": 4.5,
      "totalRatings": 85
    }
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "User role 'user' is not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Office not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## Rate Limiting

For production, implement rate limiting:
- 100 requests per 15 minutes per IP
- Authentication endpoints: 5 requests per minute

---

## Pagination (Future)

Future versions will include pagination support:
```
GET /offices?page=1&limit=10
GET /queue/office/:officeId/tokens?page=1&limit=20
```

---

## Webhook Events (Future)

Planned webhook events:
- `token.created`
- `token.called`
- `token.completed`
- `office.status_changed`

---

**Last Updated:** January 2024
