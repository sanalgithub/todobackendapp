"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelUtils = void 0;
const constants_1 = require("../constants");
class ModelUtils {
    static isEntity(entity) {
        return (Object.getOwnPropertyDescriptor(entity, constants_1.constants.IS_ENTITY)
            ?.value ?? false);
    }
    static setAsEntity(entity) {
        Object.defineProperty(entity, constants_1.constants.IS_ENTITY, {
            configurable: false,
            enumerable: false,
            writable: false,
            value: true,
        });
    }
    static isModified(entity) {
        return (Object.getOwnPropertyDescriptor(entity, constants_1.constants.IS_MODIFIED)
            ?.value ?? false);
    }
    static setModified(entity) {
        Object.defineProperty(entity, constants_1.constants.IS_MODIFIED, {
            configurable: false,
            enumerable: false,
            writable: false,
            value: true,
        });
    }
    static wrapProxy(entity) {
        return new Proxy(entity, {
            get: (target, property, reciever) => {
                if (property === '_id') {
                    return Reflect.get(target, 'id', reciever);
                }
                return Reflect.get(target, property, reciever);
            },
            set: (target, property, value, reciever) => {
                if (Reflect.get(target, property, reciever) !== value) {
                    this.setModified(entity);
                }
                return Reflect.set(target, property, value, reciever);
            },
        });
    }
    static getIds(entities) {
        if (!entities || entities.length == 0) {
            return [];
        }
        return entities.map((e) => ModelUtils.isEntity(e)
            ? e.id
            : e);
    }
}
exports.ModelUtils = ModelUtils;
//# sourceMappingURL=models.utils.js.map