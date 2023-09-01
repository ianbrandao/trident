import { useEffect } from "react";
import { useRouter } from "next/router"; // Import the useRouter hook

export default function Home() {
  const router = useRouter(); // Get the router object from next/router

  useEffect(() => {
    // Redirect to another URL using router.push
    router.push("https://evihtech.com/"); // Replace "/another-url" with the actual URL
  }, [router]); // Empty dependency array, so the effect runs only once

  return null; // Render nothing on the page
}