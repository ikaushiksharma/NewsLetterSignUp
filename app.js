const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.emailID;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0//lists/ded79c9150";
  options = {
    method: "POST",
    auth: "kaushik:43be60e374d16f36dca8d2b192a14498-us14",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT, function () {
  console.log("Server is running on port 3000");
});

// API Key
//43be60e374d16f36dca8d2b192a14498-us14

// List Id
// ded79c9150
