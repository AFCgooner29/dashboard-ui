// Global utility

export const useFetch = async (requestObj) => {
    try {
      const response = await fetch(requestObj);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
      const json = await response.json();
      return json;
    } catch (error) {
      throw new Error(`Fetch error: ${error.message}`);
    }
  };
  