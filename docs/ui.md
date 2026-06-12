# Estándares de UI

Este documento define las reglas obligatorias para el desarrollo de interfaz de usuario en este proyecto.

## Regla principal

**Solo se deben utilizar componentes de [shadcn/ui](https://ui.shadcn.com/) para construir la interfaz de usuario.**

- No se debe crear ningún componente de UI personalizado (botones, inputs, cards, modales, etc.) desde cero.
- Antes de implementar cualquier elemento visual, verifica si existe un componente equivalente en shadcn/ui.
- Si el componente necesario no está instalado todavía en `src/components/ui`, instálalo con el CLI de shadcn:

  ```bash
  npx shadcn@latest add <componente>
  ```

## Configuración del proyecto

La configuración de shadcn/ui se encuentra en `components.json`:

- **Estilo**: `radix-nova`
- **Color base**: `neutral`
- **Variables CSS**: habilitadas
- **Librería de iconos**: `lucide`
- **Alias de componentes**: `@/components`
- **Alias de UI**: `@/components/ui`
- **Alias de utilidades**: `@/lib/utils`

## Estructura

- Todos los componentes de shadcn/ui viven en `src/components/ui/`.
- Los componentes específicos de features (no de UI genérica) pueden vivir en `src/components/`, pero deben **componerse exclusivamente** a partir de los componentes de `src/components/ui/`, sin definir markup ni estilos de UI propios.
- Los estilos globales y variables de Tailwind están en `src/app/globals.css`.

## Qué NO hacer

- No crear archivos nuevos en `src/components/ui/` manualmente — siempre usar el CLI de shadcn para añadir componentes.
- No escribir componentes de UI desde cero (ni siquiera variantes simples como botones, badges o spinners).
- No usar librerías de UI externas (Material UI, Chakra, Ant Design, etc.).
- No modificar el código interno generado por shadcn dentro de `src/components/ui/` salvo para actualizaciones oficiales del componente; las personalizaciones de estilo deben hacerse vía variables de Tailwind/CSS, no reescribiendo la lógica del componente.

## Flujo de trabajo recomendado

1. Identifica qué elemento de UI necesitas (botón, formulario, diálogo, tabla, etc.).
2. Revisa `src/components/ui/` para ver si ya está disponible.
3. Si no está, instálalo con `npx shadcn@latest add <componente>`.
4. Compón tus pantallas y features usando únicamente estos componentes.
