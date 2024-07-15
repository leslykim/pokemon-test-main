# Observaciones

Se trabaja sobre las [observaciones indicadas previamente](https://github.com/leslykim/pokemon-test/blob/feedback/notes.md).

## Readme

Hay un pequeño typo: `npm playwright test` en vez de `npx playwright test`.

## Tests

1. No se agregó correctamente el .env en el .gitignore, exponiendo la clave secreta
   **Nueva observación**: Resuelto OK.
2. Existen dos .env.
   **Nueva observación**: Resuelto OK.
3. No se eliminaron los tests que se generan por defecto en el proyecto.
   **Nueva observación**: Se eliminó la carpeta `text-examples`, pero no el archivo `example.ts` dentro de la carpeta `tests`.
4. Los tests `Check Wikipedia page for ${pokemon.name}` fallan. Tener en cuenta que se espera, que usando un único selector, funcione para todos los pokemones (NO crear "locatorPikachu", "locatorSnorlax", etcétera), es decir, debe ser re-utilizable.
   **Nueva observación**: Los tests pasan, pero no se está haciendo los logueos correspondientes. Para Pikachu y Snorlax no se loguea ningún párrafo, sino que está logueando objeto. En el caso de Bulbasaur, si bien hace también se loguea un objeto, dentro del mismo se visualiza un texto de un párrafo, corresponde a Appearances en vez de Conception and design. 
5. No se hace uso de baseUrl, sino que se indican las urls completas en cada test.
   **Nueva observación**: No se hizo uso de la baseUrl.