const bc = require("bcrypt");

const hashPassword = async (password) => {
    const salt = await bc.genSalt(10);
    const hashedPassword = await bc.hash(password, salt);
    // console.log(hashedPassword);
    return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
    const isMatch = await bc.compare(password, hashedPassword);
    // console.log(isMatch);   
    return isMatch;
};

module.exports = { hashPassword, comparePassword };