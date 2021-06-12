const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
    Category.findAll()
    .then(category => res.json(category))
    .catch(err =>{
      console.log(err);
      res.status(500).json(err)
    })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Product.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(product => {
      if (!product) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(product);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    Category_name: req.body.Category_name
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
