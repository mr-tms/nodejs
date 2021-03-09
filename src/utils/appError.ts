class AppError extends Error {
  errno: number;
  status: string;

  constructor(message: string, errno: number) {
    super(message);
    
    this.errno = errno;
    this.status = `${errno}`.startsWith('4') ? 'fail' : 'error';

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
