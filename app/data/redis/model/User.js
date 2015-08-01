export default
class User {
  static register(nohm) {
    nohm.model('User', {
      idGenerator: 'increment',
      properties: {
        name: {
          type: 'string',
          unique: true,
          index: true,
          validations: [
            'notEmpty'
          ]
        },
        password: {
          type: 'string',
          validations: [
            'notEmpty'
          ]
        }
      }
    });
  }
}
