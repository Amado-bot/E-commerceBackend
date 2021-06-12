const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
    Category.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    })
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
        res.status(404).json({ message: 'No Product found with this id' });
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
  .then(new_category => res.json(new_category))
  .catch(err =>{
    console.log(err)
    res.status(500).json(err)
  })
});

router.put('/:id', (req, res) => {
  //update a category by its `id` value
  Category.update(req.body, {
      individualHooks: true,
      where: {
          id: req.params.id
      }
  })
      .then(category => {
          if(!category[0]) {
              res.status(404).json({ message: 'No category found with this ID '});
              return;
          };

          res.json(category);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

  // delete a category by its `id` value
  router.delete('/:id', (req, res) => {
    Category.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(category => {
            if(!category) {
                res.status(404).json({ message: 'No category found with this ID' });
                return;
            }
            
            res.json(category);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
});

module.exports = router;
