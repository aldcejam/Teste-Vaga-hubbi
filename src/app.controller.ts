import { Controller, Get } from '@nestjs/common'; 
import { PrismaService } from '@infra/database/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getHello(): Promise<string> {
    return "hello"
  }
}