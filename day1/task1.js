const fs = require('fs');
const server = require('http');
const path = "savecal.txt";

server.createServer((req, res) => {
    var msg = "not correct argument";
    if (req.url !== "/favicon.ico") {
        let url = req.url.split("/");
        let op = url[1];
        let nums = url.slice(2).map(num => parseInt(num));
        if (nums.length >= 2) {
            switch (op) {
                case "add":
                    msg = nums.reduce((total, num) => total + num, 0);
                    break;
                case "mul":
                    msg = nums.reduce((total, num) => total * num, 1);
                    break;
                case "div":
                    if (nums.slice(1).some(num => num === 0)) {
                        msg = "Cannot divide by zero";
                    } else {
                        msg = nums.reduce((total, num) => total / num);
                    }
                    break;
                case "sub":
                    msg = nums.slice(1).reduce((total, num) => total - num, nums[0]);
                    break;
                default:
                    msg = "not correct operation";
                    break;
            }
            fs.appendFile(path, `${msg}\n`, (err) => {
                if (err) throw err;
            });
        }
    }
    res.end(`<h1>${msg}</h1>`);
}).listen(4000);
