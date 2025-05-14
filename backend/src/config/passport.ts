import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import {ExtractJwt , Strategy as JwtStrategy} from 'passport-jwt'
import bcrypt from 'bcrypt';

import {User} from '../models/User'

passport.use(new LocalStrategy({usernameField : 'email' , passwordField : 'password'} ,
  async (email : string , password : string , done : Function) => {
    try {
      const user = await User.findOne({email});
      if(!user) {
        throw new Error('Invalid credentials');
      }
      const isMatch = await bcrypt.compare(password , user.password);
      if(!isMatch) {
        throw new Error('Invalid credentials');
      }
      // if everything is valid
      done(null , user , {message : 'Logged In Successfully'});
    } catch(err) {
      done(err , null);
    }
  }
));
passport.use(new JwtStrategy({
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : process.env.JWT_SECRET!
} , (jwtPayload : any , done : Function) => {
  try {
    // this function will decode jwt and then attach the user object to request object
    const user = User.findById(jwtPayload.userId);
    done(null , user);
  } catch(err) {
    done(err);
  }
}));

export default passport ; 



