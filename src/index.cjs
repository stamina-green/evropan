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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer_1 = require("puppeteer");
var websocket_1 = require("websocket").client;
var events_1 = require("events");
// import { exec } from "child_process";
var WebSocketClient = websocket_1
var ees = new events_1()
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, cooButt, icko, i, out, e_1, restet, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer_1.default.launch({ headless: false })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto("https://www.evropa2.cz/souteze/maturitak-evropy-2-3")];
            case 3:
                _a.sent();
                return [4 /*yield*/, page.waitForSelector("#didomi-notice-agree-button")];
            case 4:
                cooButt = _a.sent();
                cooButt === null || cooButt === void 0 ? void 0 : cooButt.click();
                return [4 /*yield*/, page.waitForTimeout(1500)];
            case 5:
                _a.sent();
                icko = 10;
                i = 0;
                i = 0;
                _a.label = 6;
            case 6:
                if (!(i < icko)) return [3 /*break*/, 18];
                console.log("i", i);
                _a.label = 7;
            case 7:
                _a.trys.push([7, 9, , 11]);
                return [4 /*yield*/, runCaptcha(page)];
            case 8:
                out = _a.sent();
                if (out === "err")
                    return [3 /*break*/, 18];
                return [3 /*break*/, 11];
            case 9:
                e_1 = _a.sent();
                console.log("err runCaptcha", e_1);
                icko++;
                return [4 /*yield*/, page.waitForTimeout(3000)];
            case 10:
                _a.sent();
                return [3 /*break*/, 11];
            case 11: return [4 /*yield*/, page.waitForTimeout(4500)];
            case 12:
                _a.sent();
                restet = void 0;
                _a.label = 13;
            case 13:
                _a.trys.push([13, 15, , 16]);
                return [4 /*yield*/, page.$eval(".jsx-1948174344.success", function (el) { return el.innerText; })];
            case 14:
                restet = _a.sent();
                return [3 /*break*/, 16];
            case 15:
                e_2 = _a.sent();
                console.log("err restest");
                return [3 /*break*/, 16];
            case 16:
                console.log(restet);
                if (restet !== "Hlas přijat.")
                    icko++;
                _a.label = 17;
            case 17:
                i++;
                return [3 /*break*/, 6];
            case 18:
                if (i >= 9) {
                    ees.emit("num");
                }
                else {
                    // exec('cd "C:\\Program Files\\NordVPN\\" && .\\NordVPN.exe -c', (e, out, err) => {
                    //   console.log(e, out, err);
                    // })
                    // await page.waitForTimeout(5000);
                    console.log("reboot inc a");
                }
                return [4 /*yield*/, page.screenshot({ path: "./scr/out" + Date.now() + ".png" })];
            case 19:
                _a.sent();
                return [4 /*yield*/, browser.close()];
            case 20:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getTextFromMP3Link = function (link) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ees.emit("new", link);
        console.log("emited");
        return [2 /*return*/, new Promise(function (resolve, reject) {
                ees.once("resolve", function (data) {
                    console.log(data);
                    return resolve(data);
                });
                setTimeout(function () {
                    reject("timeout");
                }, 10000);
            })];
    });
}); };
var runCaptcha = function (page) { return __awaiter(void 0, void 0, void 0, function () {
    var a, button, inner, iframe, captcha, audiobutt, link, linkVal, output;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, page.waitForSelector('div[title="4. B – Smíchovská střední průmyslová škola a gymnázium"]')];
            case 1:
                a = _b.sent();
                if (!a)
                    throw new Error("a not found");
                return [4 /*yield*/, a.getProperty("parentNode")];
            case 2: return [4 /*yield*/, (_b.sent()).getProperty("parentNode")];
            case 3: return [4 /*yield*/, ((_a = (_b.sent())
                    .asElement()) === null || _a === void 0 ? void 0 : _a.$("button"))];
            case 4:
                button = _b.sent();
                if (!button) {
                    console.log("button not found");
                }
                console.log(button);
                return [4 /*yield*/, (button === null || button === void 0 ? void 0 : button.evaluate(function (el) { return el.innerText; }))];
            case 5:
                inner = _b.sent();
                if (inner !== "Hlasuj") {
                    return [2 /*return*/, "err"];
                }
                return [4 /*yield*/, (button === null || button === void 0 ? void 0 : button.click())];
            case 6:
                _b.sent();
                return [4 /*yield*/, page.waitForSelector('iframe[sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"][style="width: 400px; height: 580px;"]', { timeout: 3000 })];
            case 7:
                iframe = _b.sent();
                return [4 /*yield*/, page.screenshot({ path: "example.png" })];
            case 8:
                _b.sent();
                if (!iframe)
                    throw new Error("iframe not found");
                return [4 /*yield*/, iframe.contentFrame()];
            case 9:
                captcha = _b.sent();
                if (!captcha)
                    throw new Error("captcha not found");
                console.log("captcha found");
                return [4 /*yield*/, captcha.waitForTimeout(1000)];
            case 10:
                _b.sent();
                return [4 /*yield*/, captcha.waitForSelector("#recaptcha-audio-button")];
            case 11:
                audiobutt = _b.sent();
                console.log("audio button found");
                return [4 /*yield*/, (audiobutt === null || audiobutt === void 0 ? void 0 : audiobutt.click())];
            case 12:
                _b.sent();
                console.log("audio button clicked");
                setTimeout(function () {
                    page.screenshot({ path: "example.png" });
                }, 3000);
                return [4 /*yield*/, captcha.waitForSelector(".rc-audiochallenge-tdownload-link", { timeout: 3000 })];
            case 13:
                link = _b.sent();
                return [4 /*yield*/, page.waitForTimeout(1000)];
            case 14:
                _b.sent();
                console.log("link found");
                if (!link)
                    throw new Error("link not found");
                return [4 /*yield*/, link.evaluate(function (el) { return el.getAttribute("href"); })];
            case 15:
                linkVal = _b.sent();
                if (!linkVal)
                    throw new Error("link Value not found");
                console.log("link value found");
                return [4 /*yield*/, getTextFromMP3Link(linkVal)];
            case 16:
                output = _b.sent();
                console.log("output found");
                return [4 /*yield*/, captcha.type("#audio-response", output, { delay: 30 })];
            case 17:
                _b.sent();
                console.log("output typed");
                return [4 /*yield*/, page.waitForTimeout(470)];
            case 18:
                _b.sent();
                captcha.click("#recaptcha-verify-button");
                return [2 /*return*/, "ok"];
        }
    });
}); };
var connect = function () {
    client.connect("ws://130.61.150.71:9883/", "echo-protocol");
};
var client = new WebSocketClient();
client.on("connectFailed", function (error) {
    console.log("Connect Error: " + error.toString());
});
client.on("connect", function (connection) {
    var _this = this;
    console.log("WebSocket Client Connected");
    connection.on("error", function (error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on("close", function () {
        console.log("echo-protocol Connection Closed");
        setTimeout(function () {
            connect();
        }, 500);
    });
    ees.on("new", function (data) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("new");
            connection.send(data);
            return [2 /*return*/];
        });
    }); });
    ees.on("num", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("num");
            connection.send("num");
            return [2 /*return*/];
        });
    }); });
    connection.on("message", function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (message.type === "utf8") {
                    ees.emit("resolve", message.utf8Data);
                }
                return [2 /*return*/];
            });
        });
    });
});
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                connect();
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < 7)) return [3 /*break*/, 4];
                return [4 /*yield*/, main()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); })();
// setTimeout(() => {
//     main()
//     console.log("done");
// }, 100000);
