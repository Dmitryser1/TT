import { Controller, Get, Query } from '@nestjs/common';
import { CrmService } from './crm.service';

@Controller('api/leads')
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  @Get()
  async getLeads(@Query('query') query: string) {
    return this.crmService.getLeads(query);
  }
}