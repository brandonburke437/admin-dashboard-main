# API Contract Spec

This document outlines the REST API endpoints for the GNPC Scholarship Portal. It provides details on request methods, paths, headers, request bodies, and expected responses.

---

## 📄 General Information

- **Base URL**: `/api`
- **Authentication**: JWT Bearer Token in `Authorization` header

---

## 🔐 Authentication Endpoints

### `POST /api/auth/signin`

**Description**: User sign in

**Request Body**:

```json
{
  "emailOrUsernameOrPhone": "string",
  "password": "string"
}
```

**Response**:

```json
{
  "token": "string",
  "user": {
    "id": "string",
    "fullName": "string",
    "email": "string",
    "role": "admin | applicant"
  }
}
```

---

### `POST /api/auth/signup`

**Description**: User registration

**Request Body**:

```json
{
  "fullName": "string",
  "email": "string",
  "password": "string",
  "phone": "string"
}
```

**Response**:

```json
{
  "success": true,
  "userId": "string"
}
```

---

### `GET /api/auth/profile`

**Description**: Get logged-in user's profile

**Headers**:

```
Authorization: Bearer <token>
```

**Response**:

```json
{
  "id": "string",
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "role": "admin | applicant"
}
```

---

## 🛠 Onboarding Endpoints

### `POST /api/onboarding/eligibility`

**Description**: Submit eligibility information

**Headers**:

```
Authorization: Bearer <token>
```

**Request Body**:

```json
{
  "firstName": "string",
  "lastName": "string",
  "dob": "YYYY-MM-DD",
  "gender": "string",
  "phone": "string",
  "email": "string",
  "isGhanaian": true,
  "admissionType": "Undergraduate | Postgraduate | PhD",
  "institution": "string",
  "isNursingCollege": false,
  "isSTEMLecturer": false,
  "nationalId": "string"
}
```

**Response**:

```json
{ "success": true }
```

---

### `POST /api/onboarding/application-type`

**Description**: Submit program information

**Headers**:

```
Authorization: Bearer <token>
```

**Request Body**:

```json
{
  "applicationId": "string",
  "programName": "string",
  "level": "UG | PG | PhD",
  "duration": "string",
  "admissionLetterUrl": "string"
}
```

**Response**:

```json
{ "success": true }
```

---

### `POST /api/onboarding/personal-statement`

**Description**: Submit personal statement

**Headers**:

```
Authorization: Bearer <token>
```

**Request Body**:

```json
{
  "applicationId": "string",
  "statement": "string"
}
```

**Response**:

```json
{ "success": true }
```

---

## 📑 Application Management

### `POST /api/applications`

**Description**: Finalize and submit application

**Headers**:

```
Authorization: Bearer <token>
```

**Request Body**:

```json
{ "applicationId": "string" }
```

**Response**:

```json
{
  "success": true,
  "applicationId": "string"
}
```

---

### `GET /api/applications`

**Description**: Get all applications for the user

**Headers**:

```
Authorization: Bearer <token>
```

**Response**:

```json
[
  {
    "id": "string",
    "type": "Undergraduate | Postgraduate | PhD",
    "program": "string",
    "institution": "string",
    "status": "Pending | Approved | Rejected",
    "createdAt": "ISODate"
  }
]
```

---

### `GET /api/applications/:id`

**Description**: Get single application details

**Headers**:

```
Authorization: Bearer <token>
```

**Response**:

```json
{
  "id": "string",
  "type": "string",
  "program": "string",
  "institution": "string",
  "status": "string",
  "history": [{ "step": "string", "date": "ISODate" }],
  "documents": [{ "type": "string", "url": "string" }]
}
```

---

## 📂 Document Upload

### `POST /api/documents/upload`

**Description**: Upload supporting documents

**Headers**:

```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (form-data)**:

- `applicationId`: string
- `docType`: string (e.g., "Admission Letter", "Passport Picture")
- `file`: binary (PDF | JPG | PNG)

**Response**:

```json
{
  "success": true,
  "documentId": "string",
  "url": "string"
}
```

---

## 🆘 Complaints / Requests

### `POST /api/complaints`

**Description**: Submit a complaint or request change

**Headers**:

```
Authorization: Bearer <token>
```

**Request Body**:

```json
{
  "applicationId": "string",
  "message": "string"
}
```

**Response**:

```json
{
  "success": true,
  "complaintId": "string"
}
```

---

_Generated: provide this spec to the backend team for a clear implementation guide._
