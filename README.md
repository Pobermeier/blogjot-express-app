# BlogJot - Express App with Authentication & DB

BlogJot is an express-app with server-side rendered views (using Handlebars) that allows you to save your blog-post ideas. The data is stored on a cloud-based MongoDB instance. Authentication is implemented with passport using a local strategy. You can check out a live version of this project [here](http://104.248.44.20:5005/).

## Project Set-Up

After cloning this repository install all depencies via NPM using the following CLI-command:

`npm install`

To run the dev server it is recommended to use Nodemon, so that the dev server automatically reboots when changes are made. Nodemon can be installed globally via:

`npm i -g nodemon`

## NPM Scripts

To run a dev server (uses Nodemon) that auto-reloads when changes are made use:

`npm run dev`

To run the server in "production" without Nodemon use instead the following script:

`npm start`
