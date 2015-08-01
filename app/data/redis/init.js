import redis from 'redis';
import config from '../../config/config.json';
import { Nohm as nohm } from 'nohm';

const opt = config.redis;

let client = redis.createClient(opt.port, opt.host, opt.options);
client.auth(opt.password);
client.on('connect', function () {
  nohm.setClient(client);
});

/**
 * Global error handling for redis
 client.on('error', function (err) {
  console.log('Error ' + err);
});
 */

// Register models
import User from './model/User';
User.register(nohm);
import Thing from './model/Thing';
Thing.register(nohm);

export default nohm;
