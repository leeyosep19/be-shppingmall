// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const reviewSchema = Schema(
// {
//   productId: {type: mongoose.ObjectId, ref:User},
//   userId: {type:mongoose.ObjectId,ref:Product},
//   rating: { type: Number, required: true },
//   text: { type: String, required: true },
//   date: { type: Date, default: Date.now },
// }
// );

// const Review = mongoose.model("Review", reviewSchema);
// module.exports = Review;





// // models/Review.js
// const mongoose = require('mongoose');
// const Product = require("./Product"); 
// const User = require("./User");

// const reviewSchema = new mongoose.Schema({
//   productId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: Product, // Product 모델과 연결
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: User, // User 모델과 연결
//   },
//   rating: {
//     type: Number,
//     required: true,
//     min: 1,
//     max: 5,
//   },
//   text: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   createdAt: { type: Date, default: Date.now },
// }, { timestamps: true });

// reviewSchema.methods.toJSON = function(){
//   const obj = this._doc;
//   delete obj.__v;
//   delete obj.updatedAt;
//   return obj;
// }


// const Review = mongoose.model('Review', reviewSchema);
// module.exports = Review;
