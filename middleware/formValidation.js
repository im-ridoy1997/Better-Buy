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

module.exports = {
    createCategory,
};