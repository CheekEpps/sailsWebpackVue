import socketIOClient from 'socket.io-client'
import sailsIOClient from 'sails.io.js'
import router from '../router'
const io = sailsIOClient(socketIOClient)
io.sails.url = 'http://b.txj168.com'
io.sails.useCORSRouteToGetCookie = false
const handleJWR = function (JWR, cb) {
  console.info(JWR)
  switch (JWR.statusCode) {
    // ⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩ 403
    case 403:
      switch (JWR.body) {
        case '4030101':
          router.push('/Login')
          break
      }
      break
    // ⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧ 403
    // ⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩ 404
    case 404:
      var alert = JWR.body || '404'
      return cb(alert)
    // ⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧ 404
    // ⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩ 200
    case 200:
      return cb(null, JWR.body)
    // ⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧ 200
  }
}
export default {
  del: function (url, data, cb) {
    return io.socket.delete(url, data, cb)
  },
  get: function (path, query, cb) {
    io.socket.get('/' + path, query, function (data, JWR) {
      handleJWR(JWR, cb)
    })
  },
  on: function (eventIdentity, cb) {
    return io.socket.on(eventIdentity, cb)
  },
  post: function (path, data, cb) {
    io.socket.post('/' + path, data, function (data, JWR) {
      handleJWR(JWR, cb)
    })
  },
  put: function (path, data, cb) {
    io.socket.put('/' + path, data, function (data, JWR) {
      handleJWR(JWR, cb)
    })
  }

}
