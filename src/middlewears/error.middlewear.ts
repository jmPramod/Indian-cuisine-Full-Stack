interface CustomError extends Error {
  status: number;
  data: any;
  message: string;
}

const createError = (status: number, message: string): CustomError => {
  const error = new Error(message) as CustomError;
  error.status = status;
  error.data = null;
  
  Object.defineProperty(error, 'message', {
    value: message,
    enumerable: true, 
  });

  return error;
};

export default createError;