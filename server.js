require("dotenv").config();

const async = require("async");
var bodyParser = require("body-parser");
var request = require("request");
var logger = require("morgan");


const express = require("express");
const router = express.Router();
const app = express();
const PORT = process.env.PORT || 8080;

const PF_BEARER_REQUEST = process.env.PF_BEARER_REQUEST;
const PF_API_KEY = process.env.PF_API_KEY;
const PF_SECRET = process.env.PF_SECRET;

router.use(logger('dev'));
router.use(bodyParser.urlencoded({extended:false}));

app.use("/scripts", express.static("public/scripts"));
app.use("/css", express.static("public/css"));
app.use("/images", express.static("public/images"));

app.get("/", function(req, res){
  res.sendFile(process.cwd() + "/home.html");
});

app.get("/bearer", function(req, res){
    let body = `grant_type=client_credentials&client_id=${PF_API_KEY}&client_secret=${PF_SECRET}`;

    request.post({
          headers: {'content-type' : 'application/x-www-form-urlencoded'},
          url: PF_BEARER_REQUEST,
          body: body
      },
     function (error, response, body) {
      if (!error && response.statusCode == 200) {
          res.status(200).json({
            status: 'success',
            data: body,
          })
      } else {
        return res.status(400).json({
          status: 'error',
          error: "Error bearer token:" + error,
        });
      }
    });
})

app.listen(PORT, function(){
  console.log("Listening on port %s", PORT);
});

function get_bearer(){
  let body = `grant_type=client_credentials&client_id=${PF_API_KEY}&client_secret=${PF_SECRET}`;

  request.post({
          headers: {'content-type' : 'application/x-www-form-urlencoded'},
          url: PF_BEARER_REQUEST,
          body: body
      },
    async function (error, response, body) {
      if (!error && response.statusCode == 200) {
          console.log("Body:" + body);
        return body;
      } else {
        console.log("Error bearer token:" + error);
      }
  });
}
