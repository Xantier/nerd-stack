import React from 'react';
import Router from 'react-router';
import routes from '../components/routes';
import dataLoader from '../util/dataLoader';
import { clean as cleanCache } from '../util/cache';
import Cookies from 'cookies';
import uuid from 'uuid';

function renderWithReact(req, token, cb) {
  const loggedIn = !!req.user;
  const path = req.originalUrl;
  const router = Router.create({
    routes: routes(),
    location: path,
    onAbort: function (redirect) {
      cb({redirect});
    },
    onError: function (err) {
      // TODO: Logging, Don't return err.
      return err;
    }
  });

  router.run((Handler, state) => {
    let context = {
      user: req.user,
      db: req.db
    };
    if (state.routes.length === 0 || state.routes[0].name === 'not-found') {
      cb({message: 'Unable to find path ' + state.path});
      return;
    }
    cleanCache(token);
    dataLoader(token, state, context).then((data) => {
      context.data = data;
      data.loggedIn = loggedIn;
      const clientToken = {token, data: data};
      const html = React.renderToString(<Handler context={context} loggedIn={loggedIn} />);
      cb(null, html, clientToken);
    });
  });
}

export default function (req, res) {
  const cookies = new Cookies(req, res);
  const token = cookies.get('token') || uuid();
  cookies.set('token', token, {maxAge: 30 * 24 * 60 * 60});
  renderWithReact(req, token, (error, html, clientToken) => {
    if (!error) {
      res.render('index', {
        data: JSON.stringify(clientToken),
        html: html,
        message: {
          error: req.flash('error'),
          success: req.flash('success')
        }
      });
    } else {
      res.render('error', {
        message: error.message,
        error: error
      });
    }
  });
}
