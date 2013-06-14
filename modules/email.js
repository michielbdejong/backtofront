var SendGrid = require('sendgrid').SendGrid;
exports.send = function(user, password, to, msg, sub, cb) {
  sendgrid = new SendGrid(user, password);
  sendgrid.send({
    to: to,
    from: 'michiel@unhosted.org',
    subject: sub,
    text: msg
  }, function(success, message) {
     if(success) {
       cb(null);
     } else if(message) {
       cb(message);
     } else {
       cb('sendgrid failure, no message');
     }
  });
};
