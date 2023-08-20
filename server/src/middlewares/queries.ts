import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const xprisma = prisma.$extends({
  query: {
    $allModels: {
      findMany({ args, query }) {
        args.orderBy = {
          id: "desc"
        }
        return query(args);
      }
    },
    usuario: {
      $allOperations({ args, query}) {
        const newArgs = args as any;
        newArgs.include = {
          ...newArgs.include, 
          productos: true 
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
    producto: {
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
          producto: true
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
