"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const xprisma = prisma.$extends({
    query: {
        $allModels: {
            findMany({ args, query }) {
                args.orderBy = {
                    id: "asc"
                };
                return query(args);
            }
        },
        usuario: {
            $allOperations({ args, query }) {
                const newArgs = args;
                newArgs.include = Object.assign(Object.assign({}, newArgs.include), { productos: {
                        where: {
                            eliminado: false
                        }
                    }, cola: true, ubicaciones: true, ubicacionActual: true, favoritos: {
                        include: {
                            restaurante: true
                        }
                    }, ventas: {
                        include: {
                            detalles: {
                                include: {
                                    productoActivo: {
                                        include: {
                                            producto: {
                                                include: {
                                                    usuario: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } });
                return query(newArgs);
            },
            findMany({ args, query }) {
                args.where = Object.assign(Object.assign({}, args.where), { eliminado: false });
                return query(args);
            },
            findUnique({ args, query }) {
                args.where = Object.assign(Object.assign({}, args.where), { eliminado: false });
                return query(args);
            },
        },
        favorito: {
            $allOperations({ args, query }) {
                const newArgs = args;
                newArgs.include = Object.assign(Object.assign({}, newArgs.include), { restaurante: true });
                return query(newArgs);
            }
        },
        producto: {
            $allOperations({ args, query }) {
                const newArgs = args;
                newArgs.include = Object.assign(Object.assign({}, newArgs.include), { usuario: true });
                return query(newArgs);
            },
            findMany({ args, query }) {
                args.where = Object.assign(Object.assign({}, args.where), { eliminado: false });
                return query(args);
            },
            findUnique({ args, query }) {
                args.where = Object.assign(Object.assign({}, args.where), { eliminado: false });
                return query(args);
            },
        },
        productoActivo: {
            $allOperations({ args, query }) {
                const newArgs = args;
                newArgs.include = Object.assign(Object.assign({}, newArgs.include), { producto: {
                        include: {
                            usuario: true
                        }
                    }, detalleVentas: true });
                return query(newArgs);
            },
            findMany({ args, query }) {
                args.where = Object.assign(Object.assign({}, args.where), { eliminado: false });
                return query(args);
            },
            findUnique({ args, query }) {
                args.where = Object.assign(Object.assign({}, args.where), { eliminado: false });
                return query(args);
            },
        }
    }
});
exports.default = xprisma;
//# sourceMappingURL=queries.js.map