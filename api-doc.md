# ReccoManga API Documentation

## Endpoints :

List of available endpoints:

- `POST /pub/register`
- `POST /pub/login`
- `POST /pub/google-login`
- `GET /pub/mangas`
- `GET /pub/mangas/:id`
- `POST /pub/bookmarks/:mangaId`
- `GET /pub/bookmarks`
- `GET /pub/quotes`

&nbsp;

## 1. POST /pub/register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
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
  "message": "email is required"
}
OR
{
  "message": "invalid email format"
}
OR
{
  "message": "email already being registered"
}
OR
{
  "message": "password is required"
}
OR
{
  "message": "password length minimum 5 characters"
}
OR
{
  "message": "username already being taken"
}
OR
{
  "message": "Username is required"
}
```

&nbsp;

## 2. POST /pub/login

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
  "access_token": "string",
  "username": "string
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "error invalid username or email or password"
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

&nbsp;

## 3. POST /pub/google-login

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
  "access_token": "string",
  "username": "string
}
```

&nbsp;

## 4. GET /pub/mangas

Description:

- Get all mangas from database

_Response (200 - OK)_

```json
{
    "data": [
        {
            "id": "8",
            "type": "manga",
            "links": {
                "self": "https://kitsu.io/api/edge/manga/8"
            },
            "attributes": {
                "createdAt": "2013-12-18T13:48:25.461Z",
                "updatedAt": "2022-11-09T08:51:24.966Z",
                "slug": "berserk",
                "synopsis": "Guts, known as the Black Swordsman, seeks sanctuary from the demonic forces that pursue him and his woman, and also vengeance against the man who branded him as an unholy sacrifice. Aided only by his titanic strength, skill, and sword, Guts must struggle against his bleak destiny, all the while fighting with a rage that might strip him of his humanity. Berserk is a dark and brooding story of outrageous swordplay and ominous fate, in the theme of Shakespeare's Macbeth.\n\nIncluded one-shot:\nVolume 14: Berserk: The Prototype",
                "description": "Guts, known as the Black Swordsman, seeks sanctuary from the demonic forces that pursue him and his woman, and also vengeance against the man who branded him as an unholy sacrifice. Aided only by his titanic strength, skill, and sword, Guts must struggle against his bleak destiny, all the while fighting with a rage that might strip him of his humanity. Berserk is a dark and brooding story of outrageous swordplay and ominous fate, in the theme of Shakespeare's Macbeth.\n\nIncluded one-shot:\nVolume 14: Berserk: The Prototype",
                "coverImageTopOffset": 200,
                "titles": {
                    "en": "Berserk",
                    "en_jp": "Berserk",
                    "en_us": "Berserk",
                    "ja_jp": "ベルセルク"
                },
                "canonicalTitle": "Berserk",
                "abbreviatedTitles": [
                    "Berserk: The Prototype"
                ],
                "averageRating": "84.16",
                "ratingFrequencies": {
                    "2": "1510",
                    "3": "21",
                    "4": "47",
                    "5": "25",
                    "6": "40",
                    "7": "11",
                    "8": "989",
                    "9": "10",
                    "10": "84",
                    "11": "25",
                    "12": "179",
                    "13": "31",
                    "14": "1668",
                    "15": "71",
                    "16": "1098",
                    "17": "211",
                    "18": "2074",
                    "19": "381",
                    "20": "12023"
                },
                "userCount": 29647,
                "favoritesCount": 2755,
                "startDate": "1989-08-25",
                "endDate": null,
                "nextRelease": null,
                "popularityRank": 20,
                "ratingRank": 23,
                "ageRating": "R",
                "ageRatingGuide": "Horror",
                "subtype": "manga",
                "status": "current",
                "tba": null,
                "posterImage": {
                    "tiny": "https://media.kitsu.io/manga/8/poster_image/tiny-f4bcd81b46656d5868fbe9410629eff5.jpeg",
                    "large": "https://media.kitsu.io/manga/8/poster_image/large-fd9364bfdbefd61ccb2367379cb61e64.jpeg",
                    "small": "https://media.kitsu.io/manga/8/poster_image/small-7b4c92722ed780d372bff680121ab70c.jpeg",
                    "medium": "https://media.kitsu.io/manga/8/poster_image/medium-0ec4706293ca8bc09ce9995fcc927afa.jpeg",
                    "original": "https://media.kitsu.io/manga/8/poster_image/69e979587f296ac1677729daf41027fd.jpg",
                    "meta": {
                        "dimensions": {
                            "tiny": {
                                "width": 110,
                                "height": 156
                            },
                            "large": {
                                "width": 550,
                                "height": 780
                            },
                            "small": {
                                "width": 284,
                                "height": 402
                            },
                            "medium": {
                                "width": 390,
                                "height": 554
                            }
                        }
                    }
                },
                "coverImage": {
                    "tiny": "https://media.kitsu.io/manga/8/cover_image/tiny-a61e4ae3c11698a65c0ecdd6cd3e86bd.gif",
                    "large": "https://media.kitsu.io/manga/8/cover_image/large-d976a1baf3051d321608d4ebb7da4220.gif",
                    "small": "https://media.kitsu.io/manga/8/cover_image/small-dd96d5ac1412ccabb1bcca3fe89747f5.gif",
                    "tiny_webp": "https://media.kitsu.io/manga/8/cover_image/tiny_webp-90fec06d293be542b08f362b457bce04.webp",
                    "large_webp": "https://media.kitsu.io/manga/8/cover_image/large_webp-e735c50a70351a02998742aa8f1424a6.webp",
                    "small_webp": "https://media.kitsu.io/manga/8/cover_image/small_webp-645e5266280fa6c4032f54823eb6413a.webp",
                    "original": "https://media.kitsu.io/manga/cover_images/8/original.jpg",
                    "meta": {
                        "dimensions": {
                            "tiny": {
                                "width": 840,
                                "height": 200
                            },
                            "large": {
                                "width": 3360,
                                "height": 800
                            },
                            "small": {
                                "width": 1680,
                                "height": 400
                            },
                            "tiny_webp": {
                                "width": 840,
                                "height": 200
                            },
                            "large_webp": {
                                "width": 3360,
                                "height": 800
                            },
                            "small_webp": {
                                "width": 1680,
                                "height": 400
                            }
                        }
                    }
                },
                "chapterCount": null,
                "volumeCount": 0,
                "serialization": "Young Animal",
                "mangaType": "manga"
            },
            "relationships": {
                "genres": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/8/relationships/genres",
                        "related": "https://kitsu.io/api/edge/manga/8/genres"
                    }
                },
                "categories": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/8/relationships/categories",
                        "related": "https://kitsu.io/api/edge/manga/8/categories"
                    }
                },
                "castings": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/8/relationships/castings",
                        "related": "https://kitsu.io/api/edge/manga/8/castings"
                    }
                },
                "installments": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/8/relationships/installments",
                        "related": "https://kitsu.io/api/edge/manga/8/installments"
                    }
                },
                "mappings": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/8/relationships/mappings",
                        "related": "https://kitsu.io/api/edge/manga/8/mappings"
                    }
                },
                "reviews": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/8/relationships/reviews",
                        "related": "https://kitsu.io/api/edge/manga/8/reviews"
                    }
                },
                "mediaRelationships": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/8/relationships/media-relationships",
                        "related": "https://kitsu.io/api/edge/manga/8/media-relationships"
                    }
                },
                "characters": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/8/relationships/characters",
                        "related": "https://kitsu.io/api/edge/manga/8/characters"
                    }
                },
                "staff": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/8/relationships/staff",
                        "related": "https://kitsu.io/api/edge/manga/8/staff"
                    }
                },
                "productions": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/8/relationships/productions",
                        "related": "https://kitsu.io/api/edge/manga/8/productions"
                    }
                },
                "quotes": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/8/relationships/quotes",
                        "related": "https://kitsu.io/api/edge/manga/8/quotes"
                    }
                },
                "chapters": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/8/relationships/chapters",
                        "related": "https://kitsu.io/api/edge/manga/8/chapters"
                    }
                },
                "mangaCharacters": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/8/relationships/manga-characters",
                        "related": "https://kitsu.io/api/edge/manga/8/manga-characters"
                    }
                },
                "mangaStaff": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/8/relationships/manga-staff",
                        "related": "https://kitsu.io/api/edge/manga/8/manga-staff"
                    }
                }
            }
        },
        {
            "id": "38",
            "type": "manga",
            "links": {
                "self": "https://kitsu.io/api/edge/manga/38"
            },
            "attributes": {
                "createdAt": "2013-12-18T13:48:27.926Z",
                "updatedAt": "2022-11-09T08:51:18.697Z",
                "slug": "one-piece",
                "synopsis": "Gol D. Roger was known as the Pirate King, the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the location of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece (which promises an unlimited amount of riches and fame), and quite possibly the most coveted of titles for the person who found it, the title of the Pirate King.\n\nEnter Monkey D. Luffy, a 17-year-old boy that defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate who ransacks villages for fun, Luffy’s reason for being a pirate is one of pure wonder; the thought of an exciting adventure and meeting new and intriguing people, along with finding One Piece, are his reasons of becoming a pirate. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach One Piece.\n\n(Source: MAL Rewrite)",
                "description": "Gol D. Roger was known as the Pirate King, the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the location of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece (which promises an unlimited amount of riches and fame), and quite possibly the most coveted of titles for the person who found it, the title of the Pirate King.\n\nEnter Monkey D. Luffy, a 17-year-old boy that defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate who ransacks villages for fun, Luffy’s reason for being a pirate is one of pure wonder; the thought of an exciting adventure and meeting new and intriguing people, along with finding One Piece, are his reasons of becoming a pirate. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach One Piece.\n\n(Source: MAL Rewrite)",
                "coverImageTopOffset": 50,
                "titles": {
                    "en": "One Piece",
                    "en_jp": "One Piece",
                    "en_us": "One Piece",
                    "ja_jp": "ONE PIECE"
                },
                "canonicalTitle": "One Piece",
                "abbreviatedTitles": [],
                "averageRating": "84.75",
                "ratingFrequencies": {
                    "2": "4916",
                    "3": "96",
                    "4": "267",
                    "5": "48",
                    "6": "236",
                    "7": "54",
                    "8": "4372",
                    "9": "86",
                    "10": "483",
                    "11": "115",
                    "12": "695",
                    "13": "152",
                    "14": "9666",
                    "15": "230",
                    "16": "2266",
                    "17": "478",
                    "18": "3114",
                    "19": "663",
                    "20": "52589"
                },
                "userCount": 81577,
                "favoritesCount": 2409,
                "startDate": "1997-07-22",
                "endDate": null,
                "nextRelease": null,
                "popularityRank": 4,
                "ratingRank": 2,
                "ageRating": "G",
                "ageRatingGuide": null,
                "subtype": "manga",
                "status": "current",
                "tba": null,
                "posterImage": {
                    "tiny": "https://media.kitsu.io/manga/38/poster_image/tiny-18e1555fe9da52fb04240304dbffbcc2.jpeg",
                    "large": "https://media.kitsu.io/manga/38/poster_image/large-0ee251e7197a3d4c6959e0ddc7d869bc.jpeg",
                    "small": "https://media.kitsu.io/manga/38/poster_image/small-210667f9765cbf077c6a7d3078b57474.jpeg",
                    "medium": "https://media.kitsu.io/manga/38/poster_image/medium-e90c0bf5b922c363af4a016b9455b598.jpeg",
                    "original": "https://media.kitsu.io/manga/38/poster_image/cf836629b0dde8c350666fdde6ed15cf.jpg",
                    "meta": {
                        "dimensions": {
                            "tiny": {
                                "width": 110,
                                "height": 156
                            },
                            "large": {
                                "width": 550,
                                "height": 780
                            },
                            "small": {
                                "width": 284,
                                "height": 402
                            },
                            "medium": {
                                "width": 390,
                                "height": 554
                            }
                        }
                    }
                },
                "coverImage": {
                    "tiny": "https://media.kitsu.io/manga/38/cover_image/tiny-551b3a10a77d7462184ec88c870e909a.jpeg",
                    "large": "https://media.kitsu.io/manga/38/cover_image/large-bd52b8f2fb81d3cf99b4fbe4c072d2b1.jpeg",
                    "small": "https://media.kitsu.io/manga/38/cover_image/small-e0bb784a3578bfd6bcdde1ccc83529b1.jpeg",
                    "original": "https://media.kitsu.io/manga/38/cover_image/020c994fbf81443b79723d8fca369df0.jpg",
                    "meta": {
                        "dimensions": {
                            "tiny": {
                                "width": 840,
                                "height": 200
                            },
                            "large": {
                                "width": 3360,
                                "height": 800
                            },
                            "small": {
                                "width": 1680,
                                "height": 400
                            }
                        }
                    }
                },
                "chapterCount": null,
                "volumeCount": null,
                "serialization": "Shounen Jump (Weekly)",
                "mangaType": "manga"
            },
            "relationships": {
                "genres": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/38/relationships/genres",
                        "related": "https://kitsu.io/api/edge/manga/38/genres"
                    }
                },
                "categories": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/38/relationships/categories",
                        "related": "https://kitsu.io/api/edge/manga/38/categories"
                    }
                },
                "castings": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/38/relationships/castings",
                        "related": "https://kitsu.io/api/edge/manga/38/castings"
                    }
                },
                "installments": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/38/relationships/installments",
                        "related": "https://kitsu.io/api/edge/manga/38/installments"
                    }
                },
                "mappings": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/38/relationships/mappings",
                        "related": "https://kitsu.io/api/edge/manga/38/mappings"
                    }
                },
                "reviews": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/38/relationships/reviews",
                        "related": "https://kitsu.io/api/edge/manga/38/reviews"
                    }
                },
                "mediaRelationships": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/38/relationships/media-relationships",
                        "related": "https://kitsu.io/api/edge/manga/38/media-relationships"
                    }
                },
                "characters": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/38/relationships/characters",
                        "related": "https://kitsu.io/api/edge/manga/38/characters"
                    }
                },
                "staff": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/38/relationships/staff",
                        "related": "https://kitsu.io/api/edge/manga/38/staff"
                    }
                },
                "productions": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/38/relationships/productions",
                        "related": "https://kitsu.io/api/edge/manga/38/productions"
                    }
                },
                "quotes": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/38/relationships/quotes",
                        "related": "https://kitsu.io/api/edge/manga/38/quotes"
                    }
                },
                "chapters": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/38/relationships/chapters",
                        "related": "https://kitsu.io/api/edge/manga/38/chapters"
                    }
                },
                "mangaCharacters": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/38/relationships/manga-characters",
                        "related": "https://kitsu.io/api/edge/manga/38/manga-characters"
                    }
                },
                "mangaStaff": {
                    "links": {
                        "self": "https://kitsu.io/api/edge/manga/38/relationships/manga-staff",
                        "related": "https://kitsu.io/api/edge/manga/38/manga-staff"
                    }
                }
            }
        },
        ...
      ]
}
```

