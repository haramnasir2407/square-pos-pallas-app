import { signIn } from "next-auth/react";
const handleOAuthCallback = async ({
  code,
  setError,
  setIsProcessing,
}: HandleOAuthCallbackProps) => {
  try {
    console.log("Processing OAuth callback with code:", code);

    const response = await fetch(`/api/auth/square/callback?code=${code}`);
    const data = await response.json();
    console.log("data:", data);

    if (data.success) {
      console.log("OAuth successful, creating session...");

      // Create a custom session with the tokens
      const result = await signIn("credentials", {
        accessToken: data.tokens.access_token,
        refreshToken: data.tokens.refresh_token,
        merchantId: data.merchant.id,
        merchantName: data.merchant.business_name,
        redirect: false,
      });

      if (result?.error) {
        setError(`Session creation failed: ${result.error}`);
      } else {
        // Redirect to dashboard or home
        console.log("Redirecting to dashboard");
        window.location.href = "/dashboard";
      }
    } else {
      setError(`OAuth failed: ${data.error || "Unknown error"}`);
    }
  } catch (error) {
    console.error("Error processing OAuth callback:", error);
    setError(
      `Error processing OAuth callback: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  } finally {
    console.log("Setting isProcessing to false");
    setIsProcessing(false);
  }
};

export default handleOAuthCallback;
