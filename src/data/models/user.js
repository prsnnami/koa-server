import db from './index.js';
import Sequelize from 'sequelize';
import bcrypt from 'bcrypt-nodejs';

const User = db.define('User', {
  name: Sequelize.STRING,
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});


User.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


User.prototype.instancelvl = function() {
  return 'instance';
}

export default User;