&nbsp;

## 5. GET /customers/mangas/:id

Description:

- Get manga by id from database

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "data": {
    "id": "54114",
    "type": "manga",
    "links": {
      "self": "https://kitsu.io/api/edge/manga/54114"
    },
    "attributes": {
      "createdAt": "2018-11-11T17:13:07.946Z",
      "updatedAt": "2022-11-09T03:37:57.714Z",
      "slug": "solo-levelling",
      "synopsis": "10 years ago, after “the Gate” that connected the real world with the monster world opened, some of the ordinary, everyday people received the power to hunt monsters within the Gate. They are known as \"Hunters\". However, not all Hunters are powerful. My name is Sung Jin-Woo, an E-rank Hunter. I'm someone who has to risk his life in the lowliest of dungeons, the \"World's Weakest\". Having no skills whatsoever to display, I barely earned the required money by fighting in low-leveled dungeons… at least until I found a hidden dungeon with the hardest difficulty within the D-rank dungeons! In the end, as I was accepting death, I suddenly received a strange power, a quest log that only I could see, a secret to leveling up that only I know about! If I trained in accordance with my quests and hunted monsters, my level would rise. Changing from the weakest Hunter to the strongest S-rank Hunter!\n\n(Source: MU)",
      "description": "10 years ago, after “the Gate” that connected the real world with the monster world opened, some of the ordinary, everyday people received the power to hunt monsters within the Gate. They are known as \"Hunters\". However, not all Hunters are powerful. My name is Sung Jin-Woo, an E-rank Hunter. I'm someone who has to risk his life in the lowliest of dungeons, the \"World's Weakest\". Having no skills whatsoever to display, I barely earned the required money by fighting in low-leveled dungeons… at least until I found a hidden dungeon with the hardest difficulty within the D-rank dungeons! In the end, as I was accepting death, I suddenly received a strange power, a quest log that only I could see, a secret to leveling up that only I know about! If I trained in accordance with my quests and hunted monsters, my level would rise. Changing from the weakest Hunter to the strongest S-rank Hunter!\n\n(Source: MU)",
      "coverImageTopOffset": 0,
      "titles": {
        "en_jp": "Boku dake Level Up na Ken",
        "en_kr": "Na Honjaman Level Up",
        "en_us": "Solo Leveling",
        "ja_jp": "俺だけレベルアップな件",
        "ko_kr": "나 혼자만 레벨업"
      },
      "canonicalTitle": "Solo Leveling",
      "abbreviatedTitles": [
        "Only I level up",
        "I Level Up Alone",
        "Поднятие уровня в одиночку"
      ],
      "averageRating": "84.31",
      "ratingFrequencies": {
        "2": "1139",
        "3": "14",
        "4": "65",
        "5": "14",
        "6": "49",
        "7": "14",
        "8": "867",
        "9": "12",
        "10": "141",
        "11": "44",
        "12": "266",
        "13": "66",
        "14": "2073",
        "15": "181",
        "16": "1382",
        "17": "445",
        "18": "1936",
        "19": "449",
        "20": "11018"
      },
      "userCount": 18107,
      "favoritesCount": 682,
      "startDate": "2018-03-04",
      "endDate": "2021-12-29",
      "nextRelease": null,
      "popularityRank": 30,
      "ratingRank": 19,
      "ageRating": "PG",
      "ageRatingGuide": null,
      "subtype": "manhwa",
      "status": "finished",
      "tba": null,
      "posterImage": {
        "tiny": "https://media.kitsu.io/manga/poster_images/54114/tiny.jpg",
        "large": "https://media.kitsu.io/manga/poster_images/54114/large.jpg",
        "small": "https://media.kitsu.io/manga/poster_images/54114/small.jpg",
        "medium": "https://media.kitsu.io/manga/poster_images/54114/medium.jpg",
        "original": "https://media.kitsu.io/manga/poster_images/54114/original.jpg",
        "meta": {
          "dimensions": {
            "tiny": {
              "width": 110,
              "height": 156
            },
            "large": {
              "width": 550,
              "height": 780
            },
            "small": {
              "width": 284,
              "height": 402
            },
            "medium": {
              "width": 390,
              "height": 554
            }
          }
        }
      },
      "coverImage": null,
      "chapterCount": 179,
      "volumeCount": null,
      "serialization": "KakaoPage",
      "mangaType": "manhwa"
    },
    "relationships": {
      "genres": {
        "links": {
          "self": "https://kitsu.io/api/edge/manga/54114/relationships/genres",
          "related": "https://kitsu.io/api/edge/manga/54114/genres"
        }
      },
      "categories": {
        "links": {
          "self": "https://kitsu.io/api/edge/manga/54114/relationships/categories",
          "related": "https://kitsu.io/api/edge/manga/54114/categories"
        }
      },
      "castings": {
        "links": {
          "self": "https://kitsu.io/api/edge/manga/54114/relationships/castings",
          "related": "https://kitsu.io/api/edge/manga/54114/castings"
        }
      },
      "installments": {
        "links": {
          "self": "https://kitsu.io/api/edge/manga/54114/relationships/installments",
          "related": "https://kitsu.io/api/edge/manga/54114/installments"
        }
      },
      "mappings": {
        "links": {
          "self": "https://kitsu.io/api/edge/manga/54114/relationships/mappings",
          "related": "https://kitsu.io/api/edge/manga/54114/mappings"
        }
      },
      "reviews": {
        "links": {
          "self": "https://kitsu.io/api/edge/manga/54114/relationships/reviews",
          "related": "https://kitsu.io/api/edge/manga/54114/reviews"
        }
      },
      "mediaRelationships": {
        "links": {
          "self": "https://kitsu.io/api/edge/manga/54114/relationships/media-relationships",
          "related": "https://kitsu.io/api/edge/manga/54114/media-relationships"
        }
      },
      "characters": {
        "links": {
          "self": "https://kitsu.io/api/edge/manga/54114/relationships/characters",
          "related": "https://kitsu.io/api/edge/manga/54114/characters"
        }
      },
      "staff": {
        "links": {
          "self": "https://kitsu.io/api/edge/manga/54114/relationships/staff",
          "related": "https://kitsu.io/api/edge/manga/54114/staff"
        }
      },
      "productions": {
        "links": {
          "self": "https://kitsu.io/api/edge/manga/54114/relationships/productions",
          "related": "https://kitsu.io/api/edge/manga/54114/productions"
        }
      },
      "quotes": {
        "links": {
          "self": "https://kitsu.io/api/edge/manga/54114/relationships/quotes",
          "related": "https://kitsu.io/api/edge/manga/54114/quotes"
        }
      },
      "chapters": {
        "links": {
          "self": "https://kitsu.io/api/edge/manga/54114/relationships/chapters",
          "related": "https://kitsu.io/api/edge/manga/54114/chapters"
        }
      },
      "mangaCharacters": {
        "links": {
          "self": "https://kitsu.io/api/edge/manga/54114/relationships/manga-characters",
          "related": "https://kitsu.io/api/edge/manga/54114/manga-characters"
        }
      },
      "mangaStaff": {
        "links": {
          "self": "https://kitsu.io/api/edge/manga/54114/relationships/manga-staff",
          "related": "https://kitsu.io/api/edge/manga/54114/manga-staff"
        }
      }
    }
  }
}
```

&nbsp;

## 6. POST /pub/bookmarks/:mangaId

Description:

- Add manga to the logged-in user's bookmarks.

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
  "productId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": 8,
  "UserId": 1,
  "dataManga": "{\"data\":{\"id\":\"16554\",\"type\":\"manga\",\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/16554\"},\"attributes\":{\"createdAt\":\"2013-12-18T14:01:13.706Z\",\"updatedAt\":\"2022-11-10T06:00:33.767Z\",\"slug\":\"koe-no-katachi-manga\",\"synopsis\":\"Shoya is a bully. When Shoko, a girl who can't hear, enters his elementary school class, she becomes their favorite target, and Shoya and his friends goad each other into devising new tortures for her. But the children's cruelty goes too far. Shoko is forced to leave the school, and Shoya ends up shouldering all the blame. Six years later, the two meet again. Can Shoya make up for his past mistakes, or is it too late?\\n\\n(Source: Kodansha Comics)\",\"description\":\"Shoya is a bully. When Shoko, a girl who can't hear, enters his elementary school class, she becomes their favorite target, and Shoya and his friends goad each other into devising new tortures for her. But the children's cruelty goes too far. Shoko is forced to leave the school, and Shoya ends up shouldering all the blame. Six years later, the two meet again. Can Shoya make up for his past mistakes, or is it too late?\\n\\n(Source: Kodansha Comics)\",\"coverImageTopOffset\":180,\"titles\":{\"en\":\"A Silent Voice\",\"en_jp\":\"Koe no Katachi\",\"id_id\":\"The Shape of Voice\",\"ja_jp\":\"聲の形\"},\"canonicalTitle\":\"Koe no Katachi\",\"abbreviatedTitles\":[],\"averageRating\":\"84.31\",\"ratingFrequencies\":{\"2\":\"1869\",\"3\":\"39\",\"4\":\"100\",\"5\":\"29\",\"6\":\"86\",\"7\":\"29\",\"8\":\"1717\",\"9\":\"43\",\"10\":\"262\",\"11\":\"50\",\"12\":\"442\",\"13\":\"69\",\"14\":\"5355\",\"15\":\"162\",\"16\":\"2081\",\"17\":\"371\",\"18\":\"2756\",\"19\":\"297\",\"20\":\"21219\"},\"userCount\":53020,\"favoritesCount\":1033,\"startDate\":\"2013-08-07\",\"endDate\":\"2014-11-19\",\"nextRelease\":null,\"popularityRank\":8,\"ratingRank\":20,\"ageRating\":\"PG\",\"ageRatingGuide\":\"\",\"subtype\":\"manga\",\"status\":\"finished\",\"tba\":\"\",\"posterImage\":{\"tiny\":\"https://media.kitsu.io/manga/poster_images/16554/tiny.jpg\",\"large\":\"https://media.kitsu.io/manga/poster_images/16554/large.jpg\",\"small\":\"https://media.kitsu.io/manga/poster_images/16554/small.jpg\",\"medium\":\"https://media.kitsu.io/manga/poster_images/16554/medium.jpg\",\"original\":\"https://media.kitsu.io/manga/poster_images/16554/original.jpg\",\"meta\":{\"dimensions\":{\"tiny\":{\"width\":110,\"height\":156},\"large\":{\"width\":550,\"height\":780},\"small\":{\"width\":284,\"height\":402},\"medium\":{\"width\":390,\"height\":554}}}},\"coverImage\":{\"tiny\":\"https://media.kitsu.io/manga/cover_images/16554/tiny.jpg\",\"large\":\"https://media.kitsu.io/manga/cover_images/16554/large.jpg\",\"small\":\"https://media.kitsu.io/manga/cover_images/16554/small.jpg\",\"original\":\"https://media.kitsu.io/manga/cover_images/16554/original.jpg\",\"meta\":{\"dimensions\":{\"tiny\":{\"width\":null,\"height\":null},\"large\":{\"width\":null,\"height\":null},\"small\":{\"width\":null,\"height\":null}}}},\"chapterCount\":64,\"volumeCount\":7,\"serialization\":\"Shounen Magazine (Weekly)\",\"mangaType\":\"manga\"},\"relationships\":{\"genres\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/16554/relationships/genres\",\"related\":\"https://kitsu.io/api/edge/manga/16554/genres\"}},\"categories\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/16554/relationships/categories\",\"related\":\"https://kitsu.io/api/edge/manga/16554/categories\"}},\"castings\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/16554/relationships/castings\",\"related\":\"https://kitsu.io/api/edge/manga/16554/castings\"}},\"installments\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/16554/relationships/installments\",\"related\":\"https://kitsu.io/api/edge/manga/16554/installments\"}},\"mappings\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/16554/relationships/mappings\",\"related\":\"https://kitsu.io/api/edge/manga/16554/mappings\"}},\"reviews\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/16554/relationships/reviews\",\"related\":\"https://kitsu.io/api/edge/manga/16554/reviews\"}},\"mediaRelationships\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/16554/relationships/media-relationships\",\"related\":\"https://kitsu.io/api/edge/manga/16554/media-relationships\"}},\"characters\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/16554/relationships/characters\",\"related\":\"https://kitsu.io/api/edge/manga/16554/characters\"}},\"staff\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/16554/relationships/staff\",\"related\":\"https://kitsu.io/api/edge/manga/16554/staff\"}},\"productions\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/16554/relationships/productions\",\"related\":\"https://kitsu.io/api/edge/manga/16554/productions\"}},\"quotes\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/16554/relationships/quotes\",\"related\":\"https://kitsu.io/api/edge/manga/16554/quotes\"}},\"chapters\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/16554/relationships/chapters\",\"related\":\"https://kitsu.io/api/edge/manga/16554/chapters\"}},\"mangaCharacters\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/16554/relationships/manga-characters\",\"related\":\"https://kitsu.io/api/edge/manga/16554/manga-characters\"}},\"mangaStaff\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/16554/relationships/manga-staff\",\"related\":\"https://kitsu.io/api/edge/manga/16554/manga-staff\"}}}}}",
  "updatedAt": "2022-11-10T06:37:52.532Z",
  "createdAt": "2022-11-10T06:37:52.532Z"
}
```

