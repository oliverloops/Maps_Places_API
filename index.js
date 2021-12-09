const express = require("express");
const mysql = require("mysql2");
const app = express();
//Middleware
app.use(express.json());
//Port
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => console.log(`listening on PORT:${PORT}`));

//DB connection
const connection = mysql.createConnection({
  host: "us-cdbr-east-04.cleardb.com",
  user: "b151c8b0ee9127",
  password: "bfa6ce0a",
  database: "heroku_d92190129dfa3af",
});

connection.connect(function (err) {
  if (err) {
    //Handle live DB connection
    setInterval(() => {
      connection.query("SELECT 1");
      console.log("DB server reconnected");
    }, 2000);
  }
});

const places = [
  {
    place_id: 1,
    image:
      "https://cdn.britannica.com/00/188200-050-1995DFEE/view-city-Guanajuato-foreground-Mexico-basilica.jpg",
    place: "Guanajuato",
    price: "$1,300.00",
    coordinates: {
      lat: "21.0190",
      lon: "-101.2574",
    },
  },
  {
    place_id: 2,
    image: "https://www.cancunalltours.com/images/plaza-dolores-hidalgo.jpg",
    place: "Dolores Hidalgo",
    price: "$1,100.00",
    coordinates: {
      lat: "21.1516",
      lon: "-100.9367",
    },
  },
  {
    place_id: 3,
    image:
      "https://www.planetware.com/wpimages/2020/06/mexico-san-miguel-de-allende-top-attractions-parish-san-miguel-arcangel.jpg",
    place: "San Miguel",
    price: "$2,200.00",
    coordinates: {
      lat: "20.9144",
      lon: "-100.7452",
    },
  },
  {
    place_id: 4,
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/0e/4a/43/76/dsc-0066-largejpg.jpg",
    place: "Yuriria",
    price: "$800.00",
    coordinates: {
      lat: "20.2109",
      lon: "-101.1306",
    },
  },
  {
    place_id: 6,
    image:
      "https://i.pinimg.com/originals/ce/2c/d7/ce2cd799462eea71f8cef51516233c08.jpg",
    place: "León",
    price: "$1,200.00",
    coordinates: {
      lat: "21.1250",
      lon: "-101.6860",
    },
  },
  {
    place_id: 7,
    image:
      "https://cdn.getyourguide.com/img/location/5e17145850e07.jpeg/92.jpg",
    place: "Querétaro",
    price: "$1,400.00",
    coordinates: {
      lat: "20.5888",
      lon: "-100.3899",
    },
  },
];

//Places request
app.get("/places", (req, res) => {
  res.send(JSON.stringify(places));
});

//Wishlist requests
app.post("/wishlist", (req, res) => {
  const item = req.body;
  //console.log(item);
  connection.query(
    `INSERT INTO Wishlist VALUES (${item.id}, "${item.place}", "${item.place_img}")`,
    (err, results, fields) => {
      if (err) {
        console.log(err);
        connection.connect();
      }
    }
  );
});

app.get("/wishlist", (req, res) => {
  connection.query(`SELECT * FROM Wishlist`, (err, results, fields) => {
    res.send(JSON.stringify(results));
  });
});

server.keepAliveTimeout = 30 * 1000;
server.headersTimeout = 35 * 1000;
