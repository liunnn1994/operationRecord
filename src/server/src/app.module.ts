import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UploadController } from "./upload/upload.controller";
import { UploadService } from "./upload/upload.service";
import { RecordManagementController } from "./recordManagement/recordManagement.contoller";
import { RecordManagementService } from "./recordManagement/recordManagement.service";
import { RecordManagementModule } from "./recordManagement/recordManagement.module";

const { env } = process;
@Module({
  imports: [
    ConfigModule.forRoot(
      Object.assign(
        { isGlobal: true },
        env.NODE_ENV === "development"
          ? { envFilePath: ".development.env" }
          : {},
      ),
    ),
    TypeOrmModule.forRoot({
      type: env.DB_TYPE,
      host: env.DB_HOST,
      port: Number(env.DB_PORT),
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_DATABASE,
      entities: [],
      synchronize: env.DB_SYNCHRONIZE === "true",
      retryAttempts: Number(env.DB_ETRYATTEMPTS),
      retryDelay: Number(env.DB_RETRYDELAY),
      keepConnectionAlive: env.DB_KEEPCONNECTUINALIVE === "true",
      autoLoadEntities: true,
    } as TypeOrmModuleOptions),
    RecordManagementModule,
  ],
  controllers: [AppController, UploadController, RecordManagementController],
  providers: [AppService, UploadService, RecordManagementService],
})
export class AppModule {}
