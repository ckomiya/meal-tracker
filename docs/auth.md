# Autenticación

## Reglas

- La autenticación de esta aplicación se gestiona mediante **Clerk**.
- No debe implementarse ninguna lógica de autenticación personalizada (gestión de sesiones, contraseñas, tokens, etc.).
- El acceso a rutas y datos protegidos debe verificarse siempre a través de las utilidades que provee Clerk (por ejemplo, `auth()` y `currentUser()` en Server Components).
- Las rutas que requieran un usuario autenticado deben protegerse mediante middleware de Clerk.

## Seguridad y autenticación

- Un usuario autenticado solo debe poder acceder a sus propios datos.
- No debe poder acceder a los datos de ningún otro usuario.
- Toda consulta a la base de datos que dependa del usuario debe filtrar por el identificador de usuario obtenido a través de Clerk.
