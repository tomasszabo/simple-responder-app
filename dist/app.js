"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const mssql_1 = __importDefault(require("mssql"));
const app = (0, express_1.default)();
const appIdentifier = process.env.APP_IDENTIFIER || 'local';
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send(`Hello ${appIdentifier}!<br/><br/><br/>Outbound IP:<br/><iframe src="/outbound" style="border:0;">`);
});
app.get('/time', (req, res) => {
    res.send(`${new Date().toISOString()}`);
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
app.get('/database', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        user: 'sqladmin',
        password: '$cwW5Hz0eo2gGXiQxeN',
        server: 'pservices-sql-server-01.database.windows.net',
        database: 'pservices-sql-db-01',
        options: {
            trustedconnection: true,
            enableArithAbort: true,
            encrypt: true
        },
        port: 1433
    };
    try {
        const pool = yield mssql_1.default.connect(config);
        const persons = yield pool.request().query("SELECT * from Persons");
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(persons.recordset));
    }
    catch (error) {
        res.send(error);
    }
}));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map