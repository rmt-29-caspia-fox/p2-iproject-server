# THE LAZPIZ API Documentation

## Models :

_User_

```
- firstName : string, required,
- lastName : string, required,
- email : string, required, unique
- password : string, required
- phoneNumber : integer, required,
- avatar : string, required (default: "./asset/avatar-default.png")
```

_Product_

```
- name : string, required,
- description : string, required,
- price : integer, required,
- imageUrl : string, required
```

_Cart_

```
- UserId : integer, required​,
- ProductId : integer, required
```

&nbsp;

## Relationship :

> ### **Many-to-Many**
>
> Perhatikan relasi antara `User`, `Product`, dan `Cart` gunakan definisi relasi yang sesuai pada sequelize relation [doc](https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/).

&nbsp;

## Endpoints :

List of available endpoints:
​

- `POST /register`
- `POST /login`
- `POST /google-sign-in`
- `GET /products`

Routes below need authentication:

- `POST /carts/:ProductId`
- `GET /carts`

Routes below need authentication & authorization:

- `DELETE /carts/:id`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
	"firstName": "string",
	"lastName": "string",
	"email": "string",
	"password": "string",
	"phoneNumber": "integer"
}
```

_Response (201 - Created)_

```json
{
	"id": "integer",
	"email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "First Name is required"
}
OR
{
  "message": "Last Name is required"
}
OR
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
OR
{
  "message": "Password minimum 6 characters"
}
OR
{
  "message": "Phone Number is required"
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

## 3. POST /google-sign-in

Description:

- Sign in with Google Account

Request:

- headers:

```json
{
	"google_token": "string"
}
```

_Response (200 - OK)_

```json
{
	"access_token": "string"
}
```

&nbsp;

## 4. GET /products

Description:

- Fetch all products from database

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Chicken Caesar Salad",
    "description": "Moist and seasoned chicken breast with croutons and mixed vegetables",
    "price": 110000,
    "imageUrl": "https://www.recipecreek.com/wp-content/uploads/2019/05/Chicken-Caesar-Salad.jpg"
  },
  {
    "id": 2,
    "name": "Corn & Egg Soup",
    "description": "Hearty and seasoned corn, egg, and carrot soup topped with green onion",
    "price": 40000,
    "imageUrl": "https://drivemehungry.com/wp-content/uploads/2020/07/egg-drop-soup-16.jpg"
  },
  {
    "id": 3,
    "name": "Spaghetti Bolognese",
    "description": "Al dente spaghetti topped with minced meat tomato sauce with onions",
    "price": 140000,
    "imageUrl": "https://static.fanpage.it/wp-content/uploads/sites/22/2021/06/spaghetti-bolognese.jpg"
  },
  ...,
]
```

&nbsp;

## 5. POST /carts/:ProductId

Description:

- Add a product to cart

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
	"ProductId": "integer"
}
```

_Response (201 - Created)_

```json
{
	"id": 1,
	"UserId": 1,
	"ProductId": 1
}
```

_Response (404 - Not Found)_

```json
{
	"message": "Product not found"
}
```

_Response (409 - Conflict)_

```json
{
	"message": "Product has been added to cart"
}
```

&nbsp;

## 6. GET /carts

Description:

- Get current user carts

Request:

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
    "Product": {
        "id": 1,
        "name": "Chicken Caesar Salad",
        "description": "Moist and seasoned chicken breast with croutons and mixed vegetables",
        "price": 110000,
        "imageUrl": "https://www.recipecreek.com/wp-content/uploads/2019/05/Chicken-Caesar-Salad.jpg"
    }
  },
  ...,
]
```

_Response (409 - Conflict)_

```json
{
	"message": "Cart still empty"
}
```

&nbsp;

## 7. DELETE /carts/:id

Description:

- Delete cart's product

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
	"message": "Product has been removed from cart"
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

_Response (500 - Internal Server Error)_

```json
{
	"message": "Internal Server Error"
}
```
