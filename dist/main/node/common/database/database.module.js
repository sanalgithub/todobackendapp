"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DataBaseModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseModule = void 0;
const common_1 = require("@nestjs/common");
const database_config_1 = require("./config/database.config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const class_transformer_1 = require("class-transformer");
const models_utils_1 = require("./utils/models.utils");
let DataBaseModule = DataBaseModule_1 = class DataBaseModule {
    static async forRoot() {
        return {
            module: DataBaseModule_1,
            imports: [mongoose_1.MongooseModule.forRootAsync({ useClass: database_config_1.DatabaseConfig })],
        };
    }
    static async forFeature(...entities) {
        const defenitions = DataBaseModule_1.getModelDefinitions(...entities);
        const module = mongoose_1.MongooseModule.forFeature(defenitions);
        return {
            module: DataBaseModule_1,
            imports: [module],
            exports: [module],
        };
    }
    static getModelDefinitions(...entities) {
        return entities.map((entity) => {
            const schema = mongoose_1.SchemaFactory.createForClass(entity);
            schema.set('timestamps', schema.get('timestamps') ?? {
                createdAt: 'createdAt',
                updatedAt: 'lastModifiedAt',
            });
            const toObject = {
                virtuals: true,
                versionKey: false,
                transform: (doc, ret) => {
                    delete ret._id;
                    Object.entries(ret).forEach(([key, value]) => {
                        if (value instanceof mongoose_2.default.Types.ObjectId) {
                            ret[key] = value.toString();
                            return;
                        }
                        if (Array.isArray(value) &&
                            value.some((val) => val instanceof mongoose_2.default.Types.ObjectId)) {
                            value.forEach((element, index) => {
                                if (!(element instanceof mongoose_2.default.Types.ObjectId)) {
                                    return;
                                }
                                value[index] = element.toString();
                            });
                        }
                    });
                    const instance = (0, class_transformer_1.plainToClass)(entity, ret);
                    models_utils_1.ModelUtils.setAsEntity(instance);
                    return models_utils_1.ModelUtils.wrapProxy(instance);
                },
            };
            schema.set('toJSON', schema.get('toJSON') ?? toObject);
            schema.set('toObject', schema.get('toObject') ?? toObject);
            return { name: entity.name, schema };
        });
    }
};
exports.DataBaseModule = DataBaseModule;
exports.DataBaseModule = DataBaseModule = DataBaseModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [database_config_1.DatabaseConfig],
    })
], DataBaseModule);
//# sourceMappingURL=database.module.js.map