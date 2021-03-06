// Dependencies
var db = require("../models");
const request = require("request");

// Routes
module.exports = function(app) {
  app.get("/api/getproducts", function(req, res) {
    let minPrice = "&min_price=3";
    let maxPrice = "&max_price=14";
    let tags = "&tags=dog_funny";
    let api = "&api_key=2ds0prvu2hqgcjocnj71ioss";
    // let specialty = '_"+

    const queryURL =
      "https://openapi.etsy.com/v2/listings/active?limit=100&includes=Images:1&state=active&category_path=Pets&category=pet_supplies" +
      api +
      minPrice +
      maxPrice +
      // specialty +
      tags;

    console.log("queryURL:", queryURL);

    request(queryURL, (err, response, body) => {
      if (err) {
        return console.log("\nError occurred: " + err);
      } else if (response.statusCode === 200) {
        let json = JSON.parse(body);
        console.log(json.results[0]);
        if (json.length != 0) {
          for (let i = 0; i < json.results.length; i++) {
            db.Product.create({
              title: json.results[i].title,
              product_ID: json.results[i].listing_id,
              active: json.results[i].state,
              description: json.results[i].description,
              price: json.results[i].price,
              currency_code: json.results[i].currency_code,
              quantity: json.results[i].quantity,
              imageURL: json.results[i].Images[0].url_fullxfull,
              category: json.results[i].category_path.toString(),
              tags: json.results[i].tags.toString(),
              size: "Unknown",
              listingURL: json.results[i].url,
              category_ID: json.results[i].category_id,
              ending_tsz: json.results[i].ending_tsz,
              complete: false
            })
              .then(function(dbProduct) {
                res.json(dbProduct);
              })
              .catch(function(err) {
                res.json(err);
              });
            // res.redirect("/api/products")
          }
        }
      }
    });
  });

  // GET route all products
  // app.get("/api/products", function(req, res) {
  //   db.Product.findAll({}).then(function(dbProduct) {
  //     // console.log("DB PRODUCT IS:" , dbProduct)
  //     res.json(dbProduct);
  //   });
  // });

  // Get route $4 products
  app.get("/api/4products", function(req, res) {
    db.Product.findAll({
      where: {
        price: 4
      }
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  // Get route $5 products
  app.get("/api/5products", function(req, res) {
    db.Product.findAll({
      where: {
        price: 5
      }
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  // Get route $8 products
  app.get("/api/8products", function(req, res) {
    db.Product.findAll({
      where: {
        price: 8
      }
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  // Get route $9 products
  app.get("/api/9products", function(req, res) {
    db.Product.findAll({
      where: {
        price: 9
      }
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  // Get route $14 products
  app.get("/api/14products", function(req, res) {
    db.Product.findAll({
      where: {
        price: 14
      }
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  // Get route $15 products
  app.get("/api/15products", function(req, res) {
    db.Product.findAll({
      where: {
        price: 15
      }
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  // // Get route BETWEEN products
  // app.get("/api/products", function(req, res) {
  //   // console.log(dbProduct)
  //   console.log(req.params.title)
  //   db.Product.findAll({
  //     where: {
  //           price: {
  //             [req.params.price.between]: [3, 4]
  // DON'T KNOW WHAT OUR VERSION OF Op.between is
  //http://docs.sequelizejs.com/manual/tutorial/querying.html
  //           }
  //         }
  //   }).then(function(dbProduct) {
  //     res.json(dbProduct);
  //       });
  //     });

  // POST route for saving a new product
  app.post("/api/products", function(req, res) {
    db.Product.create({
      title: json.results[i].title,
      product_ID: json.results[i].listing_id,
      active: json.results[i].state,
      description: json.results[i].description,
      price: json.results[i].price,
      currency_code: json.results[i].currency_code,
      quantity: json.results[i].quantity,
      imageURL: json.results[i].Images[0].url_fullxfull,
      category: json.results[i].category_path.toString(),
      tags: json.results[i].tags.toString(),
      size: "Unknown",
      listingURL: json.results[i].url,
      category_ID: json.results[i].category_id,
      ending_tsz: json.results[i].ending_tsz,
      complete: false
    })
      .then(function(dbProduct) {
        res.json(dbProduct);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // PUT route for updating products
  app.put("/api/products", function(req, res) {
    db.Product.update(
      {
        title: req.body.title,
        complete: req.body.complete
      },
      {
        where: {
          id: req.body.id
        }
      }
    )
      .then(function(dbProduct) {
        res.json(dbProduct);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};

// firebase code to load data into our mysql database goes here
// https://www.ipragmatech.com/data-sync-firebase-mysql/
// https://zapier.com/apps/firebase/integrations/mysql

//   //       "https://openapi.etsy.com/v2/listings/active?limit=25&includes=Images:1&state=active&category_path=Pets&category=pet_supplies&api_key=2ds0prvu2hqgcjocnj71ioss&min_price=3&max_price=14&tags=dog_funny";

//     //     "https://openapi.etsy.com/v2/listings/active?limit=5&includes=Images:1&state=active&category_path=Pets&category=pet_supplies&api_key=2ds0prvu2hqgcjocnj71ioss&min_price=3&max_price=4&tags=dog_balm";

//         // request("https://openapi.etsy.com/v2/listings/active?limit=5&includes=Images:1&state=active&category_path=Pets&category=pet_supplies&api_key=2ds0prvu2hqgcjocnj71ioss&min_price=3&max_price=4&tags=dog_balm"
