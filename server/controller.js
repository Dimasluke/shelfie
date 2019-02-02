module.exports = {
    addProduct: ( req, res ) => {
        const db = req.app.get('db');
        const { name, price, img } = req.body.productInfo;
        db.create_product([ name, price, img ])
            .then((products) => {
                res.status(200).json(products)
            })
            .catch((err) => {
                res.status(500).json(err.detail)
            })
    },
    allProducts: ( req, res ) => {
        const db = req.app.get('db');
        db.get_inventory()
            .then((products) => {
                res.status(200).json(products)
            })
            .catch((err) => {
                res.status(500).json(err.detail)
            })
    },
    deleteProduct: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        db.delete_product( id ).then((products) => {
            res.status(200).json(products)
        }).catch((err) => res.status(500).json(err.details))
    },
    getProduct: ( req, res ) => {
        const db = req.app.get('db');
        const { id } = req.params;
        db.getProduct(id).then((product) => {
            res.status(200).json(product)
        }).catch((err) => res.status(500).json(err.details))
    },
    updateProduct: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        const { name, price, img } = req.body
        db.update_product([id, name, price, img]).then((product) => {
            res.status(200).json(product)
        }).catch((err) => res.status(500).json(err.details))
    }
}