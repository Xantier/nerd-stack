export default
class Thing {
  static register(nohm) {
    nohm.model('Thing', {
      idGenerator: 'increment',
      properties: {
        name: {
          type: 'string',
          unique: true,
          validations: [
            'notEmpty'
          ]
        },
        user_id: {
          type: 'integer',
          index: true,
          validations: [
            'notEmpty'
          ]
        }
      }
    });
  }
}
