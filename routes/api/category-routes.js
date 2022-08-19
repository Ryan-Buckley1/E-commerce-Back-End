const router = require("express").Router();
const { Category, Product } = require("../../models");
const sequelize = require("../../config/connection");

// The `/api/categories` endpoint

// find all categories
router.get("/", async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [
        {
          // include its associated Products
          model: Product,
          attributes: ["id", "product_name", "price", "stock"],
        },
      ],
    });
    res.json(allCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// find one category by its `id` value
router.get("/:id", async (req, res) => {
  try {
    const oneCategory = await Category.findOne({
      where: {
        id: req.params.id,
      },
      // include its associated Products
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock"],
        },
      ],
    });
    if (!oneCategory) {
      res.status(404).json({ message: "No category found with that id" });
      return;
    }
    res.json(oneCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
  // create a new category
});

// update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedCategory) {
      res.status(404).json({ message: "No category found with this id" });
      return;
    }
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedCategory) {
      res.status(404).json({ message: "No category found with this id" });
      return;
    }
    res.json(deletedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
