import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix("v1");
  app.enableCors(process.env.CORS ? JSON.parse(process.env.CORS) : {});
  app.useStaticAssets(join(__dirname, "..", "public"), {
    prefix: "/static",
  });

  const options = new DocumentBuilder()
    .setTitle("接口文档")
    .setDescription("后端接口")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
  await app.listen(process.env.PORT);
}
bootstrap().then(() => {
  console.log(
    new Date().toLocaleString(),
    "项目启动成功，端口：",
    process.env.PORT,
  );
});
