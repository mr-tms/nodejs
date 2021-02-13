"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
var app_1 = __importDefault(require("./app"));
mongoose_1.default.connect("" + process.env.DB_LOCALHOST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(function () { return console.log('DB connection successful.'); });
var port = process.env.PORT || 8081;
app_1.default.listen(port, function () {
    console.log("App listening on port " + port);
});
// TODO add Prettier and Husky
