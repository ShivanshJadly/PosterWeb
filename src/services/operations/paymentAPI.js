import { toast } from "react-hot-toast";
import { resetCart } from "../../slices/cartSlice";
import { setPaymentLoading } from "../../slices/posterSlice";
import { apiConnector } from "../apiConnector";
import { paymentEndpoints } from "../apis";

const {
  POSTER_PAYMENT_API,
  POSTER_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = paymentEndpoints;

// Load the Razorpay SDK
async function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay SDK.");
      reject(new Error("Failed to load Razorpay SDK"));
    };
    document.body.appendChild(script);
  });
}

// Buy the Poster
export async function BuyPoster(token, posterDetails, userDetails, navigate, dispatch) {
  const toastId = toast.loading("Initializing payment...");
  try {
    // Step 1: Load Razorpay SDK
    const isScriptLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!isScriptLoaded) {
      throw new Error("Razorpay SDK loading failed. Check your internet connection.");
    }

    // Step 2: Create an order through the backend
    console.log("Initiating payment with details:", posterDetails);
    const payload = {
      posterDetails: [{ posterId: "677bcc9a583c967089134bad", quantity: 2 }],
    };
    const orderResponse = await apiConnector(
      "POST",
      POSTER_PAYMENT_API,
      payload,
      { Authorization: `Bearer ${token}` }
    );

    console.log("Order Response:", orderResponse);

    if (!orderResponse?.data?.success) {
      throw new Error(orderResponse?.data?.message || "Payment initiation failed.");
    }

    // Extract order details
    const { amount, currency, id: orderId } = orderResponse.data.data;

    // Step 3: Configure Razorpay options
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      currency,
      amount: `${amount}`,
      order_id: orderId,
      name: "PosterWeb",
      description: "Thank you for purchasing the poster.",
      prefill: {
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        email: userDetails.email,
      },
      handler: async (response) => {
        try {
          console.log("Payment Successful Response:", response);
          await sendPaymentSuccessEmail(response, amount, token);
          await verifyPayment({ ...response, posterDetails }, token, navigate, dispatch);
        } catch (error) {
          console.error("Handler Error:", error);
          toast.error("An error occurred while processing payment.");
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    // Step 4: Open Razorpay payment window
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    // Handle payment failure
    paymentObject.on("payment.failed", (response) => {
      console.error("Payment Failed Details:", response.error);
      toast.error("Payment failed. Please try again.");
    });
  } catch (error) {
    console.error("Payment Initialization Error:", error);
    toast.error(error.message || "Could not complete payment.");
  } finally {
    toast.dismiss(toastId);
  }
}

// Verify the Payment
async function verifyPayment(paymentData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying payment...");
  dispatch(setPaymentLoading(true));

  try {
    console.log("Verifying Payment Data:", paymentData);

    const response = await apiConnector(
      "POST",
      POSTER_VERIFY_API,
      paymentData,
      { Authorization: `Bearer ${token}` }
    );

    console.log("Verify Payment Response:", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Payment verification failed.");
    }

    toast.success("Payment Successful! Posters are added to your account.");
    navigate("/"); // Navigate to home or relevant page
    dispatch(resetCart()); // Clear the cart
  } catch (error) {
    console.error("Payment Verification Error:", error);
    toast.error(error.message || "Could not verify payment.");
  } finally {
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
  }
}

// Send Payment Success Email
async function sendPaymentSuccessEmail(paymentResponse, amount, token) {
  try {
    console.log("Sending Payment Success Email:", paymentResponse);

    const emailResponse = await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: paymentResponse.razorpay_order_id,
        paymentId: paymentResponse.razorpay_payment_id,
        amount,
      },
      { Authorization: `Bearer ${token}` }
    );

    console.log("Email Response:", emailResponse);
  } catch (error) {
    console.error("Payment Success Email Error:", error);
  }
}
