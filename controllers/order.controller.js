const Order = require("../models/Order");
const productController = require("./productController");
const {randomStringGenerator} = require("../utils/randomStringGenerator");


const PAGE_SIZE=10;
const orderController={};

orderController.createOrder = async(req,res)=>{
    try{
        const {userId} = req;
        const{shipTo,contact,totalPrice,orderList} = req.body;
        //재고 확인 & 재고 업데이트
        const insufficientStockItems = await productController.checkItemListStock(orderList);
        //재고 소진시시
        if(insufficientStockItems.length>0){
            const errorMessage = insufficientStockItems.reduce((total,item)=>
                (total += item.message),""
            );
            throw new Error(errorMessage);
        }

        const newOrder = new Order({
            userId,
            totalPrice,
            shipTo,
            contact,
            items:orderList,
            orderNum: randomStringGenerator(),

        });

        await newOrder.save();

        //카트 비우기
        
        res.status(200).json({status:"success", orderNum: newOrder.orderNum });
    }catch(error){
        return res.status(400).json({status: "fail", error:error.message});

    }    
}


orderController.getOrder = async (req, res, next) => {
    try {
      const { userId } = req;
  
      const orderList = await Order.find({ userId: userId }).populate({
        path: "items",
        populate: {
          path: "productId",
          model: "Product",
          select: "image name",
        },
      });
      const totalItemNum = await Order.find({ userId: userId }).count();
  
      const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);
      res.status(200).json({ status: "success", data: orderList, totalPageNum });
    } catch (error) {
      return res.status(400).json({ status: "fail", error: error.message });
    }
  };


  orderController.getOrderList = async (req, res, next) => {
    try {
      const { page, ordernum } = req.query;
  
      let cond = {};
      if (ordernum) {
        cond = {
          orderNum: { $regex: ordernum, $options: "i" },
        };
      }
  
      const orderList = await Order.find(cond)
        .populate("userId")
        .populate({
          path: "items",
          populate: {
            path: "productId",
            model: "Product",
            select: "image name",
          },
        })
        .sort({ createdAt: -1 }) // 최신순 정렬 추가
        .skip((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE);
      const totalItemNum = await Order.countDocuments(cond);
  
      const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);
      res.status(200).json({ status: "success", data: orderList, totalPageNum });
    } catch (error) {
      return res.status(400).json({ status: "fail", error: error.message });
    }
  };
  
  orderController.updateOrder = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const order = await Order.findByIdAndUpdate(
        id,
        { status: status },
        { new: true }
      );
      if (!order) throw new Error("Can't find order");
  
      res.status(200).json({ status: "success", data: order });
    } catch (error) {
      return res.status(400).json({ status: "fail", error: error.message });
    }
  };







module.exports = orderController;