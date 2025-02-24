interface ErrorContext {
  [key: string]: string | number | boolean | undefined;
}

interface ErrorData {
  message: string;
  stack?: string;
  context?: ErrorContext;
}

interface ErrorReport {
  message: string;
  stack?: string;
  timestamp: string;
  userInfo?: {
    step: number;
    progress: number[];
  };
  context?: ErrorContext;
}

export class ErrorReportingService {
  private static instance: ErrorReportingService;
  private endpoint = '/api/error-reporting';

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new ErrorReportingService();
    }
    return this.instance;
  }

  private async sendError(data: ErrorData): Promise<void> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        console.error('Error reporting failed:', await response.text());
      }
    } catch (err) {
      console.error('Failed to send error report:', err);
    }
  }

  public async reportError(error: Error, context?: ErrorContext): Promise<void> {
    const report: ErrorReport = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      context
    };

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(report)
      });

      if (!response.ok) {
        console.error('Error reporting failed:', await response.text());
      }
    } catch (err) {
      console.error('Failed to send error report:', err);
    }
  }
} 