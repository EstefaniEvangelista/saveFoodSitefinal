const cadastroRepository = require('../repository/produto_repository');


exports.validateProductByBarcode = async (req, res) => {
    const { barcode } = req.body;

    try {
        const product = await productModel.getProductByBarcode(barcode);
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        const currentDate = new Date();
        const expirationDate = new Date(product.data_validade);

        if (currentDate > expirationDate) {
            return res.status(400).json({ error: 'Produto vencido' });
        }

        res.json({ message: 'Produto válido' });
    } catch (error) {
        console.error('Erro ao validar produto:', error);
        res.status(500).json({ error: 'Erro no servidor' });
    }
};
