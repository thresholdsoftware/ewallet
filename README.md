# eWallet-Be

a [Sails](http://sailsjs.org) application

### Steps:

1. npm install

2. Start the app in one of the following ways

To start run `npm start`

To start in dev mode with watch : `npm run watch`

The local.js config should be of this type:

```
/**
 * Local environment settings
 *
 * Use this file to specify configuration settings for use while developing
 * the app on your personal system: for example, this would be a good place
 * to store database or email passwords that apply only to you, and shouldn't
 * be shared with others in your organization.
 *
 * These settings take precedence over all other config files, including those
 * in the env/ subfolder.
 *
 * PLEASE NOTE:
 *        local.js is included in your .gitignore, so if you're using git
 *        as a version control solution for your Sails app, keep in mind that
 *        this file won't be committed to your repository!
 *
 *        Good news is, that means you can specify configuration for your local
 *        machine in this file without inadvertently committing personal information
 *        (like database passwords) to the repo.  Plus, this prevents other members
 *        of your team from commiting their local configuration changes on top of yours.
 *
 *    In a production environment, you probably want to leave this file out
 *    entirely and leave all your settings in env/production.js
 *
 *
 * For more information, check out:
 * http://sailsjs.org/#!/documentation/anatomy/myApp/config/local.js.html
 */

module.exports = {

  /***************************************************************************
   * Your SSL certificate and key, if you want to be able to serve HTTP      *
   * responses over https:// and/or use websockets over the wss:// protocol  *
   * (recommended for HTTP, strongly encouraged for WebSockets)              *
   *                                                                         *
   * In this example, we'll assume you created a folder in your project,     *
   * `config/ssl` and dumped your certificate/key files there:               *
   ***************************************************************************/

  // ssl: {
  //   ca: require('fs').readFileSync(__dirname + './ssl/my_apps_ssl_gd_bundle.crt'),
  //   key: require('fs').readFileSync(__dirname + './ssl/my_apps_ssl.key'),
  //   cert: require('fs').readFileSync(__dirname + './ssl/my_apps_ssl.crt')
  // },
  connections: {
    localmysqlConnection: {
      adapter: 'sails-mysql',
      user: 'root',
      host: 'localhost',
      database: 'ewallet'
    },
    testmysqlConnection: {
      adapter: 'sails-mysql',
      user: 'root',
      host: 'localhost',
      database: 'ewallettest'
    }
  },
  models: {
    connection: (process.env.NODE_ENV === 'test')
      ? 'testmysqlConnection'
      : 'localmysqlConnection',
    migrate: (process.env.NODE_ENV === 'test')
      ? 'drop'
      : 'safe'
  },

  /***************************************************************************
   * The `port` setting determines which TCP port your app will be           *
   * deployed on.                                                            *
   *                                                                         *
   * Ports are a transport-layer concept designed to allow many different    *
   * networking applications run at the same time on a single computer.      *
   * More about ports:                                                       *
   * http://en.wikipedia.org/wiki/Port_(computer_networking)                 *
   *                                                                         *
   * By default, if it's set, Sails uses the `PORT` environment variable.    *
   * Otherwise it falls back to port 1337\.                                   *
   *                                                                         *
   * In env/production.js, you'll probably want to change this setting       *
   * to 80 (http://) or 443 (https://) if you have an SSL certificate        *
   ***************************************************************************/

  port: process.env.PORT || 1337

  /***************************************************************************
   * The runtime "environment" of your Sails app is either typically         *
   * 'development' or 'production'.                                          *
   *                                                                         *
   * In development, your Sails app will go out of its way to help you       *
   * (for instance you will receive more descriptive error and               *
   * debugging output)                                                       *
   *                                                                         *
   * In production, Sails configures itself (and its dependencies) to        *
   * optimize performance. You should always put your app in production mode *
   * before you deploy it to a server.  This helps ensure that your Sails    *
   * app remains stable, performant, and scalable.                           *
   *                                                                         *
   * By default, Sails sets its environment using the `NODE_ENV` environment *
   * variable.  If NODE_ENV is not set, Sails will run in the                *
   * 'development' environment.                                              *
   ***************************************************************************/

  // environment: process.env.NODE_ENV || 'development'

};
```


A simple example local.js file is

```
module.exports = {
  connections: {
    localConnection: {
      adapter: 'sails-mysql',
      host: 'localhost',
      user: 'root', //optional
      password: 'password', //optional
      database: 'ewallet' //optional
    }
  },
  models: {
    connection: 'localConnection',
    migrate: 'safe'
  },
  disableTwillio: true // to disable twillio while development and replace it with a dummy
};
```

If you notice above a new key `disableTwillio` is added to local.js config.
When enabled it will disableTwillio for development purposes and replace it with a dummy api which will authenticate any otp passed to it.


## For firebase admin to work (PUSH notification service)
You need to add a new config file `firebase.key.json` at `/config/firebase.key.json`

This file is git ignored because it contains private key for firebase which give s admin control over the firebase instance.
Hence this needs to be handled just like `local.js` file.

`firebase.key.json` can be got from firebase admin sdk portal or
from here https://drive.google.com/drive/folders/0B9uw2xYXlszXbDN3Vm8yTmJJUnc


## Services used

- Firebase
- AWS
- github
- Slack
- Twillio


## Tech stack
- sails js
- node js
