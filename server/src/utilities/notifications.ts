import { Producto, ProductoActivo, Usuario } from "@prisma/client";
import xprisma from "../middlewares/queries";

interface Message {
  to: string,
  sound: string,
  title: string,
  body: string,
  data: {
    route: string
  }
}

export async function sendPushNotification(body: Message | Message[]) {
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export async function notifyNuevaOferta(productoActivo: ProductoActivo & {
  producto: Producto & {
    usuario: Usuario
  }
}) {
  const usersToNotify = await xprisma.usuario.findMany({
    where: {
      pushToken: {
        not: null
      },
    },
    distinct: ['pushToken']
  });
  await sendPushNotification(usersToNotify.map(user => ({
    to: user.pushToken,
    sound: "default",
    title: `¡Nueva oferta de ${productoActivo.producto.usuario.nombre}!`,
    body: `${productoActivo.producto.nombre} a tan solo Bs. ${productoActivo.precioDescontado}, ¡Aprovecha ahora mismo!`,
    data: {
      route: `verOferta/${productoActivo.id}`
    }
  })));
}

export async function notifyNuevoPedido(idRestaurante: string) {
  const userToNotify = await xprisma.usuario.findUnique({
    where: {
      id: idRestaurante
    }
  });
  await sendPushNotification({
    to: userToNotify.pushToken,
    sound: "default",
    title: `¡Tienes un nuevo pedido!`,
    body: `Haz click aquí para ver los detalles y aceptarlo`,
    data: {
      route: `cart/pendientes`
    }
  })
}

export async function notifyEstadoPedido(idUsuario: string, estado: string) {
  const userToNotify = await xprisma.usuario.findUnique({
    where: {
      id: idUsuario
    }
  });
  if(estado === "aceptado") {
    await sendPushNotification({
      to: userToNotify.pushToken,
      sound: "default",
      title: `¡Tu pedido ha sido aceptado!`,
      body: `Ya puedes recogerlo del restaurante, haz click aquí para ver los detalles`,
      data: {
        route: `cart/pedidos`
      }
    });
  } else if (estado === "rechazado") {
    await sendPushNotification({
      to: userToNotify.pushToken,
      sound: "default",
      title: `Se rechazó tu pedido... :(`,
      body: `Disculpa las molestias`,
      data: {
        route: `cart/pedidos`
      }
    });
  }
}