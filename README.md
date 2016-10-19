# Hackafy

Instagram clone SPA (single-page-application), in an effort to learn modern JS libraries.

Demo: [Hosted on Heroku](https://radiant-temple-15197.herokuapp.com/)

Uses:

* React
* Redux
* React-Router
* Redux Form
* Redux Thunk
* Material UI

and more

## Set up

### API Server

You need to run a local Rails server,
which is in a separate repo ([hackafy-api](https://github.com/kenny-hibino/hackafy-api))

After cloning the repository, run PostgreSQL, Redis, and Rails server.
Rails server should listen to port 5000
```
bundle install
rails db:setup
rails s -p 5000
```

### Webpack server

clone this repository, and run
```
npm install
npm run start
```

open `localhost:3000` in your browser

## Contribute

Feedbacks, issue reports are more than welcome!
