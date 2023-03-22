# Phonebook frontend

## Communicating with the backend

### Dev environment

On development environment, we use `npm start` to start a local webserver. To allow the frontend to communicate to the backend we've added `proxy: http://localhost:3001` to `package.json`. This has the effect of forwarding any request where to route is unknown to the proxied url.
So a request made by the frontend to `http://localhost:3000/api/persons` is forwarded to `http://localhost:3001/api/persons`.

/!\ We need to start the backend dev environment as well when developing the frontend app.

### Production environment

On the production ernvironment, the frontend is served statically by the same webserver as the backend. We need to build the app with `npm build`, copy the builded files to the `build\` directory within the backend code which is then served by express with `app.use(express.static("build"));`
All theses steps are automated, see the `packages.json` `build:ui` of the backend,
