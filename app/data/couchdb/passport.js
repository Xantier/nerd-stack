import {Strategy as LocalStrategy} from 'passport-local';
import bcrypt from 'bcrypt-nodejs';

export default function (passport, db) {
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    db.get(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use('register', new LocalStrategy({passReqToCallback: true},
          function (req, username, password, done) {
            if (password !== req.body.password2) {
              return done(null, false, {message: 'Passwords don\'t match'});
            }
            const user = req.body;
            db.view('user/byName', {key: username}, function (err, doc) {
              if (err) {
                return done(null, false, {message: 'Error trying to check for user existence'});
              }
              if (doc.length) {
                return done(null, false, {message: 'User Already Exists.'});
              }
              const hash = bcrypt.hashSync(password);
              db.save({
                name: user.username,
                password: hash,
                document_type: 'user'
              }, function (saveErr, res) {
                if (saveErr) {
                  throw saveErr;
                }
                return done(null, res, {message: 'User Registered.'});
              });
            });

          }
      )
  );

  passport.use('signin', new LocalStrategy(
      function (username, password, done) {
        db.view('user/byName', {key: username}, function (err, user) {
          if (err) done(err);
          if (!user.length || user.length < 1) {
            done(null, false, {message: 'Unknown user.'});
          } else if (!bcrypt.compareSync(password, user[0].value.password)) {
            done(null, false, {message: 'Invalid username or password.'});
          } else {
            done(null, user[0].value);
          }
        });
      }));
}
