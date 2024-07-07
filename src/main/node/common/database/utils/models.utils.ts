
import { constants } from "@app/common/database/constants";
import { BaseModel } from "@app/common/database/model/base.model";

export class ModelUtils {
  public static isEntity<T extends BaseModel>(entity: T): boolean {
    return (
      (Object.getOwnPropertyDescriptor(entity, constants.IS_ENTITY)
        ?.value as boolean) ?? false
    );
  }

  public static setAsEntity<T extends BaseModel>(entity: T): void {
    Object.defineProperty(entity, constants.IS_ENTITY, {
      configurable: false,
      enumerable: false,
      writable: false,
      value: true,
    });
  }

  public static isModified<T extends BaseModel>(entity: T): boolean {
    return (
      (Object.getOwnPropertyDescriptor(entity, constants.IS_MODIFIED)
        ?.value as boolean) ?? false
    );
  }

  public static setModified<T extends BaseModel>(entity: T): void {
    Object.defineProperty(entity, constants.IS_MODIFIED, {
      configurable: false,
      enumerable: false,
      writable: false,
      value: true,
    });
  }

  public static wrapProxy<T extends BaseModel>(entity: T): T {
    return new Proxy<T>(entity, {
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


  public static getIds(entities: BaseModel[] | string[]): string[] {
    if (!entities || entities.length == 0) {
      return [];
    }
    return entities.map((e) =>
      ModelUtils.isEntity<BaseModel>(e as BaseModel)
        ? (e as BaseModel).id
        : (e as string),
    );
  }
}
