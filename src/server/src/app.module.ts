import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UploadController } from "./upload/upload.controller";
import { UploadService } from "./upload/upload.service";

@Module({
  imports: [
    ConfigModule.forRoot(
      Object.assign(
        { isGlobal: true },
        process.env.NODE_ENV === "development"
          ? { envFilePath: ".development.env" }
          : {},
      ),
    ),
  ],
  controllers: [AppController, UploadController],
  providers: [AppService, UploadService],
})
export class AppModule {}
