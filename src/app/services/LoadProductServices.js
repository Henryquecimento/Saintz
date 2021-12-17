const Product = require("../models/Product");
const ProductFile = require("../models/ProductFile");


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
  const files = await getImage(product.id);

  console.log(files)
  if (files[0] != undefined) {
    product.img = files[0].src;
  } else {
    product.img = null;
  }

  product.files = files;
  /*   product.img = files[0].src; */
  product.filename = files[0].name;

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

    return Promise.all(productsPromise);
  }
}

module.exports = {
  LoadProduct
}