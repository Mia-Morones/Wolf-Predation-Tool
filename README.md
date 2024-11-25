# React-Redux-ArcGIS Boilerplate

## Maintaining `@arcgis/core` and `@esri/calcite-components-react` Dependencies

### Updating the CSS Link for `@arcgis/core`

When updating `@arcgis/core`, ensure that the main CSS file is updated in `./src/styles/index.css` via the CDN link to reduce the final bundle size.

```css
@import 'https://js.arcgis.com/4.31/@arcgis/core/assets/esri/themes/dark/main.css';
```

### Make sure update `Calcite-Components` related assets

The `./src/components/calcite-components/index.ts` file contains a function call that loads Calcite-related assets from the CDN:

```js
setAssetPath('https://js.arcgis.com/calcite-components/2.13.2/assets');
```