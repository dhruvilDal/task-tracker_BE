const UserService = require('./user.service');

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    async createUser(request, response, next) {
      try {
        const userId = await this.userService.createUser(request.body);
        response.status(200).json({ userId });
      } catch (error) {
        next(error);
      }
    }
    
    async loginUser(request, response, next) {
      try {
        const { email, password, rememberMe } = request.body;
        const userDetails = await this.userService.loginUser(email, password, rememberMe);
        response.status(200).json(userDetails);
      } catch (error) {
        next(error);
      }
  }
}

module.exports = new UserController();
