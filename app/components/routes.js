import React from 'react';
import { Route, NotFoundRoute } from 'react-router';
import Index from './index/Index.jsx';
import Signin from './index/Signin.jsx';
import Register from './index/Register.jsx';
import Hello from './index/Hello.jsx';
import Profile from './user/Profile.jsx';
import NotFound from './NotFound.jsx';

export default function () {
  return [
    <Route name="root" handler={Index}>
      <Route name="signin" path="/signin" handler={Signin}/>
      <Route name="register" path="/register" handler={Register}/>
      <Route name="profile" path="/profile" handler={Profile}/>
      <Route name="index" path="/" handler={Hello} />
    </Route>,
    <NotFoundRoute name="not-found" handler={NotFound} />
  ];
}
