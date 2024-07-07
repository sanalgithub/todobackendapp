import { Global, Module } from "@nestjs/common";
import { DataBaseModule } from "@app/common/database/database.module";


@Global()
@Module({
  imports: [DataBaseModule.forRoot()],
  exports: [],
})
export class CommonModule {}
