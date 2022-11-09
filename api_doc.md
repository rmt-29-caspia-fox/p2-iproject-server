# Pulsa Osi API Documentation

## Models :

_User_
```
- email : string, required, unique
- username : string
- password : string, required
```

_Balance_
```
- nominal : decimal, required, (default: 0)
- idUser : integer, required
```

_Logbalance_ ##BELUM SELESAI
```
- nominal : decimal, required, (default: 0)
- nominal_before : decimal, required, (default: 0)
- isDebit : boolean (if true meaning add user's balance, if false meaning cut user's balance), required, (default: false)
- type: string (topup, buy, withdraw, transfer), required
- idUser: integer, required
- idReceiver: string
- phone: string
- idProduct: integer
- idSubproduct: integer
- description: string
```

_Product_
```
- name : string, required
- description : string
- imageUrl : string
```

_SubProduct_
```
- name : string, required
- price : integer, required, (default: 0)
- idOrder : integer
- idProduct : integer, required​
```

## Relationship :

>### **Many-to-Many**

## Endpoints :

List of available endpoints:
​
- `POST /register`
- `POST /login`
- `GET /products`
- `GET /product/:id`

Routes below need authentication:



Routes below need authentication & authorization:

- `GET /user`
- `PUT /user`

&nbsp;

## 1. POST /register

Request:

- body:
```json
{
  "email": "string",
  "username": "string",
  "password": "string"
}
```

_Response (201 - Created)_
```json
{
  "id": "integer",
  "email": "string",
  "username": "string",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_
```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET / or /products

Description:
- Fetch all product

_Response (200 - OK)_
```json
[
  {
    "id": 1,
    "name": "Pulsa XL",
    "description": "Pulsa XL murah dari 5ribu sampai 100ribu",
    "imageUrl": "./public/xl.png"
  },
  {
    "id": 2,
    "name": "Pulsa Three",
    "description": "Pulsa Three murah dari 5ribu sampai 100ribu",
    "imageUrl": "./public/three.png"
  },
  {
    "id": 3,
    "name": "Pulsa Indosat",
    "description": "Pulsa Indosat murah dari 5ribu sampai 100ribu",
    "imageUrl": "./public/indosat.png"
  },
  
  ...,
]
```

&nbsp;

## 4. GET /product/:id

Description:
- Get a product detail

_Response (201 - Created)_
```json
{
  "id": 2,
  "name": "Pulsa Three",
  "description": "Pulsa Three murah dari harga 5ribu sampai 100ribu",
  "Subproduct": [
    {
        "name": "Pulsa Three 5000",
        "price": 6500,
        "idOrder": 1,
        "idProduct": 2
    },
    {
        "name": "Pulsa Three 10000",
        "price": 12000,
        "idOrder": 2,
        "idProduct": 2
    },
    {
        "name": "Pulsa Three 20000",
        "price": 22000,
        "idOrder": 3,
        "idProduct": 2
    },

    ...
  ]
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Product not found"
}
```

&nbsp;



## Global Error

_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_
```json
{
  "message": "You are not authorized"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Product not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal server error"
}
```