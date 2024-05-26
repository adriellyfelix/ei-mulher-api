import { Controller, Get, HttpCode } from '@nestjs/common';
import {
  HealthCheckService,
  MongooseHealthIndicator,
  MemoryHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Health V1')
@Controller({ version: '1', path: 'health' })
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: MongooseHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HttpCode(200)
  @ApiBearerAuth()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
    ]);
  }
}
