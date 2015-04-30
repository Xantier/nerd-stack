'use strict';

import Dispatcher from '../../util/dispatcher';
import {httpGet} from '../../services/fetcher';
import {UserConstants} from './UserConstants';
import { get as getCached} from '../../util/cache';

export default class UserActions {
  static getData(context) {
    return httpGet('/user', Dispatcher.transmit(UserConstants.GET), context);
  }
}
