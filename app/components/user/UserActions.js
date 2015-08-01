import Dispatcher from '../../util/dispatcher';
import {httpGet} from '../../services/fetcher';
import {UserConstants} from './UserConstants';

export default class UserActions {
  static getData(context) {
    return httpGet('/user', Dispatcher.transmit(UserConstants.GET), context);
  }
}
