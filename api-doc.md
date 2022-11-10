# Rental Cars API Documentation

## Collections :

_users_

```
- name : string, required,
- email : string, required, unique
- password : string, required
```

_vehicles_

```
- name : string, required
- type : string, required
- imageUrl : string, required
```

## Endpoints :

List of available endpoints:
​

- `POST /register`
- `POST /login`
- `GET /vehicles`

Routes below need authentication:

- `PUT /vehicles/rent`
- `PUT /vehicles/review/:vehicleId`
- `GET /myrent`

## 1. POST /register

Request:

- body:

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Email is already registered"
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
  "message": "Invalid email or password"
}
```

&nbsp;

## 3. GET /vehicles

Description:

- Fetch all vehicles from database

_Response (200 - OK)_

```json
[
  {
        "_id": "636a10ca7d4cbe0527329b94",
        "name": "Hyundai Creta",
        "brand": "Hyundai",
        "seats": 5,
        "transmission": [
            "Automatic",
            "Manual"
        ],
        "price": 25000,
        "year": 2021,
        "imageUrl": "https://static.carmudi.co.id/WsziMd5FqcQfXVeZIB9pY8kJxB4=/900x405/http://trenotomotif.com/ncs/images/Thumbnail/Thumbnail2022/Hyundai-Creta.jpg",
        "type": "Conventional",
        "reviews": [],
        "status": "Active"
    },
    {
        "_id": "636a16937d4cbe0527329b96",
        "name": "HR-V",
        "brand": "Honda",
        "seats": 5,
        "transmission": [
            "Automatic",
            "Manual"
        ],
        "type": "Conventional",
        "price": 30000,
        "year": 2022,
        "imageUrl": "https://static.carmudi.co.id/IZ48VfA65MNHUCkkLJKNC0Ztm5s=/900x405/http://trenotomotif.com/ncs/images/Thumbnail/Thumbnail2022/HR-V.jpg",
        "reviews": [
            {
                "userId": "636a7ae7b23b86904b612f56",
                "name": "irwnd22",
                "msg": "Great car. Would definitely rent it again. Thanks",
                "rating": "10"
            }
        ],
        "status": "Active"
    },
  ...,
]
```

&nbsp;

## 4. PUT /vehicles/rent

Description:

- Rent a new vehicle

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "vehicleId": "string",
  "startDate": "date",
  "endDate": "date",
  "duration": "integer",
  "totalPrice": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success rented the vehicle. Please finish the payment."
}
```


&nbsp;

## 5. PUT /vehicles/review/:vehicleId

Description:

- Give a review or feedback to the vehicle rented before

Request:

- headers:

```json
{
  "access_token": "string"
}
```
- params:

```json
{
  "vehicleId": "string"
}
```

- body:

```json
{
  "msg": "string",
  "rating": "integer"
}
```

_Response (200 - OK)_

```json
{
    "message": "Success reviewed"
}
```

&nbsp;

## 6. GET /myrent

Description:

- Get all rented vehicle

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "name": "irwnd22",
    "rents": [
        {
            "vehicleId": "636a10ca7d4cbe0527329b94",
            "startDate": "09/11/2022",
            "endDate": "11/11/2022",
            "duration": "700000",
            "totalPrice": "https://www.youtube.com/watch?v=Dr89pmKrqkI",
            "paymentStatus": false
        },
        {
            "vehicleId": "636a10ca7d4cbe0527329b94",
            "startDate": "09/11/2022",
            "endDate": "11/11/2022",
            "duration": "2",
            "totalPrice": "720000",
            "paymentStatus": false
        },
        ...
    ]
}
```

## 7. GET /mydetail

Description:

- Get user detail

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "_id": "636c384ac5353038a779fdf0",
    "name": "Irwansyah",
    "email": "irwndmusic@gmail.com",
    "password": "string",
    "rent": [
        {
            "vehicleId": "636b0aab187b91086d3b43d4",
            "startDate": "2022-11-10",
            "endDate": "2022-11-13",
            "duration": 4,
            "totalPrice": 2880000,
            "paymentStatus": true
        },
        {
            "vehicleId": "636b0aab187b91086d3b43da",
            "startDate": "2022-11-10",
            "endDate": "2022-11-12",
            "duration": 2,
            "totalPrice": 960000,
            "paymentStatus": false
        },
        {
            "vehicleId": "636b0aab187b91086d3b43dc",
            "startDate": "2022-11-10",
            "endDate": "2022-11-12",
            "duration": 3,
            "totalPrice": 1800000,
            "paymentStatus": false
        },
        {
            "vehicleId": "636b0aab187b91086d3b43d3",
            "startDate": "2022-11-12",
            "endDate": "2022-11-16",
            "duration": 4,
            "totalPrice": 2400000,
            "paymentStatus": false
        },
        {
            "vehicleId": "636b0aab187b91086d3b43d7",
            "startDate": "2022-11-10",
            "endDate": "2022-11-14",
            "duration": 4,
            "totalPrice": 3840000,
            "paymentStatus": false
        },
       ...
    ]
}
```

## 8. post /payment/:id/checkout

Description:

- Midtrans payment

Request:

- headers:

```json
{
  "access_token": "string"
}
```
- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
    "token": "string"
}
```

## 9. post /mailer

Description:

- Mailer for url and qrcode url for finishing payment

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "email": "string",
  "url": "string",
  "qrcode": "string"
}
```

_Response (200 - OK)_

```json
{
    "message": "Email sent"
}
```

## 10. PATCH /vehicle/payment/success/:vehicleId

Description:

- Payment status changer after completing payment of a certain order

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "vehicleId": "integer"
}
```


_Response (200 - OK)_

```json
{
    "message": "Updated successfully"
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

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
