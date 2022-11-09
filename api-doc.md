# Branded things API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /gsearch`
- `POST /google-sign-in`
- `POST /favourite`
- `GET /favourite`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "email": "string email",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": 1,
  "email": "string email"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email is required"
}
OR
{
  "message": "password is required"
}
OR
{
  "message": "email format invalid"
}
OR
{
  "message": "acceptable password length: 8-16 characters"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string email",
  "password": "string"
}
```

_Response (200 - OK)_

- Body:

```json
{
  "access_token"="string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid email / password"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 3. POST /gsearch

Description:

- Get books by google-books API

Request:

- body:

```json
{ 
  "query"="string",
  "pageNum"= 2
}
```

_Response (200 - OK)_

- Body:

```json
{
"googleBooks": {
  "kind": "books#volumes",
  "totalItems": 345,
  "items": [
      {
          "kind": "books#volume",
          "id": "0cKnjvvVOIEC",
          "etag": "Igkomv3nURg",
          "selfLink": "https://www.googleapis.com/books/v1/volumes/0cKnjvvVOIEC",
          "volumeInfo": {
              "title": "A General Introduction to Psychoanalysis",
              "authors": [
                  "Sigmund Freud",
                  "Joan Riviere"
              ],
              "publishedDate": "1963",
              "industryIdentifiers": [
                  {
                      "type": "ISBN_10",
                      "identifier": "0671781138"
                  },
                  {
                      "type": "ISBN_13",
                      "identifier": "9780671781132"
                  }
              ],
              "readingModes": {
                  "text": false,
                  "image": false
              },
              "pageCount": 488,
              "printType": "BOOK",
              "categories": [
                  "Psychoanalysis"
              ],
              "maturityRating": "NOT_MATURE",
              "allowAnonLogging": false,
              "contentVersion": "0.3.2.0.preview.0",
              "panelizationSummary": {
                  "containsEpubBubbles": false,
                  "containsImageBubbles": false
              },
              "imageLinks": {
                  "smallThumbnail": "http://books.google.com/books/content?id=0cKnjvvVOIEC&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                  "thumbnail": "http://books.google.com/books/content?id=0cKnjvvVOIEC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
              },
              "language": "en",
              "previewLink": "http://books.google.co.id/books?id=0cKnjvvVOIEC&q=Introduction%2Bto%2BPsychoanalysis&dq=Introduction%2Bto%2BPsychoanalysis&hl=&cd=1&source=gbs_api",
              "infoLink": "http://books.google.co.id/books?id=0cKnjvvVOIEC&dq=Introduction%2Bto%2BPsychoanalysis&hl=&source=gbs_api",
              "canonicalVolumeLink": "https://books.google.com/books/about/A_General_Introduction_to_Psychoanalysis.html?hl=&id=0cKnjvvVOIEC"
          },
          "saleInfo": {
              "country": "ID",
              "saleability": "NOT_FOR_SALE",
              "isEbook": false
          },
          "accessInfo": {
              "country": "ID",
              "viewability": "NO_PAGES",
              "embeddable": false,
              "publicDomain": false,
              "textToSpeechPermission": "ALLOWED",
              "epub": {
                  "isAvailable": false
              },
              "pdf": {
                  "isAvailable": false
              },
              "webReaderLink": "http://play.google.com/books/reader?id=0cKnjvvVOIEC&hl=&source=gbs_api",
              "accessViewStatus": "NONE",
              "quoteSharingAllowed": false
          }
      },
      ...]}
"gutenberg": {
        "count": 0,
        "next": null,
        "previous": null,
        "results": []
    }
```

&nbsp;

## 4. POST /google-sign-in

Request:

- headers:

```json
{
  "google_token": "your_personal_google_token"
}
```

_Response (201 - Created)_

```json
{
  "access_token"="string",
  "role"="admin/staff"
}
```

&nbsp;

## 5. POST /favourite

Description:

- Add a book to Favourite

Request:

- headers:

```json
{
  "access_token": "your_personal_token"
}
```

- body:

```json
{
  "title": "string",
  "googleId": "string",
  "author": "string",
  "imageUrl": "string",
}
```

_Response (200 - OK)_

- Body:

```json
{
  "title": "string",
  "googleId": "string",
  "author": "string",
  "imageUrl": "string",
  "UserId": 1,
  "createdAt": DATE,
  "updatedAt": DATE,
}
```
_Response (403 - Forbidden)_

```json
{
  "message": "access unauthorized"
}
```
&nbsp;



Description:

- Get number of products and categories

Request:

- headers:

```json
{
  "access_token": "your_personal_token"
}
```

_Response (200 - OK)_

- Body:

```json
{
  "productNum": "integer",
  "categoryNum": "integer"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "authentication failed"
}
```

## 6. GET /favourite

Description:

- Get favourite books from current user

Request:

- headers:

```json
{
  "access_token": "your_personal_token"
}
```

_Response (200 - OK)_

- Body:

```json
[
    {
        "id": 1,
        "title": "The Idiot Boy: a Village Tale, Founded on Fact. Second Edition. To which is Added Mary How; Or, the Parish Pauper",
        "googleId": "T0ZnAAAAcAAJ",
        "author": "BOUCHIER BOUCHER (Barton)",
        "imageUrl": "http://books.google.com/books/content?id=T0ZnAAAAcAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        "createdAt": "2022-11-09T15:21:59.220Z",
        "updatedAt": "2022-11-09T15:21:59.220Z",
        "UserId": 1
    },
    ...
]
```
&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "authentication failed"
}
```
_Response (403 - Forbidden)_

```json
{
  "message": "authentication failed"
}
```
_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```