&nbsp;

## 7. GET /pub/bookmarks

Description:

- Fetch all mangas in logged-in user's bookmarks.

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
        "dataManga": "{\"data\":{\"id\":\"54114\",\"type\":\"manga\",\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/54114\"},\"attributes\":{\"createdAt\":\"2018-11-11T17:13:07.946Z\",\"updatedAt\":\"2022-11-09T03:37:57.714Z\",\"slug\":\"solo-levelling\",\"synopsis\":\"10 years ago, after “the Gate” that connected the real world with the monster world opened, some of the ordinary, everyday people received the power to hunt monsters within the Gate. They are known as \\\"Hunters\\\". However, not all Hunters are powerful. My name is Sung Jin-Woo, an E-rank Hunter. I'm someone who has to risk his life in the lowliest of dungeons, the \\\"World's Weakest\\\". Having no skills whatsoever to display, I barely earned the required money by fighting in low-leveled dungeons… at least until I found a hidden dungeon with the hardest difficulty within the D-rank dungeons! In the end, as I was accepting death, I suddenly received a strange power, a quest log that only I could see, a secret to leveling up that only I know about! If I trained in accordance with my quests and hunted monsters, my level would rise. Changing from the weakest Hunter to the strongest S-rank Hunter!\\n\\n(Source: MU)\",\"description\":\"10 years ago, after “the Gate” that connected the real world with the monster world opened, some of the ordinary, everyday people received the power to hunt monsters within the Gate. They are known as \\\"Hunters\\\". However, not all Hunters are powerful. My name is Sung Jin-Woo, an E-rank Hunter. I'm someone who has to risk his life in the lowliest of dungeons, the \\\"World's Weakest\\\". Having no skills whatsoever to display, I barely earned the required money by fighting in low-leveled dungeons… at least until I found a hidden dungeon with the hardest difficulty within the D-rank dungeons! In the end, as I was accepting death, I suddenly received a strange power, a quest log that only I could see, a secret to leveling up that only I know about! If I trained in accordance with my quests and hunted monsters, my level would rise. Changing from the weakest Hunter to the strongest S-rank Hunter!\\n\\n(Source: MU)\",\"coverImageTopOffset\":0,\"titles\":{\"en_jp\":\"Boku dake Level Up na Ken\",\"en_kr\":\"Na Honjaman Level Up\",\"en_us\":\"Solo Leveling\",\"ja_jp\":\"俺だけレベルアップな件\",\"ko_kr\":\"나 혼자만 레벨업\"},\"canonicalTitle\":\"Solo Leveling\",\"abbreviatedTitles\":[\"Only I level up\",\"I Level Up Alone\",\"Поднятие уровня в одиночку\"],\"averageRating\":\"84.31\",\"ratingFrequencies\":{\"2\":\"1139\",\"3\":\"14\",\"4\":\"65\",\"5\":\"14\",\"6\":\"49\",\"7\":\"14\",\"8\":\"867\",\"9\":\"12\",\"10\":\"141\",\"11\":\"44\",\"12\":\"266\",\"13\":\"66\",\"14\":\"2073\",\"15\":\"181\",\"16\":\"1382\",\"17\":\"445\",\"18\":\"1936\",\"19\":\"449\",\"20\":\"11018\"},\"userCount\":18107,\"favoritesCount\":682,\"startDate\":\"2018-03-04\",\"endDate\":\"2021-12-29\",\"nextRelease\":null,\"popularityRank\":30,\"ratingRank\":19,\"ageRating\":\"PG\",\"ageRatingGuide\":null,\"subtype\":\"manhwa\",\"status\":\"finished\",\"tba\":null,\"posterImage\":{\"tiny\":\"https://media.kitsu.io/manga/poster_images/54114/tiny.jpg\",\"large\":\"https://media.kitsu.io/manga/poster_images/54114/large.jpg\",\"small\":\"https://media.kitsu.io/manga/poster_images/54114/small.jpg\",\"medium\":\"https://media.kitsu.io/manga/poster_images/54114/medium.jpg\",\"original\":\"https://media.kitsu.io/manga/poster_images/54114/original.jpg\",\"meta\":{\"dimensions\":{\"tiny\":{\"width\":110,\"height\":156},\"large\":{\"width\":550,\"height\":780},\"small\":{\"width\":284,\"height\":402},\"medium\":{\"width\":390,\"height\":554}}}},\"coverImage\":null,\"chapterCount\":179,\"volumeCount\":null,\"serialization\":\"KakaoPage\",\"mangaType\":\"manhwa\"},\"relationships\":{\"genres\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/54114/relationships/genres\",\"related\":\"https://kitsu.io/api/edge/manga/54114/genres\"}},\"categories\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/54114/relationships/categories\",\"related\":\"https://kitsu.io/api/edge/manga/54114/categories\"}},\"castings\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/54114/relationships/castings\",\"related\":\"https://kitsu.io/api/edge/manga/54114/castings\"}},\"installments\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/54114/relationships/installments\",\"related\":\"https://kitsu.io/api/edge/manga/54114/installments\"}},\"mappings\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/54114/relationships/mappings\",\"related\":\"https://kitsu.io/api/edge/manga/54114/mappings\"}},\"reviews\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/54114/relationships/reviews\",\"related\":\"https://kitsu.io/api/edge/manga/54114/reviews\"}},\"mediaRelationships\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/54114/relationships/media-relationships\",\"related\":\"https://kitsu.io/api/edge/manga/54114/media-relationships\"}},\"characters\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/54114/relationships/characters\",\"related\":\"https://kitsu.io/api/edge/manga/54114/characters\"}},\"staff\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/54114/relationships/staff\",\"related\":\"https://kitsu.io/api/edge/manga/54114/staff\"}},\"productions\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/54114/relationships/productions\",\"related\":\"https://kitsu.io/api/edge/manga/54114/productions\"}},\"quotes\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/54114/relationships/quotes\",\"related\":\"https://kitsu.io/api/edge/manga/54114/quotes\"}},\"chapters\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/54114/relationships/chapters\",\"related\":\"https://kitsu.io/api/edge/manga/54114/chapters\"}},\"mangaCharacters\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/54114/relationships/manga-characters\",\"related\":\"https://kitsu.io/api/edge/manga/54114/manga-characters\"}},\"mangaStaff\":{\"links\":{\"self\":\"https://kitsu.io/api/edge/manga/54114/relationships/manga-staff\",\"related\":\"https://kitsu.io/api/edge/manga/54114/manga-staff\"}}}}}",
        "createdAt": "2022-11-09T04:08:16.931Z",
        "updatedAt": "2022-11-09T04:08:16.931Z"
    },
    ...
]
```

_Response (404 - Not Found )_

```json
{
  "message": "Bookmarks is empty"
}
```

&nbsp;

## 8. GET /pub/quotes

Description:

- Get random anime quotes

_Response (200 - OK)_

```json
{
    "sukses": true,
    "result": [
        {
            "id": 6088,
            "english": "The beginning is what comes after the ending. Carve out with your own hands a future, filled with hope.",
            "indo": "Awal adalah apa yang datang setelah akhir. Ukir dengan tangan Anda sendiri masa depan, penuh dengan harapan.",
            "character": "Fullmetal Alchemist: Brotherhood",
            "anime": "Fullmetal Alchemist: Brotherhood"
        },
        {
            "id": 164,
            "english": "No, I won't abandon hate. If I did, then nothing would be left of me.",
            "indo": "Tidak, saya tidak akan meninggalkan kebencian. Jika saya melakukannya, maka tidak ada yang tersisa dari saya.",
            "character": "Ciel Phantomhive",
            "anime": "Kuroshitsuji"
        },
        {
            "id": 6510,
            "english": "Life and death come and go like marionettes dancing on a table. Once their stings are cut, they easily crumble.",
            "indo": "Hidup dan mati datang dan pergi seperti boneka menari di atas meja. Setelah sengatan mereka dipotong, mereka dengan mudah hancur.",
            "character": "Ghost in the Shell 2: Innocence",
            "anime": "Ghost in the Shell 2: Innocence"
        },
        ...
    ]
}
```

&nbsp;

## Global Error

_Response (401 - Unaouthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```
