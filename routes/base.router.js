const userRouter = require('./user.router');
const addCompany = require('./company.router');
const addAllocateUsers = require('./user.company.router');

const setupRoutes = (app) => {
    app.use('/user', userRouter);
    app.use('/company', addCompany);
    app.use('/allocate', addAllocateUsers);
};
module.exports = setupRoutes;