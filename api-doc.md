# HackNews API Documentation

&nbsp;

## Endpoints :

List of available endpoints:
​

- `POST /register`
- `POST /login`
- `POST /sign-google`
- `POST /sign-facebook`

Routes below need authentication:

- `GET /pub`
- `GET /pub/news`
- `GET /pub/country`

## 1. POST /register

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

Response (201 - Created)\_

```json
{
  "id": "integer",
  "email": "string"
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

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

````json
{
  "access_token": "string"
}

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
````

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. POST /sign-google

Request:

```json
{
  "CLIENT_ID": "string"
}
```

_Response (200 - OK)_

````json
{
  "access_token": "string"
}

## 4. POST /sign-facebook

Request:

```json
{
  "CLIENT_ID": "string"
}

````

_Response (200 - OK)_

````json
{
  "access_token": "string"
}

&nbsp;


## 5. GET /pub

Request:

- headers:
```json
{
  "access_token": "string"
}
````

_Response (200 - OK)_

```json
{
  "confirmed": {
    "value": 633750872,
    "detail": "https://covid19.mathdro.id/api/confirmed"
  },
  "recovered": {
    "value": 0,
    "detail": "https://covid19.mathdro.id/api/recovered"
  },
  "deaths": {
    "value": 6604770,
    "detail": "https://covid19.mathdro.id/api/deaths"
  },
  "dailySummary": "https://covid19.mathdro.id/api/daily",
  "dailyTimeSeries": {
    "pattern": "https://covid19.mathdro.id/api/daily/[dateString]",
    "example": "https://covid19.mathdro.id/api/daily/2-14-2020"
  },
  "image": "https://covid19.mathdro.id/api/og",
  "source": "https://github.com/mathdroid/covid19",
  "countries": "https://covid19.mathdro.id/api/countries",
  "countryDetail": {
    "pattern": "https://covid19.mathdro.id/api/countries/[country]",
    "example": "https://covid19.mathdro.id/api/countries/USA"
  },
  "lastUpdate": "2022-11-10T03:20:57.000Z"
}
```

&nbsp;

## 6. GET /pub/news

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json

 "status": "ok",
    "totalResults": 37,
    "articles": [
        {
            "source": {
                "id": null,
                "name": "Grid.id"
            },
            "author": null,
            "title": "Sering Mengalami Buang Air Kecil, Apakah Pertanda Diabetes Serius? - Gridhealth",
            "description": "Lebih sering buang air kecil dianggap jadi pertanda diabetes yang mengancam kesehatan tubuh, inilah penjelasannya",
            "url": "https://health.grid.id/read/353563377/sering-mengalami-buang-air-kecil-apakah-pertanda-diabetes-serius",
            "urlToImage": "https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2022/08/24/sering-pipisjpg-20220824025236.jpg",
            "publishedAt": "2022-11-09T02:22:00Z",
            "content": "GridHEALTH.id - Kenali tanda diabetes yang satu ini perihal sering mengalami buang air kecil.\r\nDiabetes adalah penyakit kronis yang ditandai dengan kadar gula darah tinggi di atas nilai normal.\r\nDiab… [+1203 chars]"
        },
    ]
```

&nbsp;
## 6. GET /pub/country

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_
```json
{
    "ID": "a0954a59-b059-46e1-89c6-19b6d7325593",
    "Message": "",
    "Global": {
        "NewConfirmed": 320976,
        "TotalConfirmed": 631419173,
        "NewDeaths": 1125,
        "TotalDeaths": 6596010,
        "NewRecovered": 0,
        "TotalRecovered": 0,
        "Date": "2022-11-09T03:12:10.63Z"
    },
    "Countries": [
        {
            "ID": "28385cc9-08ec-4111-9afe-4586f872fc67",
            "Country": "Afghanistan",
            "CountryCode": "AF",
            "Slug": "afghanistan",
            "NewConfirmed": 148,
            "TotalConfirmed": 203829,
            "NewDeaths": 2,
            "TotalDeaths": 7828,
            "NewRecovered": 0,
            "TotalRecovered": 0,
            "Date": "2022-11-09T03:12:10.63Z",
            "Premium": {}
        }..,
    ]
}..

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
  "message": "Internal server error"
}
```




