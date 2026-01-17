import axios from "axios";

import { BASE_URL } from "../constants/api/urlConstants";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

export default axios;