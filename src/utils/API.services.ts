import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
// const apiUrl = "http://localhost:4900"

export const searchFood = async (props: { query: string }) => {
  try {
    const res = await axios.get(`${apiUrl}/search-food/?text=${props.query}`);
    // console.log("res",res);
    return {
      data: res.data?.data,
      error: res.data?.error,
      message: res.data?.message,
      status: res.data?.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response
        ? error.response.data.message
        : "An error occurred";
      const errorMsg = error.response
        ? error.response.data.error
        : "An error occurred";

      const status = error.response ? error.response.status : "N/A";

      return {
        data: null,
        error: errorMsg,
        message,
        status,
      };
    } else {
      console.error("Error:", error);
      return {
        data: null,
        error: "Something went wrong",
        message: "An unexpected error occurred",
        status: 500,
      };
    }
  }
};
export const userLogin = async (payload: any) => {
  try {
    const res = await axios.post(`${apiUrl}/login`, payload);
    console.log("res", res);
    return {
      data: res.data?.data,
      error: res.data?.error,
      message: res.data?.message,
      status: res.data?.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response
        ? error.response.data.message
        : "An error occurred";
      const errorMsg = error.response
        ? error.response.data.error
        : "An error occurred";

      const status = error.response ? error.response.status : "N/A";

      return {
        data: null,
        error: errorMsg,
        message,
        status,
      };
    } else {
      console.error("Error:", error);
      return {
        data: null,
        error: "Something went wrong",
        message: "An unexpected error occurred",
        status: 500,
      };
    }
  }
};
export const userRegister = async (payload: any) => {
  try {
    const res = await axios.post(`${apiUrl}/register`, payload);
    console.log("res", res);
    return {
      data: res.data?.data,
      error: res.data?.error,
      message: res.data?.message,
      status: res.data?.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response
        ? error.response.data.message
        : "An error occurred";
      const errorMsg = error.response
        ? error.response.data.error
        : "An error occurred";

      const status = error.response ? error.response.status : "N/A";

      return {
        data: null,
        error: errorMsg,
        message,
        status,
      };
    } else {
      console.error("Error:", error);
      return {
        data: null,
        error: "Something went wrong",
        message: "An unexpected error occurred",
        status: 500,
      };
    }
  }
};
export const createFood = async (payload: any) => {
  try {
    const token = localStorage.getItem('token');
    // let token;
    // if (token1) {
    //   token = (token1);
    // }
    const res = await axios.post(`${apiUrl}/create-common-food`,  payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    console.log("res", res);
    return {
      data: res.data?.data,
      error: res.data?.error,
      message: res.data?.message,
      status: res.data?.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response
        ? error.response.data.message
        : "An error occurred";
      const errorMsg = error.response
        ? error.response.data.error
        : "An error occurred";

      const status = error.response ? error.response.status : "N/A";

      return {
        data: null,
        error: errorMsg,
        message,
        status,
      };
    } else {
      console.error("Error:", error);
      return {
        data: null,
        error: "Something went wrong",
        message: "An unexpected error occurred",
        status: 500,
      };
    }
  }
};
export const searchSingleFood = async (props: { query: string }) => {
  try {
    const res = await axios.get(`${apiUrl}/get-single-food/${props.query}`);
    // console.log("res",res);
    return {
      data: res.data?.data,
      error: res.data?.error,
      message: res.data?.message,
      status: res.data?.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response
        ? error.response.data.message
        : "An error occurred";
      const errorMsg = error.response
        ? error.response.data.error
        : "An error occurred";

      const status = error.response ? error.response.status : "N/A";

      return {
        data: null,
        error: errorMsg,
        message,
        status,
      };
    } else {
      console.error("Error:", error);
      return {
        data: null,
        error: "Something went wrong",
        message: "An unexpected error occurred",
        status: 500,
      };
    }
  }
};
export const filterFood = async (props: { query: string }) => {
  try {
    const res = await axios.get(`${apiUrl}/filter-product/?${props.query}`);
    // console.log("res",res);
    return {
      data: res.data?.data,
      error: res.data?.error,
      message: res.data?.message,
      status: res.data?.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response
        ? error.response.data.message
        : "An error occurred";
      const errorMsg = error.response
        ? error.response.data.error
        : "An error occurred";

      const status = error.response ? error.response.status : "N/A";

      return {
        data: null,
        error: errorMsg,
        message,
        status,
      };
    } else {
      console.error("Error:", error);
      return {
        data: null,
        error: "Something went wrong",
        message: "An unexpected error occurred",
        status: 500,
      };
    }
  }
};
export const getCategory = async () => {
  try {
    const res = await axios.get(`${apiUrl}/get-category`);
    // console.log("res",res);
    return {
      data: res.data?.data,
      error: res.data?.error,
      message: res.data?.message,
      status: res.data?.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response
        ? error.response.data.message
        : "An error occurred";
      const errorMsg = error.response
        ? error.response.data.error
        : "An error occurred";

      const status = error.response ? error.response.status : "N/A";

      return {
        data: null,
        error: errorMsg,
        message,
        status,
      };
    } else {
      console.error("Error:", error);
      return {
        data: null,
        error: "Something went wrong",
        message: "An unexpected error occurred",
        status: 500,
      };
    }
  }
};
export const userUpdate = async (payload: any) => {
  const user = localStorage.getItem('user');
  let userID;
  if (user) {
    userID = JSON.parse(user);
  }
  const token = localStorage.getItem('token');

  console.log(token);
  
  try {
    const res = await axios.patch(`${apiUrl}/update-user/${userID._id}`, payload,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("res", res);
    return {
      data: res.data?.data,
      error: res.data?.error,
      message: res.data?.message,
      status: res.data?.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response
        ? error.response.data.message
        : "An error occurred";
      const errorMsg = error.response
        ? error.response.data.error
        : "An error occurred";

      const status = error.response ? error.response.status : "N/A";

      return {
        data: null,
        error: errorMsg,
        message,
        status,
      };
    } else {
      console.error("Error:", error);
      return {
        data: null,
        error: "Something went wrong",
        message: "An unexpected error occurred",
        status: 500,
      };
    }
  }
};