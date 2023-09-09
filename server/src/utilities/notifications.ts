import { Producto, ProductoActivo, Usuario } from "@prisma/client";
import xprisma from "../middlewares/queries";
import pusher from "./pusher";

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
      AND: productoActivo.producto.usuario.rol === "proveedor" ? {
        rol: {
          in: ["restaurante", "beneficiario", "admin", "proveedor"]
        }
      } : undefined
    },
    distinct: ['pushToken']
  });

  const allUsers = await xprisma.usuario.findMany({
    where: {
      rol: {
        in: productoActivo.producto.usuario.rol === "proveedor" ?
        ["restaurante", "beneficiario", "admin", "proveedor"] :
        ["restaurante", "beneficiario", "admin", "proveedor", "usuario"]
      }
    }
  });
  await xprisma.notificacion.createMany({
    data: allUsers.map(user => ({
      usuarioId: user.id,
      usuarioDeId: productoActivo.producto.usuario.id,
      ionicon: "pricetags",
      titulo: `¡Nueva oferta!`,
      descripcion: `${productoActivo.producto.nombre} de ${productoActivo.producto.usuario.nombre} a tan solo Bs. ${productoActivo.precioDescontado}`,
      route: `verOferta/${productoActivo.id}`,
    }))
  });
  await xprisma.usuario.updateMany({
    data: {
      notificacionesPendientes: {
        increment: 1
      }
    }
  });
  await pusher.trigger('notification-channel', 'all', null);

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

export async function notifyNuevoPedido(idRestaurante: string, idUsuario: string) {
  const userToNotify = await xprisma.usuario.findUnique({
    where: {
      id: idRestaurante
    }
  });

  await xprisma.notificacion.create({
    data: {
      usuarioId: userToNotify.id,
      usuarioDeId: idUsuario,
      ionicon: "restaurant",
      titulo: "¡Alguien te hizo un pedido!",
      descripcion: "Mira los detalles",
      route: 'cart/pendientes'
    }
  });
  await xprisma.usuario.update({
    where: {
      id: userToNotify.id
    },
    data: {
      notificacionesPendientes: {
        increment: 1
      }
    }
  });
  await pusher.trigger('notification-channel', userToNotify.id, null);

  if(!userToNotify.pushToken) return;
  await sendPushNotification({
    to: userToNotify.pushToken,
    sound: "default",
    title: `¡Tienes un nuevo pedido! :D`,
    body: `Haz click aquí para ver los detalles y aceptarlo`,
    data: {
      route: `cart/pendientes`
    }
  })
}

