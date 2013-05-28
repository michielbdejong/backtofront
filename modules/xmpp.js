var xmpp = require('simple-xmpp');

for(var i in xmpp) {
  exports[i] = xmpp[i];
}
