# Bookstore client

Bookstore front end client. Will need backend API server at run time.
By default the backend server should running on localhost:8080, otherwise you may need to change settings in "src/config/index.ts".

## Env Setup

Need Node.js 20+, Vite 5+

### Major tech used

Typescript
React
Vite
Material-UI
Axios

## Instructions

- init: `yarn`
- build: `yarn build`
- local run: `yarn dev`
- test: `yarn test`

## Design Detail

### Pages

This project is using Material-UI to build the following pages:

- Home page "/":
  - Search bar on top which can search movies by part of title.
  - Movie list with pagination(because there may be to many movies on server). Each movie shows its thumbnail, title, average rating, and a "View Details" link
- 404 page "/404": just in case some page not found, for example: movie page with wrong movie id.
- Movie page "/movies/:id":
  - Go back link which let user go back to home page
  - Big movie Poster on the left
  - Other text info on the right:
    - title
    - genre
    - director
    - actors
    - release date(year)
    - average rating, including how many times voted
    - rating component which let user submit hisown rating
    - plot, description of the movie story
