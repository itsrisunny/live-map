const hostname = window.location.hostname;
const MAPBOX_TOKEN = "pk.eyJ1IjoiaXRzcmlzdW5ueSIsImEiOiJjbWppZHFvZWcwNDBzM2dveTF4ZHZ2ZTRwIn0.OrCLgkGTiK-PWKGVTa-cLg";
let API_URL;
let WS_URL;

if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
  API_URL = "http://127.0.0.1:5001/apnigadi-2025/us-central1/api/api";
  WS_URL = "ws://localhost:8080";
} 
else if (hostname.includes("dev") || hostname.includes("run.app")) {
  API_URL = "https://dev-api.apnigadi.com/api";
  WS_URL = "wss://api-dev.track.yeapnigaadi.com";
} 
else {
  // run.app + production domain
  API_URL = "https://api.apnigadi.com/api";
  WS_URL = "wss://api.track.yeapnigaadi.com";
}

console.log("Using WS:", WS_URL);

export { API_URL, WS_URL, MAPBOX_TOKEN };
