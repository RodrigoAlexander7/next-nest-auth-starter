import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";
import cookieParser from "cookie-parser";

const developerDocumentation = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle("Backend documentation")
    .setDescription(
      "This API serves the endpoints required for all the functionalities of the application.",
    )
    .setVersion("1.0")
    .addTag("cats")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory());
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:4000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  if (process.env.NODE_ENV !== "production") {
    developerDocumentation(app);
  }
  app.use(cookieParser()); // so now all the routes need to have access to cookies
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error("Error during bootstrap:", err);
  process.exit(1);
});
