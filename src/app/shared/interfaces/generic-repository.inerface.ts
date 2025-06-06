import { BaseEntityI } from "./base-entity.interface";

export interface GenericRepository <T extends BaseEntityI<TKey >, TKey>{

    findAll (): Promise<T []>

    findById(id: TKey): Promise <T | null>

    create(entity: T): Promise<boolean>

    update(entity: T):Promise<boolean>

    delete(id: TKey):Promise<boolean>

}