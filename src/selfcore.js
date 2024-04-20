"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var axios_1 = __importDefault(require("axios"));
var ws_1 = __importDefault(require("ws"));
var events_1 = __importDefault(require("events"));
var eventEmitter = new events_1["default"]();
var selfcore = /** @class */ (function () {
    function selfcore(token) {
        this.token = token;
        this.headers = {
            authorization: this.token,
            accept: "*/*",
            "accept-language": "en-US",
            referer: "https://discord.com/channels/@me",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_0) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.263 Chrome/83.0.4103.122 Electron/9.3.5 Safari/537.36",
            "x-debug-options": "bugReporterEnabled",
            "x-super-properties": "eyJvcyI6Ik1hYyBPUyBYIiwiYnJvd3NlciI6IkRpc2NvcmQgQ2xpZW50IiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X3ZlcnNpb24iOiIwLjAuMjYzIiwib3NfdmVyc2lvbiI6IjIwLjUuMCIsIm9zX2FyY2giOiJ4NjQiLCJzeXN0ZW1fbG9jYWxlIjoiZW4tVVMiLCJjbGllbnRfYnVpbGRfbnVtYmVyIjo5MzQ1MiwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0="
        };
    }
    selfcore.prototype.sendMessage = function (channelId, content) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"].post("https://discord.com/api/v9/channels/" + channelId + "/messages", {
                                content: content
                            }, { headers: this.headers })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, { error: err_1 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    selfcore.prototype.deleteMessage = function (channelId, messageId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"]["delete"]("https://discord.com/api/v9/channels/" + channelId + "/messages/" + messageId, { headers: this.headers })];
                    case 1:
                        res = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, { error: err_2.response.data.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    selfcore.prototype.sendWebhook = function (url, message) {
        return __awaiter(this, void 0, void 0, function () {
            var res, res, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!(typeof message === "object")) return [3 /*break*/, 2];
                        console.log(message);
                        return [4 /*yield*/, axios_1["default"].post(url, message)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                    case 2: return [4 /*yield*/, axios_1["default"].post(url, { content: message })];
                    case 3:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_3 = _a.sent();
                        return [2 /*return*/, { error: err_3 }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    selfcore.prototype.getProfile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"].get("https://discord.com/api/v9/users/816004387574251621/profile?with_mutual_guilds=false", { headers: this.headers })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                    case 2:
                        err_4 = _a.sent();
                        return [2 /*return*/, { error: err_4 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    selfcore.gateway = /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(token) {
            var _this = _super.call(this) || this;
            _this.token = token;
            _this.sessionId = null;
            _this.sequenceNumber = null;
            _this.heartbeatInterval = null;
            _this.expectHeartbeatAck = false;
            _this.baseGatewayUrl = 'wss://gateway.discord.gg/?v=9&encoding=json';
            _this.resumeGatewayUrl = _this.baseGatewayUrl;
            _this.connectToGateway();
            return _this;
        }

        class_1.prototype.connectToGateway = function (resume = false) {
            const url = resume ? this.resumeGatewayUrl : this.baseGatewayUrl;
            this.ws = new ws_1["default"](url);

            this.ws.on('open', () => {
                if (resume) {
                    this.resumeSession();
                }
            });

            this.ws.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.s) this.sequenceNumber = response.s;
                switch (response.op) {
                    case 10: // Hello event
                        this.handleHello(response.d.heartbeat_interval);
                        break;
                    case 11: // Heartbeat ACK received
                        this.expectHeartbeatAck = false;
                        break;
                    case 1: //need to send an heartbeat
                        this.sendHeartbeat();
                        break
                    case 7: //need to resume
                        this.ws.close(4000);
                        break
                    case 9: // Invalid Session
                        const closeCode = response.d ? 4000 : 1000;
                        this.ws.close(closeCode);
                        break;
                    case 0: // Dispatch
                        if (response.t === "MESSAGE_CREATE") {
                            var author = response.d.author.username;
                            var content = response.d.content;
                            _this.emit("message", d);
                        }else if (response.t === "READY") {
                            this.sessionId = response.d.session_id;
                            this.resume_gateway_url = response.d.resume_gateway_url;
                        }
                        break;
                    default:
                        break;
                    }
            });

            this.ws.on('close', (code) => {
                clearInterval(this.heartbeatInterval);
                const resumeCodes = [4000, 4001, 4002, 4003, 4005, 4006, 4007, 4008, 4009];
                const canResume = typeof code === 'undefined' || resumeCodes.includes(code);
                setTimeout(() => this.connectToGateway(canResume), 5000);
            });
        }

        class_1.prototype.handleHello = function (heartbeat_interval) {
            this.heartbeatInterval = setInterval(() => {
                if (this.expectHeartbeatAck) {
                    this.ws.close(4000);
                    return;
                }
                this.sendHeartbeat();
                this.expectHeartbeatAck = true;
            }, heartbeat_interval);
          
            this.identify();
        };

        class_1.prototype.sendHeartbeat = function () {
            this.ws.send(JSON.stringify({ op: 1, d: this.sequenceNumber }));
        };

        class_1.prototype.identify = function () {
            let payload = {
              op: 2,
              d: {
                token: this.token,
                properties: {
                  $os: "linux",
                  $browser: "chrome",
                  $device: "chrome"
                },
              }
            };
            this.ws.send(JSON.stringify(payload));
          };

        class_1.prototype.resumeSession = function () {
            this.ws.send(JSON.stringify({
              op: 6,
              d: {
                token: this.token,
                properties: {
                  $os: "linux",
                  $browser: "chrome",
                  $device: "chrome"
                },
                session_id: this.sessionId,
                seq: this.sequenceNumber
              }
            }));
          };
        return class_1;
    }(events_1["default"]));
    return selfcore;
}());
exports["default"] = selfcore;
