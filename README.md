# user_manager_api_node

Un API básico para la gestión de usuarios, con autenticación basada en JSON Web Tokens(JWT) y administración de roles, desarrollado con Node.js, Express y MongoDB.

## Tecnologías

- **Node.js**: Para ejecutar el servidor.
- **Express**: Framework web para Node.js.
- **MongoDB**: Base de datos para almacenar la información de los usuarios.
- **JSON Web Tokens(JWT)**

## Instalación

1. Clona el repositorio.
2. Ejecuta `npm install` para instalar las dependencias.
3. Configura tu base de datos.
4. Crea un archivo `.env` tomando de referencia `.env.example`
5. Ejecuta `npm start` para poner en marcha el servidor.

## Endpoints

### Autenticación (`auth`)

- **`POST /auth/registrar`**  
  Registrar un nuevo usuario.  

- **`POST /auth/login`**  
   Iniciar sesión y obtener un token JWT.  


### Gestión de Usuarios (`user`)

- **`GET /user/perfil`**  
   Obtiene todos los datos del usuario.  
   **Requiere autenticación (Token JWT).**
- **`PUT /user/perfil`**  
   Actualiza el username, email y password del usuario.  
   **Requiere autenticación (Token JWT).**  

- **`DELETE /user/perfil`**  
   Elimina el usuario.  
   **Requiere autenticación (Token JWT).**

### Administración (`admin`)

- **`GET /admin/users`**  
   Obtener todos los usuarios.  
   **Requiere autenticación como administrador (Token JWT con rol admin).**
- **`GET /admin/user/:id`**
  Obtiene un usuario específico.
  **Requiere autenticación como administrador.**
- **`PUT /admin/user/:id`**  
   Actualiza el username, email y role de un usuario específico.  
   **Requiere autenticación como administrador.**  

- **`DELETE /admin/user/:id`**
  Elimina un usuario específico.
  **Requiere autenticación como administrador.**

## Licencia

Este proyecto está bajo la licencia **MIT**. Para más detalles, consulta el archivo [LICENSE](LICENSE).
