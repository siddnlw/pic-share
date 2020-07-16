import { message } from "antd";

export const handleReponse = response => {
  if (!response.ok) throw response.json();
  else return response.json();
};

export const handleErrors = err => err.then(x => message.error(x.message));
