import axios from 'axios';
import { apiBaseUrl } from './config';

if (apiBaseUrl) {
  axios.defaults.baseURL = apiBaseUrl;
}

axios.defaults.headers.post['Content-Type'] = 'application/json';

