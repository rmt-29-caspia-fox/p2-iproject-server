# iProject API Documentation

## Endpoints :

List of available endpoints:

- `POST /public/register`
- `POST /public/login`
- `POST /public/login-google`
- `GET /public/categories`
- `GET /public/products`
- `GET /public/products/:id`
- `GET /shipping-cost/province`
- `GET /shipping-cost/city/:provinceId`
- `POST /shipping-cost/cost`
- `GET /histories`
- `POST /payment`
- `PUT /payment_update/:id`

&nbsp;
## 1. POST /public/register
#### Description
- Create a new user

#### Request
- body:

```json
{
  "fullName": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "<email user>"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "full name is required"
}
OR
{
  "message": "email is required"
}
OR
{
  "message": "email format is incorrect"
}
OR
{
  "message": "password required"
}
OR
{
  "message": "Password's length minimum 6 character"
}
OR
{
  "message": "role is required"
}
OR
{
  "message": "phone number "
}
OR
{
  "message": "address is required"
},
{
  "message": "email is already used"
}
```

&nbsp;

## 2. POST /public/login
#### Description
- login to get token

#### Request
- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - Ok)_

```json
{
	"access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email is required"
}
OR
{
  "message": "password required"
}
```

_Response (401 - Invalid Login)_

```json
{
	"message": "error invalid email or password"
}
```

&nbsp;

## 3. POST /public/login-google
#### Description
- login to get token

#### Request
- headers:

```json
{
  "google_token": "string"
```

_Response (200 - Ok)_

```json
{
	"access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email is required"
}
OR
{
  "message": "password required"
}
```

_Response (401 - Invalid Login)_

```json
{
	"message": "error invalid email or password"
}
```

&nbsp;


## 4. GET /public/categories

Description:

- Get all categories from database

#### Request

_Response (200 - OK)_

```json
[
  {
		"id": 1,
		"name": "Mono Chrome",
		"createdAt": "2022-11-10T02:48:55.996Z",
		"updatedAt": "2022-11-10T02:48:55.996Z"
	},
	{
		"id": 2,
		"name": "Autumn Series",
		"createdAt": "2022-11-10T02:48:55.996Z",
		"updatedAt": "2022-11-10T02:48:55.996Z"
	},
  ...,
]
```

&nbsp;

## 5. GET /public/products

Description:

- Get all products from database

#### Request

_Response (200 - OK)_

```json
[
  {
		"id": 1,
		"name": "Timeless Boho Wedding Invitation Set",
		"description": "Poisoning by antipruritics",
		"price": 155000,
		"imgUrl": "https://i.imgur.com/iEO31h6.jpg",
		"status": "Active",
		"CategoryId": 1,
		"UserId": 1,
		"createdAt": "2022-11-10T02:48:56.000Z",
		"updatedAt": "2022-11-10T02:48:56.000Z"
	},
	{
		"id": 2,
		"name": "Timeless Mono Wedding Invitation Set",
		"description": "Obstetrical pyemic and septic embolism, antepartum condition or complication",
		"price": 155000,
		"imgUrl": "https://i.imgur.com/kPGUTwF.jpg",
		"status": "Active",
		"CategoryId": 1,
		"UserId": 1,
		"createdAt": "2022-11-10T02:48:56.000Z",
		"updatedAt": "2022-11-10T02:48:56.000Z"
	},
  ...,
]
```

&nbsp;


## 6. GET /public/products/:id

Description:

- Get detail product by id from database

#### Request

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
	"id": 1,
	"name": "Timeless Boho Wedding Invitation Set",
	"description": "Poisoning by antipruritics",
	"price": 155000,
	"imgUrl": "https://i.imgur.com/iEO31h6.jpg",
	"status": "Active",
	"CategoryId": 1,
	"UserId": 1,
	"createdAt": "2022-11-10T02:48:56.000Z",
	"updatedAt": "2022-11-10T02:48:56.000Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "product not found"
}
```

## 7. GET /shipping-cost/province

Description:

- Get all province from 3rd party API

#### Request

_Response (200 - OK)_

```json
[
  {
		"province_id": "1",
		"province": "Bali"
	},
	{
		"province_id": "2",
		"province": "Bangka Belitung"
	},
	{
		"province_id": "3",
		"province": "Banten"
	},
  ...,
]
```

&nbsp;

## 8. GET /shipping-cost/city/:provinceId

Description:

- Get all city by province from 3rd party API

#### Request

- params:

```json
{
  "provinceId": "integer (required)"
}
```

_Response (200 - OK)_

```json
[
  {
		"city_id": "18",
		"province_id": "13",
		"province": "Kalimantan Selatan",
		"type": "Kabupaten",
		"city_name": "Balangan",
		"postal_code": "71611"
	},
	{
		"city_id": "33",
		"province_id": "13",
		"province": "Kalimantan Selatan",
		"type": "Kabupaten",
		"city_name": "Banjar",
		"postal_code": "70619"
	},
  ...,
]
```

&nbsp;

## 9. POST /shipping-cost/cost

Description:

- Get shipping costs from 3rd party API

#### Request

- query:

```json
{
  "destination": "<city_id> integer (required)",
  "weight": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
	"city": "Kabupaten Banjar - Kalimantan Selatan",
	"courier": "jne",
	"services": "OKE",
	"cost": 13000
}
```

&nbsp;

## 12. GET /histories

Description:

- Get all data history logs

#### Request

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  	{
		"id": 1,
		"UserId": 1,
		"ProductId": 1,
		"address": "test",
		"ProvinceId": 14,
		"CityId": 432,
		"totalAmount": 179000,
		"status": "done",
		"token": "5cacbed4-dc49-4383-b0fb-189727e958ac",
		"createdAt": "2022-11-11T02:51:21.772Z",
		"updatedAt": "2022-11-11T02:51:49.698Z",
		"User": {
			"id": 1,
			"fullName": "Syauqi",
			"email": "syauqi@mail.com",
			"password": "$2a$10$8xJsnLw5r7mZD4m4xAQZzeD8HbUHCBGqCbmso6aKUd08ZFjP7vaj.",
			"role": "Admin",
			"phoneNumber": "854-525-8066",
			"address": "942 4th Drive",
			"createdAt": "2022-11-10T02:48:55.682Z",
			"updatedAt": "2022-11-10T02:48:55.682Z"
		},
		"Product": {
			"id": 1,
			"name": "Timeless Boho Wedding Invitation Set",
			"description": "Poisoning by antipruritics",
			"price": 155000,
			"imgUrl": "https://i.imgur.com/iEO31h6.jpg",
			"status": "Active",
			"CategoryId": 1,
			"UserId": 1,
			"createdAt": "2022-11-10T02:48:56.000Z",
			"updatedAt": "2022-11-10T02:48:56.000Z"
		}
	},
	.......
]
```

&nbsp;


## 13. POST /payment
#### Description
- generate token payment and create logs

#### Request

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - Ok)_

```json
{
  "token": "string"
}
```


&nbsp;


## 14. PUT /payment_update/id
#### Description
- update status payment on payment logs

#### Request

- params:

```json
{
  "id": "string"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - Ok)_

```json
{
  "status": "ok"
}
```


&nbsp;



## Global Error

_Response (401 - invalid token)_

```json
{
  "message": "error authentication - Invalid Token"
}
```
_Response (403 - forbidden)_

```json
{
  "message": "your not authorize"
}
```
_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```