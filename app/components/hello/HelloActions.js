'use strict';

import Dispatcher from '../../util/dispatcher';
import {httpGet} from '../../services/fetcher';
import {HelloConstants} from './HelloConstants';
import { get as getCached} from '../../util/cache';

export default
class HelloActions {
  static getData(context) {
    return httpGet('/user', Dispatcher.transmit(HelloConstants.GET), context);
  }
}
