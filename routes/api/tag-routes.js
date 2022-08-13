const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock"],
          through: ProductTag,
          as: "products",
        },
      ],
    });
    res.json(allTags);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  try {
    const singleTag = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock"],
          through: ProductTag,
          as: "products",
        },
      ],
    });
    if (!singleTag) {
      res.status(404).json({ message: "No tag found with that id" });
      return;
    }
    res.json(singleTag);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.json(newTag);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }

  // create a new tag
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedTag) {
      res.status(404).json({ message: "No tag found with this id" });
      return;
    }
    res.json(updatedTag);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedTag) {
      res.status(404).json({ message: "No tag found with that id" });
      return;
    }
    res.json(deletedTag);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }

  // delete on tag by its `id` value
});

module.exports = router;
