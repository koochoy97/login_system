# Sistema de Login 100% Funcional
Este proyecto es un sistema de Login 100% funcional hecho con React, Tailwind y con autentificación y Base de datos de Firebase. Se creó un context con las funciones de Firebase para que estas puedan ser accedidas desde cualquier componente del proyecto.

## Características
- Autentificación de usuario por correo electrónico y Google Auth (Ambos implementados con Firebase)
- Página personalizada para el reinicio de contraseña con envío de enlace con token al correo electrónico del usuario.
- Mensajes de error al ingresar datos erroneos
- Sistema de Toast Notifications realizado con React Hot Toast
- Cada usuario creado también crea un registro en el Cloud Firestore en donde se guarda el nombre completo del usuario, el cual es personalizado.
- Se puede actualizar datos de los usuarios, así como crear y borrar las cuentas. 


## Tecnologías utilizadas
- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Tailwind CSS**: Framework de CSS para un diseño rápido y flexible.
- **Firebase**: Plataforma de Google para el backend, incluyendo autenticación y base de datos (Firestore).
- **React Hot Toast**: Biblioteca para mostrar notificaciones tipo "toast".
- **React Context API**: Para manejar el estado global de la autenticación de usuario.
