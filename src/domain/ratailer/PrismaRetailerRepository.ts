// retailer.repository.ts

import { PrismaService } from "@/infra/database/prisma.service";
import { RetailerRepository } from "./RetailerRepository";
import { ConflictException, Injectable } from "@nestjs/common";

@Injectable()
class PrismaRetailerRepository implements RetailerRepository {
  constructor(private prisma: PrismaService) {}

  async create(name: string): Promise<void> { 
    try {
      await this.prisma.retailer.create({
        data: {
          name,
        },
      });
    } catch (error) { 
      if (error.code === 'P2002' && error.meta?.target?.includes('name')) { 
        throw new ConflictException('Já existe um varejista com esse nome.');
      } 
      throw error;
    }
  }
}

export { PrismaRetailerRepository };
