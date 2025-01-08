// const Review = require("../models/Review");
// const jwt = require('jsonwebtoken');

// // 리뷰 컨트롤러 객체 선언
// const reviewController = {};

// // 리뷰 추가
// reviewController.addReview = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const { rating, text } = req.body;
    
//     // 토큰을 헤더에서 가져오기
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ message: "인증이 필요합니다." });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decoded._id; // 토큰에서 userId 추출

//     // 유효성 검사
//     if (!productId || !userId || !rating || !text) {
//       return res.status(400).json({ message: "모든 필드를 채워주세요." });
//     }

//     const newReview = new Review({ productId, userId, rating, text });
//     await newReview.save();

//     console.log("리뷰 저장 요청 데이터: ", req.body);
//     res.status(201).json(newReview);
//   } catch (error) {
//     console.error("리뷰 저장 오류:", error);
//     res.status(500).json({ message: "리뷰 저장 실패", error: error.message });
//   }
// };

// // 특정 상품의 리뷰 조회
// reviewController.getReviewsByProduct = async (req, res) => {
//   try {
//     const { productId } = req.params;

//     // 리뷰 조회 및 정렬
//     const reviews = await Review.find({ productId }).sort({ createdAt: -1 });

//     if (!reviews || reviews.length === 0) {
//       return res.status(404).json({ message: "리뷰가 없습니다." });
//     }

//     res.status(200).json(reviews);
//   } catch (error) {
//     console.error("리뷰 조회 에러:", error);
//     res.status(500).json({ message: "리뷰 조회 실패", error: error.message });
//   }
// };

// // 리뷰 삭제
// reviewController.deleteReview = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // 유효한 ID 확인
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "유효하지 않은 리뷰 ID입니다." });
//     }

//     const deletedReview = await Review.findByIdAndDelete(id);

//     if (!deletedReview) {
//       return res.status(404).json({ message: "삭제할 리뷰를 찾을 수 없습니다." });
//     }

//     res.status(200).json({ message: "리뷰 삭제 성공", deletedReview });
//   } catch (error) {
//     console.error("리뷰 삭제 에러:", error);
//     res.status(500).json({ message: "리뷰 삭제 실패", error: error.message });
//   }
// };

// module.exports = reviewController;