export async function notifyEstadoPedido(idUsuario: string, idRestaurante: string, estado: string) {
  const userToNotify = await xprisma.usuario.findUnique({
    where: {
      id: idUsuario
    }
  });

  await xprisma.notificacion.create({
    data: {
      usuarioId: userToNotify.id,
      usuarioDeId: idRestaurante,
      ionicon: 
        estado === "aceptado" ? "thumbs-up" : 
        estado === "rechazado" ? "thumbs-down" : 
        estado === "recogido" && "happy-outline",
      titulo: 
        estado === "aceptado" ? "¡Te aceptaron el pedido!" : 
        estado === "rechazado" ? "Tu pedido fué rechazado..." : 
        estado === "recogido" && "¡Muchas gracias!",
      descripcion: 
        estado === "aceptado" ? "Pasa ahora a recogerlo al restaurante" : 
        estado === "rechazado" ? "Lamentablemente tuvimos que rechazar tu pedido :(" :
        estado === "recogido" && "¡Disfruta de tu pedido! ♡",
      route: 'cart/pedidos'
    }
  });
  await xprisma.usuario.update({
    where: {
      id: userToNotify.id
    },
    data: {
      notificacionesPendientes: {
        increment: 1
      }
    }
  });
  await pusher.trigger('notification-channel', userToNotify.id, null);

  if(!userToNotify.pushToken) return;
  if(estado === "aceptado") {
    await sendPushNotification({
      to: userToNotify.pushToken,
      sound: "default",
      title: `¡Tu pedido ha sido aceptado! :D`,
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

export async function notifyDonacionParaBeneficiario(idBeneficiario: string, idDonador: string, rol: string) {
  const userToNotify = await xprisma.usuario.findUnique({
    where: {
      id: idBeneficiario
    }
  });

  await xprisma.notificacion.create({
    data: {
      usuarioId: userToNotify.id,
      usuarioDeId: idDonador,
      ionicon: "heart-half",
      titulo: "¡Donación pendiente!",
      descripcion: `Un ${rol} te quiere hacer entrega de una donación`,
      route: `donations/pendientes`
    }
  });
  await xprisma.usuario.update({
    where: {
      id: userToNotify.id
    },
    data: {
      notificacionesPendientes: {
        increment: 1
      }
    }
  });
  await pusher.trigger('notification-channel', userToNotify.id, null);

  if(!userToNotify.pushToken) return;
  await sendPushNotification({
    to: userToNotify.pushToken,
    sound: "default",
    title: `¡Tienes una donación pendiente! ♡`,
    body: `Un ${rol} te quiere hacer entrega de una donación, ingresa aquí para aceptarla`,
    data: {
      route: `donations/pendientes`
    }
  });
}

export async function notifyDonacionParaRestaurante(idRestaurante: string, idBeneficiario: string) {
  const userToNotify = await xprisma.usuario.findUnique({
    where: {
      id: idRestaurante
    }
  });
  
  await xprisma.notificacion.create({
    data: {
      usuarioId: userToNotify.id,
      usuarioDeId: idBeneficiario,
      ionicon: "heart-half",
      titulo: "¡Donación pendiente!",
      descripcion: `Un beneficiario te pidió la donación de tu oferta`,
      route: `donations/pendientes`
    }
  });
  await xprisma.usuario.update({
    where: {
      id: userToNotify.id
    },
    data: {
      notificacionesPendientes: {
        increment: 1
      }
    }
  });
  await pusher.trigger('notification-channel', userToNotify.id, null);

  if(!userToNotify.pushToken) return;
  await sendPushNotification({
    to: userToNotify.pushToken,
    sound: "default",
    title: `¡Tienes una donación pendiente! ♡`,
    body: `Un beneficiario te pidió la donación de tu oferta, ingresa aquí para aceptarla`,
    data: {
      route: `donations/pendientes`
    }
  });
}

export async function notifyDonacionCompletada(idDestinatario: string, idOtro: string) {
  const userToNotify = await xprisma.usuario.findUnique({
    where: {
      id: idDestinatario
    }
  });

  const notification = {
    ionicon: "heart",
    titulo: "¡Donación completa!",
    descripcion: `¡Muchas gracias por completar la donación!`,
    route: `donations/completadas`
  }

  await xprisma.notificacion.createMany({
    data: [{
      usuarioId: userToNotify.id,
      usuarioDeId: idOtro,
      ...notification
    }, {
      usuarioId: idOtro,
      usuarioDeId: userToNotify.id,
      ...notification
    }]
  });
  await xprisma.usuario.updateMany({
    where: {
      id: {
        in: [userToNotify.id, idOtro]
      }
    },
    data: {
      notificacionesPendientes: {
        increment: 1
      }
    }
  });
  await pusher.trigger('notification-channel', userToNotify.id, null);
  await pusher.trigger('notification-channel', idOtro, null);

  if(!userToNotify.pushToken) return;
  await sendPushNotification({
    to: userToNotify.pushToken,
    sound: "default",
    title: `¡La donación se completó! ♡`,
    body: `La donación fué aceptada por ambas partes... ¡Muchas gracias!`,
    data: {
      route: `donations/completadas`
    }
  });
}