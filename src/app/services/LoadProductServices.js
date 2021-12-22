const Product = require("../models/Product");
const { LoadCategory } = require("../services/LoadCategoryServices");
const ProductFile = require("../models/ProductFile");
const { formatPrice, date } = require("../../lib/utils");

async function getImage(productId) {
  let files = await ProductFile.findById(productId);

  files = files.map(file => ({
    ...file,
    path: file.path.replace(/\\/g, "/"),
    src: `${file.path.replace("public", "").replace(/\\/g, "/")}`
  }));

  return files;
}

async function format(product) {
  const category = await LoadCategory.load("category", {
    where: {
      id: product.category_id
    }
  });

  const files = await getImage(product.id);

  if (files[0] != undefined) {
    product.img = files[0].src;
    product.filename = files[0].name;
  } else {
    product.img = null;
    product.filename = null;
  }

  product.category_name = category.name;
  product.files = files;
  product.price = formatPrice(product.price);
  product.old_price = formatPrice(product.old_price);
  product.updated_at = date(product.updated_at).format;

  return product;
}


const LoadProduct = {
  load(service, filters) {
    this.filters = filters;

    return this[service]();
  },
  async product() {
    const product = await Product.findOne(this.filters);

    return format(product);
  },
  async products() {
    const products = await Product.findAll(this.filters);

    const productsPromise = products.map(format);

    return await Promise.all(productsPromise);
  }
}

module.exports = {
  LoadProduct
}