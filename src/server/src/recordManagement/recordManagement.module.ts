import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecordManagementController } from "./recordManagement.contoller";
import { RecordManagementService } from "./recordManagement.service";
import { RecordManagement } from "./recordManagement.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RecordManagement])],
  controllers: [RecordManagementController],
  providers: [RecordManagementService],
  exports: [RecordManagementService, TypeOrmModule],
})
export class RecordManagementModule {}
