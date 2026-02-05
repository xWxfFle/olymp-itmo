const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const apiKey = process.env.EXPO_PUBLIC_API_KEY
  
export const createRequest = (url: string) => fetch(`${apiUrl}${url}`, {
  headers: {
    'Authorization': `ApiKey ${apiKey}`,
    'Content-Type': 'application/json'
  }
}).then(data => data.json()).then(response => response?.data)