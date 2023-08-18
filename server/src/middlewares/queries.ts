import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const xprisma = prisma.$extends({
  query: {
    usuario: {
      $allOperations({ model, operation, args, query}) {
        const newArgs = args as any;
        newArgs.include = {
          ...newArgs.include, 
          productos: true 
        }
        return query(newArgs);
      }
    }
  }
});

export default xprisma as PrismaClient;
