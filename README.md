## Features

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [esbuild](https://github.com/evanw/esbuild) - born with fastness

- 🗂 [File based routing](./src/pages)

- 📦 [Components auto importing](./src/components)

- 🍍 [State Management via Pinia](https://pinia.vuejs.org/)

- 📑 [Layout system](./src/layouts)

- 🎨 [Tailwind](https://tailwindcss.com/docs/installation)

- 🧩 [OpenAPI Generator](https://openapi-generator.tech/docs/installation/)

- 🌍 [I18n ready](./locales)

- 🔎 [Component Preview](https://github.com/johnsoncodehk/vite-plugin-vue-component-preview)

- 🗒 [Markdown Support](https://github.com/unplugin/unplugin-vue-markdown)

- 🔥 Use the [new `<script setup lang="ts">` syntax](https://github.com/vuejs/rfcs/pull/227)

- 📑 Use [FormKit](https://formkit.com/getting-started/what-is-formkit) building framework

- 📥 [APIs auto importing](https://github.com/antfu/unplugin-auto-import) - use Composition API and others directly

- 🖨 Static-site generation (SSG) via [vite-ssg](https://github.com/antfu/vite-ssg)

- 🦔 Critical CSS via [critters](https://github.com/GoogleChromeLabs/critters)

- 🔤 [Webfont self-hosting](https://github.com/feat-agency/vite-plugin-webfont-dl)

- 🦾 TypeScript, of course

- ⚙️ Unit Testing with [Vitest](https://github.com/vitest-dev/vitest), E2E Testing with [Cypress](https://cypress.io/) on [GitHub Actions](https://github.com/features/actions)

- ☁️ Deploy on Netlify, zero-config

<br>


## Pre-packed

### UI Frameworks

- [Tailwind](https://tailwindcss.com/docs/installation) - Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file.

- [Element-plus components](https://element-plus.org/es-ES/component/overview.html)

- [FormKit theme editor](https://themes.formkit.com/editor) To customize the appearance of your FormKit components, follow these steps to generate and install a theme using the FormKit theme editor.

### Plugins

- [Vue Router](https://github.com/vuejs/router)
  - [`unplugin-vue-router`](https://github.com/posva/unplugin-vue-router) - file system based routing
  - [`vite-plugin-vue-layouts`](https://github.com/JohnCampionJr/vite-plugin-vue-layouts) - layouts for pages
- [Pinia](https://pinia.vuejs.org) - Intuitive, type safe, light and flexible Store for Vue using the composition api
- [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components) - components auto import
- [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) - Directly use Vue Composition API and others without importing
- [`unplugin-vue-macros`](https://github.com/sxzz/unplugin-vue-macros) - Explore and extend more macros and syntax sugar to Vue.
- [`unplugin-vue-markdown`](https://github.com/antfu/unplugin-vue-markdown) - Markdown as components / components in Markdown
  - [`markdown-it-shikiji`](https://github.com/antfu/shikiji) - [Shiki](https://github.com/antfu/shikiji) for syntax highlighting
- [Vue I18n](https://github.com/intlify/vue-i18n-next) - Internationalization
  - [`unplugin-vue-i18n`](https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n) - unplugin for Vue I18n
- [VueUse](https://github.com/antfu/vueuse) - collection of useful composition APIs
- [`vite-ssg-sitemap`](https://github.com/jbaubree/vite-ssg-sitemap) - Sitemap generator
- [`@vueuse/head`](https://github.com/vueuse/head) - manipulate document head reactively
- [`vite-plugin-webfont-dl`](https://github.com/feat-agency/vite-plugin-webfont-dl) - Zero-config webfont (Google Fonts) downloader and injector to improve website's performance.
- [`vite-plugin-vue-devtools`](https://github.com/webfansplz/vite-plugin-vue-devtools) - Designed to enhance the Vue developer experience.

### Coding Style

- Use Composition API with [`<script setup lang="ts">` SFC syntax](https://vuejs.org/api/sfc-script-setup.html)
- [ESLint](https://eslint.org/) with [@antfu/eslint-config](https://github.com/antfu/eslint-config), single quotes, no semi.

### Dev tools

- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://github.com/vitest-dev/vitest) - Unit testing powered by Vite
- [Cypress](https://cypress.io/) - E2E testing
- [pnpm](https://pnpm.js.org/) - fast, disk space efficient package manager
- [`vite-ssg`](https://github.com/antfu/vite-ssg) - Static-site generation
  - [critters](https://github.com/GoogleChromeLabs/critters) - Critical CSS
- [Netlify](https://www.netlify.com/) - zero-config deployment
- [VS Code Extensions](./.vscode/extensions.json)
  - [Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite) - Fire up Vite server automatically
  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 3 `<script setup>` IDE support
  - [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - Icon inline display and autocomplete
  - [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally) - All in one i18n support
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Checklist

When you use this template, try follow the checklist to update your info properly

- [ ] Change the author name in `LICENSE`
- [ ] Change the title in `App.vue`
- [ ] Change the hostname in `vite.config.ts`
- [ ] Change the favicon in `public`
- [ ] Remove the `.github` folder which contains the funding info
- [ ] Clean up the READMEs and remove routes

And, enjoy :)

## Usage

### Installing pnpm

To manage project dependencies, we use `pnpm` instead of other package managers like `npm` or `yarn`. Here’s how you can install `pnpm` and the reasons why we prefer it.

#### Installation

To install `pnpm`, follow these steps:

1. **Using npm**:

   If you have `npm` installed, you can install `pnpm` globally by running the following command:

   ```sh
   npm install -g pnpm
   ```

### Getting Started with pnpm
   After installing pnpm, you can use it to manage your project dependencies:

   1. **Install dependencies:**

      ```
       pnpm install
      ```


### Generating the API Client

To generate the API client, follow these steps:

1. **Ensure you have npx and openapi-generator-cli installed.**
   You can install them globally using:

   ```
   npm install -g npx @openapitools/openapi-generator-cli
   ```

2. **Download the OpenAPI Specification**

   Download the `schema.yml` file from the following [URL](https://pl4n3t.com/documentation/schema.yml)  and save it in the `spec` directory:

   ```sh
   curl -o ./spec/schema.yml https://pl4n3t.com/documentation/schema.yml
   ```

3. **Run the Generation Script**

   Use the `gen-api script` defined in the package.json to generate the API client. This script uses the openapi-generator-cli to create a TypeScript client with Axios.

   ```sh
    pnpm run gen-api
   ```

   The gen-api script performs the following actions:

   - Removes the existing src/api-client directory.
   - Uses the openapi-generator-cli to generate a new API client from the spec/schema.yml file.
   - Outputs the generated files to the src/api-client directory.
   - Configures additional properties for the generation process, such as separating models and APIs, using a single request parameter, and setting package names.


### Development

Just run and visit http://localhost:3333

```bash
pnpm dev
```

### Build

To build the App, run

```bash
pnpm build
```

And you will see the generated file in `dist` that ready to be served.

### Initial Deployment on Dokku

1. **Build your application**
    ```bash
    pnpm build
    ```

2. **Prepare files for deployment**
    - Create a new repository and structure your files as follows:
        ```plaintext
        .
        ├── .static
        ├── dist/
        ├── static.json
        ```

    - The `static.json` file should contain the following content:
        ```json
        {
          "root": "dist",
          "clean_urls": false,
          "routes": {
            "/**": "index.html"
          },
          "headers": {
            "/**": {
              "Access-Control-Allow-Origin": "*"
            }
          }
        }
        ```

3. **Configure Dokku**
    - Log in to your Dokku server.
    - Navigate to your application directory and set up the buildpacks and environment variables:
        ```bash
        dokku apps:create app
        dokku buildpacks:set app https://github.com/heroku/heroku-buildpack-static
        dokku config:set app NGINX_ROOT=/dist
        dokku letsencrypt:set app email <email>
        dokku letsencrypt:enable app
        dokku config:set app GOOGLE_CLIENT_ID=''
        ```

4. **Deploy the application**
    - Initialize a git repository, add your Dokku server as a remote, and push for the first time:
        ```bash
        git init
        git remote add dokku dokku@your-dokku-server:app
        git add .
        git commit -m "Initial commit"
        git push dokku master
        ```

### Future Deployments

1. **Build the application**
    ```bash
    pnpm build
    ```

2. **Replace the `dist` folder in your repository**

3. **Commit and push the changes**
    ```bash
    git add dist
    git commit -m "Update dist"
    git push dokku master
    ```

By following these steps, you should be able to deploy and update your application on the Dokku server easily. If you have any additional questions or encounter any issues, feel free to ask.
