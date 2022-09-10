require("dotenv").config();
const express = require("express");
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express();
const path = require('path')
const port = process.env.PORT

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true // permet d'envoyer des donnees sensibles (token...)
}

//******* MIDDLEWARES *********//
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static(path.join(__dirname + "public")))

//******* ROUTES *********//
const accomodationRouter = require('./accomodations/accomodations.routes')
const eatRouter = require('./eats/eats.routes')
const storeRouter = require('./stores/stores.routes')
const stationRouter = require('./stations/stations.routes')
const userRouter = require('./users/users.routes')
app.use('/accomodations', accomodationRouter)
app.use('/eats', eatRouter)
app.use('/stores', storeRouter)
app.use('/stations', stationRouter)
app.use('/users', userRouter)

//******* ECOUTE SERVEUR *********//
app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

