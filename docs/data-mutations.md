# Data Mutations

## Reglas

- Toda mutación de datos dentro de esta aplicación debe realizarse exclusivamente mediante **Server Actions**.
- Las Server Actions deben ubicarse en archivos co-localizados llamados `actions.ts` (o `actions.tsx` si corresponde).
- Las llamadas a la base de datos deben encapsularse en funciones auxiliares dentro del directorio `/data`.
- Estas funciones auxiliares deben utilizar **Drizzle ORM** para mutar la base de datos.
- **NO UTILIZAR SQL CRUDO (RAW SQL)**.
- Los parámetros de las Server Actions deben tener tipos explícitos de TypeScript.
- **NO UTILIZAR `FormData`** como tipo de los parámetros de las Server Actions.
- Todas las Server Actions deben validar sus argumentos utilizando **Zod** antes de invocar las funciones auxiliares de `/data`.

## Seguridad y autenticación

- Un usuario autenticado solo debe poder mutar sus propios datos.
- No debe poder mutar los datos de ningún otro usuario.
- Toda mutación que dependa del usuario debe filtrar/validar por el identificador de usuario obtenido a través de Clerk.
