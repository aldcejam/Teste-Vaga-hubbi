import { PrismaService } from "@/infra/database/prisma.service";
import { RetailerRepository } from "./RetailerRepository";
import { Injectable } from "@nestjs/common";
import { Retailer } from "@prisma/client";
import { v4 as uuidV4 } from 'uuid';

@Injectable()
class PrismaRetailerRepository implements RetailerRepository {
  constructor(private prisma: PrismaService) { }

  async create(name: string): Promise<Retailer> {
    const ratailer = await this.prisma.retailer.create({
      data: { 
        id: uuidV4(),
        name,
      },
    });

    return ratailer;
  }
  async findByName(name: string): Promise<Retailer | null> {
    const retailer = await this.prisma.retailer.findFirst({
      where: {
        name
      }
    });

    return retailer;
  }
}

export { PrismaRetailerRepository };
