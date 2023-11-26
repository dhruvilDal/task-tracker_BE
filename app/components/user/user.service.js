const bcrypt = require('bcrypt');
const UserModel = require('./user.model');
const { generateJwtWebToken } = require('../../helpers/jwt');

class UserService {
  async createUser(newUser) {
    try {
      const { password, ...userData } = newUser;

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = new UserModel({
        password: hashedPassword,
        ...userData,
      });

      await user.save();

      return user._id;
    } catch (error) {
      if (error.code === 11000) throw new Error('EMAIL_IS_TAKEN');
      else throw error;
    }
  }
  
  async loginUser(email, password, keepUserLoggedIn = false) {
    try {
        const user = await UserModel.findOne({ email });

        if (!user || user.isDeleted) {
            throw new Error('USER_NOT_FOUND');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('INVALID_ACCESS_CREDENTIAL');
        }

        const jwtToken = generateJwtWebToken(user._id, user.name, user.email, keepUserLoggedIn);
        return {
            userDetails: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            jwtToken: "Bearer " + jwtToken,
        };
    } catch (error) {
        throw error;
    }
 }
}

module.exports = UserService;
