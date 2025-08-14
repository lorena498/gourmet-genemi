export const generateFoodDescription = async (foodName: string): Promise<string> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ foodName }),
    });

    // If the server response is not OK, we should handle it.
    if (!response.ok) {
        // Try to get a meaningful error from the response body
        const errorData = await response.json().catch(() => ({})); // Gracefully handle non-json responses
        // Use the description from the error data if available (e.g., our fallback from the server)
        if (errorData.description) {
            return errorData.description;
        }
        // Log a more specific error if possible, otherwise use the status text
        console.error("API error:", errorData.error || response.statusText);
        throw new Error('Failed to generate description from server.');
    }

    const data = await response.json();
    return data.description;

  } catch (error) {
    console.error("Error calling generation service:", error);
    // Provide a graceful fallback description for network errors or other client-side issues
    return `An exquisite ${foodName} prepared with the freshest ingredients, offering a delightful experience with every bite.`;
  }
};