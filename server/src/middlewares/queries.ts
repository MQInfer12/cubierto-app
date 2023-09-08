import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const xprisma = prisma.$extends({
  query: {
    $allModels: {
      findMany({ args, query, operation }) {
        args.orderBy = {
          id: "asc",
          ...args.orderBy
        }
        return query(args);
      }
    },
    usuario: {
      $allOperations({ args, query, operation }) {
        const newArgs = args as any;
        if(operation !== "updateMany") {
          newArgs.include = {
            ...newArgs.include, 
            productos: {
              where: {
                eliminado: false
              }
            },
            cola: true,
            ubicaciones: true,
            ubicacionActual: true,
            favoritos: {
              include: {
                restaurante: true
              }
            }
          }
        }
        return query(newArgs);
      },
      findMany({ args, query }) {
        args.where = {
          eliminado: false,
          ...args.where,
        };
        return query(args);
      },
      findUnique({ args, query }) {
        args.where = {
          eliminado: false,
          ...args.where,
        };
        return query(args);
      },
    },
    venta: {
      $allOperations({ args, query}) {
        const newArgs = args as any;
        newArgs.include = {
          ...newArgs.include,
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
          },
          usuario: true
        }
        return query(newArgs);
      }
    },
    favorito: {
      $allOperations({ args, query }) {
        const newArgs = args as any;
        newArgs.include = {
          ...newArgs.include, 
          restaurante: true
        }
        return query(newArgs);
      }
    },
    donacion: {
      $allOperations({ args, query }) {
        const newArgs = args as any;
        newArgs.include = {
          ...newArgs.include, 
          detalles: {
            include:{
              producto: true
            }
          },
          beneficiario: true,
          donador: true
        }
        return query(newArgs);
      }
    },
    producto: {
      $allOperations({ args, query}) {
        const newArgs = args as any;
        newArgs.include = {
          ...newArgs.include, 
          usuario: true
        }
        return query(newArgs);
      },
      findMany({ args, query }) {
        args.where = {
          ...args.where,
          eliminado: false
        };
        return query(args);
      },
      findUnique({ args, query }) {
        args.where = {
          ...args.where,
          eliminado: false
        };
        return query(args);
      },
    },
    productoActivo: {
      $allOperations({ args, query}) {
        const newArgs = args as any;
        newArgs.include = {
          ...newArgs.include,
          producto: {
            include: {
              usuario: true
            }
          },
          detalleVentas: {
            where: {
              venta: {
                estado: {
                  not: "rechazado"
                }
              }
            },
            include: {
              venta: {
                select: {
                  estado: true,
                  fecha: true
                }
              }
            }
          }
        }
        return query(newArgs);
      },
      findMany({ args, query }) {
        args.where = {
          ...args.where,
          eliminado: false
        };
        return query(args);
      },
      findUnique({ args, query }) {
        args.where = {
          ...args.where,
          eliminado: false
        };
        return query(args);
      },
    }
  }
});

export default xprisma as PrismaClient;
