# Data Fetching

## Reglas

- Toda la obtención de datos dentro de esta aplicación debe realizarse mediante **Server Components**.
- Bajo ninguna circunstancia deben crearse **route handlers** para obtener datos dentro de esta aplicación.
- Toda la obtención de datos debe realizarse exclusivamente mediante Server Components.
- Las consultas a la base de datos deben realizarse siempre mediante funciones auxiliares dentro del directorio `/data`.
- Estas funciones auxiliares deben utilizar **Drizzle ORM** para consultar la base de datos.
- **NO UTILIZAR SQL CRUDO (RAW SQL)**.

## Seguridad y autenticación

- Un usuario autenticado solo debe poder acceder a sus propios datos.
- No debe poder acceder a los datos de ningún otro usuario.
