const http = require("http");
const port = 3000;
const Flight = require('./flight.js');
const server = http.createServer(function (req, res) {
  let newObj = null;
  const headers = {
    "Access-Control-Allow-Origin": "*" /* @dev First, read about security */,
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Max-Age": 2592000,
    // 30 days
    /** add other headers as per requirement */
  };
  if (req.url === "/flight/all" && req.method === "GET") {
    res.writeHead(200, headers);
    res.end(JSON.stringify(Flight.Items));
  }
  else if (req.url === "/flight" && req.method === "POST") {
    newObj = new Flight("1", "3", "4", "12pm", new Date());
  }
  else if (req.url === "/flight/update" && req.method === "POST") {
    const updatedInfo = {
      seatNum: 'new seat number',
      departureAirport: 'new departure airport',
      arrivalAirport: 'new arrival airport',
      travelDate: 'new travel date'
    };
    if (newObj) { newObj.updateTicket(updatedInfo) }
  }
  else {
    res.writeHead(404, headers);
    res.end(JSON.stringify({ msg: "Bad" }));
  }
});

server.listen(port, function (error) {
  if (error) {
    console.log("Something was wrong", error);
  } else {
    console.log("Success");
  }
});
