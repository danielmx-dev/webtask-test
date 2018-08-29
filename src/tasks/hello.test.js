const hello = require('./hello')

test('resolves to the current counter', done => {
  const ctx = {
    storage: {
      get: cb => cb(null, {}),
      set: (_, cb) => cb()
    }
  }
  hello(ctx, (err, result) => {
    if (err) return done(err)
    expect(result).toEqual({ counter: 1 })
    done()
  })
})
