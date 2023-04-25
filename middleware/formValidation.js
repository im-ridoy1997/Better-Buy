const createCategory = (req, res, next) => {
    const category_name = req.body.category_name;
    if(!category_name){
        return res.status(400).json({
            status: false,
            error: 'Category name required.'
        });
    }
    next();
};

const createBanner = (req, res, next) => {
    const { name, description } = req.body;
    if(!name || !description) {
        return res.status(400).json({
            status: false,
            error: 'Banner name or description is required.'
        });
    }
    next();
};

module.exports = {
    createCategory,
    createBanner
};