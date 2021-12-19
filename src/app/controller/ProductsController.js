const Product = require("../models/Product");
const Category = require("../models/Category");
const { LoadProduct } = require('../services/LoadProductServices');
const ProductFile = require("../models/ProductFile");
const { formatPrice } = require("../../lib/utils");

module.exports = {
  async index(req, res) {
    try {
      const products = await LoadProduct.load("products");

      return res.render("admin/products/index.njk", { products });
    } catch (err) {
      throw new Error(err);
    }
  },
  async create(req, res) {
    try {
      const categories = await Category.findAll();

      return res.render("admin/products/create.njk", { categories });
    } catch (err) {
      throw new Error(err);
    }
  },
  async post(req, res) {
    try {
      const keys = Object.keys(req.body);

      for (key of keys) {
        if (req.body[key] == "") {
          return res.send("Please, you must fill all the fields up!");
        }
      }

      if (req.files.length == 0) {
        return res.send('Please, insert at least one image!');
      }

      req.body.price = req.body.price.replace(/\D/g, "");

      const productId = await Product.create({
        category_id: req.body.category_id,
        user_id: req.body.user_id || 1,
        name: req.body.name,
        description: req.body.description,
        old_price: req.body.old_price || req.body.price,
        price: req.body.price,
        quantity: req.body.quantity,
        status: req.body.status || 1,
      });

      const productsPromise = req.files.map(file => ProductFile.create({
        ...file,
        productID: productId
      }));

      await Promise.all(productsPromise);

      return res.redirect(`/admin/products/${productId}`);
    } catch (err) {
      throw new Error(err);
    }

  },
  async show(req, res) {
    try {
      const product = await LoadProduct.load("product", {
        where: {
          id: req.params.id
        }
      });

      return res.render("admin/products/show", { product });

    } catch (err) {
      throw new Error(err);
    }
  },
  async edit(req, res) {
    try {
      const product = await LoadProduct.load("product", {
        where: {
          id: req.params.id
        }
      });

      if (!product) return res.send("Product not found!");

      const categories = await Category.findAll();

      return res.render("admin/products/edit.njk", { product, categories });
    } catch (err) {
      throw new Error(err);
    }
  },
  async put(req, res) {
    try {
      const keys = Object.keys(req.body);

      for (key of keys) {
        if (req.body[key] == "" && key != "removed_files") {
          return res.send("Please, you must fill all the fields up!");
        }
      }

      if (req.body.removed_files) {
        let removedFiles = req.body.removed_files.split(',');
        const lastIndex = removedFiles.length - 1;

        removedFiles.splice(lastIndex, 1);

        const filesPromise = removedFiles.map(id => ProductFile.delete(id));

        await Promise.all(filesPromise);
      }

      if (req.files) {
        const productsPromise = req.files.map(file => ProductFile.create({
          ...file,
          productID: req.body.id
        }));

        await Promise.all(productsPromise);
      }

      req.body.price = req.body.price.replace(/\D/g, "");

      if (req.body.old_price != req.body.price) {
        const oldProduct = await LoadProduct.load("product", {
          where: {
            id: req.body.id
          }
        });

        req.body.old_price = oldProduct.price.replace(/\D/g, "");;
      }

      await Product.update(req.body);

      return res.redirect(`/admin/products/${req.body.id}`);
    } catch (err) {
      throw new Error(err);
    }
  },
  async delete(req, res) {
    try {
      const results = await ProductFile.findById(req.body.id);

      const filesPromise = results.map(file => ProductFile.delete(file.id))

      await Promise.all(filesPromise);

      await Product.delete(req.body.id);

      return res.redirect(`/admin/products/create`);
    } catch (err) {
      throw new Error(err);
    }
  },
};
