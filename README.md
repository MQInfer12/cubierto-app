<img width="200" src="https://cdn.discordapp.com/attachments/1141371465883721890/1152996953563607131/adaptive-icon.png?ex=655a3097&is=6547bb97&hm=41f9287094a4c9d4af3951de3e68ba7f25b796174ed058cfb295e491eba96cc7&" />

# Cubierto

La aplicación Cubierto realizada con React TS, React Native TS, Express TS, Prisma y PostgreSQL

## Levantar el proyecto

Clonar el repositorio.

Para levantar la aplicación móvil crear un .env en la carpeta mobile con la siguiente estructura

```env
EXPO_PUBLIC_BACKEND = "" //URL del backend
EXPO_PUBLIC_OAUTH_ID = "" //Permisos de OAuth de Google (Google Cloud)
EXPO_PUBLIC_PUSHER_APIKEY = "" //API Key de Google
EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET = "" //Upload preset de Cloudinary
EXPO_PUBLIC_CLOUDINARY_CLOUDNAME = "" //Cloudname de Cloudinary
```

Después abrir una terminal y ejecutar los siguientes comandos:

```command
  npm install
```
```command
  npm start
```

Para levantar el backend ingresar a la carpeta server y crear un archivo .env con la siguiente estructura

```env
DATABASE_URL= "postgres://user:password@host:port/database" //Cadena de conexión a base de datos
CLIENT_ID = "" //ID del cliente de Oauth
CLIENT_SECRET = "" //Secreto del cliente de Oauth
BACKEND_URL = "" //Url del backend
PUSHER_KEY = "" //Llave secreta de pusher
PUSHER_SECRET = "" //Secreto del pusher
```

Después abrir una terminal y ejecutar los siguientes comandos:

```command
  npm install
```
```command
  npm run dev
```

## Estructura de carpetas
### Aplicación móvil

<img width="250" src="https://media.discordapp.net/attachments/1141371465883721890/1170797698354532412/image.png?ex=655a5953&is=6547e453&hm=8b027f68639f00d76b66337a0d45931a1a1cbd9489d13a406fc19a26e341e591&=" />

La carpeta `app` contiene los componentes que son las mismas rutas de la aplicación, ejm. el archivo `index.tsx` se refiere a la ruta `"/"`, el archivo `home.tsx` se refiere a la ruta `"/home"`.

La carpeta `assets` contiene los archivos multimedia de la aplicación.

La carpeta `components` contiene los componentes de la aplicación ordenadas por rutas, ejm. en la carpeta `home` están los componentes de la ruta home.

La carpeta `context` contiene los estados globales de la app (manejados con `zustand`).

La carpeta `hooks` contiene customHooks para manejar la lógica de la aplicación, ejm. el custom hook `useGet` sirve para hacer peticiones al backend.

La carpeta `interfaces` contiene las distintas interfaces de Typescript de las peticiones que llegan del backend.

La carpeta `styles` contiene algunas variables globales de los estilos, ejm. sombras y colores.

La carpeta `utilities` contiene distintas funciones que realizan lógica, ejm. formatear fechas, pedir permisos, etc.

### Backend

<img width="250" src="https://cdn.discordapp.com/attachments/1141371465883721890/1170799909004398683/image.png?ex=655a5b62&is=6547e662&hm=731bb2ae617a2628beab52da9a660c5478fe19e2564c9b23f9b173caf313c03d&" />

La carpeta `dist` contiene la build de la aplicación.

La carpeta `prisma` contiene el diseño de la base de datos.

La carpeta `controllers` contiene los CRUD de cada una de las tablas, ejm. GET, POST, PUT, DELETE de la tabla `users`

La carpeta `interfaces` contiene las interfaces de Typescript de cada una de las tablas, así también la interfaz para añadir y modificar cada tabla.

La carpeta `middlewares` exporta un prisma modificando sus funcionalidades.

La carpeta `utilities` contiene funciones que realizan lógica.


Para leventar el frontend ingresar a la carpeta client y crear un archivo .env con la siguiente estructura

```env
VITE_OUTHID="" //Permisos de OAuth de Google (Google Cloud)
VITE_BACK="" //Url del backend
VITE_CLOUDINARY_UPLOAD_PRESET = "" //Upload preset de Cloudinary
VITE_CLOUDINARY_CLOUDNAME = "" //Cloudname de Cloudinary
```

Después abrir una terminal y ejecutar los siguientes comandos:

```command
  npm install
```
```command
  npm run dev
```
### Frontend

<img width="250" src="https://cdn.discordapp.com/attachments/1141371465883721890/1170808936996278383/image.png?ex=655a63cb&is=6547eecb&hm=5590d4524d791d49b648db3c129ec2e34df937cd8f1784b1c79289a2a33fa272&" />

La carpeta `assets` contiene los archivos multimedia de la aplicación.

La carpeta `components` contiene los componentes de la aplicación ordenadas por rutas, ejm. en componente `navbar` están todas los botones de la pagina.

La carpeta `context` contiene los estados globales de la app (manejados con `zustand`).

La carpeta `hooks` contiene customHooks para manejar la lógica de la aplicación, ejm. el custom hook `useGet` sirve para hacer peticiones al backend.

La carpeta `interfaces` contiene las distintas interfaces de Typescript de las peticiones que llegan del backend.

La carpeta `pages` contiene todas las vistas de la pagina, ejm. el documento `home` es la vista principal de la pagina web.

La carpeta `styles` contiene algunas variables globales de los estilos, ejm. colores.

La carpeta `utilities` contiene distintas funciones que realizan lógica, ejm. formatear fechas, pedir permisos, etc.


## Diseños UX / UI

El link propocionado contiene los archivos .fig de cada apartado diseñado de la App Cubierto ( Desktop - Mobile )

- https://drive.google.com/drive/folders/16_DwQyh0IU1KCIOEK7tHfYhpooQa0KHF?usp=sharing 
