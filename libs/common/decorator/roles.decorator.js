"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.ROLES_KEY = exports.Role = void 0;
const common_1 = require("@nestjs/common");
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["OPERATOR"] = "OPERATOR";
    Role["AUDITOR"] = "AUDITOR";
    Role["ADMIN"] = "ADMIN";
})(Role = exports.Role || (exports.Role = {}));
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;
//# sourceMappingURL=roles.decorator.js.map