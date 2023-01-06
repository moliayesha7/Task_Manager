import axios from "axios";

export default axios.create({
  baseURL: "https://devza.com/tests/tasks/",
  headers: {
    "Content-type": "multipart/form-data",
    'AuthToken': 'UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a',
  }
});
