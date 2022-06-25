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
var user_model_1 = __importDefault(require("../../models/user.model"));
var userModel = new user_model_1.default();
describe('User Model', function () {
    var user = {
        username: 'omar_metmwah',
        firstname: 'Omar',
        lastname: 'Metmwah',
        password: 'password123',
        email: 'omar@gmail.com',
    };
    it('should have an index method', function () {
        expect(userModel.list).toBeDefined();
    });
    it('should have a show method', function () {
        expect(userModel.getUser).toBeDefined();
    });
    it('should have a create method', function () {
        expect(userModel.create).toBeDefined();
    });
    it('should have a remove method', function () {
        expect(userModel.deleteUser).toBeDefined();
    });
    it('create method should create a user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdUser, username, firstname, lastname;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userModel.create(user)];
                case 1:
                    createdUser = _a.sent();
                    if (createdUser) {
                        username = createdUser.username, firstname = createdUser.firstname, lastname = createdUser.lastname;
                        expect(username).toBe(user.username);
                        expect(firstname).toBe(user.firstname);
                        expect(lastname).toBe(user.lastname);
                    }
                    return [4 /*yield*/, userModel.deleteUser(createdUser.id)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('index method should return a list of users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdUser, userList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userModel.create(user)];
                case 1:
                    createdUser = _a.sent();
                    return [4 /*yield*/, userModel.list()];
                case 2:
                    userList = _a.sent();
                    expect(userList).toEqual([createdUser]);
                    return [4 /*yield*/, userModel.deleteUser(createdUser.id)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('show method should return the correct users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdUser, userFromDb;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userModel.create(user)];
                case 1:
                    createdUser = _a.sent();
                    return [4 /*yield*/, userModel.getUser(createdUser.id)];
                case 2:
                    userFromDb = _a.sent();
                    expect(userFromDb).toEqual(createdUser);
                    return [4 /*yield*/, userModel.deleteUser(createdUser.id)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('remove method should remove the user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdUser, userList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userModel.create(user)];
                case 1:
                    createdUser = _a.sent();
                    return [4 /*yield*/, userModel.deleteUser(createdUser.id)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, userModel.list()];
                case 3:
                    userList = _a.sent();
                    expect(userList).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('update method should update the user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdUser, newUserData, _a, firstname, lastname;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, userModel.create(user)];
                case 1:
                    createdUser = _b.sent();
                    newUserData = {
                        firstname: 'Omar',
                        lastname: 'Metmwah',
                        username: 'omar_metmwah512',
                        password: '012012012',
                        email: 'omar@gmail.com',
                    };
                    return [4 /*yield*/, userModel.updateUser(createdUser.id, newUserData)];
                case 2:
                    _a = _b.sent(), firstname = _a.firstname, lastname = _a.lastname;
                    expect(firstname).toEqual(newUserData.firstname);
                    expect(lastname).toEqual(newUserData.lastname);
                    return [4 /*yield*/, userModel.deleteUser(createdUser.id)];
                case 3:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('authenticates the user with a password', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdUser, userFromDB, username, firstname, lastname;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userModel.create(user)];
                case 1:
                    createdUser = _a.sent();
                    return [4 /*yield*/, userModel.authenticate(user.username, user.password)];
                case 2:
                    userFromDB = _a.sent();
                    if (userFromDB) {
                        username = userFromDB.username, firstname = userFromDB.firstname, lastname = userFromDB.lastname;
                        expect(username).toBe(user.username);
                        expect(firstname).toBe(user.firstname);
                        expect(lastname).toBe(user.lastname);
                    }
                    return [4 /*yield*/, userModel.deleteUser(createdUser.id)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
