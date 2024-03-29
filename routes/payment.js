const { protect, restrictTo } = require("../controllers/authController");
const {
  createPaymentData,
  getAllPayments,
  getPayment,
  updatePayment,
  createOrderId,
  paymentSuccess,
  getPaidDetails,
  updatePaidBranch,
  deletePayment,
  updateBranchPayment,
  deleteBranchPayment,
  myPayments,
} = require("../controllers/paymentController");

const router = require("express").Router();

// router.post("/success", protect, paymentSuccess);
// router.post("/create-orderId", protect, createOrderId);
// .patch(protect, restrictTo("superAdmin"), updatePayment);

router.post("/", protect, restrictTo("superAdmin"), createPaymentData);
router.get("/", protect, getAllPayments);

router
  .route("/:id")
  .get(protect, getPayment)
  .patch(protect, restrictTo("superAdmin"), updatePaidBranch)
  .delete(protect, restrictTo("superAdmin"), deletePayment);

router.get(
  "/paid-details/:id",
  protect,
  restrictTo("superAdmin"),
  getPaidDetails
);
router.patch(
  "/paid-details/:id",
  protect,
  restrictTo("superAdmin"),
  updateBranchPayment
);
router.post(
  "/paid-details/:id",
  protect,
  restrictTo("superAdmin"),
  deleteBranchPayment
);
router.post("/my-payments", protect, myPayments);
module.exports = router;
