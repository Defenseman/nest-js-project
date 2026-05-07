"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieController = void 0;
const common_1 = require("@nestjs/common");
const movie_service_1 = require("./movie.service");
let MovieController = class MovieController {
    movieService;
    constructor(movieService) {
        this.movieService = movieService;
    }
    async getMovies() {
        return this.movieService.getHello();
    }
    getMovieById(id) {
        return { id };
    }
    createMovie(body) {
        return { body };
    }
    getAllHeaders(headers) {
        return { headers };
    }
    getUserAgentHeader(headers) {
        return { headers };
    }
    getRequest(req) {
        return {
            headers: req.headers,
            url: req.url,
            method: req.method,
            query: req.query,
            params: req.params,
        };
    }
    getResponse(res) {
        return res.status(201).json({ message: "Hello from response!" });
    }
};
exports.MovieController = MovieController;
__decorate([
    (0, common_1.Get)("hello"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getMovies", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "getMovieById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "createMovie", null);
__decorate([
    (0, common_1.Get)("headers"),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "getAllHeaders", null);
__decorate([
    (0, common_1.Get)("user-agent"),
    __param(0, (0, common_1.Headers)("user-agent")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "getUserAgentHeader", null);
__decorate([
    (0, common_1.Get)("request"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], MovieController.prototype, "getRequest", null);
__decorate([
    (0, common_1.Get)("response"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "getResponse", null);
exports.MovieController = MovieController = __decorate([
    (0, common_1.Controller)({
        path: "movies",
        host: ["localhost", "127.0.0.1"],
    }),
    __metadata("design:paramtypes", [movie_service_1.MovieService])
], MovieController);
//# sourceMappingURL=movie.controller.js.map