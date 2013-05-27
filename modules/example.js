exports.echo = function(arg, cb) {
  console.log('echo', arguments);
  console.log(arg);
  console.log(cb);
  cb(arg);
};
