const http = require("http");
const fs = require('fs');
const port = 7000;
var HomeHTML = fs.readFileSync("../Client-Side/Pages/home.html", "utf-8");
var ProfileHTML = fs.readFileSync("../Client-Side/Pages/profile.html", "utf-8");
var Style1CSS = fs.readFileSync("../Client-Side/Styles/style1.css", "utf-8");
var Script1JS = fs.readFileSync("../Client-Side/Scripts/script1.js", "utf-8");
var Image1Jpg = fs.readFileSync("../Client-Side/Images/2.jpg");
var FavIcon1ico = fs.readFileSync("../Client-Side/Icons/favicon.ico");

const server = http.createServer(function (req, res) {

  if (req.method == "GET") {
    switch (req.url) {
      case "/":
      case "/home.html":
      case "/Pages/home.html":
      case "/Client-Side/Pages/home.html":
        res.setHeader("Content-Type", "text/html");
        res.write(HomeHTML)
        break;
      case "/style1.css":
      case "/Styles/style1.css":
      case "/Client-Side/Styles/style1.css":
        res.setHeader("Content-Type", "text/css");
        res.write(Style1CSS);
        break;
      case "/script1.js":
      case "/Scripts/script1.js":
      case "/Client-Side/Scripts/script1.js":
        res.setHeader("Content-Type", "text/javascript");
        res.write(Script1JS);
        break;
      case "/2.jpg":
      case "/Images/2.jpg":
      case "/Client-Side/Images/2.jpg":
        res.setHeader("Content-Type", "image/jpeg");
        res.write(Image1Jpg);
        break;
      case "/favicon.ico":
      case "/Icons/favicon.ico":
      case "/Client-Side/Icons/favicon.ico":
        res.setHeader("Content-Type", "image/vnd.microsoft.icon");
        res.write(FavIcon1ico);
        break;
      case "/data":
        const fileData = fs.readFileSync('users.json', 'utf8');
        res.write(fileData)
        break;
      default:
        if (req.url.includes("profile.html")) {
          res.setHeader("Content-Type", "text/html");
          res.write(ProfileHTML)
        }
        else
          res.write("Invalid URL !!")
        break;
    }
    res.end()
  }
  else if (req.method == "POST") {
    let username = "";
    let email = "";
    let address = "";
    let mobile = "";

    req.on("data", (data) => {
      user = data.toString();
      username = user.split("&")[0].split("=")[1];
      mobile = user.split("&")[1].split("=")[1];
      address = user.split("&")[2].split("=")[1];
      email = user.split("&")[3].split("=")[1];
      save(username, mobile, address, email);
    });

    req.on("end", () => {
      res.setHeader("Content-Type", "text/html");
      let File = ProfileHTML.replace("{username}", username)
      File = File.replace("{Email}", email)
      File = File.replace("{MobileNumber}", mobile)
      File = File.replace("{Address}", address)
      File = File.replace("%", '@')
      res.write(File);
      res.end();
    })
  }
  else if (req.method == "PUT") {

  }

  else if (req.method == "PATCH") {

  }

  else if (req.method == "DELETE") {

  }

  else {
    res.end("Please Check ur Method [GET- POST - PATCH - PUT - DELETE]")
  }

});

server.listen(port, function (error) {
  if (error) {
    console.log("Something was wrong", error);
  } else {
    console.log("Success");
  }
});


function save(username, mobile, address, email) {
  let path = "users.json";
  const fileData = fs.readFileSync(path, 'utf8');
  let existingData = [];
  if (fileData) {
    existingData = JSON.parse(fileData);
  }

  existingData.push({
    username,
    mobile,
    address,
    email
  });

  fs.writeFile(path, JSON.stringify(existingData), 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return;
    }
    console.log('New data has been appended to' + path);
  });

}