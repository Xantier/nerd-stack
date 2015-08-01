import {Strategy as LocalStrategy} from 'passport-local';
import bcrypt from 'bcrypt-nodejs';

export default function (passport, db) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    let user = db.models.user;
    user.read(id, function (err, dbUser) {
      done(err, dbUser);
    });
  });

  passport.use('register', new LocalStrategy({passReqToCallback: true},
          function (req, username, password, done) {
            if (password !== req.body.password2) {
              return done(null, false, {message: 'Passwords don\'t match'});
            }
            const user = req.body;
            db.models.user.where({name: username}, function (err, result) {
              if (result.length) return done(null, false, {message: 'User Already Exists.'});
              if (err) return done(err);

              const hash = bcrypt.hashSync(password);
              db.models.user.save({
                name: user.username,
                password: hash
              }, function (saveErr, savedUser) {
                if (saveErr) return done(saveErr);
                return done(null, savedUser, {message: 'User Registered.'});
              });
            });
          }
      )
  );

  passport.use('signin', new LocalStrategy(
      function (username, password, done) {
        db.models.user.where({name: username}, function (err, user) {
          if (err) return done(err);
          if (!user.length || user.length < 1) {
            done(null, false, {message: 'Unknown user.'});
          } else if (!bcrypt.compareSync(password, user[0].password)) {
            done(null, false, {message: 'Invalid username or password.'});
          } else {
            done(null, user[0]);
          }
        });
      }));
}
