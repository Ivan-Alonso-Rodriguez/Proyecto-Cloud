import { Controller, Get } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class HealthController {
  @Get('/')
  healthCheck(): string {
    return 'OK';
  }
}
