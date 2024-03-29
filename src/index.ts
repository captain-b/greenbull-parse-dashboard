import {SetEnvVars} from "./utils/dotenv";
SetEnvVars();

import {Server} from "./middleware/express";
import {ParseDashboardMiddleware} from "./middleware/parse_dashboard";
import * as https from "https";
import * as fs from "fs";
import path from "path";
import {SetPrivateRoutes} from "./routes/public";

let app = ParseDashboardMiddleware(Server);

app = SetPrivateRoutes(app);

const startHttps = () => {
    https.createServer({
        key: fs.readFileSync(path.join(__dirname, process.env.SSL_KEY!)),
        cert: fs.readFileSync(path.join(__dirname, process.env.SSL_CERT!))
    }, app).listen(1338, () => {
        console.log('Running on HTTPS');
    });
}

const startHttp = () => {
    app.listen(1337, () => {
        console.log('Running on HTTP');
    });
}


if (process.env.SSL_KEY && process.env.SSL_CERT) {
    startHttps();
} else {
    startHttp();
}