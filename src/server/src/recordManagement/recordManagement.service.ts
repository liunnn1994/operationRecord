import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RecordManagementInterface } from "./recordManagement.interface";
import { RecordManagement } from "./recordManagement.entity";

@Injectable()
export class RecordManagementService {
  constructor(
    @InjectRepository(RecordManagement)
    private rmRepository: Repository<RecordManagement>,
  ) {}
  create(item: RecordManagementInterface) {
    return true;
  }

  findAll(): Promise<RecordManagement[]> {
    return this.rmRepository.find();
  }

  findByPK(id: string): Promise<RecordManagement> {
    return this.rmRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.rmRepository.delete(id);
  }
}
