# concesionaria-payload

A headless CMS built with [Payload](https://payloadcms.com) for managing a car dealership website.

## Features

- User authentication and admin panel for managing content.
- Media uploads using [UploadThing](https://uploadthing.com/).
- Full i18n support for English and Spanish in the admin panel.
- Docker Compose setup for easy local development with PostgreSQL.
- Plug-and-play testing setup with Vitest and Playwright.

## Quick start

1. Clone the repo.

   ```bash
   git clone https://github.com/martinstanicio/concesionaria-payload
   ```

2. Go into the project directory and copy the example environment variables.

   ```bash
   cd concesionaria-payload && cp .env.example .env
   ```

   You will need to update `DATABASE_URI` with your PostgreSQL connection string, `PAYLOAD_SECRET` with a secure random string, and `UPLOADTHING_TOKEN` with your UploadThing token.

3. Install dependencies.

   ```bash
   pnpm install
   ```

4. Start up the development server and PostgreSQL instance.

   ```bash
   docker compose up -d
   ```

5. Visit [localhost:3000](http://localhost:3000) to see the app in your browser.

That's it! Changes made in `./src` will be reflected in your app. Follow the on-screen instructions to login and create your first admin user.

## Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

### Users (Authentication)

Users are auth-enabled collections that have access to the admin panel.

For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

### Media

This is the uploads enabled collection. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

### Vehicles

This collection manages the vehicles available in the dealership, which are displayed on the [vehicles page of the website](http://localhost:3000/vehiculos).

### Frequently Asked Questions

This collection manages the frequently asked questions for the dealership, which are displayed on the [home page of the website](http://localhost:3000).
