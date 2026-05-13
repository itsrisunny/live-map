const hostname = window.location.hostname;
const MAPBOX_TOKEN = "pk.eyJ1IjoiYXBuaS1nYWFkaS1tb2JpbGl0eSIsImEiOiJjbXAzamFvdHEwc2NtMnBzZHJuMXlmdDE2In0.4tLFLq5BzH3GZDhwaU-ZhA";
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

export { API_URL, WS_URL, MAPBOX_TOKEN };
