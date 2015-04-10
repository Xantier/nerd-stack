'use strict';

/* A wrapper to transpile all ES6 to ES5
  This can be removed when node starts to fully support ES6
 */

require('babel/register');
require('./app/config/server');
