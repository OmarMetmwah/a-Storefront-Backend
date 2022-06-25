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
var database_1 = __importDefault(require("../../database"));
var userModel = new user_model_1.default();
describe('User Model', function () {
    describe('Test methods exists', function () {
        it('should have an Get Many Users method', function () {
            expect(userModel.list).toBeDefined();
        });
        it('should have a Get One User method', function () {
            expect(userModel.getUser).toBeDefined();
        });
        it('should have a Create User method', function () {
            expect(userModel.create).toBeDefined();
        });
        it('should have a Update User method', function () {
            expect(userModel.updateUser).toBeDefined();
        });
        it('should have a Delete User method', function () {
            expect(userModel.deleteUser).toBeDefined();
        });
        it('should have an Authenticate User method', function () {
            expect(userModel.authenticate).toBeDefined();
        });
    });
    describe('Test User Model Logic', function () {
        var user = {
            username: 'omar_metmwah',
            firstname: 'Omar',
            lastname: 'Metmwah',
            password: 'password123',
            email: 'omar@gmail.com',
        };
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.create(user)];
                    case 1:
                        createdUser = _a.sent();
                        user.id = createdUser.id;
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
                        sql = 'DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART WITH 1;';
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        _a.sent();
                        connection.release();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Create method should return a New User', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.create({
                            username: 'mahmoud_metmwah',
                            firstname: 'Mahmoud',
                            lastname: 'Metmwah',
                            password: 'password456',
                            email: 'mahmoud@gmail.com',
                        })];
                    case 1:
                        createdUser = _a.sent();
                        expect(createdUser).toEqual({
                            id: createdUser.id,
                            email: 'mahmoud@gmail.com',
                            username: 'mahmoud_metmwah',
                            firstname: 'Mahmoud',
                            lastname: 'Metmwah',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('Get Many method should return All available users in DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.list()];
                    case 1:
                        users = _a.sent();
                        expect(users.length).toBe(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Get One method should return testUser when called with ID', function () { return __awaiter(void 0, void 0, void 0, function () {
            var returnedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.getUser(user.id)];
                    case 1:
                        returnedUser = _a.sent();
                        expect(returnedUser.id).toBe(user.id);
                        expect(returnedUser.email).toBe(user.email);
                        expect(returnedUser.username).toBe(user.username);
                        expect(returnedUser.firstname).toBe(user.firstname);
                        expect(returnedUser.lastname).toBe(user.lastname);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Update One method should return a user with edited attributes', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updatedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.updateUser(user.id, {
                            username: 'maro_meto',
                            firstname: 'Maro',
                            lastname: 'Meto',
                            password: 'password456',
                            email: 'omar@gmail.com',
                        })];
                    case 1:
                        updatedUser = _a.sent();
                        expect(updatedUser.id).toBe(user.id);
                        expect(updatedUser.email).toBe(user.email);
                        expect(updatedUser.username).toBe('maro_meto');
                        expect(updatedUser.firstname).toBe('Maro');
                        expect(updatedUser.lastname).toBe('Meto');
                        return [2 /*return*/];
                }
            });
        }); });
        it('Delete One method should delete user from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var deletedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.deleteUser(user.id)];
                    case 1:
                        deletedUser = _a.sent();
                        expect(deletedUser.id).toBe(user.id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
