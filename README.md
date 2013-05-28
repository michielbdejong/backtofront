# BACKTOFRONT

This is a tool for rapidly prototyecho noBackend apps. Write your dream code in node modules, and put them into the 'modules/' directory. Then on the server run:

    npm install
    node backtofront.js 1234 my_secret

It will automatically detect that you're running it server-side, and open a secure WebSocket on port 1234. Make sure there are 'tls.key', 'tls.cert', and 'ca.pem' files in './tls/'.

Then, from your client-side app, include the same backtofront.js file. It will automatically detect that you're including it client-side, and instantiate a 'backtofront' object in the global scope, so you can do:

    backtofront.connect('wss://myserver.com:1234/sock', 'my_secret');
    example.echo('did it work?', function(response) { console.log(response); });

Now look in the 'modules/' directory to find the server-side 'example' module, and see how it exposes the 'echo' method. 

