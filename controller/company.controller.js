const Company = require('../models/company.model');

// add company
const addCompany = async (req, res) => {
    try {
        const companyData = req.body;
        if (!companyData) {
            return res.status(400).json({ message: 'Please provide company data' });
        }
        const company = await Company.create({
            ...companyData,
        });
        return res.status(201).json({ message: 'Company Added successfully', company });
    } catch (error) {
        return res.status(500).json({ message: 'Error adding company', error });
    };
};

//  delete Company

const deleteCompany = async (req,res) => {
    try {
        const companyId = req.params.id;
        if (!companyId) {
            return res.status(400).json({ message: 'Please provide company id' });
        }
        const company = await Company.destroy({
            where: {
                id: companyId
            }
        });
        return res.status(200).json({ message: 'Company deleted successfully', company });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting company', error });
    }
}

module.exports = {
    addCompany,
    deleteCompany
}