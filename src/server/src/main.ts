import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { WsAdapter } from "@nestjs/platform-ws";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // 初始化文档
  const swaggerOptions = new DocumentBuilder()
    .setTitle("接口文档")
    .setDescription("后端接口文档")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup("api", app, document);
  // 初始化ws
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(process.env.PORT);
}
bootstrap().then(() => {
  console.log("项目启动成功，端口：", process.env.PORT);
});
