export default class HttpException extends Error {
    statusCode?: number;
    status?: number;
    message: string;
    error: string | null;
  
    constructor(statusCode: number, message: string, error?: string) {
      super(message);
  
      this.statusCode = statusCode;
      this.message = message;
      this.error = error || null;
    }
  }

  // Adapted from: https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/#Implement-Express-Error-Handling