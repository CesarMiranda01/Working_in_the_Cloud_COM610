// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();

// import app from './app';
// import { connectDB } from './core/database';
// import config from './core/config';

// const startServer = async () => {
//   await connectDB();
  
//   app.listen(config.port, () => {
//     console.log(`🚀 Server running on port ${config.port}`);
//   });
// };

// startServer().catch((err) => {
//   console.error('Failed to start server:', err);
//   process.exit(1);
// });
