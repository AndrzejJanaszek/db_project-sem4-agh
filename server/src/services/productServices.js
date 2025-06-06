const Product = require("../models/Product");

exports.addProduct = async (productData) => {
  const newProduct = new Product(productData);
  return await newProduct.save();
};

exports.updateProductName = async (productId, newName) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { name: newName },
    { new: true, runValidators: true }
  );
  return updatedProduct;
};

exports.updateProductCategory = async (productId, categoryId, subCategoryId, subSubCategoryId) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        categoryId,
        subCategoryId,
        subSubCategoryId,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      throw new Error("Produkt nie został znaleziony");
    }

    return updatedProduct;
  } catch (err) {
    throw new Error("Błąd przy aktualizacji kategorii produktu: " + err.message);
  }
};

exports.deleteProduct = async (productId) => {
  const deleted = await Product.findByIdAndDelete(productId);
  return deleted; // null jeśli nie znaleziono
};

exports.addVariant = async (productId, newVariant) => {  
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { $push: { variants: newVariant } },
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    throw new Error("Produkt nie znaleziony");
  }

  return updatedProduct;
};

exports.updateVariant = async (productId, variantId, variantData) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Produkt nie znaleziony");
  }

  const variant = product.variants.id(variantId);
  if (!variant) {
    throw new Error("Wariant nie znaleziony");
  }

  // Zaktualizuj tylko przekazane pola
  Object.keys(variantData).forEach((key) => {
    variant[key] = variantData[key];
  });

  await product.save();
  return product;
};

exports.deleteVariant = async (productId, variantId) => {
  const updated = await Product.findByIdAndUpdate(
    productId,
    { $pull: { variants: { _id: variantId } } },
    { new: true }
  );
  return updated;
};

exports.getFilteredProductsByProductFields  = async (filters) => {
  const query = {};

  if (filters.name) {
    query.name = { $regex: filters.name, $options: "i" };
  }

  if (filters.companyId) {
    query.companyId = filters.companyId;
  }

  if (filters.categoryId) {
    query.categoryId = filters.categoryId;
  }

  if (filters.subCategoryId) {
    query.subCategoryId = filters.subCategoryId;
  }

  if (filters.subSubCategoryId) {
    query.subSubCategoryId = filters.subSubCategoryId;
  }

  const products = await Product.find(query);
  return products;
};


exports.getFilteredProductsWithVariantInfo = async (filters) => {
  const matchProductStage = {};

  if (filters.companyId) matchProductStage.companyId = filters.companyId;
  if (filters.categoryId) matchProductStage.categoryId = filters.categoryId;
  if (filters.subCategoryId) matchProductStage.subCategoryId = filters.subCategoryId;
  if (filters.subSubCategoryId) matchProductStage.subSubCategoryId = filters.subSubCategoryId;

  const pipeline = [];

  if (Object.keys(matchProductStage).length > 0) {
    pipeline.push({ $match: matchProductStage });
  }

  // Rozwijanie wariantów
  pipeline.push({ $unwind: "$variants" });

  const variantMatchConditions = [];

  if (filters.minPrice !== undefined) {
    variantMatchConditions.push({ "variants.price": { $gte: Number(filters.minPrice) } });
  }

  if (filters.maxPrice !== undefined) {
    variantMatchConditions.push({ "variants.price": { $lte: Number(filters.maxPrice) } });
  }

  if (filters.name) {
    variantMatchConditions.push({
      $expr: {
        $regexMatch: {
          input: { $concat: ["$name", " ", "$variants.name"] },
          regex: filters.name,
          options: "i"
        }
      }
    });
  }

  if (variantMatchConditions.length > 0) {
    pipeline.push({ $match: { $and: variantMatchConditions } });
  }

  // Grupowanie z powrotem po produkcie
  pipeline.push({
    $group: {
      _id: "$_id",
      variantIds: { $push: "$variants._id" }
    }
  });

  // Pobranie pełnego produktu do każdego _id
  const matched = await Product.aggregate(pipeline);

  // Pobranie pełnych produktów i złączenie ich z variantIds
  const results = await Promise.all(
    matched.map(async (entry) => {
      const product = await Product.findById(entry._id);
      return {
        product,
        variantIds: entry.variantIds
      };
    })
  );

  return results;
};

exports.getProductById = async (id) => {
  return await Product.findOne({ _id: id });
};