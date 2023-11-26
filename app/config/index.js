require('dotenv-safe').config();


module.exports = {
    jwtConfig: {
        secretKey: process.env.JWT_SECRET_KEY,
        timeoutWithRememberedMe: process.env.TIMEOUT_WITH_REMEMBERED_ME,
        timeoutWithoutRememberedMe: process.env.TIMEOUT_WITHOUT_REMEMBERED_ME,
    },
};
