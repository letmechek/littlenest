const BabyProduct = require('../../models/babyProduct')
module.exports = {
    index,
    show,
    getProductByCategory
}

async function index(req, res) {
    const babyProducts = await BabyProduct.find({}).sort('name').populate('BabyCategory').exec()
    babyProducts.sort((a, b) => a.BabyCategory.sortOrder - b.BabyCategory.sortOrder)
    res.json(babyProducts)
}


async function getProductByCategory(req, res) {

  try {
    const babyProducts = await BabyProduct.find({
      BabyCategory: {_id: req.params.modelId}
        });
    res.status(200).json(babyProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function show(req, res) {
    const babyProducts = await BabyProduct.findById(req.params.id)
    res.json(babyProducts)
}