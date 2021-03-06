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
var order_model_1 = __importDefault(require("../../models/order.model"));
var product_model_1 = __importDefault(require("../../models/product.model"));
var user_model_1 = __importDefault(require("../../models/user.model"));
var orderModel = new order_model_1.default();
describe('Order Model', function () {
    var userModel = new user_model_1.default();
    var productModel = new product_model_1.default();
    var order, user_id, product_id;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userModel.create({
                        username: 'omar_metmwah',
                        firstname: 'Omar',
                        lastname: 'Metmwah',
                        password: 'password123',
                        email: 'omar@gmail.com',
                    })];
                case 1:
                    user = _a.sent();
                    user_id = user.id;
                    return [4 /*yield*/, productModel.create({
                            name: 'Oreo',
                            price: 5,
                        })];
                case 2:
                    product = _a.sent();
                    product_id = product.id;
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
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userModel.deleteUser(user_id)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, productModel.deleteProduct(product_id)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should have an index method', function () {
        expect(orderModel.list).toBeDefined();
    });
    it('should have a show method', function () {
        expect(orderModel.getOrder).toBeDefined();
    });
    it('should have a add method', function () {
        expect(orderModel.create).toBeDefined();
    });
    it('should have a delete method', function () {
        expect(orderModel.deleteOrder).toBeDefined();
    });
    it('add method should add a order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdOrder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, orderModel.create(order)];
                case 1:
                    createdOrder = _a.sent();
                    expect(createdOrder).toEqual(__assign({ id: createdOrder.id }, order));
                    return [4 /*yield*/, orderModel.deleteOrder(createdOrder.id)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('index method should return a list of orders', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdOrder, orderList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, orderModel.create(order)];
                case 1:
                    createdOrder = _a.sent();
                    return [4 /*yield*/, orderModel.list()];
                case 2:
                    orderList = _a.sent();
                    expect(orderList).toEqual([createdOrder]);
                    return [4 /*yield*/, orderModel.deleteOrder(createdOrder.id)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('show method should return the correct orders', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdOrder, orderFromDb;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, orderModel.create(order)];
                case 1:
                    createdOrder = _a.sent();
                    return [4 /*yield*/, orderModel.getOrder(createdOrder.id)];
                case 2:
                    orderFromDb = _a.sent();
                    expect(orderFromDb).toEqual(createdOrder);
                    return [4 /*yield*/, orderModel.deleteOrder(createdOrder.id)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('update method should update the order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdOrder, newOrderData, _a, products, status;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, orderModel.create(order)];
                case 1:
                    createdOrder = _b.sent();
                    newOrderData = {
                        products: [
                            {
                                product_id: product_id,
                                quantity: 200,
                            },
                        ],
                        user_id: user_id,
                        status: false,
                    };
                    return [4 /*yield*/, orderModel.updateOrder(createdOrder.id, newOrderData)];
                case 2:
                    _a = _b.sent(), products = _a.products, status = _a.status;
                    expect(products).toEqual(newOrderData.products);
                    expect(status).toEqual(newOrderData.status);
                    return [4 /*yield*/, orderModel.deleteOrder(createdOrder.id)];
                case 3:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('delete method should remove the order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdOrder, orderList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, orderModel.create(order)];
                case 1:
                    createdOrder = _a.sent();
                    return [4 /*yield*/, orderModel.deleteOrder(createdOrder.id)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, orderModel.list()];
                case 3:
                    orderList = _a.sent();
                    expect(orderList).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
});
