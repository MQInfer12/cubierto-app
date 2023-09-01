import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const xprisma = prisma.$extends({
  query: {
    $allModels: {
      findMany({ args, query }) {
        args.orderBy = {
          id: "asc"
        }
        return query(args);
      }
    },
    usuario: {
      $allOperations({ args, query}) {
        const newArgs = args as any;
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
          },
          ventas: {
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
          detalleVentas: true
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
