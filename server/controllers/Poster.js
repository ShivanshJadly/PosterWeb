const Poster = require("../models/Poster")
const Category = require("../models/Category")
const User = require("../models/User")
const { uploadImageToCloudinary } = require("../utils/imageUploader")

// Create Poster
exports.createPoster = async (req, res) => {
  try {
    // Get user ID from request object
    const userId = req.user.id
    console.log("User ID:", userId)

    // Get all required fields from request body
    let {
      posterName,
      description,
      price,
      category,
      size
    } = req.body

    // // Get poster image from request files
    const poster = req.files.posterImage

    // Check if any of the required fields are missing
    if (
      !posterName ||
      !description ||
      !price ||
      !poster ||
      !category ||
      !size
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      })
    }
    
    // Check if the user is an admin
    const adminDetails = await User.findById(userId, {
      accountType: "Admin",
    })

    if (!adminDetails) {
      return res.status(404).json({
        success: false,
        message: "Admin Details Not Found",
      })
    }

    const categoryDetails = await Category.findById(category)
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      })
    }

    // Upload the Thumbnail to Cloudinary
    const posterImage = await uploadImageToCloudinary(
      poster,
      process.env.FOLDER_NAME
    )
    // console.log("posterImage: ",posterImage)
    // Create a new poster with the given details
    const newPoster = await Poster.create({
      posterName,
      description,
      admin: adminDetails._id,
      price,
      category: categoryDetails._id,
      image: posterImage.secure_url,
      size,
    })

    // Add the new poster to the User Schema of the admin
    const userPosterDetails = await User.findByIdAndUpdate(
      adminDetails._id,
      {
        $push: {
          posters: newPoster._id,
        },
      },
      { new: true }
    )
    // Add the new course to the Categories
    const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          poster: newPoster._id,
        },
      },
      { new: true }
    )
    // console.log("HEREEEEEEEE", categoryDetails2)
    // Return the new course and a success message
    res.status(200).json({
      success: true,
      data: newPoster,
      message: "Poster Created Successfully",
    })
  } catch (error) {
    // Handle any errors that occur during the creation of the course
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to create poster",
      error: error.message,
    })
  }
}
// Get all Posters
exports.getAllPoster = async (req, res) => {
    try {
      const allPosters = await Poster.find({})
      .select("posterName price image rating description")
      .populate("admin")
      .exec();

      // console.log("allposter: ",allPosters)
  
      return res.status(200).json({
        success: true,
        data: allPosters,
      })
    } catch (error) {
      console.log(error)
      return res.status(404).json({
        success: false,
        message: `Can't Fetch Poster Data`,
        error: error.message,
      })
    }
}
// Get all Posters purchased by a user along with quantities
exports.getAllPosterOfUser = async (req, res) => {
  try {
    const userId = req.user?.id; // Get the user ID from the request
    console.log("User ID:", userId); // Debugging log

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    // Step 1: Fetch the user's purchased posters and quantities
    const user = await User.findById(userId)
      .select("purchasedPosters")
      .populate({
        path: "purchasedPosters.posterId", // Populate the poster details
        select: "posterName price image ratingAndReviews", // Fields to include from Poster
      })
      .exec();

    if (!user || !user.purchasedPosters || user.purchasedPosters.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posters found for this user.",
      });
    }

    console.log("User's Purchased Posters:", user.purchasedPosters);

    // Step 2: Format the data for the response
    const postersWithQuantities = user.purchasedPosters.map((item) => ({
      poster: item.posterId, // Poster details
      quantity: item.quantity, // Quantity purchased
    }));

    // Step 3: Respond with the posters and their quantities
    return res.status(200).json({
      success: true,
      data: postersWithQuantities,
    });
  } catch (error) {
    console.error("Error fetching posters:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch posters.",
      error: error.message,
    });
  }
};

// Get Single Poster Details
exports.getPosterDetails = async (req, res) => {
    try {
      const { posterId } = req.body
      const posterDetails = await Poster.findOne({
        _id: posterId,
      })
      .populate({
        path: "admin",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      // .populate("ratingAndReviews")
      .exec()
  
      if (!posterDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find Poster with id: ${posterId}`,
        })
      }
  
      return res.status(200).json({
        success: true,
        data: {
          posterDetails,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}

// Get Multiple Poster Details
// exports.getMultiplePosterDetails = async (req, res) => {
//   try {
//     // Destructure posterIds from the request body
//     const { posterIds } = req.body;

//     // Validate that posterIds is provided and is an array
//     if (!posterIds || !Array.isArray(posterIds)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or missing 'posterIds'. It should be an array of IDs.",
//       });
//     }

//     // Fetch poster details using Mongoose
//     const posterDetails = await Poster.find({
//       _id: { $in: posterIds },
//     })
      

//     // Check if posterDetails is empty
//     if (!posterDetails || posterDetails.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: `No posters found with the provided IDs: ${posterIds}`,
//       });
//     }

//     // Respond with poster details
//     return res.status(200).json({
//       success: true,
//       data: posterDetails,
//     });
//   } catch (error) {
//     // Handle unexpected errors
//     console.error("Error fetching poster details:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

// Delete the Poster
exports.deletePoster = async (req, res) => {
  try {
    const { posterId, userId } = req.body

    // Find the poster
    const poster = await Poster.findById(posterId)
    if (!poster) {
      return res.status(404).json({ message: "Poster not found" })
    }

    // Delete the poster
    await Poster.findByIdAndDelete(posterId)

    await User.findByIdAndDelete(userId, {
      $pull: { posters: posterId }, 
    });

    return res.status(200).json({
      success: true,
      message: "Poster deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

// Update the Poster
exports.updatePoster = async (req, res) => {
  try {
    const { posterId } = req.body
    const poster = await Poster.findById(posterId)
    if (!poster) {
      return res.status(404).json({ message: "Poster not found" })
    }

    const updatedPoster = await Poster.findByIdAndUpdate(posterId, req.body, {
      new: true,
      runValidators: true,
    })

    return res.status(200).json({
      success: true,
      data: updatedPoster,
      message: "Poster updated successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

exports.getOrderHistory = async (req, res) => {
  try {
    const userId = req.user?.id; // Assuming user ID is attached by the authenticate middleware

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required." });
    }

    const user = await User.findById(userId).populate("purchasedPosters.posterId");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const sortedOrderHistory = user.purchasedPosters
      .sort((a, b) => new Date(b.purchasedOn) - new Date(a.purchasedOn))
      .map((order) => ({
        poster: {
          id: order.posterId._id,
          posterName: order.posterId.posterName,
          price: order.posterId.price,
          image: order.posterId.image,
        },
        quantity: order.quantity,
        totalPrice: order.posterId.price * order.quantity,
        purchasedOn: order.purchasedOn,
        delivered: order.delivered,
        orderId: order.orderId,
      }));

    res.status(200).json({
      success: true,
      orderHistory: sortedOrderHistory,
    });
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({ success: false, message: "Failed to fetch order history." });
  }
};

exports.updateDeliveryStatus = async (req, res) => {
  const { userId, posterId, delivered } = req.body;

  if (!userId || !posterId || typeof delivered !== "boolean") {
    return res.status(400).json({ success: false, message: "Invalid input." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const order = user.purchasedPosters.find(
      (item) => item.posterId.toString() === posterId
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    order.delivered = delivered;
    await user.save();

    res.status(200).json({ success: true, message: "Delivery status updated." });
  } catch (error) {
    console.error("Error updating delivery status:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};


