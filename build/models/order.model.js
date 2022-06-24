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
var database_1 = __importDefault(require("../database"));
var OrderModel = /** @class */ (function () {
    function OrderModel() {
    }
    //create
    OrderModel.prototype.create = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, orderProductsSql, orderProducts, _i, _a, product, rows, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _b.sent();
                        sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
                        return [4 /*yield*/, connection.query(sql, [order.user_id, order.status])];
                    case 2:
                        result = _b.sent();
                        orderProductsSql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity';
                        orderProducts = [];
                        _i = 0, _a = order.products;
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        product = _a[_i];
                        return [4 /*yield*/, connection.query(orderProductsSql, [result.rows[0].id, product.product_id, product.quantity])];
                    case 4:
                        rows = (_b.sent()).rows;
                        orderProducts.push(rows[0]);
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        //release conncetion
                        connection.release();
                        return [2 /*return*/, __assign(__assign({}, order), { products: orderProducts })];
                    case 7:
                        err_1 = _b.sent();
                        throw new Error("Cannot add new order for user ".concat(order.user_id, " because ").concat(err_1.message));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    //list
    OrderModel.prototype.list = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, results, orderProductsSql, orders, _i, _a, order, orderProductRows, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _b.sent();
                        sql = 'SELECT * FROM orders';
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        results = _b.sent();
                        orderProductsSql = 'SELECT product_id, quantity FROM order_products WHERE order_id=($1)';
                        orders = [];
                        _i = 0, _a = results.rows;
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        order = _a[_i];
                        return [4 /*yield*/, connection.query(orderProductsSql, [order.id])];
                    case 4:
                        orderProductRows = (_b.sent()).rows;
                        orders.push(__assign(__assign({}, order), { products: orderProductRows }));
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        //release connection
                        connection.release();
                        return [2 /*return*/, orders];
                    case 7:
                        err_2 = _b.sent();
                        throw new Error("Cannot get orders ".concat(err_2, " because ").concat(err_2.message));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    //get specific
    OrderModel.prototype.getOrder = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, results, order, orderProductsSql, orderProductRows, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'SELECT * FROM orders WHERE id=($1)';
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        results = _a.sent();
                        order = results.rows[0];
                        orderProductsSql = 'SELECT product_id, quantity FROM order_products WHERE order_id=($1)';
                        return [4 /*yield*/, connection.query(orderProductsSql, [id])];
                    case 3:
                        orderProductRows = (_a.sent()).rows;
                        connection.release();
                        return [2 /*return*/, __assign(__assign({}, order), { products: orderProductRows })];
                    case 4:
                        err_3 = _a.sent();
                        throw new Error("Cannot find order ".concat(id, " because ").concat(err_3.message));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    //update
    OrderModel.prototype.updateOrder = function (id, order) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, orderProductsSql, orderProducts, _i, _a, product, product_id, quantity, rows, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _b.sent();
                        sql = 'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *';
                        return [4 /*yield*/, connection.query(sql, [order.status, order.id])];
                    case 2:
                        result = _b.sent();
                        orderProductsSql = 'UPDATE order_products SET product_id = $1, quantity = $2 WHERE order_id = $3 RETURNING product_id, quantity';
                        orderProducts = [];
                        _i = 0, _a = order.products;
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        product = _a[_i];
                        product_id = product.product_id, quantity = product.quantity;
                        return [4 /*yield*/, connection.query(orderProductsSql, [product_id, quantity, result.rows[0].id])];
                    case 4:
                        rows = (_b.sent()).rows;
                        orderProducts.push(rows[0]);
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        connection.release();
                        return [2 /*return*/, __assign(__assign({}, result.rows[0]), { products: orderProducts })];
                    case 7:
                        err_4 = _b.sent();
                        throw new Error("Cannot update order for user ".concat(order.user_id, " because ").concat(err_4.message));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    //delete
    OrderModel.prototype.deleteOrder = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, orderProductsSql, sql, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        orderProductsSql = 'DELETE FROM order_products WHERE order_id=($1)';
                        return [4 /*yield*/, connection.query(orderProductsSql, [id])];
                    case 2:
                        _a.sent();
                        sql = 'DELETE FROM orders WHERE id=($1)';
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 3:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        err_5 = _a.sent();
                        throw new Error("Cannot delete order ".concat(id, " because ").concat(err_5.message));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return OrderModel;
}());
exports.default = OrderModel;
