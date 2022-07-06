"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Hello World!<br/><br/><br/>Outbound IP:<br/><iframe src="/outbound" style="border:0;">');
});
app.get('/outbound', (req, res) => {
    const options = {
        hostname: 'api.ipify.org',
        port: 443,
        path: '/?format=json',
        method: 'GET',
    };
    res.setHeader('Content-Type', 'text/plain');
    const call = https_1.default.request(options, response => {
        response.on('data', d => {
            res.send(d.toString());
        });
    });
    call.on('error', error => {
        res.send(error);
    });
    call.end();
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map