"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const xprisma = prisma.$extends({
    query: {
        usuario: {
            $allOperations({ model, operation, args, query }) {
                const newArgs = args;
                newArgs.include = Object.assign(Object.assign({}, newArgs.include), { productos: true });
                return query(newArgs);
            }
        }
    }
});
exports.default = xprisma;
//# sourceMappingURL=queries.js.map