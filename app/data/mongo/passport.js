import {Strategy as LocalStrategy} from 'passport-local';
import bcrypt from 'bcrypt-nodejs';

export default function (passport, db) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    db.model('User').findOne({_id: id}, function (err, user) {
      done(err, user);
    });
  });

  passport.use('register', new LocalStrategy({passReqToCallback: true},
          function (req, username, password, done) {
            if (password !== req.body.password2) {
              return done(null, false, {message: 'Passwords don\'t match'});
            }
            const user = req.body;
            db.model('User').findOne({name: username}, function (model) {
              if (model) {
                return done(null, false, {message: 'User Already Exists.'});
              }
              const hash = bcrypt.hashSync(password);
              const userSchema = db.model('User');
              const newUser = new userSchema({
                name: user.username,
                password: hash
              });
              newUser.save(function (err) {
                if (err) {
                  throw err;
                }
                return done(null, newUser, {message: 'User Registered.'});
              });
            });
          }
      )
  )
  ;

  passport.use('signin', new LocalStrategy(
      function (username, password, done) {
        db.model('User').findOne({name: username}, function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, {message: 'Unknown user'});
          }
          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, {message: 'Invalid password'});
          }
          return done(null, user);
        });
      }
  ));
}
