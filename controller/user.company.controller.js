const User = require('../models/user.model');
const Company = require('../models/company.model');
const UserCompany = require('../models/user.company.model');

const alloCateUsers = async (req, res) => {
    try {
        const { user_id, company_ids } = req.body;
        // Check if user_id is provided
        if (!user_id || !company_ids || company_ids.length === 0) {
            return res.status(400).json({ message: 'User ID and company IDs are required' });
        }
        // Check if user exists
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        };
        // Check if all companies exists
        const companies = await Company.findAll({
            where: {
                id: company_ids
            }
        });
        if (companies.length !== company_ids.length) {
            return res.status(404).json({ message: 'One or more companies not found' });
        };
        // Insert the allocations into user_companies table
        const allocations = company_ids.map((company_id) => ({
            user_id,
            company_id
        }));
        await UserCompany.bulkCreate(allocations);
        return res.status(201).json({ message: 'Allocations created successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating allocations', error });
    };
};

const listOfUsersWithCompanies = async (req, res) => {
    try {
        // Fetching users with their allocated companies
        const users = await User.findAll({
            attributes: ['name', 'email', 'phonenumber'], // select user fields
            include: [{
                model: Company,
                through: {
                    attributes: [] // Exclude join table attributes
                }
            }],
        });
        console.log('Raw users data:', JSON.stringify(users, null, 2)); // Debug log

        // Transforming the data to get comma-separated companies for each user
        const transformedUsers = users.map(user => {
            // Convert Sequelize instance to plain object if needed
            const plainUser = user.get ? user.get({ plain: true }) : user;
            return {
                name: plainUser.name,
                email: plainUser.email,
                phonenumber: plainUser.phonenumber,
                allocated_companies: plainUser.Companies && plainUser.Companies.length > 0
                    ? plainUser.Companies.map(company => company.name).join(', ')
                    : 'No companies allocated'
            };
        });
        return res.status(200).json(transformedUsers);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching users with companies', error })
    }

}
// Set up associations
User.associate({ Company });
Company.associate({ User });




module.exports = {
    alloCateUsers,
    listOfUsersWithCompanies
}