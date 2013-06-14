var Imap = require('imap'),
    inspect = require('util').inspect;

var imap;

exports.connectImap = function(usr, host, pwd) {
  imap = new Imap({
      user: usr,
      password: pwd,
      host: host,
      port: 993,
      secure: true
    });
}

function show(obj) {
  return inspect(obj, false, Infinity);
}

function die(err) {
  console.log('Uh oh: ' + err);
  process.exit(1);
}

function openInbox(cb) {
  imap.connect(function(err) {
    if (err) die(err);
    imap.openBox('INBOX', true, cb);
  });
}

exports.getUnseen = function(since, log) {
  openInbox(function(err, mailbox) {
    if (err) die(err);
    imap.search([ 'UNSEEN', ['SINCE', since] ], function(err, results) {
      if (err) die(err);
      imap.fetch(results,
        { headers: ['from', 'to', 'subject', 'date'],
          cb: function(fetch) {
            fetch.on('message', function(msg) {
              log('Saw message no. ' + msg.seqno);
              msg.on('headers', function(hdrs) {
                log('Headers for no. ' + msg.seqno + ': ' + show(hdrs));
              });
              msg.on('end', function() {
                log('Finished message no. ' + msg.seqno);
              });
            });
          }
        }, function(err) {
          if (err) throw err;
          log('Done fetching all messages!');
          imap.logout();
        }
      );
    });
  });
}

exports.getFirstMsg = function(log) {
  openInbox(function(err, mailbox) {
    if (err) die(err);
    imap.seq.fetch(mailbox.messages.total + ':*', { struct: false },
      { headers: 'from',
        body: true,
        cb: function(fetch) {
          fetch.on('message', function(msg) {
            log('Saw message no. ' + msg.seqno);
            var body = '';
            msg.on('headers', function(hdrs) {
              log('Headers for no. ' + msg.seqno + ': ' + show(hdrs));
            });
            msg.on('data', function(chunk) {
              body += chunk.toString('utf8');
            });
            msg.on('end', function() {
              log('Finished message no. ' + msg.seqno);
              log('UID: ' + msg.uid);
              log('Flags: ' + msg.flags);
              log('Date: ' + msg.date);
              log('Body: ' + show(body));
            });
          });
        }
      }, function(err) {
        if (err) throw err;
        log('Done fetching all messages!');
        imap.logout();
      }
    );
  });
}
