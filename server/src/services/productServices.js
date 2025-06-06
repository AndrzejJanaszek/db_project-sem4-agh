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

exports.getFilteredProducts = async (filters) => {
  const pipeline = [];

  pipeline.push({ $unwind: "$variants" });

  if (filters.name) {
    pipeline.push({
      $match: {
        name: { $regex: filters.name, $options: "i" }
      }
    });
  }

  if (filters.categoryId) {
    pipeline.push({
      $match: {
        categoryId: filters.categoryId
      }
    });
  }
  if (filters.subCategoryId) {
    pipeline.push({
      $match: {
        subCategoryId: filters.subCategoryId
      }
    });
  }
  if (filters.subSubCategoryId) {
    pipeline.push({
      $match: {
        subSubCategoryId: filters.subSubCategoryId
      }
    });
  }

  if (filters.companyId) {
    pipeline.push({
      $match: {
        companyId: filters.companyId
      }
    });
  }

  const priceFilter = {};
  if (filters.minPrice !== undefined) priceFilter.$gte = Number(filters.minPrice);
  if (filters.maxPrice !== undefined) priceFilter.$lte = Number(filters.maxPrice);

  if (Object.keys(priceFilter).length > 0) {
    pipeline.push({
      $match: {
        "variants.price": priceFilter
      }
    });
  }

  pipeline.push({
    $group: {
      _id: "$_id",
      name: { $first: "$name" },
      categoryId: { $first: "$categoryId" },
      subCategoryId: { $first: "$subCategoryId" },
      subSubCategoryId: { $first: "$subSubCategoryId" },
      variants: { $push: "$variants" }
    }
  });

  const results = await Product.aggregate(pipeline);
  return results;
};

