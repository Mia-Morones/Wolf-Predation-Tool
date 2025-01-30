# Wolf Livestock Conflict Calculator App

## Getting Started
Before you start, make sure you have a fresh version of [Node.js](https://nodejs.org/en/) and NPM installed. The current Long Term Support (LTS) release is an ideal starting point.

1. Fork this repository and clone your own fork to your computer: 
    ```sh
    git clone https://github.com/YOUR_USERNAME/react-redux-boilerplate.git
    ```


2. From the project's root directory, install the required packages (dependencies):

    ```sh
    npm install
    ```

3. To run and test the app on your local machine (http://localhost:8080):

    ```sh
    npm run start
    ```

    This will start a server instance and begin listening for connections from localhost on port `8080`.

4. To build/deploye the app, you can run:

    ```sh
    npm run build
    ```

    This will place all files needed for deployment into the `/docs` directory.

## Project Structure

```sh
├── public  
    ├── favicon.ico
    ├── index.html              # html template for the app
    ├── thumbnail.jpg           # an image will be used in og:image meta tag
├── src                         # Source code.
    ├── components              # React components
    ├── constants               # app-wide constants (text, URLs, themes and etc)
    ├── contexts                # React contexts
    ├── hooks                   # reusable custom hooks
    ├── pages                   # Page components
    ├── services                # API calls
    ├── static                  # static assets
    ├── store                   # Redux store
        ├── configureStore.ts   # configure the app's redux store
        ├── getPreloadedState.ts 
        ├── rootReducers.ts     # combine reducers from all slices
    ├── styles                  # app-wide styles
    ├── types                   # type definitions
    ├── utils                   # utility functions
    └── index.tsx               # entry point for the app
├── .babelrc                    # Babel configuration
├── .eslintrc.js                # ESLint configuration
├── .prettierrc.js              # Prettier configuration
├── tsconfig.json               # TypeScript configuration
├── webpack.config.js           # Webpack configurations
├── tailwind.config.js          # Tailwind CSS configurations
├── postcss.config.js           # PostCSS configurations
├── meta.config.js              # meta tags configuration
```
