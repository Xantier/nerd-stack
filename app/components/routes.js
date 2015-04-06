'use strict';

import React from 'react';
import { Route, NotFoundRoute } from 'react-router';
import Index from './index/Index.jsx';
import Signin from './index/Signin.jsx';
import Register from './index/Register.jsx';
import Hello from './hello/Hello.jsx';
import NotFound from './NotFound.jsx';

export default function () {
  return [
    <Route name="index" handler={Index}>
      <Route name="signin" path="/signin" handler={Signin}/>
      <Route name="register" path="/register" handler={Register}/>
      <Route name="hello" path="/" handler={Hello} />
    </Route>,
    <NotFoundRoute name="not-found" handler={NotFound} />
  ];
}
