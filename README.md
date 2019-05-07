# BACKTOFRONT

[![Greenkeeper badge](https://badges.greenkeeper.io/michielbdejong/backtofront.svg)](https://greenkeeper.io/)

This is a tool for rapidly prototyping noBackend apps. Write your dream code in node modules, and put them into the 'modules/' directory. Then on the server run:

    npm install
    node backtofront.js 1234 my_secret

It will automatically detect that you're running it server-side, and open a secure WebSocket on port 1234. Make sure there are 'tls.key', 'tls.cert', and 'ca.pem' files in './tls/'.

Then, from your client-side app, include the same backtofront.js file. It will automatically detect that you're including it client-side, and instantiate a 'backtofront' object in the global scope, so you can do:

    backtofront.connect('wss://myserver.com:1234/sock', 'my_secret');

and have the 'xmpp' object from
[simple-xmpp](https://github.com/simple-xmpp/node-simple-xmpp/#example)
available in the global scope as soon as it connects.

Now look in the 'modules/' directory to find the server-side 'xmpp' module, and see how it exposes the simple-xmpp library interface. Backtofront teleports it straight into the frontend.

#WARNING: Be very careful what you expose when running this on a public IP address.

For instance, if you write an app that uses the 'fs' module from nodejs on the client-side, then any user of your app could open the javascript console and issue a simple command to whipe out your server. So please only use this for prototyping, and only run it on localhost unless you really know what you're doing.

