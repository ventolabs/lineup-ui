import { AGENT_SERVER_URL, AGENT_ID } from '../utils/constants';

export async function sendRequest(input: string) {
  
    try {
      const response = await fetch(`${AGENT_SERVER_URL}/${AGENT_ID}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: input,
          userId: "1",
          userName: "User",
        }),
      });
  
      const data = await response.json();
      
      console.log("Response:", data);
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
}