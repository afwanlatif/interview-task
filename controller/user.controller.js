const Company = require('../models/company.model');
const User = require('../models/user.model');

// adding a user
const createUser = async (req, res) => {
    try {
        const userData = req.body;
        if (!userData) {
            return res.status(400).json({ message: 'Please provide user data' });
        }
        const user = await User.create({
            ...userData,
            createdBy: userData.email
        });
        return res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating user', error });
    };
};

// fetched all users data for a given company
const getUsersByCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        if (!companyId) {
            return res.status(400).json({ message: 'Please provide company id' });
        }
        // check if company exists or not
        const company = await Company.findByPk(companyId);
        if (!company) {
            return res.status(400).json({ message: 'Company does not exist' });
        }
        // Fetch users associated with the given company using a join
        const users = await User.findAll({
            attributes: ['name', 'email', 'phonenumber'],  // Specify the fields you want to return
            include: [{
                model: Company,
                through: {
                    attributes: []  // Exclude the join table attributes (user_companies)
                },
                where: { id: companyId },
            }]
        });
        // Check if users not exist for the company
        if (!users || users.length === 0) {
            return res.status(200).json({ message: 'No users found for the company' });
        }
        return res.status(200).json({ message: 'Users fetched successfully', users });

    } catch (error) {
        return res.status(500).json({ message: 'Error fetching users', error });
    }
}




module.exports = {
    createUser,
    getUsersByCompany
}