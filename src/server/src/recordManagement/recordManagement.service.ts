import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Connection } from "typeorm";
import { RecordManagementInterface } from "./recordManagement.interface";
import { RecordManagement } from "./recordManagement.entity";
import { DatabaseResInf } from "../lib/globalInterface";

@Injectable()
export class RecordManagementService {
  constructor(
    @InjectRepository(RecordManagement)
    private rmRepository: Repository<RecordManagement>,
    private readonly connection: Connection,
  ) {}
  async create(item: RecordManagementInterface): Promise<DatabaseResInf> {
    const newItem = new RecordManagement();
    newItem.name = item.name;
    newItem.path = item.path;
    newItem.mimetype = item.mimetype;
    newItem.size = item.size;
    newItem.logs = item.logs;
    newItem.originalname = item.originalname;
    newItem.encoding = item.encoding;
    try {
      await this.connection.manager.save(newItem);
      return { success: true, message: "创建成功", data: newItem };
    } catch (e) {
      return { success: false, message: "创建失败", data: newItem, error: e };
    }
  }

  findAll(): Promise<RecordManagement[]> {
    return this.rmRepository.find();
  }

  async findByPK(id: string): Promise<DatabaseResInf> {
    const item = await this.rmRepository.findOne(id);

    if (item !== undefined) {
      return { success: true, message: "查找成功", data: item };
    }
    return { success: false, message: `ID：${id} 不存在` };
  }

  async remove(id: string): Promise<void> {
    await this.rmRepository.delete(id);
  }
}
