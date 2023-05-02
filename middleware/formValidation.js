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

const createProduct = (req, res, next) => {
    const { category_id, name, description, price, qty } = req.body;
    if(!name) {
        return res.status(400).json({
            status: false,
            error: 'Name is required.'
        });
    }
    if(!category_id) {
        return res.status(400).json({
            status: false,
            error: 'Category is required.'
        });
    }
    if(!description) {
        return res.status(400).json({
            status: false,
            error: 'Description is required.'
        });
    }
    if(!price) {
        return res.status(400).json({
            status: false,
            error: 'Price is required.'
        });
    }
    if(!qty) {
        return res.status(400).json({
            status: false,
            error: 'Qty is required.'
        });
    }
    next();
};

module.exports = {
    createCategory,
    createBanner,
    createProduct
};