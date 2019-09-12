'use strict'

const moment = require('moment-timezone')

const location = {
  id: {
    // faker:'random.uuid'
    // randexp: /[1-9]/
    values: [
      "9b25fb3d-8f31-518d-b922-5ecf3a6d560f",
      "e43b33c2-6cb8-50aa-8d09-7ab5d9d56b6d",
      "455ff109-99e5-569a-952e-a41e2c9903a2",
      "860d01e3-effe-5dcc-b3d4-bc1c279885f2",
      "98692e94-12ab-58be-9987-b6f434ebc539",
      "a3f4f75d-38b3-5aa7-a624-293f9fadde4a",
      "f18f1eb9-3f8d-572e-805b-5f44e4bc58a9",
      "950a7238-c0f6-5250-a633-c985fd32d436",
      "7393bf14-2e8d-5320-aaf4-38b3e27edb5c",
      "d367da19-7757-5724-a9f7-8a9751bb445c"
    ]
  },
  tz: {
    // values: moment.tz.names()
    static: 'America/New_York'
  }
}

module.exports = location