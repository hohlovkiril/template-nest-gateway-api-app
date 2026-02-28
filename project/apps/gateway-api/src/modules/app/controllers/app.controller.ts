import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('ping')
  @HttpCode(200)
  public ping() {
    return {
      success: true,
      error: null,
      data: {
        status: true,
        timestamp: Date.now(),
      },
    };
  }
}
