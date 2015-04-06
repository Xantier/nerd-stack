'use strict';

import Dispatcher from '../../util/dispatcher';
import {httpGet} from '../../services/api';
import {HelloConstants} from './HelloConstants';
import { get as getCached} from '../../util/cache';

export default class HelloActions {
  static getData(token, displayName, req) {
    const cached = getCached(token, displayName);
    if (cached) {
      Dispatcher.transmit(HelloConstants.GET)(cached);
      return cached;
    }
    return httpGet('/user', Dispatcher.transmit(HelloConstants.GET), req);
  }
}
