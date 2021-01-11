require("dotenv").config({ path: `${__dirname}/.env` })

const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const messages = require("./routes/messages")

const app = express()

app.use(cors(), helmet())

app.get('*', (req, res, next) => {
    if (
        process.env.PRODUCTION === true
        && req.headers['x-forwarded-proto'] != 'https'
    ) {
        res.redirect("https://" + req.headers.host + req.url);
    }
    else next();

});

// DEFINE PERMISSION FOR JSON
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// DEFINE HEADERS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token'
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );

    next();
});


app.use("/messages", messages)

mongoose
    .connect(process.env["MONGO_KEY"],
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })

    .then(() => {
        const port = process.env.PORT || 8080
        const server = app.listen(port, () =>
            console.log(`http://localhost:${port}`)
        );
        const options = {
            cors: { origin: '*', }
        }

        const io = require("./utils/socket").init(server, options)
        io.on("connection", (socket) => {
            io.emit("Status", { message: "Sucsses" })
        })
    })

    .catch(error => {
        console.log(error)
    })



