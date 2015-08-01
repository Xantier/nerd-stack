import Dispatcher from '../../util/dispatcher';
import {httpGet, httpPost, httpPut, httpDel} from '../../services/fetcher';
import {ThingConstants} from './ThingConstants';

export default class ThingActions {
  static getData(context) {
    return httpGet('/thing', Dispatcher.transmit(ThingConstants.GET_THINGS), context);
  }

  static create(payload) {
    return httpPost('/thing', payload, Dispatcher.transmit(ThingConstants.CREATE_THING));
  }

  static update(id, payload) {
    httpPut('/thing/' + id, payload, Dispatcher.transmit(ThingConstants.UPDATE_THING));
  }

  static del(id) {
    httpDel('/thing/' + id, Dispatcher.transmit(ThingConstants.DELETE_THING));
  }
}
