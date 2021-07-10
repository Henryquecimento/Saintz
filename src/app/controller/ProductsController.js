const Product = require("../models/Product");
const Category = require("../models/Category");
const ProductFiles = require("../models/ProductFiles");
const { formatPrice, formatStatus } = require("../../lib/utils");

module.exports = {
  async index(req, res) {
    try {
      const results = await Product.all();
      const products = results.rows;

      for (product of products) {
        product.price = formatPrice(product.price);
      }

      return res.render("admin/products/index.njk", { products });
    } catch (err) {
      throw new Error(err);
    }
  },
  async create(req, res) {
    try {
      const results = await Category.all();
      const categories = results.rows;

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

      const results = await Product.create(req.body);
      const productId = results.rows[0].id;

      const productsPromise = req.files.map(file => ProductFiles.create({
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
      let results = await Product.find(req.params.id);
      let product = results.rows[0];

      product.price = formatPrice(product.price);
      product.status = formatStatus(product.status);

      results = await ProductFiles.findById(req.params.id);
      const files = results.rows.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
      }));

      return res.render("admin/products/show", { product, files });
    } catch (err) {
      throw new Error(err);
    }
  },
  async edit(req, res) {
    try {
      let results = await Product.find(req.params.id);
      const product = results.rows[0];

      if (!product) return res.send("Product not found!");

      product.old_price = formatPrice(product.old_price);
      product.price = formatPrice(product.price);

      results = await Category.all();
      const categories = results.rows;

      results = await ProductFiles.findById(req.params.id);
      const files = results.rows.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
      }));

      return res.render("admin/products/edit.njk", { product, categories, files });
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

        const filesPromise = removedFiles.map(id => ProductFiles.delete(id));

        await Promise.all(filesPromise);
      }

      if (req.files) {
        const productsPromise = req.files.map(file => ProductFiles.create({
          ...file,
          productID: req.body.id
        }));

        await Promise.all(productsPromise);
      }

      req.body.price = req.body.price.replace(/\D/g, "");

      if (req.body.old_price != req.body.price) {
        const oldProduct = await Product.find(req.body.id);

        req.body.old_price = oldProduct.rows[0].price;
      }

      await Product.update(req.body);

      return res.redirect(`/admin/products/${req.body.id}`);
    } catch (err) {
      throw new Error(err);
    }
  },
  async delete(req, res) {

    try {
      await Product.delete(req.body.id);

      return res.redirect(`/admin/products/create`);
    } catch (err) {
      throw new Error(err);
    }
  },
};
