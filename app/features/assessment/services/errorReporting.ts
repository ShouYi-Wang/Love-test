interface ErrorReport {
  message: string;
  stack?: string;
  timestamp: string;
  userInfo?: {
    step: number;
    progress: number[];
  };
  context?: Record<string, any>;
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

  async reportError(error: Error, context?: Record<string, any>) {
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