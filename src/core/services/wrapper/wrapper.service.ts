import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import {
  EntityManager,
  EntityTarget,
  FindOptionsOrder,
  FindOptionsWhere,
  UpdateResult,
  FindManyOptions,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class WrapperService {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  GET<T>(
    entity: EntityTarget<T>,
    options?: {
      where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
      order?: FindOptionsOrder<T>;
      relations?: string[];
      take?: number;
      skip?: number;
    },
  ): Observable<T[]> {
    const findOptions: FindManyOptions<T> = {
      ...options,
    };
    return from(this.entityManager.find(entity, findOptions));
  }

  findAll<T>(entityClass: EntityTarget<T>): Observable<T[]> {
    return from(this.entityManager.find(entityClass));
  }

  findOne<T>(
    entityTarget: EntityTarget<T>,
    where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ): Observable<T | null> {
    return from(this.entityManager.findOneBy(entityTarget, where));
  }

  query<T>(query: string, parameters: string[]): Observable<T | null> {
    return from(this.entityManager.query(query, parameters));
  }

  create<T>(entityTarget: EntityTarget<T>, body: T): Observable<T> {
    return from(this.entityManager.save(entityTarget, body));
  }

  update<T>(
    entityTarget: EntityTarget<T>,
    criteria: any,
    data: QueryDeepPartialEntity<T>,
  ): Observable<UpdateResult> {
    return from(this.entityManager.update(entityTarget, criteria, data));
  }

  delete<T>(entityTarget: EntityTarget<T>, id: string) {
    return from(this.entityManager.delete(entityTarget, id));
  }
}
