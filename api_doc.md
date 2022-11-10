# API DOC CARWOSSSSH

- descripstion : API yang dapat menghubungkan client ke server dan mengolah data disertai menggunakan socket.io sehingga dapat melakukan pertukaran data

## Endpoint

- POST /admin/register
- POST /admin/google-sign-in
- POST /admin/login
- GET /admin/waitinglists

- POST /customers/register
- GET /customers/waitinglists
- POST /customers/waitinglists/:customerid

-- AUTHENTICATION

- GET /admin/waitinglists/:id
- PATCH /admin/waitinglists/:id
- POST /admin/mailer

===============================================

### POST /admin/register

request :

- body

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

response (_201_):

```json
{
  "id": "integer",
  "email": "string"
}
```

response (_400_)

```json
{
    "msg": "Username is required"
}
OR
{
    "msg": "Email already used"
}
OR
{
    "msg": "Email is required"
}
OR
{
    "msg": "Format must be Email"
}
OR
{
    "msg": "Password is required"
}
```

### POST /admin/google-sign-in

- headers

```json
{
  "google_token": "string"
}
```

response (_201_ // _200_) :

```json
{
  "access_token": "string"
}
```

### POST /admin/login

- body

```json
{
  "email": "string",
  "password": "string"
}
```

response ( _200_) :

```json
{
    "access_token": "string"
}
```

response (_401_)

```json
{
    "msg": "Email is required"
}
OR
{
    "msg": "Password is required"
}
OR
{
    "msg": "invalid email/password"
}
```

### GET /admin/waitinglists

- params

```json
{
  "page": "string"
}
```

response ( _200_) :

```json
[
        {
            "id": 2,
            "brand": "VW",
            "name": "Combi",
            "status": "waiting",
            "licenseNumber": "JJ 102",
            "service": "light",
            "CustomerId": 3,
            "createdAt": "2022-11-09T22:59:07.440Z",
            "updatedAt": "2022-11-09T23:52:59.026Z",
            "Customer": {
                "id": 3,
                "name": "belajar",
                "email": "tester.email.oauth@gmail.com",
                "longitude": "105.2622",
                "latitude": "-5.4297",
                "createdAt": "2022-11-09T22:59:07.312Z",
                "updatedAt": "2022-11-09T22:59:07.312Z"
            }
        },
        {
            ...
        },
    ]
```

### POST /customers/register

- body

```json
{
  "name": "rian",
  "email": "rian@mail.com",
  "longitude": "integer",
  "latitude": "integer"
}
```

response ( _201_) :

```json
{
  "id": "integer",
  "email": "string"
}
```

### GET /customers/waitinglists

- params

```json
{
  "page": "string"
}
```

response ( _200_) :

```json
{
    "totalItems": 8,
    "waitlists": [
        {
            "id": 2,
            "brand": "VW",
            "name": "Combi",
            "status": "waiting",
            "licenseNumber": "JJ 102",
            "service": "light",
            "CustomerId": 3,
            "createdAt": "2022-11-09T22:59:07.440Z",
            "updatedAt": "2022-11-09T23:52:59.026Z",
            "Customer": {
                "id": 3,
                "name": "belajar",
                "email": "tester.email.oauth@gmail.com",
                "longitude": "105.2622",
                "latitude": "-5.4297",
                "createdAt": "2022-11-09T22:59:07.312Z",
                "updatedAt": "2022-11-09T22:59:07.312Z"
            }
        },
        {
            ...
        },
    ],
    "totalPages": 2,
    "currentPage": 0
}
```

### POST /customers/waitinglists/:customerid

- params

```json
{
  "customerid": "string"
}
```

- body

```json
{
  "brand": "Honda",
  "name": "Jazz",
  "licenseNumber": "B 1111 FEX",
  "service": "medium"
}
```

response ( _201_) :

```json
{
  "id": 3,
  "brand": "Toyota",
  "name": "Kijang",
  "status": "waiting",
  "licenseNumber": "U 9391 A",
  "service": "medium",
  "CustomerId": 4,
  "createdAt": "2022-11-09T23:18:08.186Z",
  "updatedAt": "2022-11-09T23:53:07.036Z"
}
```

### GET /admin/waitinglists/:id

- headers

```json
{
  "access_token": "string"
}
```

- params

```json
{
  "id": "integer"
}
```

response ( _200_) :

```json
{
  "id": 3,
  "brand": "Toyota",
  "name": "Kijang",
  "status": "waiting",
  "licenseNumber": "U 9391 A",
  "service": "medium",
  "CustomerId": 4,
  "createdAt": "2022-11-09T23:18:08.186Z",
  "updatedAt": "2022-11-09T23:53:07.036Z",
  "Customer": {
    "id": 4,
    "name": "test2",
    "email": "tester.email.oauth@gmail.com",
    "longitude": "105.2622",
    "latitude": "-5.4297",
    "createdAt": "2022-11-09T23:18:08.110Z",
    "updatedAt": "2022-11-09T23:18:08.110Z"
  }
}
```

### PATCH /admin/waitinglists/:id

- headers

```json
{
  "access_token": "string"
}
```

- params

```json
{
  "id": "integer"
}
```

- body

```json
{
  "status": "string"
}
```

response ( _200_) :

```json
{
  "message": "Waitinglist has been updated"
}
```

### POST /admin/mailer

- headers

```json
{
  "access_token": "string"
}
```

- body

```json
{
  "Email": "string",
  "coordinate": "string"
}
```

response ( _200_) :

```json
{
  "message": "Email sent to: foo@bar.com"
}
```

response ( _401_) :

```json
{
  "msg": "Error sending mail"
}
```

## GLOBAL ERROR

Response (_401_)

```json
{
  "msg": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
