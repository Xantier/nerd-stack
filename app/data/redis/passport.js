import {Strategy as LocalStrategy} from 'passport-local';
import bcrypt from 'bcrypt-nodejs';

export default function (passport, db) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    let user = db.factory('User');
    user.load(id, function (err) {
      const dbUser = this.allProperties();
      done(err, dbUser);
    });
  });

  passport.use('register', new LocalStrategy({passReqToCallback: true},
          function (req, username, password, done) {
            if (password !== req.body.password2) {
              return done(null, false, {message: 'Passwords don\'t match'});
            }
            const user = req.body;
            db.factory('User').find({
              name: username
            }, function (err, ids) {
              if (err) {
                return done(null, false, {message: 'Error trying to check for user existence'});
              }
              if (ids.length) {
                return done(null, false, {message: 'User Already Exists.'});
              }
              const hash = bcrypt.hashSync(password);
              const userSchema = db.factory('User');
              userSchema.p('name', user.username);
              userSchema.p('password', hash);
              userSchema.save(function (saveErr) {
                if (saveErr) {
                  throw saveErr;
                }
                return done(null, userSchema, {message: 'User Registered.'});
              });
            });
          }
      )
  );

  passport.use('signin', new LocalStrategy(
      function (username, password, done) {
        db.factory('User').find({
          name: username
        }, function (err, ids) {
          if (err) {
            return done(err);
          }
          if (!ids || !ids.length) {
            return done(null, false, {message: 'Unknown user'});
          }
          db.factory('User').load(ids[0], function (loadErr) {
            const user = this.allProperties();
            if (loadErr) {
              return done(loadErr);
            }
            if (!bcrypt.compareSync(password, user.password)) {
              return done(null, false, {message: 'Invalid password'});
            }
            return done(null, user);
          });
        });
      }
  ));
}
