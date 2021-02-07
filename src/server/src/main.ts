import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const swaggerOptions = new DocumentBuilder()
    .setTitle("接口文档")
    .setDescription("后端接口文档")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup("api", app, document);
  await app.listen(8990);
}
bootstrap().then(() => {
  console.log("项目启动成功，端口：", process.env);
});
