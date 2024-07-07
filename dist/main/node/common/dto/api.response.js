"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(timeStamp, code, status, message, data) {
        this.timeStamp = timeStamp;
        this.code = code;
        this.status = status;
        this.message = message;
        this.data = data;
    }
    static create(req) {
        return new ApiResponse(new Date(), req.code, req.status, req.message, req.data);
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=api.response.js.map