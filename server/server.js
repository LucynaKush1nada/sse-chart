const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 5000;

const getStockPrice = (range, base) =>
    (Math.random() * range + base).toFixed(2);
const getTime = () => new Date().toLocaleTimeString();

app.use(express.json());
var myInterval;

app.post("/sse", function (req, res) {
    res.writeHead(200, {
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
    });

    if (req.body["filter"] === "a") {
        clearInterval(myInterval)
        myInterval = setInterval(() => {
            res.write(
                `data: {"time": "${getTime()}", "aTechStockPrice": "${getStockPrice(
                    2, 20)}"}`
            );
            res.write("\n\n");
        }, 2000);
        console.log(req.body)
    }
    else if (req.body["filter"] === "b") {
        clearInterval(myInterval)
        myInterval = setInterval(() => {
            res.write(
                `data: {"time": "${getTime()}", "bTechStockPrice": "${getStockPrice(4, 22)}"}`
            );
            res.write("\n\n");
        }, 2000);
        console.log(req.body)
    }
    else if (req.body["filter"] === "both") {
        clearInterval(myInterval)
        myInterval = setInterval(() => {
            res.write(
                `data: {"time": "${getTime()}", "aTechStockPrice": "${getStockPrice(
                    2, 20)}", "bTechStockPrice": "${getStockPrice(4, 22)}"}`
            );
            res.write("\n\n");
        }, 2000);
        console.log(req.body)
    }
});

app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});