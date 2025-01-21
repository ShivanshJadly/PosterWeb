const Category = require("../models/Category")

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" })
    }
    const CategorysDetails = await Category.create({
      name: name,
      description: description,
    })
    console.log(CategorysDetails)
    return res.status(200).json({
      success: true,
      message: "Categorys Created Successfully",
    })
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    })
  }
}

exports.showAllCategories = async (req, res) => {
  try {
    const allCategorys = await Category.find()
    res.status(200).json({
      success: true,
      data: allCategorys,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body

    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "poster",
        populate: "rating",
      })
      .exec()

    // console.log("SELECTED COURSE", selectedCategory)
    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.")
      return res
        .status(404)
        .json({ success: false, message: "Category not found" })
    }
    // Handle the case when there are no posters
    if (selectedCategory.poster.length === 0) {
      console.log("No postres found for the selected category.")
      return res.status(404).json({
        success: false,
        message: "No posters found for the selected category.",
      })
    }

    // Get posters for other categories
    // const categoriesExceptSelected = await Category.find({
    //   _id: { $ne: categoryId },
    // })
    // let differentCategory = await Category.findOne(
    //   categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
    //     ._id
    // )
    //   .populate({
    //     path: "poster",
    //   })
    //   .exec()
    // console.log()
    // Get top-selling courses across all categories
    // const allCategories = await Category.find()
    //   .populate({
    //     path: "poster",
    //   })
    //   .exec()
    // const allCourses = allCategories.flatMap((category) => category.poster)
    // const mostSellingPoster = allCourses
    //   .sort((a, b) => b.sold - a.sold)
    //   .slice(0, 10)

    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}
