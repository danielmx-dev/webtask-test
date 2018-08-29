
module.exports = (ctx, cb) => {
  ctx.storage.get(function (err, data) {
    if (err) return cb(err);
    if (!data) data = { };
    if (!data.counter) data.counter = 0;

    data.counter++;

    ctx.storage.set(data, function (err) {
        if (err) return cb(err);

        cb(null, data);
    });
  });
}
