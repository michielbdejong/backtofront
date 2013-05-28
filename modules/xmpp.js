var xmpp = require('simple-xmpp');

for(var i in xmpp) {
  if(typeof(xmpp[i])=='function') {
    exports[i] = xmpp[i];
  }
}
