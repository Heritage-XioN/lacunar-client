
const api = process.env.BACKEND_URL || 'http://localhost:8000'

const handlePayment = async () => {
    try {
      // 1. Ask your backend to initialize the transaction
      const response = await fetch(`${api}/finance/initialize`, {
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3NjkzNjA5MTN9.5cHKybQI8GB9mFirGTrm38q_yRLfSnlVMqZ6w7P7ptY`,
        },
        method: 'POST',
        body: JSON.stringify({ amount: 5000 }),
      });
      const data = await response.json()
      const { access_code } = await data.data;

      // 2. Load Paystack dynamically (Fixes "window is not defined")
      const PaystackPop = (await import('@paystack/inline-js')).default;
      const popup = new PaystackPop();

      // 3. Resume the transaction using the access_code
      popup.resumeTransaction(access_code);

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong initializing payment.");
  };
}
export default handlePayment