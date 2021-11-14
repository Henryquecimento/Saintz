const Product = require("../models/Product");
const Category = require("../models/Category");
const ProductFile = require("../models/ProductFile");
const { formatPrice, formatStatus, date } = require("../../lib/utils");

module.exports = {
  async index(req, res) {
    try {
      let products = await Product.findAll();

      for (product in products) {
        let results = await ProductFile.findById(products[product].id);
        let files = results.rows.map(file => ({
          ...file,
          filename: file.name,
          src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }));

        products[product] = {
          ...products[product],
          files
        }

        products[product].price = formatPrice(products[product].price);
        products[product].old_price = formatPrice(products[product].old_price);
      }


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
      let results = await Product.find(req.params.id);
      let product = results.rows[0];

      product.price = formatPrice(product.price);
      product.status = formatStatus(product.status);
      product.updated_at = date(product.updated_at).format;


      results = await ProductFile.findById(req.params.id);
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

      const categories = await Category.findAll();

      results = await ProductFile.findById(req.params.id);
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
      const results = await ProductFile.findById(req.body.id);

      const filesPromise = results.rows.map(file => ProductFile.delete(file.id))

      await Promise.all(filesPromise);

      await Product.delete(req.body.id);

      return res.redirect(`/admin/products/create`);
    } catch (err) {
      throw new Error(err);
    }
  },
};


/*

create(data) {
    const query = `
        INSERT INTO products (

        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id`;

    data.price = data.price.replace(/\D/g, "");

    const values = [
      data.category_id,
      data.user_id ,
      data.name,
      data.description,
      data.old_price || data.price,
      data.price,
      data.quantity,
      data.status || 1,
    ];

    return db.query(query, values);
  },

*/