"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../../index"));
var user_model_1 = __importDefault(require("../../models/user.model"));
var product_model_1 = __importDefault(require("../../models/product.model"));
var database_1 = __importDefault(require("../../database"));
var request = (0, supertest_1.default)(index_1.default);
var userModel = new user_model_1.default();
var productModel = new product_model_1.default();
describe('Order Handler', function () {
    var token, order, user_id, product_id, order_id;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, product, createdUser, createdProduct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        username: 'omar_metmwah',
                        firstname: 'Omar',
                        lastname: 'Metmwah',
                        password: 'password123',
                        email: 'omar@gmail.com',
                    };
                    product = {
                        name: 'Oreo',
                        price: 5,
                    };
                    return [4 /*yield*/, userModel.create(user)];
                case 1:
                    createdUser = _a.sent();
                    user_id = createdUser.id;
                    return [4 /*yield*/, productModel.create(product)];
                case 2:
                    createdProduct = _a.sent();
                    product_id = createdProduct.id;
                    order = {
                        products: [
                            {
                                product_id: product_id,
                                quantity: 5,
                            },
                        ],
                        user_id: user_id,
                        status: true,
                    };
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var connection, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    connection = _a.sent();
                    sql = 'DELETE FROM order_products; DELETE FROM products; DELETE FROM orders; DELETE FROM users;';
                    return [4 /*yield*/, connection.query(sql)];
                case 2:
                    _a.sent();
                    connection.release();
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets the create endpoint', function (done) {
        request
            .post('/api/orders')
            .send(order)
            .then(function (res) {
            var body = res.body, status = res.status;
            expect(status).toBe(200);
            order_id = body.data.id;
            done();
        });
    });
    it('gets the index endpoint', function (done) {
        request.get('/api/orders').then(function (res) {
            expect(res.status).toBe(200);
            done();
        });
    });
    it('gets the read endpoint', function (done) {
        request.get("/api/orders/".concat(order_id)).then(function (res) {
            expect(res.status).toBe(200);
            done();
        });
    });
    it('gets the update endpoint', function (done) {
        var newOrder = __assign(__assign({}, order), { status: false });
        request
            .patch("/api/orders/".concat(order_id))
            .send(newOrder)
            .then(function (res) {
            expect(res.status).toBe(200);
            done();
        });
    });
    it('gets the delete endpoint', function (done) {
        request.delete("/api/orders/".concat(order_id)).then(function (res) {
            expect(res.status).toBe(200);
            done();
        });
    });
});
