
/**
 * Client
**/

import * as runtime from './runtime/binary.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>
/**
 * Model TrainingPlan
 * 
 */
export type TrainingPlan = $Result.DefaultSelection<Prisma.$TrainingPlanPayload>
/**
 * Model TrainingSession
 * 
 */
export type TrainingSession = $Result.DefaultSelection<Prisma.$TrainingSessionPayload>
/**
 * Model ExerciseLog
 * 
 */
export type ExerciseLog = $Result.DefaultSelection<Prisma.$ExerciseLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => $Utils.JsPromise<void> : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trainingPlan`: Exposes CRUD operations for the **TrainingPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrainingPlans
    * const trainingPlans = await prisma.trainingPlan.findMany()
    * ```
    */
  get trainingPlan(): Prisma.TrainingPlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trainingSession`: Exposes CRUD operations for the **TrainingSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrainingSessions
    * const trainingSessions = await prisma.trainingSession.findMany()
    * ```
    */
  get trainingSession(): Prisma.TrainingSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.exerciseLog`: Exposes CRUD operations for the **ExerciseLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExerciseLogs
    * const exerciseLogs = await prisma.exerciseLog.findMany()
    * ```
    */
  get exerciseLog(): Prisma.ExerciseLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Profile: 'Profile',
    TrainingPlan: 'TrainingPlan',
    TrainingSession: 'TrainingSession',
    ExerciseLog: 'ExerciseLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "profile" | "trainingPlan" | "trainingSession" | "exerciseLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      TrainingPlan: {
        payload: Prisma.$TrainingPlanPayload<ExtArgs>
        fields: Prisma.TrainingPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrainingPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrainingPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>
          }
          findFirst: {
            args: Prisma.TrainingPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrainingPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>
          }
          findMany: {
            args: Prisma.TrainingPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>[]
          }
          create: {
            args: Prisma.TrainingPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>
          }
          createMany: {
            args: Prisma.TrainingPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrainingPlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>[]
          }
          delete: {
            args: Prisma.TrainingPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>
          }
          update: {
            args: Prisma.TrainingPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>
          }
          deleteMany: {
            args: Prisma.TrainingPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrainingPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrainingPlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>[]
          }
          upsert: {
            args: Prisma.TrainingPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>
          }
          aggregate: {
            args: Prisma.TrainingPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrainingPlan>
          }
          groupBy: {
            args: Prisma.TrainingPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrainingPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrainingPlanCountArgs<ExtArgs>
            result: $Utils.Optional<TrainingPlanCountAggregateOutputType> | number
          }
        }
      }
      TrainingSession: {
        payload: Prisma.$TrainingSessionPayload<ExtArgs>
        fields: Prisma.TrainingSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrainingSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrainingSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingSessionPayload>
          }
          findFirst: {
            args: Prisma.TrainingSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrainingSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingSessionPayload>
          }
          findMany: {
            args: Prisma.TrainingSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingSessionPayload>[]
          }
          create: {
            args: Prisma.TrainingSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingSessionPayload>
          }
          createMany: {
            args: Prisma.TrainingSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrainingSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingSessionPayload>[]
          }
          delete: {
            args: Prisma.TrainingSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingSessionPayload>
          }
          update: {
            args: Prisma.TrainingSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingSessionPayload>
          }
          deleteMany: {
            args: Prisma.TrainingSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrainingSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrainingSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingSessionPayload>[]
          }
          upsert: {
            args: Prisma.TrainingSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingSessionPayload>
          }
          aggregate: {
            args: Prisma.TrainingSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrainingSession>
          }
          groupBy: {
            args: Prisma.TrainingSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrainingSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrainingSessionCountArgs<ExtArgs>
            result: $Utils.Optional<TrainingSessionCountAggregateOutputType> | number
          }
        }
      }
      ExerciseLog: {
        payload: Prisma.$ExerciseLogPayload<ExtArgs>
        fields: Prisma.ExerciseLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExerciseLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExerciseLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseLogPayload>
          }
          findFirst: {
            args: Prisma.ExerciseLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExerciseLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseLogPayload>
          }
          findMany: {
            args: Prisma.ExerciseLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseLogPayload>[]
          }
          create: {
            args: Prisma.ExerciseLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseLogPayload>
          }
          createMany: {
            args: Prisma.ExerciseLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExerciseLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseLogPayload>[]
          }
          delete: {
            args: Prisma.ExerciseLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseLogPayload>
          }
          update: {
            args: Prisma.ExerciseLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseLogPayload>
          }
          deleteMany: {
            args: Prisma.ExerciseLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExerciseLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExerciseLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseLogPayload>[]
          }
          upsert: {
            args: Prisma.ExerciseLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExerciseLogPayload>
          }
          aggregate: {
            args: Prisma.ExerciseLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExerciseLog>
          }
          groupBy: {
            args: Prisma.ExerciseLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExerciseLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExerciseLogCountArgs<ExtArgs>
            result: $Utils.Optional<ExerciseLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    profile?: ProfileOmit
    trainingPlan?: TrainingPlanOmit
    trainingSession?: TrainingSessionOmit
    exerciseLog?: ExerciseLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    trainingPlans: number
    trainingSessions: number
    exerciseLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingPlans?: boolean | UserCountOutputTypeCountTrainingPlansArgs
    trainingSessions?: boolean | UserCountOutputTypeCountTrainingSessionsArgs
    exerciseLogs?: boolean | UserCountOutputTypeCountExerciseLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTrainingPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingPlanWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTrainingSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingSessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountExerciseLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExerciseLogWhereInput
  }


  /**
   * Count Type TrainingPlanCountOutputType
   */

  export type TrainingPlanCountOutputType = {
    trainingSessions: number
  }

  export type TrainingPlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingSessions?: boolean | TrainingPlanCountOutputTypeCountTrainingSessionsArgs
  }

  // Custom InputTypes
  /**
   * TrainingPlanCountOutputType without action
   */
  export type TrainingPlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanCountOutputType
     */
    select?: TrainingPlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TrainingPlanCountOutputType without action
   */
  export type TrainingPlanCountOutputTypeCountTrainingSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingSessionWhereInput
  }


  /**
   * Count Type TrainingSessionCountOutputType
   */

  export type TrainingSessionCountOutputType = {
    exerciseLogs: number
  }

  export type TrainingSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exerciseLogs?: boolean | TrainingSessionCountOutputTypeCountExerciseLogsArgs
  }

  // Custom InputTypes
  /**
   * TrainingSessionCountOutputType without action
   */
  export type TrainingSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingSessionCountOutputType
     */
    select?: TrainingSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TrainingSessionCountOutputType without action
   */
  export type TrainingSessionCountOutputTypeCountExerciseLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExerciseLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    age: number | null
    weight: number | null
    height: number | null
  }

  export type UserSumAggregateOutputType = {
    age: number | null
    weight: number | null
    height: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    age: number | null
    weight: number | null
    height: number | null
    experience: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    age: number | null
    weight: number | null
    height: number | null
    experience: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    firstName: number
    lastName: number
    age: number
    weight: number
    height: number
    experience: number
    availability: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    age?: true
    weight?: true
    height?: true
  }

  export type UserSumAggregateInputType = {
    age?: true
    weight?: true
    height?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    age?: true
    weight?: true
    height?: true
    experience?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    age?: true
    weight?: true
    height?: true
    experience?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    age?: true
    weight?: true
    height?: true
    experience?: true
    availability?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    firstName: string
    lastName: string
    age: number | null
    weight: number | null
    height: number | null
    experience: string | null
    availability: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    age?: boolean
    weight?: boolean
    height?: boolean
    experience?: boolean
    availability?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | User$profileArgs<ExtArgs>
    trainingPlans?: boolean | User$trainingPlansArgs<ExtArgs>
    trainingSessions?: boolean | User$trainingSessionsArgs<ExtArgs>
    exerciseLogs?: boolean | User$exerciseLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    age?: boolean
    weight?: boolean
    height?: boolean
    experience?: boolean
    availability?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    age?: boolean
    weight?: boolean
    height?: boolean
    experience?: boolean
    availability?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    age?: boolean
    weight?: boolean
    height?: boolean
    experience?: boolean
    availability?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "firstName" | "lastName" | "age" | "weight" | "height" | "experience" | "availability" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | User$profileArgs<ExtArgs>
    trainingPlans?: boolean | User$trainingPlansArgs<ExtArgs>
    trainingSessions?: boolean | User$trainingSessionsArgs<ExtArgs>
    exerciseLogs?: boolean | User$exerciseLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs> | null
      trainingPlans: Prisma.$TrainingPlanPayload<ExtArgs>[]
      trainingSessions: Prisma.$TrainingSessionPayload<ExtArgs>[]
      exerciseLogs: Prisma.$ExerciseLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      firstName: string
      lastName: string
      age: number | null
      weight: number | null
      height: number | null
      experience: string | null
      availability: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends User$profileArgs<ExtArgs> = {}>(args?: Subset<T, User$profileArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    trainingPlans<T extends User$trainingPlansArgs<ExtArgs> = {}>(args?: Subset<T, User$trainingPlansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    trainingSessions<T extends User$trainingSessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$trainingSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    exerciseLogs<T extends User$exerciseLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$exerciseLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExerciseLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly age: FieldRef<"User", 'Int'>
    readonly weight: FieldRef<"User", 'Float'>
    readonly height: FieldRef<"User", 'Float'>
    readonly experience: FieldRef<"User", 'String'>
    readonly availability: FieldRef<"User", 'Json'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.profile
   */
  export type User$profileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    where?: ProfileWhereInput
  }

  /**
   * User.trainingPlans
   */
  export type User$trainingPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    where?: TrainingPlanWhereInput
    orderBy?: TrainingPlanOrderByWithRelationInput | TrainingPlanOrderByWithRelationInput[]
    cursor?: TrainingPlanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrainingPlanScalarFieldEnum | TrainingPlanScalarFieldEnum[]
  }

  /**
   * User.trainingSessions
   */
  export type User$trainingSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingSession
     */
    select?: TrainingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingSession
     */
    omit?: TrainingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingSessionInclude<ExtArgs> | null
    where?: TrainingSessionWhereInput
    orderBy?: TrainingSessionOrderByWithRelationInput | TrainingSessionOrderByWithRelationInput[]
    cursor?: TrainingSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrainingSessionScalarFieldEnum | TrainingSessionScalarFieldEnum[]
  }

  /**
   * User.exerciseLogs
   */
  export type User$exerciseLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseLog
     */
    select?: ExerciseLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseLog
     */
    omit?: ExerciseLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseLogInclude<ExtArgs> | null
    where?: ExerciseLogWhereInput
    orderBy?: ExerciseLogOrderByWithRelationInput | ExerciseLogOrderByWithRelationInput[]
    cursor?: ExerciseLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExerciseLogScalarFieldEnum | ExerciseLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    fitnessLevel: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    fitnessLevel: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    userId: number
    fitnessLevel: number
    fitnessGoals: number
    medicalIssues: number
    availableEquipment: number
    trainingPreferences: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfileMinAggregateInputType = {
    id?: true
    userId?: true
    fitnessLevel?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    fitnessLevel?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    userId?: true
    fitnessLevel?: true
    fitnessGoals?: true
    medicalIssues?: true
    availableEquipment?: true
    trainingPreferences?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: string
    userId: string
    fitnessLevel: string | null
    fitnessGoals: string[]
    medicalIssues: string[]
    availableEquipment: string[]
    trainingPreferences: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fitnessLevel?: boolean
    fitnessGoals?: boolean
    medicalIssues?: boolean
    availableEquipment?: boolean
    trainingPreferences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fitnessLevel?: boolean
    fitnessGoals?: boolean
    medicalIssues?: boolean
    availableEquipment?: boolean
    trainingPreferences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fitnessLevel?: boolean
    fitnessGoals?: boolean
    medicalIssues?: boolean
    availableEquipment?: boolean
    trainingPreferences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    fitnessLevel?: boolean
    fitnessGoals?: boolean
    medicalIssues?: boolean
    availableEquipment?: boolean
    trainingPreferences?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "fitnessLevel" | "fitnessGoals" | "medicalIssues" | "availableEquipment" | "trainingPreferences" | "createdAt" | "updatedAt", ExtArgs["result"]["profile"]>
  export type ProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      fitnessLevel: string | null
      fitnessGoals: string[]
      medicalIssues: string[]
      availableEquipment: string[]
      trainingPreferences: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profiles and returns the data saved in the database.
     * @param {ProfileCreateManyAndReturnArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles and returns the data updated in the database.
     * @param {ProfileUpdateManyAndReturnArgs} args - Arguments to update many Profiles.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'String'>
    readonly userId: FieldRef<"Profile", 'String'>
    readonly fitnessLevel: FieldRef<"Profile", 'String'>
    readonly fitnessGoals: FieldRef<"Profile", 'String[]'>
    readonly medicalIssues: FieldRef<"Profile", 'String[]'>
    readonly availableEquipment: FieldRef<"Profile", 'String[]'>
    readonly trainingPreferences: FieldRef<"Profile", 'Json'>
    readonly createdAt: FieldRef<"Profile", 'DateTime'>
    readonly updatedAt: FieldRef<"Profile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile createManyAndReturn
   */
  export type ProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile updateManyAndReturn
   */
  export type ProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to delete.
     */
    limit?: number
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
  }


  /**
   * Model TrainingPlan
   */

  export type AggregateTrainingPlan = {
    _count: TrainingPlanCountAggregateOutputType | null
    _min: TrainingPlanMinAggregateOutputType | null
    _max: TrainingPlanMaxAggregateOutputType | null
  }

  export type TrainingPlanMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
    generatedBy: string | null
  }

  export type TrainingPlanMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
    generatedBy: string | null
  }

  export type TrainingPlanCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    description: number
    createdAt: number
    updatedAt: number
    isActive: number
    generatedBy: number
    _all: number
  }


  export type TrainingPlanMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    generatedBy?: true
  }

  export type TrainingPlanMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    generatedBy?: true
  }

  export type TrainingPlanCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    generatedBy?: true
    _all?: true
  }

  export type TrainingPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainingPlan to aggregate.
     */
    where?: TrainingPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingPlans to fetch.
     */
    orderBy?: TrainingPlanOrderByWithRelationInput | TrainingPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrainingPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrainingPlans
    **/
    _count?: true | TrainingPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrainingPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrainingPlanMaxAggregateInputType
  }

  export type GetTrainingPlanAggregateType<T extends TrainingPlanAggregateArgs> = {
        [P in keyof T & keyof AggregateTrainingPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrainingPlan[P]>
      : GetScalarType<T[P], AggregateTrainingPlan[P]>
  }




  export type TrainingPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingPlanWhereInput
    orderBy?: TrainingPlanOrderByWithAggregationInput | TrainingPlanOrderByWithAggregationInput[]
    by: TrainingPlanScalarFieldEnum[] | TrainingPlanScalarFieldEnum
    having?: TrainingPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrainingPlanCountAggregateInputType | true
    _min?: TrainingPlanMinAggregateInputType
    _max?: TrainingPlanMaxAggregateInputType
  }

  export type TrainingPlanGroupByOutputType = {
    id: string
    userId: string
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    isActive: boolean
    generatedBy: string
    _count: TrainingPlanCountAggregateOutputType | null
    _min: TrainingPlanMinAggregateOutputType | null
    _max: TrainingPlanMaxAggregateOutputType | null
  }

  type GetTrainingPlanGroupByPayload<T extends TrainingPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrainingPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrainingPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrainingPlanGroupByOutputType[P]>
            : GetScalarType<T[P], TrainingPlanGroupByOutputType[P]>
        }
      >
    >


  export type TrainingPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    generatedBy?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    trainingSessions?: boolean | TrainingPlan$trainingSessionsArgs<ExtArgs>
    _count?: boolean | TrainingPlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingPlan"]>

  export type TrainingPlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    generatedBy?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingPlan"]>

  export type TrainingPlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    generatedBy?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingPlan"]>

  export type TrainingPlanSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    generatedBy?: boolean
  }

  export type TrainingPlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "description" | "createdAt" | "updatedAt" | "isActive" | "generatedBy", ExtArgs["result"]["trainingPlan"]>
  export type TrainingPlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    trainingSessions?: boolean | TrainingPlan$trainingSessionsArgs<ExtArgs>
    _count?: boolean | TrainingPlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TrainingPlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TrainingPlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TrainingPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrainingPlan"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      trainingSessions: Prisma.$TrainingSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      description: string | null
      createdAt: Date
      updatedAt: Date
      isActive: boolean
      generatedBy: string
    }, ExtArgs["result"]["trainingPlan"]>
    composites: {}
  }

  type TrainingPlanGetPayload<S extends boolean | null | undefined | TrainingPlanDefaultArgs> = $Result.GetResult<Prisma.$TrainingPlanPayload, S>

  type TrainingPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrainingPlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrainingPlanCountAggregateInputType | true
    }

  export interface TrainingPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrainingPlan'], meta: { name: 'TrainingPlan' } }
    /**
     * Find zero or one TrainingPlan that matches the filter.
     * @param {TrainingPlanFindUniqueArgs} args - Arguments to find a TrainingPlan
     * @example
     * // Get one TrainingPlan
     * const trainingPlan = await prisma.trainingPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrainingPlanFindUniqueArgs>(args: SelectSubset<T, TrainingPlanFindUniqueArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrainingPlan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrainingPlanFindUniqueOrThrowArgs} args - Arguments to find a TrainingPlan
     * @example
     * // Get one TrainingPlan
     * const trainingPlan = await prisma.trainingPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrainingPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, TrainingPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainingPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanFindFirstArgs} args - Arguments to find a TrainingPlan
     * @example
     * // Get one TrainingPlan
     * const trainingPlan = await prisma.trainingPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrainingPlanFindFirstArgs>(args?: SelectSubset<T, TrainingPlanFindFirstArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainingPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanFindFirstOrThrowArgs} args - Arguments to find a TrainingPlan
     * @example
     * // Get one TrainingPlan
     * const trainingPlan = await prisma.trainingPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrainingPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, TrainingPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrainingPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrainingPlans
     * const trainingPlans = await prisma.trainingPlan.findMany()
     * 
     * // Get first 10 TrainingPlans
     * const trainingPlans = await prisma.trainingPlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trainingPlanWithIdOnly = await prisma.trainingPlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrainingPlanFindManyArgs>(args?: SelectSubset<T, TrainingPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrainingPlan.
     * @param {TrainingPlanCreateArgs} args - Arguments to create a TrainingPlan.
     * @example
     * // Create one TrainingPlan
     * const TrainingPlan = await prisma.trainingPlan.create({
     *   data: {
     *     // ... data to create a TrainingPlan
     *   }
     * })
     * 
     */
    create<T extends TrainingPlanCreateArgs>(args: SelectSubset<T, TrainingPlanCreateArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrainingPlans.
     * @param {TrainingPlanCreateManyArgs} args - Arguments to create many TrainingPlans.
     * @example
     * // Create many TrainingPlans
     * const trainingPlan = await prisma.trainingPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrainingPlanCreateManyArgs>(args?: SelectSubset<T, TrainingPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TrainingPlans and returns the data saved in the database.
     * @param {TrainingPlanCreateManyAndReturnArgs} args - Arguments to create many TrainingPlans.
     * @example
     * // Create many TrainingPlans
     * const trainingPlan = await prisma.trainingPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TrainingPlans and only return the `id`
     * const trainingPlanWithIdOnly = await prisma.trainingPlan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrainingPlanCreateManyAndReturnArgs>(args?: SelectSubset<T, TrainingPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TrainingPlan.
     * @param {TrainingPlanDeleteArgs} args - Arguments to delete one TrainingPlan.
     * @example
     * // Delete one TrainingPlan
     * const TrainingPlan = await prisma.trainingPlan.delete({
     *   where: {
     *     // ... filter to delete one TrainingPlan
     *   }
     * })
     * 
     */
    delete<T extends TrainingPlanDeleteArgs>(args: SelectSubset<T, TrainingPlanDeleteArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrainingPlan.
     * @param {TrainingPlanUpdateArgs} args - Arguments to update one TrainingPlan.
     * @example
     * // Update one TrainingPlan
     * const trainingPlan = await prisma.trainingPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrainingPlanUpdateArgs>(args: SelectSubset<T, TrainingPlanUpdateArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrainingPlans.
     * @param {TrainingPlanDeleteManyArgs} args - Arguments to filter TrainingPlans to delete.
     * @example
     * // Delete a few TrainingPlans
     * const { count } = await prisma.trainingPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrainingPlanDeleteManyArgs>(args?: SelectSubset<T, TrainingPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainingPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrainingPlans
     * const trainingPlan = await prisma.trainingPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrainingPlanUpdateManyArgs>(args: SelectSubset<T, TrainingPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainingPlans and returns the data updated in the database.
     * @param {TrainingPlanUpdateManyAndReturnArgs} args - Arguments to update many TrainingPlans.
     * @example
     * // Update many TrainingPlans
     * const trainingPlan = await prisma.trainingPlan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TrainingPlans and only return the `id`
     * const trainingPlanWithIdOnly = await prisma.trainingPlan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrainingPlanUpdateManyAndReturnArgs>(args: SelectSubset<T, TrainingPlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TrainingPlan.
     * @param {TrainingPlanUpsertArgs} args - Arguments to update or create a TrainingPlan.
     * @example
     * // Update or create a TrainingPlan
     * const trainingPlan = await prisma.trainingPlan.upsert({
     *   create: {
     *     // ... data to create a TrainingPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrainingPlan we want to update
     *   }
     * })
     */
    upsert<T extends TrainingPlanUpsertArgs>(args: SelectSubset<T, TrainingPlanUpsertArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TrainingPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanCountArgs} args - Arguments to filter TrainingPlans to count.
     * @example
     * // Count the number of TrainingPlans
     * const count = await prisma.trainingPlan.count({
     *   where: {
     *     // ... the filter for the TrainingPlans we want to count
     *   }
     * })
    **/
    count<T extends TrainingPlanCountArgs>(
      args?: Subset<T, TrainingPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrainingPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrainingPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrainingPlanAggregateArgs>(args: Subset<T, TrainingPlanAggregateArgs>): Prisma.PrismaPromise<GetTrainingPlanAggregateType<T>>

    /**
     * Group by TrainingPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrainingPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrainingPlanGroupByArgs['orderBy'] }
        : { orderBy?: TrainingPlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrainingPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrainingPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrainingPlan model
   */
  readonly fields: TrainingPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrainingPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrainingPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    trainingSessions<T extends TrainingPlan$trainingSessionsArgs<ExtArgs> = {}>(args?: Subset<T, TrainingPlan$trainingSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TrainingPlan model
   */
  interface TrainingPlanFieldRefs {
    readonly id: FieldRef<"TrainingPlan", 'String'>
    readonly userId: FieldRef<"TrainingPlan", 'String'>
    readonly name: FieldRef<"TrainingPlan", 'String'>
    readonly description: FieldRef<"TrainingPlan", 'String'>
    readonly createdAt: FieldRef<"TrainingPlan", 'DateTime'>
    readonly updatedAt: FieldRef<"TrainingPlan", 'DateTime'>
    readonly isActive: FieldRef<"TrainingPlan", 'Boolean'>
    readonly generatedBy: FieldRef<"TrainingPlan", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TrainingPlan findUnique
   */
  export type TrainingPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlan to fetch.
     */
    where: TrainingPlanWhereUniqueInput
  }

  /**
   * TrainingPlan findUniqueOrThrow
   */
  export type TrainingPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlan to fetch.
     */
    where: TrainingPlanWhereUniqueInput
  }

  /**
   * TrainingPlan findFirst
   */
  export type TrainingPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlan to fetch.
     */
    where?: TrainingPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingPlans to fetch.
     */
    orderBy?: TrainingPlanOrderByWithRelationInput | TrainingPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainingPlans.
     */
    cursor?: TrainingPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingPlans.
     */
    distinct?: TrainingPlanScalarFieldEnum | TrainingPlanScalarFieldEnum[]
  }

  /**
   * TrainingPlan findFirstOrThrow
   */
  export type TrainingPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlan to fetch.
     */
    where?: TrainingPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingPlans to fetch.
     */
    orderBy?: TrainingPlanOrderByWithRelationInput | TrainingPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainingPlans.
     */
    cursor?: TrainingPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingPlans.
     */
    distinct?: TrainingPlanScalarFieldEnum | TrainingPlanScalarFieldEnum[]
  }

  /**
   * TrainingPlan findMany
   */
  export type TrainingPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlans to fetch.
     */
    where?: TrainingPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingPlans to fetch.
     */
    orderBy?: TrainingPlanOrderByWithRelationInput | TrainingPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrainingPlans.
     */
    cursor?: TrainingPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingPlans.
     */
    skip?: number
    distinct?: TrainingPlanScalarFieldEnum | TrainingPlanScalarFieldEnum[]
  }

  /**
   * TrainingPlan create
   */
  export type TrainingPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * The data needed to create a TrainingPlan.
     */
    data: XOR<TrainingPlanCreateInput, TrainingPlanUncheckedCreateInput>
  }

  /**
   * TrainingPlan createMany
   */
  export type TrainingPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrainingPlans.
     */
    data: TrainingPlanCreateManyInput | TrainingPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrainingPlan createManyAndReturn
   */
  export type TrainingPlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * The data used to create many TrainingPlans.
     */
    data: TrainingPlanCreateManyInput | TrainingPlanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainingPlan update
   */
  export type TrainingPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * The data needed to update a TrainingPlan.
     */
    data: XOR<TrainingPlanUpdateInput, TrainingPlanUncheckedUpdateInput>
    /**
     * Choose, which TrainingPlan to update.
     */
    where: TrainingPlanWhereUniqueInput
  }

  /**
   * TrainingPlan updateMany
   */
  export type TrainingPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrainingPlans.
     */
    data: XOR<TrainingPlanUpdateManyMutationInput, TrainingPlanUncheckedUpdateManyInput>
    /**
     * Filter which TrainingPlans to update
     */
    where?: TrainingPlanWhereInput
    /**
     * Limit how many TrainingPlans to update.
     */
    limit?: number
  }

  /**
   * TrainingPlan updateManyAndReturn
   */
  export type TrainingPlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * The data used to update TrainingPlans.
     */
    data: XOR<TrainingPlanUpdateManyMutationInput, TrainingPlanUncheckedUpdateManyInput>
    /**
     * Filter which TrainingPlans to update
     */
    where?: TrainingPlanWhereInput
    /**
     * Limit how many TrainingPlans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainingPlan upsert
   */
  export type TrainingPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * The filter to search for the TrainingPlan to update in case it exists.
     */
    where: TrainingPlanWhereUniqueInput
    /**
     * In case the TrainingPlan found by the `where` argument doesn't exist, create a new TrainingPlan with this data.
     */
    create: XOR<TrainingPlanCreateInput, TrainingPlanUncheckedCreateInput>
    /**
     * In case the TrainingPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrainingPlanUpdateInput, TrainingPlanUncheckedUpdateInput>
  }

  /**
   * TrainingPlan delete
   */
  export type TrainingPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * Filter which TrainingPlan to delete.
     */
    where: TrainingPlanWhereUniqueInput
  }

  /**
   * TrainingPlan deleteMany
   */
  export type TrainingPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainingPlans to delete
     */
    where?: TrainingPlanWhereInput
    /**
     * Limit how many TrainingPlans to delete.
     */
    limit?: number
  }

  /**
   * TrainingPlan.trainingSessions
   */
  export type TrainingPlan$trainingSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingSession
     */
    select?: TrainingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingSession
     */
    omit?: TrainingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingSessionInclude<ExtArgs> | null
    where?: TrainingSessionWhereInput
    orderBy?: TrainingSessionOrderByWithRelationInput | TrainingSessionOrderByWithRelationInput[]
    cursor?: TrainingSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrainingSessionScalarFieldEnum | TrainingSessionScalarFieldEnum[]
  }

  /**
   * TrainingPlan without action
   */
  export type TrainingPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
  }


  /**
   * Model TrainingSession
   */

  export type AggregateTrainingSession = {
    _count: TrainingSessionCountAggregateOutputType | null
    _avg: TrainingSessionAvgAggregateOutputType | null
    _sum: TrainingSessionSumAggregateOutputType | null
    _min: TrainingSessionMinAggregateOutputType | null
    _max: TrainingSessionMaxAggregateOutputType | null
  }

  export type TrainingSessionAvgAggregateOutputType = {
    dayOfWeek: number | null
  }

  export type TrainingSessionSumAggregateOutputType = {
    dayOfWeek: number | null
  }

  export type TrainingSessionMinAggregateOutputType = {
    id: string | null
    trainingPlanId: string | null
    userId: string | null
    dayOfWeek: number | null
    feedback: string | null
    completed: boolean | null
    scheduledDate: Date | null
    completedDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrainingSessionMaxAggregateOutputType = {
    id: string | null
    trainingPlanId: string | null
    userId: string | null
    dayOfWeek: number | null
    feedback: string | null
    completed: boolean | null
    scheduledDate: Date | null
    completedDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrainingSessionCountAggregateOutputType = {
    id: number
    trainingPlanId: number
    userId: number
    dayOfWeek: number
    feedback: number
    completed: number
    scheduledDate: number
    completedDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TrainingSessionAvgAggregateInputType = {
    dayOfWeek?: true
  }

  export type TrainingSessionSumAggregateInputType = {
    dayOfWeek?: true
  }

  export type TrainingSessionMinAggregateInputType = {
    id?: true
    trainingPlanId?: true
    userId?: true
    dayOfWeek?: true
    feedback?: true
    completed?: true
    scheduledDate?: true
    completedDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrainingSessionMaxAggregateInputType = {
    id?: true
    trainingPlanId?: true
    userId?: true
    dayOfWeek?: true
    feedback?: true
    completed?: true
    scheduledDate?: true
    completedDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrainingSessionCountAggregateInputType = {
    id?: true
    trainingPlanId?: true
    userId?: true
    dayOfWeek?: true
    feedback?: true
    completed?: true
    scheduledDate?: true
    completedDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TrainingSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainingSession to aggregate.
     */
    where?: TrainingSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingSessions to fetch.
     */
    orderBy?: TrainingSessionOrderByWithRelationInput | TrainingSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrainingSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrainingSessions
    **/
    _count?: true | TrainingSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TrainingSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TrainingSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrainingSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrainingSessionMaxAggregateInputType
  }

  export type GetTrainingSessionAggregateType<T extends TrainingSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateTrainingSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrainingSession[P]>
      : GetScalarType<T[P], AggregateTrainingSession[P]>
  }




  export type TrainingSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingSessionWhereInput
    orderBy?: TrainingSessionOrderByWithAggregationInput | TrainingSessionOrderByWithAggregationInput[]
    by: TrainingSessionScalarFieldEnum[] | TrainingSessionScalarFieldEnum
    having?: TrainingSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrainingSessionCountAggregateInputType | true
    _avg?: TrainingSessionAvgAggregateInputType
    _sum?: TrainingSessionSumAggregateInputType
    _min?: TrainingSessionMinAggregateInputType
    _max?: TrainingSessionMaxAggregateInputType
  }

  export type TrainingSessionGroupByOutputType = {
    id: string
    trainingPlanId: string
    userId: string
    dayOfWeek: number
    feedback: string | null
    completed: boolean
    scheduledDate: Date | null
    completedDate: Date | null
    createdAt: Date
    updatedAt: Date
    _count: TrainingSessionCountAggregateOutputType | null
    _avg: TrainingSessionAvgAggregateOutputType | null
    _sum: TrainingSessionSumAggregateOutputType | null
    _min: TrainingSessionMinAggregateOutputType | null
    _max: TrainingSessionMaxAggregateOutputType | null
  }

  type GetTrainingSessionGroupByPayload<T extends TrainingSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrainingSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrainingSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrainingSessionGroupByOutputType[P]>
            : GetScalarType<T[P], TrainingSessionGroupByOutputType[P]>
        }
      >
    >


  export type TrainingSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainingPlanId?: boolean
    userId?: boolean
    dayOfWeek?: boolean
    feedback?: boolean
    completed?: boolean
    scheduledDate?: boolean
    completedDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trainingPlan?: boolean | TrainingPlanDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    exerciseLogs?: boolean | TrainingSession$exerciseLogsArgs<ExtArgs>
    _count?: boolean | TrainingSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingSession"]>

  export type TrainingSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainingPlanId?: boolean
    userId?: boolean
    dayOfWeek?: boolean
    feedback?: boolean
    completed?: boolean
    scheduledDate?: boolean
    completedDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trainingPlan?: boolean | TrainingPlanDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingSession"]>

  export type TrainingSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainingPlanId?: boolean
    userId?: boolean
    dayOfWeek?: boolean
    feedback?: boolean
    completed?: boolean
    scheduledDate?: boolean
    completedDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trainingPlan?: boolean | TrainingPlanDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingSession"]>

  export type TrainingSessionSelectScalar = {
    id?: boolean
    trainingPlanId?: boolean
    userId?: boolean
    dayOfWeek?: boolean
    feedback?: boolean
    completed?: boolean
    scheduledDate?: boolean
    completedDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TrainingSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "trainingPlanId" | "userId" | "dayOfWeek" | "feedback" | "completed" | "scheduledDate" | "completedDate" | "createdAt" | "updatedAt", ExtArgs["result"]["trainingSession"]>
  export type TrainingSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingPlan?: boolean | TrainingPlanDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    exerciseLogs?: boolean | TrainingSession$exerciseLogsArgs<ExtArgs>
    _count?: boolean | TrainingSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TrainingSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingPlan?: boolean | TrainingPlanDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TrainingSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingPlan?: boolean | TrainingPlanDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TrainingSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrainingSession"
    objects: {
      trainingPlan: Prisma.$TrainingPlanPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      exerciseLogs: Prisma.$ExerciseLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      trainingPlanId: string
      userId: string
      dayOfWeek: number
      feedback: string | null
      completed: boolean
      scheduledDate: Date | null
      completedDate: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["trainingSession"]>
    composites: {}
  }

  type TrainingSessionGetPayload<S extends boolean | null | undefined | TrainingSessionDefaultArgs> = $Result.GetResult<Prisma.$TrainingSessionPayload, S>

  type TrainingSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrainingSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrainingSessionCountAggregateInputType | true
    }

  export interface TrainingSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrainingSession'], meta: { name: 'TrainingSession' } }
    /**
     * Find zero or one TrainingSession that matches the filter.
     * @param {TrainingSessionFindUniqueArgs} args - Arguments to find a TrainingSession
     * @example
     * // Get one TrainingSession
     * const trainingSession = await prisma.trainingSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrainingSessionFindUniqueArgs>(args: SelectSubset<T, TrainingSessionFindUniqueArgs<ExtArgs>>): Prisma__TrainingSessionClient<$Result.GetResult<Prisma.$TrainingSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrainingSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrainingSessionFindUniqueOrThrowArgs} args - Arguments to find a TrainingSession
     * @example
     * // Get one TrainingSession
     * const trainingSession = await prisma.trainingSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrainingSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, TrainingSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrainingSessionClient<$Result.GetResult<Prisma.$TrainingSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainingSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingSessionFindFirstArgs} args - Arguments to find a TrainingSession
     * @example
     * // Get one TrainingSession
     * const trainingSession = await prisma.trainingSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrainingSessionFindFirstArgs>(args?: SelectSubset<T, TrainingSessionFindFirstArgs<ExtArgs>>): Prisma__TrainingSessionClient<$Result.GetResult<Prisma.$TrainingSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainingSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingSessionFindFirstOrThrowArgs} args - Arguments to find a TrainingSession
     * @example
     * // Get one TrainingSession
     * const trainingSession = await prisma.trainingSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrainingSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, TrainingSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrainingSessionClient<$Result.GetResult<Prisma.$TrainingSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrainingSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrainingSessions
     * const trainingSessions = await prisma.trainingSession.findMany()
     * 
     * // Get first 10 TrainingSessions
     * const trainingSessions = await prisma.trainingSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trainingSessionWithIdOnly = await prisma.trainingSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrainingSessionFindManyArgs>(args?: SelectSubset<T, TrainingSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrainingSession.
     * @param {TrainingSessionCreateArgs} args - Arguments to create a TrainingSession.
     * @example
     * // Create one TrainingSession
     * const TrainingSession = await prisma.trainingSession.create({
     *   data: {
     *     // ... data to create a TrainingSession
     *   }
     * })
     * 
     */
    create<T extends TrainingSessionCreateArgs>(args: SelectSubset<T, TrainingSessionCreateArgs<ExtArgs>>): Prisma__TrainingSessionClient<$Result.GetResult<Prisma.$TrainingSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrainingSessions.
     * @param {TrainingSessionCreateManyArgs} args - Arguments to create many TrainingSessions.
     * @example
     * // Create many TrainingSessions
     * const trainingSession = await prisma.trainingSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrainingSessionCreateManyArgs>(args?: SelectSubset<T, TrainingSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TrainingSessions and returns the data saved in the database.
     * @param {TrainingSessionCreateManyAndReturnArgs} args - Arguments to create many TrainingSessions.
     * @example
     * // Create many TrainingSessions
     * const trainingSession = await prisma.trainingSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TrainingSessions and only return the `id`
     * const trainingSessionWithIdOnly = await prisma.trainingSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrainingSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, TrainingSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TrainingSession.
     * @param {TrainingSessionDeleteArgs} args - Arguments to delete one TrainingSession.
     * @example
     * // Delete one TrainingSession
     * const TrainingSession = await prisma.trainingSession.delete({
     *   where: {
     *     // ... filter to delete one TrainingSession
     *   }
     * })
     * 
     */
    delete<T extends TrainingSessionDeleteArgs>(args: SelectSubset<T, TrainingSessionDeleteArgs<ExtArgs>>): Prisma__TrainingSessionClient<$Result.GetResult<Prisma.$TrainingSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrainingSession.
     * @param {TrainingSessionUpdateArgs} args - Arguments to update one TrainingSession.
     * @example
     * // Update one TrainingSession
     * const trainingSession = await prisma.trainingSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrainingSessionUpdateArgs>(args: SelectSubset<T, TrainingSessionUpdateArgs<ExtArgs>>): Prisma__TrainingSessionClient<$Result.GetResult<Prisma.$TrainingSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrainingSessions.
     * @param {TrainingSessionDeleteManyArgs} args - Arguments to filter TrainingSessions to delete.
     * @example
     * // Delete a few TrainingSessions
     * const { count } = await prisma.trainingSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrainingSessionDeleteManyArgs>(args?: SelectSubset<T, TrainingSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainingSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrainingSessions
     * const trainingSession = await prisma.trainingSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrainingSessionUpdateManyArgs>(args: SelectSubset<T, TrainingSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainingSessions and returns the data updated in the database.
     * @param {TrainingSessionUpdateManyAndReturnArgs} args - Arguments to update many TrainingSessions.
     * @example
     * // Update many TrainingSessions
     * const trainingSession = await prisma.trainingSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TrainingSessions and only return the `id`
     * const trainingSessionWithIdOnly = await prisma.trainingSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrainingSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, TrainingSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TrainingSession.
     * @param {TrainingSessionUpsertArgs} args - Arguments to update or create a TrainingSession.
     * @example
     * // Update or create a TrainingSession
     * const trainingSession = await prisma.trainingSession.upsert({
     *   create: {
     *     // ... data to create a TrainingSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrainingSession we want to update
     *   }
     * })
     */
    upsert<T extends TrainingSessionUpsertArgs>(args: SelectSubset<T, TrainingSessionUpsertArgs<ExtArgs>>): Prisma__TrainingSessionClient<$Result.GetResult<Prisma.$TrainingSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TrainingSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingSessionCountArgs} args - Arguments to filter TrainingSessions to count.
     * @example
     * // Count the number of TrainingSessions
     * const count = await prisma.trainingSession.count({
     *   where: {
     *     // ... the filter for the TrainingSessions we want to count
     *   }
     * })
    **/
    count<T extends TrainingSessionCountArgs>(
      args?: Subset<T, TrainingSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrainingSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrainingSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrainingSessionAggregateArgs>(args: Subset<T, TrainingSessionAggregateArgs>): Prisma.PrismaPromise<GetTrainingSessionAggregateType<T>>

    /**
     * Group by TrainingSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrainingSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrainingSessionGroupByArgs['orderBy'] }
        : { orderBy?: TrainingSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrainingSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrainingSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrainingSession model
   */
  readonly fields: TrainingSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrainingSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrainingSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trainingPlan<T extends TrainingPlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TrainingPlanDefaultArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    exerciseLogs<T extends TrainingSession$exerciseLogsArgs<ExtArgs> = {}>(args?: Subset<T, TrainingSession$exerciseLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExerciseLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TrainingSession model
   */
  interface TrainingSessionFieldRefs {
    readonly id: FieldRef<"TrainingSession", 'String'>
    readonly trainingPlanId: FieldRef<"TrainingSession", 'String'>
    readonly userId: FieldRef<"TrainingSession", 'String'>
    readonly dayOfWeek: FieldRef<"TrainingSession", 'Int'>
    readonly feedback: FieldRef<"TrainingSession", 'String'>
    readonly completed: FieldRef<"TrainingSession", 'Boolean'>
    readonly scheduledDate: FieldRef<"TrainingSession", 'DateTime'>
    readonly completedDate: FieldRef<"TrainingSession", 'DateTime'>
    readonly createdAt: FieldRef<"TrainingSession", 'DateTime'>
    readonly updatedAt: FieldRef<"TrainingSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TrainingSession findUnique
   */
  export type TrainingSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingSession
     */
    select?: TrainingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingSession
     */
    omit?: TrainingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingSessionInclude<ExtArgs> | null
    /**
     * Filter, which TrainingSession to fetch.
     */
    where: TrainingSessionWhereUniqueInput
  }

  /**
   * TrainingSession findUniqueOrThrow
   */
  export type TrainingSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingSession
     */
    select?: TrainingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingSession
     */
    omit?: TrainingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingSessionInclude<ExtArgs> | null
    /**
     * Filter, which TrainingSession to fetch.
     */
    where: TrainingSessionWhereUniqueInput
  }

  /**
   * TrainingSession findFirst
   */
  export type TrainingSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingSession
     */
    select?: TrainingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingSession
     */
    omit?: TrainingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingSessionInclude<ExtArgs> | null
    /**
     * Filter, which TrainingSession to fetch.
     */
    where?: TrainingSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingSessions to fetch.
     */
    orderBy?: TrainingSessionOrderByWithRelationInput | TrainingSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainingSessions.
     */
    cursor?: TrainingSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingSessions.
     */
    distinct?: TrainingSessionScalarFieldEnum | TrainingSessionScalarFieldEnum[]
  }

  /**
   * TrainingSession findFirstOrThrow
   */
  export type TrainingSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingSession
     */
    select?: TrainingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingSession
     */
    omit?: TrainingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingSessionInclude<ExtArgs> | null
    /**
     * Filter, which TrainingSession to fetch.
     */
    where?: TrainingSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingSessions to fetch.
     */
    orderBy?: TrainingSessionOrderByWithRelationInput | TrainingSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainingSessions.
     */
    cursor?: TrainingSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingSessions.
     */
    distinct?: TrainingSessionScalarFieldEnum | TrainingSessionScalarFieldEnum[]
  }

  /**
   * TrainingSession findMany
   */
  export type TrainingSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingSession
     */
    select?: TrainingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingSession
     */
    omit?: TrainingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingSessionInclude<ExtArgs> | null
    /**
     * Filter, which TrainingSessions to fetch.
     */
    where?: TrainingSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingSessions to fetch.
     */
    orderBy?: TrainingSessionOrderByWithRelationInput | TrainingSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrainingSessions.
     */
    cursor?: TrainingSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingSessions.
     */
    skip?: number
    distinct?: TrainingSessionScalarFieldEnum | TrainingSessionScalarFieldEnum[]
  }

  /**
   * TrainingSession create
   */
  export type TrainingSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingSession
     */
    select?: TrainingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingSession
     */
    omit?: TrainingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a TrainingSession.
     */
    data: XOR<TrainingSessionCreateInput, TrainingSessionUncheckedCreateInput>
  }

  /**
   * TrainingSession createMany
   */
  export type TrainingSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrainingSessions.
     */
    data: TrainingSessionCreateManyInput | TrainingSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrainingSession createManyAndReturn
   */
  export type TrainingSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingSession
     */
    select?: TrainingSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingSession
     */
    omit?: TrainingSessionOmit<ExtArgs> | null
    /**
     * The data used to create many TrainingSessions.
     */
    data: TrainingSessionCreateManyInput | TrainingSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainingSession update
   */
  export type TrainingSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingSession
     */
    select?: TrainingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingSession
     */
    omit?: TrainingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a TrainingSession.
     */
    data: XOR<TrainingSessionUpdateInput, TrainingSessionUncheckedUpdateInput>
    /**
     * Choose, which TrainingSession to update.
     */
    where: TrainingSessionWhereUniqueInput
  }

  /**
   * TrainingSession updateMany
   */
  export type TrainingSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrainingSessions.
     */
    data: XOR<TrainingSessionUpdateManyMutationInput, TrainingSessionUncheckedUpdateManyInput>
    /**
     * Filter which TrainingSessions to update
     */
    where?: TrainingSessionWhereInput
    /**
     * Limit how many TrainingSessions to update.
     */
    limit?: number
  }

  /**
   * TrainingSession updateManyAndReturn
   */
  export type TrainingSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingSession
     */
    select?: TrainingSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingSession
     */
    omit?: TrainingSessionOmit<ExtArgs> | null
    /**
     * The data used to update TrainingSessions.
     */
    data: XOR<TrainingSessionUpdateManyMutationInput, TrainingSessionUncheckedUpdateManyInput>
    /**
     * Filter which TrainingSessions to update
     */
    where?: TrainingSessionWhereInput
    /**
     * Limit how many TrainingSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainingSession upsert
   */
  export type TrainingSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingSession
     */
    select?: TrainingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingSession
     */
    omit?: TrainingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the TrainingSession to update in case it exists.
     */
    where: TrainingSessionWhereUniqueInput
    /**
     * In case the TrainingSession found by the `where` argument doesn't exist, create a new TrainingSession with this data.
     */
    create: XOR<TrainingSessionCreateInput, TrainingSessionUncheckedCreateInput>
    /**
     * In case the TrainingSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrainingSessionUpdateInput, TrainingSessionUncheckedUpdateInput>
  }

  /**
   * TrainingSession delete
   */
  export type TrainingSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingSession
     */
    select?: TrainingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingSession
     */
    omit?: TrainingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingSessionInclude<ExtArgs> | null
    /**
     * Filter which TrainingSession to delete.
     */
    where: TrainingSessionWhereUniqueInput
  }

  /**
   * TrainingSession deleteMany
   */
  export type TrainingSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainingSessions to delete
     */
    where?: TrainingSessionWhereInput
    /**
     * Limit how many TrainingSessions to delete.
     */
    limit?: number
  }

  /**
   * TrainingSession.exerciseLogs
   */
  export type TrainingSession$exerciseLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseLog
     */
    select?: ExerciseLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseLog
     */
    omit?: ExerciseLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseLogInclude<ExtArgs> | null
    where?: ExerciseLogWhereInput
    orderBy?: ExerciseLogOrderByWithRelationInput | ExerciseLogOrderByWithRelationInput[]
    cursor?: ExerciseLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExerciseLogScalarFieldEnum | ExerciseLogScalarFieldEnum[]
  }

  /**
   * TrainingSession without action
   */
  export type TrainingSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingSession
     */
    select?: TrainingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingSession
     */
    omit?: TrainingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingSessionInclude<ExtArgs> | null
  }


  /**
   * Model ExerciseLog
   */

  export type AggregateExerciseLog = {
    _count: ExerciseLogCountAggregateOutputType | null
    _avg: ExerciseLogAvgAggregateOutputType | null
    _sum: ExerciseLogSumAggregateOutputType | null
    _min: ExerciseLogMinAggregateOutputType | null
    _max: ExerciseLogMaxAggregateOutputType | null
  }

  export type ExerciseLogAvgAggregateOutputType = {
    sets: number | null
    weight: number | null
    rir: number | null
  }

  export type ExerciseLogSumAggregateOutputType = {
    sets: number | null
    weight: number | null
    rir: number | null
  }

  export type ExerciseLogMinAggregateOutputType = {
    id: string | null
    trainingSessionId: string | null
    userId: string | null
    exerciseName: string | null
    sets: number | null
    reps: string | null
    weight: number | null
    rir: number | null
    feedback: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExerciseLogMaxAggregateOutputType = {
    id: string | null
    trainingSessionId: string | null
    userId: string | null
    exerciseName: string | null
    sets: number | null
    reps: string | null
    weight: number | null
    rir: number | null
    feedback: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExerciseLogCountAggregateOutputType = {
    id: number
    trainingSessionId: number
    userId: number
    exerciseName: number
    sets: number
    reps: number
    weight: number
    rir: number
    feedback: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ExerciseLogAvgAggregateInputType = {
    sets?: true
    weight?: true
    rir?: true
  }

  export type ExerciseLogSumAggregateInputType = {
    sets?: true
    weight?: true
    rir?: true
  }

  export type ExerciseLogMinAggregateInputType = {
    id?: true
    trainingSessionId?: true
    userId?: true
    exerciseName?: true
    sets?: true
    reps?: true
    weight?: true
    rir?: true
    feedback?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExerciseLogMaxAggregateInputType = {
    id?: true
    trainingSessionId?: true
    userId?: true
    exerciseName?: true
    sets?: true
    reps?: true
    weight?: true
    rir?: true
    feedback?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExerciseLogCountAggregateInputType = {
    id?: true
    trainingSessionId?: true
    userId?: true
    exerciseName?: true
    sets?: true
    reps?: true
    weight?: true
    rir?: true
    feedback?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ExerciseLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExerciseLog to aggregate.
     */
    where?: ExerciseLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExerciseLogs to fetch.
     */
    orderBy?: ExerciseLogOrderByWithRelationInput | ExerciseLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExerciseLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExerciseLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExerciseLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExerciseLogs
    **/
    _count?: true | ExerciseLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExerciseLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExerciseLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExerciseLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExerciseLogMaxAggregateInputType
  }

  export type GetExerciseLogAggregateType<T extends ExerciseLogAggregateArgs> = {
        [P in keyof T & keyof AggregateExerciseLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExerciseLog[P]>
      : GetScalarType<T[P], AggregateExerciseLog[P]>
  }




  export type ExerciseLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExerciseLogWhereInput
    orderBy?: ExerciseLogOrderByWithAggregationInput | ExerciseLogOrderByWithAggregationInput[]
    by: ExerciseLogScalarFieldEnum[] | ExerciseLogScalarFieldEnum
    having?: ExerciseLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExerciseLogCountAggregateInputType | true
    _avg?: ExerciseLogAvgAggregateInputType
    _sum?: ExerciseLogSumAggregateInputType
    _min?: ExerciseLogMinAggregateInputType
    _max?: ExerciseLogMaxAggregateInputType
  }

  export type ExerciseLogGroupByOutputType = {
    id: string
    trainingSessionId: string
    userId: string
    exerciseName: string
    sets: number
    reps: string
    weight: number | null
    rir: number | null
    feedback: string | null
    createdAt: Date
    updatedAt: Date
    _count: ExerciseLogCountAggregateOutputType | null
    _avg: ExerciseLogAvgAggregateOutputType | null
    _sum: ExerciseLogSumAggregateOutputType | null
    _min: ExerciseLogMinAggregateOutputType | null
    _max: ExerciseLogMaxAggregateOutputType | null
  }

  type GetExerciseLogGroupByPayload<T extends ExerciseLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExerciseLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExerciseLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExerciseLogGroupByOutputType[P]>
            : GetScalarType<T[P], ExerciseLogGroupByOutputType[P]>
        }
      >
    >


  export type ExerciseLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainingSessionId?: boolean
    userId?: boolean
    exerciseName?: boolean
    sets?: boolean
    reps?: boolean
    weight?: boolean
    rir?: boolean
    feedback?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trainingSession?: boolean | TrainingSessionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exerciseLog"]>

  export type ExerciseLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainingSessionId?: boolean
    userId?: boolean
    exerciseName?: boolean
    sets?: boolean
    reps?: boolean
    weight?: boolean
    rir?: boolean
    feedback?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trainingSession?: boolean | TrainingSessionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exerciseLog"]>

  export type ExerciseLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainingSessionId?: boolean
    userId?: boolean
    exerciseName?: boolean
    sets?: boolean
    reps?: boolean
    weight?: boolean
    rir?: boolean
    feedback?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trainingSession?: boolean | TrainingSessionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exerciseLog"]>

  export type ExerciseLogSelectScalar = {
    id?: boolean
    trainingSessionId?: boolean
    userId?: boolean
    exerciseName?: boolean
    sets?: boolean
    reps?: boolean
    weight?: boolean
    rir?: boolean
    feedback?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ExerciseLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "trainingSessionId" | "userId" | "exerciseName" | "sets" | "reps" | "weight" | "rir" | "feedback" | "createdAt" | "updatedAt", ExtArgs["result"]["exerciseLog"]>
  export type ExerciseLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingSession?: boolean | TrainingSessionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ExerciseLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingSession?: boolean | TrainingSessionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ExerciseLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingSession?: boolean | TrainingSessionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ExerciseLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExerciseLog"
    objects: {
      trainingSession: Prisma.$TrainingSessionPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      trainingSessionId: string
      userId: string
      exerciseName: string
      sets: number
      reps: string
      weight: number | null
      rir: number | null
      feedback: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["exerciseLog"]>
    composites: {}
  }

  type ExerciseLogGetPayload<S extends boolean | null | undefined | ExerciseLogDefaultArgs> = $Result.GetResult<Prisma.$ExerciseLogPayload, S>

  type ExerciseLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExerciseLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExerciseLogCountAggregateInputType | true
    }

  export interface ExerciseLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExerciseLog'], meta: { name: 'ExerciseLog' } }
    /**
     * Find zero or one ExerciseLog that matches the filter.
     * @param {ExerciseLogFindUniqueArgs} args - Arguments to find a ExerciseLog
     * @example
     * // Get one ExerciseLog
     * const exerciseLog = await prisma.exerciseLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExerciseLogFindUniqueArgs>(args: SelectSubset<T, ExerciseLogFindUniqueArgs<ExtArgs>>): Prisma__ExerciseLogClient<$Result.GetResult<Prisma.$ExerciseLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExerciseLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExerciseLogFindUniqueOrThrowArgs} args - Arguments to find a ExerciseLog
     * @example
     * // Get one ExerciseLog
     * const exerciseLog = await prisma.exerciseLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExerciseLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ExerciseLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExerciseLogClient<$Result.GetResult<Prisma.$ExerciseLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExerciseLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseLogFindFirstArgs} args - Arguments to find a ExerciseLog
     * @example
     * // Get one ExerciseLog
     * const exerciseLog = await prisma.exerciseLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExerciseLogFindFirstArgs>(args?: SelectSubset<T, ExerciseLogFindFirstArgs<ExtArgs>>): Prisma__ExerciseLogClient<$Result.GetResult<Prisma.$ExerciseLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExerciseLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseLogFindFirstOrThrowArgs} args - Arguments to find a ExerciseLog
     * @example
     * // Get one ExerciseLog
     * const exerciseLog = await prisma.exerciseLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExerciseLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ExerciseLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExerciseLogClient<$Result.GetResult<Prisma.$ExerciseLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExerciseLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExerciseLogs
     * const exerciseLogs = await prisma.exerciseLog.findMany()
     * 
     * // Get first 10 ExerciseLogs
     * const exerciseLogs = await prisma.exerciseLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exerciseLogWithIdOnly = await prisma.exerciseLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExerciseLogFindManyArgs>(args?: SelectSubset<T, ExerciseLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExerciseLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExerciseLog.
     * @param {ExerciseLogCreateArgs} args - Arguments to create a ExerciseLog.
     * @example
     * // Create one ExerciseLog
     * const ExerciseLog = await prisma.exerciseLog.create({
     *   data: {
     *     // ... data to create a ExerciseLog
     *   }
     * })
     * 
     */
    create<T extends ExerciseLogCreateArgs>(args: SelectSubset<T, ExerciseLogCreateArgs<ExtArgs>>): Prisma__ExerciseLogClient<$Result.GetResult<Prisma.$ExerciseLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExerciseLogs.
     * @param {ExerciseLogCreateManyArgs} args - Arguments to create many ExerciseLogs.
     * @example
     * // Create many ExerciseLogs
     * const exerciseLog = await prisma.exerciseLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExerciseLogCreateManyArgs>(args?: SelectSubset<T, ExerciseLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExerciseLogs and returns the data saved in the database.
     * @param {ExerciseLogCreateManyAndReturnArgs} args - Arguments to create many ExerciseLogs.
     * @example
     * // Create many ExerciseLogs
     * const exerciseLog = await prisma.exerciseLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExerciseLogs and only return the `id`
     * const exerciseLogWithIdOnly = await prisma.exerciseLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExerciseLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ExerciseLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExerciseLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExerciseLog.
     * @param {ExerciseLogDeleteArgs} args - Arguments to delete one ExerciseLog.
     * @example
     * // Delete one ExerciseLog
     * const ExerciseLog = await prisma.exerciseLog.delete({
     *   where: {
     *     // ... filter to delete one ExerciseLog
     *   }
     * })
     * 
     */
    delete<T extends ExerciseLogDeleteArgs>(args: SelectSubset<T, ExerciseLogDeleteArgs<ExtArgs>>): Prisma__ExerciseLogClient<$Result.GetResult<Prisma.$ExerciseLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExerciseLog.
     * @param {ExerciseLogUpdateArgs} args - Arguments to update one ExerciseLog.
     * @example
     * // Update one ExerciseLog
     * const exerciseLog = await prisma.exerciseLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExerciseLogUpdateArgs>(args: SelectSubset<T, ExerciseLogUpdateArgs<ExtArgs>>): Prisma__ExerciseLogClient<$Result.GetResult<Prisma.$ExerciseLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExerciseLogs.
     * @param {ExerciseLogDeleteManyArgs} args - Arguments to filter ExerciseLogs to delete.
     * @example
     * // Delete a few ExerciseLogs
     * const { count } = await prisma.exerciseLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExerciseLogDeleteManyArgs>(args?: SelectSubset<T, ExerciseLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExerciseLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExerciseLogs
     * const exerciseLog = await prisma.exerciseLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExerciseLogUpdateManyArgs>(args: SelectSubset<T, ExerciseLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExerciseLogs and returns the data updated in the database.
     * @param {ExerciseLogUpdateManyAndReturnArgs} args - Arguments to update many ExerciseLogs.
     * @example
     * // Update many ExerciseLogs
     * const exerciseLog = await prisma.exerciseLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExerciseLogs and only return the `id`
     * const exerciseLogWithIdOnly = await prisma.exerciseLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExerciseLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ExerciseLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExerciseLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExerciseLog.
     * @param {ExerciseLogUpsertArgs} args - Arguments to update or create a ExerciseLog.
     * @example
     * // Update or create a ExerciseLog
     * const exerciseLog = await prisma.exerciseLog.upsert({
     *   create: {
     *     // ... data to create a ExerciseLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExerciseLog we want to update
     *   }
     * })
     */
    upsert<T extends ExerciseLogUpsertArgs>(args: SelectSubset<T, ExerciseLogUpsertArgs<ExtArgs>>): Prisma__ExerciseLogClient<$Result.GetResult<Prisma.$ExerciseLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExerciseLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseLogCountArgs} args - Arguments to filter ExerciseLogs to count.
     * @example
     * // Count the number of ExerciseLogs
     * const count = await prisma.exerciseLog.count({
     *   where: {
     *     // ... the filter for the ExerciseLogs we want to count
     *   }
     * })
    **/
    count<T extends ExerciseLogCountArgs>(
      args?: Subset<T, ExerciseLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExerciseLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExerciseLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExerciseLogAggregateArgs>(args: Subset<T, ExerciseLogAggregateArgs>): Prisma.PrismaPromise<GetExerciseLogAggregateType<T>>

    /**
     * Group by ExerciseLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExerciseLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExerciseLogGroupByArgs['orderBy'] }
        : { orderBy?: ExerciseLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExerciseLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExerciseLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExerciseLog model
   */
  readonly fields: ExerciseLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExerciseLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExerciseLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trainingSession<T extends TrainingSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TrainingSessionDefaultArgs<ExtArgs>>): Prisma__TrainingSessionClient<$Result.GetResult<Prisma.$TrainingSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExerciseLog model
   */
  interface ExerciseLogFieldRefs {
    readonly id: FieldRef<"ExerciseLog", 'String'>
    readonly trainingSessionId: FieldRef<"ExerciseLog", 'String'>
    readonly userId: FieldRef<"ExerciseLog", 'String'>
    readonly exerciseName: FieldRef<"ExerciseLog", 'String'>
    readonly sets: FieldRef<"ExerciseLog", 'Int'>
    readonly reps: FieldRef<"ExerciseLog", 'String'>
    readonly weight: FieldRef<"ExerciseLog", 'Float'>
    readonly rir: FieldRef<"ExerciseLog", 'Int'>
    readonly feedback: FieldRef<"ExerciseLog", 'String'>
    readonly createdAt: FieldRef<"ExerciseLog", 'DateTime'>
    readonly updatedAt: FieldRef<"ExerciseLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExerciseLog findUnique
   */
  export type ExerciseLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseLog
     */
    select?: ExerciseLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseLog
     */
    omit?: ExerciseLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseLogInclude<ExtArgs> | null
    /**
     * Filter, which ExerciseLog to fetch.
     */
    where: ExerciseLogWhereUniqueInput
  }

  /**
   * ExerciseLog findUniqueOrThrow
   */
  export type ExerciseLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseLog
     */
    select?: ExerciseLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseLog
     */
    omit?: ExerciseLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseLogInclude<ExtArgs> | null
    /**
     * Filter, which ExerciseLog to fetch.
     */
    where: ExerciseLogWhereUniqueInput
  }

  /**
   * ExerciseLog findFirst
   */
  export type ExerciseLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseLog
     */
    select?: ExerciseLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseLog
     */
    omit?: ExerciseLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseLogInclude<ExtArgs> | null
    /**
     * Filter, which ExerciseLog to fetch.
     */
    where?: ExerciseLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExerciseLogs to fetch.
     */
    orderBy?: ExerciseLogOrderByWithRelationInput | ExerciseLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExerciseLogs.
     */
    cursor?: ExerciseLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExerciseLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExerciseLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExerciseLogs.
     */
    distinct?: ExerciseLogScalarFieldEnum | ExerciseLogScalarFieldEnum[]
  }

  /**
   * ExerciseLog findFirstOrThrow
   */
  export type ExerciseLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseLog
     */
    select?: ExerciseLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseLog
     */
    omit?: ExerciseLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseLogInclude<ExtArgs> | null
    /**
     * Filter, which ExerciseLog to fetch.
     */
    where?: ExerciseLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExerciseLogs to fetch.
     */
    orderBy?: ExerciseLogOrderByWithRelationInput | ExerciseLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExerciseLogs.
     */
    cursor?: ExerciseLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExerciseLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExerciseLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExerciseLogs.
     */
    distinct?: ExerciseLogScalarFieldEnum | ExerciseLogScalarFieldEnum[]
  }

  /**
   * ExerciseLog findMany
   */
  export type ExerciseLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseLog
     */
    select?: ExerciseLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseLog
     */
    omit?: ExerciseLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseLogInclude<ExtArgs> | null
    /**
     * Filter, which ExerciseLogs to fetch.
     */
    where?: ExerciseLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExerciseLogs to fetch.
     */
    orderBy?: ExerciseLogOrderByWithRelationInput | ExerciseLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExerciseLogs.
     */
    cursor?: ExerciseLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExerciseLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExerciseLogs.
     */
    skip?: number
    distinct?: ExerciseLogScalarFieldEnum | ExerciseLogScalarFieldEnum[]
  }

  /**
   * ExerciseLog create
   */
  export type ExerciseLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseLog
     */
    select?: ExerciseLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseLog
     */
    omit?: ExerciseLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ExerciseLog.
     */
    data: XOR<ExerciseLogCreateInput, ExerciseLogUncheckedCreateInput>
  }

  /**
   * ExerciseLog createMany
   */
  export type ExerciseLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExerciseLogs.
     */
    data: ExerciseLogCreateManyInput | ExerciseLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExerciseLog createManyAndReturn
   */
  export type ExerciseLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseLog
     */
    select?: ExerciseLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseLog
     */
    omit?: ExerciseLogOmit<ExtArgs> | null
    /**
     * The data used to create many ExerciseLogs.
     */
    data: ExerciseLogCreateManyInput | ExerciseLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExerciseLog update
   */
  export type ExerciseLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseLog
     */
    select?: ExerciseLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseLog
     */
    omit?: ExerciseLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ExerciseLog.
     */
    data: XOR<ExerciseLogUpdateInput, ExerciseLogUncheckedUpdateInput>
    /**
     * Choose, which ExerciseLog to update.
     */
    where: ExerciseLogWhereUniqueInput
  }

  /**
   * ExerciseLog updateMany
   */
  export type ExerciseLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExerciseLogs.
     */
    data: XOR<ExerciseLogUpdateManyMutationInput, ExerciseLogUncheckedUpdateManyInput>
    /**
     * Filter which ExerciseLogs to update
     */
    where?: ExerciseLogWhereInput
    /**
     * Limit how many ExerciseLogs to update.
     */
    limit?: number
  }

  /**
   * ExerciseLog updateManyAndReturn
   */
  export type ExerciseLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseLog
     */
    select?: ExerciseLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseLog
     */
    omit?: ExerciseLogOmit<ExtArgs> | null
    /**
     * The data used to update ExerciseLogs.
     */
    data: XOR<ExerciseLogUpdateManyMutationInput, ExerciseLogUncheckedUpdateManyInput>
    /**
     * Filter which ExerciseLogs to update
     */
    where?: ExerciseLogWhereInput
    /**
     * Limit how many ExerciseLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExerciseLog upsert
   */
  export type ExerciseLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseLog
     */
    select?: ExerciseLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseLog
     */
    omit?: ExerciseLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ExerciseLog to update in case it exists.
     */
    where: ExerciseLogWhereUniqueInput
    /**
     * In case the ExerciseLog found by the `where` argument doesn't exist, create a new ExerciseLog with this data.
     */
    create: XOR<ExerciseLogCreateInput, ExerciseLogUncheckedCreateInput>
    /**
     * In case the ExerciseLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExerciseLogUpdateInput, ExerciseLogUncheckedUpdateInput>
  }

  /**
   * ExerciseLog delete
   */
  export type ExerciseLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseLog
     */
    select?: ExerciseLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseLog
     */
    omit?: ExerciseLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseLogInclude<ExtArgs> | null
    /**
     * Filter which ExerciseLog to delete.
     */
    where: ExerciseLogWhereUniqueInput
  }

  /**
   * ExerciseLog deleteMany
   */
  export type ExerciseLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExerciseLogs to delete
     */
    where?: ExerciseLogWhereInput
    /**
     * Limit how many ExerciseLogs to delete.
     */
    limit?: number
  }

  /**
   * ExerciseLog without action
   */
  export type ExerciseLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseLog
     */
    select?: ExerciseLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExerciseLog
     */
    omit?: ExerciseLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    age: 'age',
    weight: 'weight',
    height: 'height',
    experience: 'experience',
    availability: 'availability',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    fitnessLevel: 'fitnessLevel',
    fitnessGoals: 'fitnessGoals',
    medicalIssues: 'medicalIssues',
    availableEquipment: 'availableEquipment',
    trainingPreferences: 'trainingPreferences',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const TrainingPlanScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isActive: 'isActive',
    generatedBy: 'generatedBy'
  };

  export type TrainingPlanScalarFieldEnum = (typeof TrainingPlanScalarFieldEnum)[keyof typeof TrainingPlanScalarFieldEnum]


  export const TrainingSessionScalarFieldEnum: {
    id: 'id',
    trainingPlanId: 'trainingPlanId',
    userId: 'userId',
    dayOfWeek: 'dayOfWeek',
    feedback: 'feedback',
    completed: 'completed',
    scheduledDate: 'scheduledDate',
    completedDate: 'completedDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TrainingSessionScalarFieldEnum = (typeof TrainingSessionScalarFieldEnum)[keyof typeof TrainingSessionScalarFieldEnum]


  export const ExerciseLogScalarFieldEnum: {
    id: 'id',
    trainingSessionId: 'trainingSessionId',
    userId: 'userId',
    exerciseName: 'exerciseName',
    sets: 'sets',
    reps: 'reps',
    weight: 'weight',
    rir: 'rir',
    feedback: 'feedback',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ExerciseLogScalarFieldEnum = (typeof ExerciseLogScalarFieldEnum)[keyof typeof ExerciseLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    age?: IntNullableFilter<"User"> | number | null
    weight?: FloatNullableFilter<"User"> | number | null
    height?: FloatNullableFilter<"User"> | number | null
    experience?: StringNullableFilter<"User"> | string | null
    availability?: JsonNullableFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    profile?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
    trainingPlans?: TrainingPlanListRelationFilter
    trainingSessions?: TrainingSessionListRelationFilter
    exerciseLogs?: ExerciseLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    age?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    experience?: SortOrderInput | SortOrder
    availability?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    trainingPlans?: TrainingPlanOrderByRelationAggregateInput
    trainingSessions?: TrainingSessionOrderByRelationAggregateInput
    exerciseLogs?: ExerciseLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    age?: IntNullableFilter<"User"> | number | null
    weight?: FloatNullableFilter<"User"> | number | null
    height?: FloatNullableFilter<"User"> | number | null
    experience?: StringNullableFilter<"User"> | string | null
    availability?: JsonNullableFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    profile?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
    trainingPlans?: TrainingPlanListRelationFilter
    trainingSessions?: TrainingSessionListRelationFilter
    exerciseLogs?: ExerciseLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    age?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    experience?: SortOrderInput | SortOrder
    availability?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    age?: IntNullableWithAggregatesFilter<"User"> | number | null
    weight?: FloatNullableWithAggregatesFilter<"User"> | number | null
    height?: FloatNullableWithAggregatesFilter<"User"> | number | null
    experience?: StringNullableWithAggregatesFilter<"User"> | string | null
    availability?: JsonNullableWithAggregatesFilter<"User">
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: StringFilter<"Profile"> | string
    userId?: StringFilter<"Profile"> | string
    fitnessLevel?: StringNullableFilter<"Profile"> | string | null
    fitnessGoals?: StringNullableListFilter<"Profile">
    medicalIssues?: StringNullableListFilter<"Profile">
    availableEquipment?: StringNullableListFilter<"Profile">
    trainingPreferences?: JsonNullableFilter<"Profile">
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    fitnessLevel?: SortOrderInput | SortOrder
    fitnessGoals?: SortOrder
    medicalIssues?: SortOrder
    availableEquipment?: SortOrder
    trainingPreferences?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    fitnessLevel?: StringNullableFilter<"Profile"> | string | null
    fitnessGoals?: StringNullableListFilter<"Profile">
    medicalIssues?: StringNullableListFilter<"Profile">
    availableEquipment?: StringNullableListFilter<"Profile">
    trainingPreferences?: JsonNullableFilter<"Profile">
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    fitnessLevel?: SortOrderInput | SortOrder
    fitnessGoals?: SortOrder
    medicalIssues?: SortOrder
    availableEquipment?: SortOrder
    trainingPreferences?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Profile"> | string
    userId?: StringWithAggregatesFilter<"Profile"> | string
    fitnessLevel?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    fitnessGoals?: StringNullableListFilter<"Profile">
    medicalIssues?: StringNullableListFilter<"Profile">
    availableEquipment?: StringNullableListFilter<"Profile">
    trainingPreferences?: JsonNullableWithAggregatesFilter<"Profile">
    createdAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
  }

  export type TrainingPlanWhereInput = {
    AND?: TrainingPlanWhereInput | TrainingPlanWhereInput[]
    OR?: TrainingPlanWhereInput[]
    NOT?: TrainingPlanWhereInput | TrainingPlanWhereInput[]
    id?: StringFilter<"TrainingPlan"> | string
    userId?: StringFilter<"TrainingPlan"> | string
    name?: StringFilter<"TrainingPlan"> | string
    description?: StringNullableFilter<"TrainingPlan"> | string | null
    createdAt?: DateTimeFilter<"TrainingPlan"> | Date | string
    updatedAt?: DateTimeFilter<"TrainingPlan"> | Date | string
    isActive?: BoolFilter<"TrainingPlan"> | boolean
    generatedBy?: StringFilter<"TrainingPlan"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    trainingSessions?: TrainingSessionListRelationFilter
  }

  export type TrainingPlanOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    generatedBy?: SortOrder
    user?: UserOrderByWithRelationInput
    trainingSessions?: TrainingSessionOrderByRelationAggregateInput
  }

  export type TrainingPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TrainingPlanWhereInput | TrainingPlanWhereInput[]
    OR?: TrainingPlanWhereInput[]
    NOT?: TrainingPlanWhereInput | TrainingPlanWhereInput[]
    userId?: StringFilter<"TrainingPlan"> | string
    name?: StringFilter<"TrainingPlan"> | string
    description?: StringNullableFilter<"TrainingPlan"> | string | null
    createdAt?: DateTimeFilter<"TrainingPlan"> | Date | string
    updatedAt?: DateTimeFilter<"TrainingPlan"> | Date | string
    isActive?: BoolFilter<"TrainingPlan"> | boolean
    generatedBy?: StringFilter<"TrainingPlan"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    trainingSessions?: TrainingSessionListRelationFilter
  }, "id">

  export type TrainingPlanOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    generatedBy?: SortOrder
    _count?: TrainingPlanCountOrderByAggregateInput
    _max?: TrainingPlanMaxOrderByAggregateInput
    _min?: TrainingPlanMinOrderByAggregateInput
  }

  export type TrainingPlanScalarWhereWithAggregatesInput = {
    AND?: TrainingPlanScalarWhereWithAggregatesInput | TrainingPlanScalarWhereWithAggregatesInput[]
    OR?: TrainingPlanScalarWhereWithAggregatesInput[]
    NOT?: TrainingPlanScalarWhereWithAggregatesInput | TrainingPlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TrainingPlan"> | string
    userId?: StringWithAggregatesFilter<"TrainingPlan"> | string
    name?: StringWithAggregatesFilter<"TrainingPlan"> | string
    description?: StringNullableWithAggregatesFilter<"TrainingPlan"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TrainingPlan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TrainingPlan"> | Date | string
    isActive?: BoolWithAggregatesFilter<"TrainingPlan"> | boolean
    generatedBy?: StringWithAggregatesFilter<"TrainingPlan"> | string
  }

  export type TrainingSessionWhereInput = {
    AND?: TrainingSessionWhereInput | TrainingSessionWhereInput[]
    OR?: TrainingSessionWhereInput[]
    NOT?: TrainingSessionWhereInput | TrainingSessionWhereInput[]
    id?: StringFilter<"TrainingSession"> | string
    trainingPlanId?: StringFilter<"TrainingSession"> | string
    userId?: StringFilter<"TrainingSession"> | string
    dayOfWeek?: IntFilter<"TrainingSession"> | number
    feedback?: StringNullableFilter<"TrainingSession"> | string | null
    completed?: BoolFilter<"TrainingSession"> | boolean
    scheduledDate?: DateTimeNullableFilter<"TrainingSession"> | Date | string | null
    completedDate?: DateTimeNullableFilter<"TrainingSession"> | Date | string | null
    createdAt?: DateTimeFilter<"TrainingSession"> | Date | string
    updatedAt?: DateTimeFilter<"TrainingSession"> | Date | string
    trainingPlan?: XOR<TrainingPlanScalarRelationFilter, TrainingPlanWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    exerciseLogs?: ExerciseLogListRelationFilter
  }

  export type TrainingSessionOrderByWithRelationInput = {
    id?: SortOrder
    trainingPlanId?: SortOrder
    userId?: SortOrder
    dayOfWeek?: SortOrder
    feedback?: SortOrderInput | SortOrder
    completed?: SortOrder
    scheduledDate?: SortOrderInput | SortOrder
    completedDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trainingPlan?: TrainingPlanOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    exerciseLogs?: ExerciseLogOrderByRelationAggregateInput
  }

  export type TrainingSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TrainingSessionWhereInput | TrainingSessionWhereInput[]
    OR?: TrainingSessionWhereInput[]
    NOT?: TrainingSessionWhereInput | TrainingSessionWhereInput[]
    trainingPlanId?: StringFilter<"TrainingSession"> | string
    userId?: StringFilter<"TrainingSession"> | string
    dayOfWeek?: IntFilter<"TrainingSession"> | number
    feedback?: StringNullableFilter<"TrainingSession"> | string | null
    completed?: BoolFilter<"TrainingSession"> | boolean
    scheduledDate?: DateTimeNullableFilter<"TrainingSession"> | Date | string | null
    completedDate?: DateTimeNullableFilter<"TrainingSession"> | Date | string | null
    createdAt?: DateTimeFilter<"TrainingSession"> | Date | string
    updatedAt?: DateTimeFilter<"TrainingSession"> | Date | string
    trainingPlan?: XOR<TrainingPlanScalarRelationFilter, TrainingPlanWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    exerciseLogs?: ExerciseLogListRelationFilter
  }, "id">

  export type TrainingSessionOrderByWithAggregationInput = {
    id?: SortOrder
    trainingPlanId?: SortOrder
    userId?: SortOrder
    dayOfWeek?: SortOrder
    feedback?: SortOrderInput | SortOrder
    completed?: SortOrder
    scheduledDate?: SortOrderInput | SortOrder
    completedDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TrainingSessionCountOrderByAggregateInput
    _avg?: TrainingSessionAvgOrderByAggregateInput
    _max?: TrainingSessionMaxOrderByAggregateInput
    _min?: TrainingSessionMinOrderByAggregateInput
    _sum?: TrainingSessionSumOrderByAggregateInput
  }

  export type TrainingSessionScalarWhereWithAggregatesInput = {
    AND?: TrainingSessionScalarWhereWithAggregatesInput | TrainingSessionScalarWhereWithAggregatesInput[]
    OR?: TrainingSessionScalarWhereWithAggregatesInput[]
    NOT?: TrainingSessionScalarWhereWithAggregatesInput | TrainingSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TrainingSession"> | string
    trainingPlanId?: StringWithAggregatesFilter<"TrainingSession"> | string
    userId?: StringWithAggregatesFilter<"TrainingSession"> | string
    dayOfWeek?: IntWithAggregatesFilter<"TrainingSession"> | number
    feedback?: StringNullableWithAggregatesFilter<"TrainingSession"> | string | null
    completed?: BoolWithAggregatesFilter<"TrainingSession"> | boolean
    scheduledDate?: DateTimeNullableWithAggregatesFilter<"TrainingSession"> | Date | string | null
    completedDate?: DateTimeNullableWithAggregatesFilter<"TrainingSession"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TrainingSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TrainingSession"> | Date | string
  }

  export type ExerciseLogWhereInput = {
    AND?: ExerciseLogWhereInput | ExerciseLogWhereInput[]
    OR?: ExerciseLogWhereInput[]
    NOT?: ExerciseLogWhereInput | ExerciseLogWhereInput[]
    id?: StringFilter<"ExerciseLog"> | string
    trainingSessionId?: StringFilter<"ExerciseLog"> | string
    userId?: StringFilter<"ExerciseLog"> | string
    exerciseName?: StringFilter<"ExerciseLog"> | string
    sets?: IntFilter<"ExerciseLog"> | number
    reps?: StringFilter<"ExerciseLog"> | string
    weight?: FloatNullableFilter<"ExerciseLog"> | number | null
    rir?: IntNullableFilter<"ExerciseLog"> | number | null
    feedback?: StringNullableFilter<"ExerciseLog"> | string | null
    createdAt?: DateTimeFilter<"ExerciseLog"> | Date | string
    updatedAt?: DateTimeFilter<"ExerciseLog"> | Date | string
    trainingSession?: XOR<TrainingSessionScalarRelationFilter, TrainingSessionWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ExerciseLogOrderByWithRelationInput = {
    id?: SortOrder
    trainingSessionId?: SortOrder
    userId?: SortOrder
    exerciseName?: SortOrder
    sets?: SortOrder
    reps?: SortOrder
    weight?: SortOrderInput | SortOrder
    rir?: SortOrderInput | SortOrder
    feedback?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trainingSession?: TrainingSessionOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ExerciseLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExerciseLogWhereInput | ExerciseLogWhereInput[]
    OR?: ExerciseLogWhereInput[]
    NOT?: ExerciseLogWhereInput | ExerciseLogWhereInput[]
    trainingSessionId?: StringFilter<"ExerciseLog"> | string
    userId?: StringFilter<"ExerciseLog"> | string
    exerciseName?: StringFilter<"ExerciseLog"> | string
    sets?: IntFilter<"ExerciseLog"> | number
    reps?: StringFilter<"ExerciseLog"> | string
    weight?: FloatNullableFilter<"ExerciseLog"> | number | null
    rir?: IntNullableFilter<"ExerciseLog"> | number | null
    feedback?: StringNullableFilter<"ExerciseLog"> | string | null
    createdAt?: DateTimeFilter<"ExerciseLog"> | Date | string
    updatedAt?: DateTimeFilter<"ExerciseLog"> | Date | string
    trainingSession?: XOR<TrainingSessionScalarRelationFilter, TrainingSessionWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ExerciseLogOrderByWithAggregationInput = {
    id?: SortOrder
    trainingSessionId?: SortOrder
    userId?: SortOrder
    exerciseName?: SortOrder
    sets?: SortOrder
    reps?: SortOrder
    weight?: SortOrderInput | SortOrder
    rir?: SortOrderInput | SortOrder
    feedback?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ExerciseLogCountOrderByAggregateInput
    _avg?: ExerciseLogAvgOrderByAggregateInput
    _max?: ExerciseLogMaxOrderByAggregateInput
    _min?: ExerciseLogMinOrderByAggregateInput
    _sum?: ExerciseLogSumOrderByAggregateInput
  }

  export type ExerciseLogScalarWhereWithAggregatesInput = {
    AND?: ExerciseLogScalarWhereWithAggregatesInput | ExerciseLogScalarWhereWithAggregatesInput[]
    OR?: ExerciseLogScalarWhereWithAggregatesInput[]
    NOT?: ExerciseLogScalarWhereWithAggregatesInput | ExerciseLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExerciseLog"> | string
    trainingSessionId?: StringWithAggregatesFilter<"ExerciseLog"> | string
    userId?: StringWithAggregatesFilter<"ExerciseLog"> | string
    exerciseName?: StringWithAggregatesFilter<"ExerciseLog"> | string
    sets?: IntWithAggregatesFilter<"ExerciseLog"> | number
    reps?: StringWithAggregatesFilter<"ExerciseLog"> | string
    weight?: FloatNullableWithAggregatesFilter<"ExerciseLog"> | number | null
    rir?: IntNullableWithAggregatesFilter<"ExerciseLog"> | number | null
    feedback?: StringNullableWithAggregatesFilter<"ExerciseLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ExerciseLog"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ExerciseLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    age?: number | null
    weight?: number | null
    height?: number | null
    experience?: string | null
    availability?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    trainingPlans?: TrainingPlanCreateNestedManyWithoutUserInput
    trainingSessions?: TrainingSessionCreateNestedManyWithoutUserInput
    exerciseLogs?: ExerciseLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    age?: number | null
    weight?: number | null
    height?: number | null
    experience?: string | null
    availability?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    trainingPlans?: TrainingPlanUncheckedCreateNestedManyWithoutUserInput
    trainingSessions?: TrainingSessionUncheckedCreateNestedManyWithoutUserInput
    exerciseLogs?: ExerciseLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    trainingPlans?: TrainingPlanUpdateManyWithoutUserNestedInput
    trainingSessions?: TrainingSessionUpdateManyWithoutUserNestedInput
    exerciseLogs?: ExerciseLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    trainingPlans?: TrainingPlanUncheckedUpdateManyWithoutUserNestedInput
    trainingSessions?: TrainingSessionUncheckedUpdateManyWithoutUserNestedInput
    exerciseLogs?: ExerciseLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    age?: number | null
    weight?: number | null
    height?: number | null
    experience?: string | null
    availability?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileCreateInput = {
    id?: string
    fitnessLevel?: string | null
    fitnessGoals?: ProfileCreatefitnessGoalsInput | string[]
    medicalIssues?: ProfileCreatemedicalIssuesInput | string[]
    availableEquipment?: ProfileCreateavailableEquipmentInput | string[]
    trainingPreferences?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfileInput
  }

  export type ProfileUncheckedCreateInput = {
    id?: string
    userId: string
    fitnessLevel?: string | null
    fitnessGoals?: ProfileCreatefitnessGoalsInput | string[]
    medicalIssues?: ProfileCreatemedicalIssuesInput | string[]
    availableEquipment?: ProfileCreateavailableEquipmentInput | string[]
    trainingPreferences?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fitnessLevel?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessGoals?: ProfileUpdatefitnessGoalsInput | string[]
    medicalIssues?: ProfileUpdatemedicalIssuesInput | string[]
    availableEquipment?: ProfileUpdateavailableEquipmentInput | string[]
    trainingPreferences?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fitnessLevel?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessGoals?: ProfileUpdatefitnessGoalsInput | string[]
    medicalIssues?: ProfileUpdatemedicalIssuesInput | string[]
    availableEquipment?: ProfileUpdateavailableEquipmentInput | string[]
    trainingPreferences?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileCreateManyInput = {
    id?: string
    userId: string
    fitnessLevel?: string | null
    fitnessGoals?: ProfileCreatefitnessGoalsInput | string[]
    medicalIssues?: ProfileCreatemedicalIssuesInput | string[]
    availableEquipment?: ProfileCreateavailableEquipmentInput | string[]
    trainingPreferences?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fitnessLevel?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessGoals?: ProfileUpdatefitnessGoalsInput | string[]
    medicalIssues?: ProfileUpdatemedicalIssuesInput | string[]
    availableEquipment?: ProfileUpdateavailableEquipmentInput | string[]
    trainingPreferences?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fitnessLevel?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessGoals?: ProfileUpdatefitnessGoalsInput | string[]
    medicalIssues?: ProfileUpdatemedicalIssuesInput | string[]
    availableEquipment?: ProfileUpdateavailableEquipmentInput | string[]
    trainingPreferences?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingPlanCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    generatedBy?: string
    user: UserCreateNestedOneWithoutTrainingPlansInput
    trainingSessions?: TrainingSessionCreateNestedManyWithoutTrainingPlanInput
  }

  export type TrainingPlanUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    generatedBy?: string
    trainingSessions?: TrainingSessionUncheckedCreateNestedManyWithoutTrainingPlanInput
  }

  export type TrainingPlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    generatedBy?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutTrainingPlansNestedInput
    trainingSessions?: TrainingSessionUpdateManyWithoutTrainingPlanNestedInput
  }

  export type TrainingPlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    generatedBy?: StringFieldUpdateOperationsInput | string
    trainingSessions?: TrainingSessionUncheckedUpdateManyWithoutTrainingPlanNestedInput
  }

  export type TrainingPlanCreateManyInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    generatedBy?: string
  }

  export type TrainingPlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    generatedBy?: StringFieldUpdateOperationsInput | string
  }

  export type TrainingPlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    generatedBy?: StringFieldUpdateOperationsInput | string
  }

  export type TrainingSessionCreateInput = {
    id?: string
    dayOfWeek: number
    feedback?: string | null
    completed?: boolean
    scheduledDate?: Date | string | null
    completedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trainingPlan: TrainingPlanCreateNestedOneWithoutTrainingSessionsInput
    user: UserCreateNestedOneWithoutTrainingSessionsInput
    exerciseLogs?: ExerciseLogCreateNestedManyWithoutTrainingSessionInput
  }

  export type TrainingSessionUncheckedCreateInput = {
    id?: string
    trainingPlanId: string
    userId: string
    dayOfWeek: number
    feedback?: string | null
    completed?: boolean
    scheduledDate?: Date | string | null
    completedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    exerciseLogs?: ExerciseLogUncheckedCreateNestedManyWithoutTrainingSessionInput
  }

  export type TrainingSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainingPlan?: TrainingPlanUpdateOneRequiredWithoutTrainingSessionsNestedInput
    user?: UserUpdateOneRequiredWithoutTrainingSessionsNestedInput
    exerciseLogs?: ExerciseLogUpdateManyWithoutTrainingSessionNestedInput
  }

  export type TrainingSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainingPlanId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exerciseLogs?: ExerciseLogUncheckedUpdateManyWithoutTrainingSessionNestedInput
  }

  export type TrainingSessionCreateManyInput = {
    id?: string
    trainingPlanId: string
    userId: string
    dayOfWeek: number
    feedback?: string | null
    completed?: boolean
    scheduledDate?: Date | string | null
    completedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrainingSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainingPlanId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExerciseLogCreateInput = {
    id?: string
    exerciseName: string
    sets: number
    reps: string
    weight?: number | null
    rir?: number | null
    feedback?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trainingSession: TrainingSessionCreateNestedOneWithoutExerciseLogsInput
    user: UserCreateNestedOneWithoutExerciseLogsInput
  }

  export type ExerciseLogUncheckedCreateInput = {
    id?: string
    trainingSessionId: string
    userId: string
    exerciseName: string
    sets: number
    reps: string
    weight?: number | null
    rir?: number | null
    feedback?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExerciseLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    exerciseName?: StringFieldUpdateOperationsInput | string
    sets?: IntFieldUpdateOperationsInput | number
    reps?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    rir?: NullableIntFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainingSession?: TrainingSessionUpdateOneRequiredWithoutExerciseLogsNestedInput
    user?: UserUpdateOneRequiredWithoutExerciseLogsNestedInput
  }

  export type ExerciseLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainingSessionId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    exerciseName?: StringFieldUpdateOperationsInput | string
    sets?: IntFieldUpdateOperationsInput | number
    reps?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    rir?: NullableIntFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExerciseLogCreateManyInput = {
    id?: string
    trainingSessionId: string
    userId: string
    exerciseName: string
    sets: number
    reps: string
    weight?: number | null
    rir?: number | null
    feedback?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExerciseLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    exerciseName?: StringFieldUpdateOperationsInput | string
    sets?: IntFieldUpdateOperationsInput | number
    reps?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    rir?: NullableIntFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExerciseLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainingSessionId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    exerciseName?: StringFieldUpdateOperationsInput | string
    sets?: IntFieldUpdateOperationsInput | number
    reps?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    rir?: NullableIntFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProfileNullableScalarRelationFilter = {
    is?: ProfileWhereInput | null
    isNot?: ProfileWhereInput | null
  }

  export type TrainingPlanListRelationFilter = {
    every?: TrainingPlanWhereInput
    some?: TrainingPlanWhereInput
    none?: TrainingPlanWhereInput
  }

  export type TrainingSessionListRelationFilter = {
    every?: TrainingSessionWhereInput
    some?: TrainingSessionWhereInput
    none?: TrainingSessionWhereInput
  }

  export type ExerciseLogListRelationFilter = {
    every?: ExerciseLogWhereInput
    some?: ExerciseLogWhereInput
    none?: ExerciseLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TrainingPlanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrainingSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExerciseLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    age?: SortOrder
    weight?: SortOrder
    height?: SortOrder
    experience?: SortOrder
    availability?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    age?: SortOrder
    weight?: SortOrder
    height?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    age?: SortOrder
    weight?: SortOrder
    height?: SortOrder
    experience?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    age?: SortOrder
    weight?: SortOrder
    height?: SortOrder
    experience?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    age?: SortOrder
    weight?: SortOrder
    height?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fitnessLevel?: SortOrder
    fitnessGoals?: SortOrder
    medicalIssues?: SortOrder
    availableEquipment?: SortOrder
    trainingPreferences?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fitnessLevel?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fitnessLevel?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TrainingPlanCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    generatedBy?: SortOrder
  }

  export type TrainingPlanMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    generatedBy?: SortOrder
  }

  export type TrainingPlanMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    generatedBy?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type TrainingPlanScalarRelationFilter = {
    is?: TrainingPlanWhereInput
    isNot?: TrainingPlanWhereInput
  }

  export type TrainingSessionCountOrderByAggregateInput = {
    id?: SortOrder
    trainingPlanId?: SortOrder
    userId?: SortOrder
    dayOfWeek?: SortOrder
    feedback?: SortOrder
    completed?: SortOrder
    scheduledDate?: SortOrder
    completedDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrainingSessionAvgOrderByAggregateInput = {
    dayOfWeek?: SortOrder
  }

  export type TrainingSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    trainingPlanId?: SortOrder
    userId?: SortOrder
    dayOfWeek?: SortOrder
    feedback?: SortOrder
    completed?: SortOrder
    scheduledDate?: SortOrder
    completedDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrainingSessionMinOrderByAggregateInput = {
    id?: SortOrder
    trainingPlanId?: SortOrder
    userId?: SortOrder
    dayOfWeek?: SortOrder
    feedback?: SortOrder
    completed?: SortOrder
    scheduledDate?: SortOrder
    completedDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrainingSessionSumOrderByAggregateInput = {
    dayOfWeek?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TrainingSessionScalarRelationFilter = {
    is?: TrainingSessionWhereInput
    isNot?: TrainingSessionWhereInput
  }

  export type ExerciseLogCountOrderByAggregateInput = {
    id?: SortOrder
    trainingSessionId?: SortOrder
    userId?: SortOrder
    exerciseName?: SortOrder
    sets?: SortOrder
    reps?: SortOrder
    weight?: SortOrder
    rir?: SortOrder
    feedback?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExerciseLogAvgOrderByAggregateInput = {
    sets?: SortOrder
    weight?: SortOrder
    rir?: SortOrder
  }

  export type ExerciseLogMaxOrderByAggregateInput = {
    id?: SortOrder
    trainingSessionId?: SortOrder
    userId?: SortOrder
    exerciseName?: SortOrder
    sets?: SortOrder
    reps?: SortOrder
    weight?: SortOrder
    rir?: SortOrder
    feedback?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExerciseLogMinOrderByAggregateInput = {
    id?: SortOrder
    trainingSessionId?: SortOrder
    userId?: SortOrder
    exerciseName?: SortOrder
    sets?: SortOrder
    reps?: SortOrder
    weight?: SortOrder
    rir?: SortOrder
    feedback?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExerciseLogSumOrderByAggregateInput = {
    sets?: SortOrder
    weight?: SortOrder
    rir?: SortOrder
  }

  export type ProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type TrainingPlanCreateNestedManyWithoutUserInput = {
    create?: XOR<TrainingPlanCreateWithoutUserInput, TrainingPlanUncheckedCreateWithoutUserInput> | TrainingPlanCreateWithoutUserInput[] | TrainingPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrainingPlanCreateOrConnectWithoutUserInput | TrainingPlanCreateOrConnectWithoutUserInput[]
    createMany?: TrainingPlanCreateManyUserInputEnvelope
    connect?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
  }

  export type TrainingSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<TrainingSessionCreateWithoutUserInput, TrainingSessionUncheckedCreateWithoutUserInput> | TrainingSessionCreateWithoutUserInput[] | TrainingSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrainingSessionCreateOrConnectWithoutUserInput | TrainingSessionCreateOrConnectWithoutUserInput[]
    createMany?: TrainingSessionCreateManyUserInputEnvelope
    connect?: TrainingSessionWhereUniqueInput | TrainingSessionWhereUniqueInput[]
  }

  export type ExerciseLogCreateNestedManyWithoutUserInput = {
    create?: XOR<ExerciseLogCreateWithoutUserInput, ExerciseLogUncheckedCreateWithoutUserInput> | ExerciseLogCreateWithoutUserInput[] | ExerciseLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExerciseLogCreateOrConnectWithoutUserInput | ExerciseLogCreateOrConnectWithoutUserInput[]
    createMany?: ExerciseLogCreateManyUserInputEnvelope
    connect?: ExerciseLogWhereUniqueInput | ExerciseLogWhereUniqueInput[]
  }

  export type ProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type TrainingPlanUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TrainingPlanCreateWithoutUserInput, TrainingPlanUncheckedCreateWithoutUserInput> | TrainingPlanCreateWithoutUserInput[] | TrainingPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrainingPlanCreateOrConnectWithoutUserInput | TrainingPlanCreateOrConnectWithoutUserInput[]
    createMany?: TrainingPlanCreateManyUserInputEnvelope
    connect?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
  }

  export type TrainingSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TrainingSessionCreateWithoutUserInput, TrainingSessionUncheckedCreateWithoutUserInput> | TrainingSessionCreateWithoutUserInput[] | TrainingSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrainingSessionCreateOrConnectWithoutUserInput | TrainingSessionCreateOrConnectWithoutUserInput[]
    createMany?: TrainingSessionCreateManyUserInputEnvelope
    connect?: TrainingSessionWhereUniqueInput | TrainingSessionWhereUniqueInput[]
  }

  export type ExerciseLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ExerciseLogCreateWithoutUserInput, ExerciseLogUncheckedCreateWithoutUserInput> | ExerciseLogCreateWithoutUserInput[] | ExerciseLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExerciseLogCreateOrConnectWithoutUserInput | ExerciseLogCreateOrConnectWithoutUserInput[]
    createMany?: ExerciseLogCreateManyUserInputEnvelope
    connect?: ExerciseLogWhereUniqueInput | ExerciseLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutUserInput, ProfileUpdateWithoutUserInput>, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type TrainingPlanUpdateManyWithoutUserNestedInput = {
    create?: XOR<TrainingPlanCreateWithoutUserInput, TrainingPlanUncheckedCreateWithoutUserInput> | TrainingPlanCreateWithoutUserInput[] | TrainingPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrainingPlanCreateOrConnectWithoutUserInput | TrainingPlanCreateOrConnectWithoutUserInput[]
    upsert?: TrainingPlanUpsertWithWhereUniqueWithoutUserInput | TrainingPlanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TrainingPlanCreateManyUserInputEnvelope
    set?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
    disconnect?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
    delete?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
    connect?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
    update?: TrainingPlanUpdateWithWhereUniqueWithoutUserInput | TrainingPlanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TrainingPlanUpdateManyWithWhereWithoutUserInput | TrainingPlanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TrainingPlanScalarWhereInput | TrainingPlanScalarWhereInput[]
  }

  export type TrainingSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<TrainingSessionCreateWithoutUserInput, TrainingSessionUncheckedCreateWithoutUserInput> | TrainingSessionCreateWithoutUserInput[] | TrainingSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrainingSessionCreateOrConnectWithoutUserInput | TrainingSessionCreateOrConnectWithoutUserInput[]
    upsert?: TrainingSessionUpsertWithWhereUniqueWithoutUserInput | TrainingSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TrainingSessionCreateManyUserInputEnvelope
    set?: TrainingSessionWhereUniqueInput | TrainingSessionWhereUniqueInput[]
    disconnect?: TrainingSessionWhereUniqueInput | TrainingSessionWhereUniqueInput[]
    delete?: TrainingSessionWhereUniqueInput | TrainingSessionWhereUniqueInput[]
    connect?: TrainingSessionWhereUniqueInput | TrainingSessionWhereUniqueInput[]
    update?: TrainingSessionUpdateWithWhereUniqueWithoutUserInput | TrainingSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TrainingSessionUpdateManyWithWhereWithoutUserInput | TrainingSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TrainingSessionScalarWhereInput | TrainingSessionScalarWhereInput[]
  }

  export type ExerciseLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<ExerciseLogCreateWithoutUserInput, ExerciseLogUncheckedCreateWithoutUserInput> | ExerciseLogCreateWithoutUserInput[] | ExerciseLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExerciseLogCreateOrConnectWithoutUserInput | ExerciseLogCreateOrConnectWithoutUserInput[]
    upsert?: ExerciseLogUpsertWithWhereUniqueWithoutUserInput | ExerciseLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ExerciseLogCreateManyUserInputEnvelope
    set?: ExerciseLogWhereUniqueInput | ExerciseLogWhereUniqueInput[]
    disconnect?: ExerciseLogWhereUniqueInput | ExerciseLogWhereUniqueInput[]
    delete?: ExerciseLogWhereUniqueInput | ExerciseLogWhereUniqueInput[]
    connect?: ExerciseLogWhereUniqueInput | ExerciseLogWhereUniqueInput[]
    update?: ExerciseLogUpdateWithWhereUniqueWithoutUserInput | ExerciseLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ExerciseLogUpdateManyWithWhereWithoutUserInput | ExerciseLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ExerciseLogScalarWhereInput | ExerciseLogScalarWhereInput[]
  }

  export type ProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutUserInput, ProfileUpdateWithoutUserInput>, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type TrainingPlanUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TrainingPlanCreateWithoutUserInput, TrainingPlanUncheckedCreateWithoutUserInput> | TrainingPlanCreateWithoutUserInput[] | TrainingPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrainingPlanCreateOrConnectWithoutUserInput | TrainingPlanCreateOrConnectWithoutUserInput[]
    upsert?: TrainingPlanUpsertWithWhereUniqueWithoutUserInput | TrainingPlanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TrainingPlanCreateManyUserInputEnvelope
    set?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
    disconnect?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
    delete?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
    connect?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
    update?: TrainingPlanUpdateWithWhereUniqueWithoutUserInput | TrainingPlanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TrainingPlanUpdateManyWithWhereWithoutUserInput | TrainingPlanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TrainingPlanScalarWhereInput | TrainingPlanScalarWhereInput[]
  }

  export type TrainingSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TrainingSessionCreateWithoutUserInput, TrainingSessionUncheckedCreateWithoutUserInput> | TrainingSessionCreateWithoutUserInput[] | TrainingSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrainingSessionCreateOrConnectWithoutUserInput | TrainingSessionCreateOrConnectWithoutUserInput[]
    upsert?: TrainingSessionUpsertWithWhereUniqueWithoutUserInput | TrainingSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TrainingSessionCreateManyUserInputEnvelope
    set?: TrainingSessionWhereUniqueInput | TrainingSessionWhereUniqueInput[]
    disconnect?: TrainingSessionWhereUniqueInput | TrainingSessionWhereUniqueInput[]
    delete?: TrainingSessionWhereUniqueInput | TrainingSessionWhereUniqueInput[]
    connect?: TrainingSessionWhereUniqueInput | TrainingSessionWhereUniqueInput[]
    update?: TrainingSessionUpdateWithWhereUniqueWithoutUserInput | TrainingSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TrainingSessionUpdateManyWithWhereWithoutUserInput | TrainingSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TrainingSessionScalarWhereInput | TrainingSessionScalarWhereInput[]
  }

  export type ExerciseLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ExerciseLogCreateWithoutUserInput, ExerciseLogUncheckedCreateWithoutUserInput> | ExerciseLogCreateWithoutUserInput[] | ExerciseLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExerciseLogCreateOrConnectWithoutUserInput | ExerciseLogCreateOrConnectWithoutUserInput[]
    upsert?: ExerciseLogUpsertWithWhereUniqueWithoutUserInput | ExerciseLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ExerciseLogCreateManyUserInputEnvelope
    set?: ExerciseLogWhereUniqueInput | ExerciseLogWhereUniqueInput[]
    disconnect?: ExerciseLogWhereUniqueInput | ExerciseLogWhereUniqueInput[]
    delete?: ExerciseLogWhereUniqueInput | ExerciseLogWhereUniqueInput[]
    connect?: ExerciseLogWhereUniqueInput | ExerciseLogWhereUniqueInput[]
    update?: ExerciseLogUpdateWithWhereUniqueWithoutUserInput | ExerciseLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ExerciseLogUpdateManyWithWhereWithoutUserInput | ExerciseLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ExerciseLogScalarWhereInput | ExerciseLogScalarWhereInput[]
  }

  export type ProfileCreatefitnessGoalsInput = {
    set: string[]
  }

  export type ProfileCreatemedicalIssuesInput = {
    set: string[]
  }

  export type ProfileCreateavailableEquipmentInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutProfileInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    connect?: UserWhereUniqueInput
  }

  export type ProfileUpdatefitnessGoalsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProfileUpdatemedicalIssuesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProfileUpdateavailableEquipmentInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutProfileNestedInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    upsert?: UserUpsertWithoutProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfileInput, UserUpdateWithoutProfileInput>, UserUncheckedUpdateWithoutProfileInput>
  }

  export type UserCreateNestedOneWithoutTrainingPlansInput = {
    create?: XOR<UserCreateWithoutTrainingPlansInput, UserUncheckedCreateWithoutTrainingPlansInput>
    connectOrCreate?: UserCreateOrConnectWithoutTrainingPlansInput
    connect?: UserWhereUniqueInput
  }

  export type TrainingSessionCreateNestedManyWithoutTrainingPlanInput = {
    create?: XOR<TrainingSessionCreateWithoutTrainingPlanInput, TrainingSessionUncheckedCreateWithoutTrainingPlanInput> | TrainingSessionCreateWithoutTrainingPlanInput[] | TrainingSessionUncheckedCreateWithoutTrainingPlanInput[]
    connectOrCreate?: TrainingSessionCreateOrConnectWithoutTrainingPlanInput | TrainingSessionCreateOrConnectWithoutTrainingPlanInput[]
    createMany?: TrainingSessionCreateManyTrainingPlanInputEnvelope
    connect?: TrainingSessionWhereUniqueInput | TrainingSessionWhereUniqueInput[]
  }

  export type TrainingSessionUncheckedCreateNestedManyWithoutTrainingPlanInput = {
    create?: XOR<TrainingSessionCreateWithoutTrainingPlanInput, TrainingSessionUncheckedCreateWithoutTrainingPlanInput> | TrainingSessionCreateWithoutTrainingPlanInput[] | TrainingSessionUncheckedCreateWithoutTrainingPlanInput[]
    connectOrCreate?: TrainingSessionCreateOrConnectWithoutTrainingPlanInput | TrainingSessionCreateOrConnectWithoutTrainingPlanInput[]
    createMany?: TrainingSessionCreateManyTrainingPlanInputEnvelope
    connect?: TrainingSessionWhereUniqueInput | TrainingSessionWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutTrainingPlansNestedInput = {
    create?: XOR<UserCreateWithoutTrainingPlansInput, UserUncheckedCreateWithoutTrainingPlansInput>
    connectOrCreate?: UserCreateOrConnectWithoutTrainingPlansInput
    upsert?: UserUpsertWithoutTrainingPlansInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTrainingPlansInput, UserUpdateWithoutTrainingPlansInput>, UserUncheckedUpdateWithoutTrainingPlansInput>
  }

  export type TrainingSessionUpdateManyWithoutTrainingPlanNestedInput = {
    create?: XOR<TrainingSessionCreateWithoutTrainingPlanInput, TrainingSessionUncheckedCreateWithoutTrainingPlanInput> | TrainingSessionCreateWithoutTrainingPlanInput[] | TrainingSessionUncheckedCreateWithoutTrainingPlanInput[]
    connectOrCreate?: TrainingSessionCreateOrConnectWithoutTrainingPlanInput | TrainingSessionCreateOrConnectWithoutTrainingPlanInput[]
    upsert?: TrainingSessionUpsertWithWhereUniqueWithoutTrainingPlanInput | TrainingSessionUpsertWithWhereUniqueWithoutTrainingPlanInput[]
    createMany?: TrainingSessionCreateManyTrainingPlanInputEnvelope
    set?: TrainingSessionWhereUniqueInput | TrainingSessionWhereUniqueInput[]
    disconnect?: TrainingSessionWhereUniqueInput | TrainingSessionWhereUniqueInput[]
    delete?: TrainingSessionWhereUniqueInput | TrainingSessionWhereUniqueInput[]
    connect?: TrainingSessionWhereUniqueInput | TrainingSessionWhereUniqueInput[]
    update?: TrainingSessionUpdateWithWhereUniqueWithoutTrainingPlanInput | TrainingSessionUpdateWithWhereUniqueWithoutTrainingPlanInput[]
    updateMany?: TrainingSessionUpdateManyWithWhereWithoutTrainingPlanInput | TrainingSessionUpdateManyWithWhereWithoutTrainingPlanInput[]
    deleteMany?: TrainingSessionScalarWhereInput | TrainingSessionScalarWhereInput[]
  }

  export type TrainingSessionUncheckedUpdateManyWithoutTrainingPlanNestedInput = {
    create?: XOR<TrainingSessionCreateWithoutTrainingPlanInput, TrainingSessionUncheckedCreateWithoutTrainingPlanInput> | TrainingSessionCreateWithoutTrainingPlanInput[] | TrainingSessionUncheckedCreateWithoutTrainingPlanInput[]
    connectOrCreate?: TrainingSessionCreateOrConnectWithoutTrainingPlanInput | TrainingSessionCreateOrConnectWithoutTrainingPlanInput[]
    upsert?: TrainingSessionUpsertWithWhereUniqueWithoutTrainingPlanInput | TrainingSessionUpsertWithWhereUniqueWithoutTrainingPlanInput[]
    createMany?: TrainingSessionCreateManyTrainingPlanInputEnvelope
    set?: TrainingSessionWhereUniqueInput | TrainingSessionWhereUniqueInput[]
    disconnect?: TrainingSessionWhereUniqueInput | TrainingSessionWhereUniqueInput[]
    delete?: TrainingSessionWhereUniqueInput | TrainingSessionWhereUniqueInput[]
    connect?: TrainingSessionWhereUniqueInput | TrainingSessionWhereUniqueInput[]
    update?: TrainingSessionUpdateWithWhereUniqueWithoutTrainingPlanInput | TrainingSessionUpdateWithWhereUniqueWithoutTrainingPlanInput[]
    updateMany?: TrainingSessionUpdateManyWithWhereWithoutTrainingPlanInput | TrainingSessionUpdateManyWithWhereWithoutTrainingPlanInput[]
    deleteMany?: TrainingSessionScalarWhereInput | TrainingSessionScalarWhereInput[]
  }

  export type TrainingPlanCreateNestedOneWithoutTrainingSessionsInput = {
    create?: XOR<TrainingPlanCreateWithoutTrainingSessionsInput, TrainingPlanUncheckedCreateWithoutTrainingSessionsInput>
    connectOrCreate?: TrainingPlanCreateOrConnectWithoutTrainingSessionsInput
    connect?: TrainingPlanWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTrainingSessionsInput = {
    create?: XOR<UserCreateWithoutTrainingSessionsInput, UserUncheckedCreateWithoutTrainingSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTrainingSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type ExerciseLogCreateNestedManyWithoutTrainingSessionInput = {
    create?: XOR<ExerciseLogCreateWithoutTrainingSessionInput, ExerciseLogUncheckedCreateWithoutTrainingSessionInput> | ExerciseLogCreateWithoutTrainingSessionInput[] | ExerciseLogUncheckedCreateWithoutTrainingSessionInput[]
    connectOrCreate?: ExerciseLogCreateOrConnectWithoutTrainingSessionInput | ExerciseLogCreateOrConnectWithoutTrainingSessionInput[]
    createMany?: ExerciseLogCreateManyTrainingSessionInputEnvelope
    connect?: ExerciseLogWhereUniqueInput | ExerciseLogWhereUniqueInput[]
  }

  export type ExerciseLogUncheckedCreateNestedManyWithoutTrainingSessionInput = {
    create?: XOR<ExerciseLogCreateWithoutTrainingSessionInput, ExerciseLogUncheckedCreateWithoutTrainingSessionInput> | ExerciseLogCreateWithoutTrainingSessionInput[] | ExerciseLogUncheckedCreateWithoutTrainingSessionInput[]
    connectOrCreate?: ExerciseLogCreateOrConnectWithoutTrainingSessionInput | ExerciseLogCreateOrConnectWithoutTrainingSessionInput[]
    createMany?: ExerciseLogCreateManyTrainingSessionInputEnvelope
    connect?: ExerciseLogWhereUniqueInput | ExerciseLogWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type TrainingPlanUpdateOneRequiredWithoutTrainingSessionsNestedInput = {
    create?: XOR<TrainingPlanCreateWithoutTrainingSessionsInput, TrainingPlanUncheckedCreateWithoutTrainingSessionsInput>
    connectOrCreate?: TrainingPlanCreateOrConnectWithoutTrainingSessionsInput
    upsert?: TrainingPlanUpsertWithoutTrainingSessionsInput
    connect?: TrainingPlanWhereUniqueInput
    update?: XOR<XOR<TrainingPlanUpdateToOneWithWhereWithoutTrainingSessionsInput, TrainingPlanUpdateWithoutTrainingSessionsInput>, TrainingPlanUncheckedUpdateWithoutTrainingSessionsInput>
  }

  export type UserUpdateOneRequiredWithoutTrainingSessionsNestedInput = {
    create?: XOR<UserCreateWithoutTrainingSessionsInput, UserUncheckedCreateWithoutTrainingSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTrainingSessionsInput
    upsert?: UserUpsertWithoutTrainingSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTrainingSessionsInput, UserUpdateWithoutTrainingSessionsInput>, UserUncheckedUpdateWithoutTrainingSessionsInput>
  }

  export type ExerciseLogUpdateManyWithoutTrainingSessionNestedInput = {
    create?: XOR<ExerciseLogCreateWithoutTrainingSessionInput, ExerciseLogUncheckedCreateWithoutTrainingSessionInput> | ExerciseLogCreateWithoutTrainingSessionInput[] | ExerciseLogUncheckedCreateWithoutTrainingSessionInput[]
    connectOrCreate?: ExerciseLogCreateOrConnectWithoutTrainingSessionInput | ExerciseLogCreateOrConnectWithoutTrainingSessionInput[]
    upsert?: ExerciseLogUpsertWithWhereUniqueWithoutTrainingSessionInput | ExerciseLogUpsertWithWhereUniqueWithoutTrainingSessionInput[]
    createMany?: ExerciseLogCreateManyTrainingSessionInputEnvelope
    set?: ExerciseLogWhereUniqueInput | ExerciseLogWhereUniqueInput[]
    disconnect?: ExerciseLogWhereUniqueInput | ExerciseLogWhereUniqueInput[]
    delete?: ExerciseLogWhereUniqueInput | ExerciseLogWhereUniqueInput[]
    connect?: ExerciseLogWhereUniqueInput | ExerciseLogWhereUniqueInput[]
    update?: ExerciseLogUpdateWithWhereUniqueWithoutTrainingSessionInput | ExerciseLogUpdateWithWhereUniqueWithoutTrainingSessionInput[]
    updateMany?: ExerciseLogUpdateManyWithWhereWithoutTrainingSessionInput | ExerciseLogUpdateManyWithWhereWithoutTrainingSessionInput[]
    deleteMany?: ExerciseLogScalarWhereInput | ExerciseLogScalarWhereInput[]
  }

  export type ExerciseLogUncheckedUpdateManyWithoutTrainingSessionNestedInput = {
    create?: XOR<ExerciseLogCreateWithoutTrainingSessionInput, ExerciseLogUncheckedCreateWithoutTrainingSessionInput> | ExerciseLogCreateWithoutTrainingSessionInput[] | ExerciseLogUncheckedCreateWithoutTrainingSessionInput[]
    connectOrCreate?: ExerciseLogCreateOrConnectWithoutTrainingSessionInput | ExerciseLogCreateOrConnectWithoutTrainingSessionInput[]
    upsert?: ExerciseLogUpsertWithWhereUniqueWithoutTrainingSessionInput | ExerciseLogUpsertWithWhereUniqueWithoutTrainingSessionInput[]
    createMany?: ExerciseLogCreateManyTrainingSessionInputEnvelope
    set?: ExerciseLogWhereUniqueInput | ExerciseLogWhereUniqueInput[]
    disconnect?: ExerciseLogWhereUniqueInput | ExerciseLogWhereUniqueInput[]
    delete?: ExerciseLogWhereUniqueInput | ExerciseLogWhereUniqueInput[]
    connect?: ExerciseLogWhereUniqueInput | ExerciseLogWhereUniqueInput[]
    update?: ExerciseLogUpdateWithWhereUniqueWithoutTrainingSessionInput | ExerciseLogUpdateWithWhereUniqueWithoutTrainingSessionInput[]
    updateMany?: ExerciseLogUpdateManyWithWhereWithoutTrainingSessionInput | ExerciseLogUpdateManyWithWhereWithoutTrainingSessionInput[]
    deleteMany?: ExerciseLogScalarWhereInput | ExerciseLogScalarWhereInput[]
  }

  export type TrainingSessionCreateNestedOneWithoutExerciseLogsInput = {
    create?: XOR<TrainingSessionCreateWithoutExerciseLogsInput, TrainingSessionUncheckedCreateWithoutExerciseLogsInput>
    connectOrCreate?: TrainingSessionCreateOrConnectWithoutExerciseLogsInput
    connect?: TrainingSessionWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutExerciseLogsInput = {
    create?: XOR<UserCreateWithoutExerciseLogsInput, UserUncheckedCreateWithoutExerciseLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutExerciseLogsInput
    connect?: UserWhereUniqueInput
  }

  export type TrainingSessionUpdateOneRequiredWithoutExerciseLogsNestedInput = {
    create?: XOR<TrainingSessionCreateWithoutExerciseLogsInput, TrainingSessionUncheckedCreateWithoutExerciseLogsInput>
    connectOrCreate?: TrainingSessionCreateOrConnectWithoutExerciseLogsInput
    upsert?: TrainingSessionUpsertWithoutExerciseLogsInput
    connect?: TrainingSessionWhereUniqueInput
    update?: XOR<XOR<TrainingSessionUpdateToOneWithWhereWithoutExerciseLogsInput, TrainingSessionUpdateWithoutExerciseLogsInput>, TrainingSessionUncheckedUpdateWithoutExerciseLogsInput>
  }

  export type UserUpdateOneRequiredWithoutExerciseLogsNestedInput = {
    create?: XOR<UserCreateWithoutExerciseLogsInput, UserUncheckedCreateWithoutExerciseLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutExerciseLogsInput
    upsert?: UserUpsertWithoutExerciseLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutExerciseLogsInput, UserUpdateWithoutExerciseLogsInput>, UserUncheckedUpdateWithoutExerciseLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ProfileCreateWithoutUserInput = {
    id?: string
    fitnessLevel?: string | null
    fitnessGoals?: ProfileCreatefitnessGoalsInput | string[]
    medicalIssues?: ProfileCreatemedicalIssuesInput | string[]
    availableEquipment?: ProfileCreateavailableEquipmentInput | string[]
    trainingPreferences?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUncheckedCreateWithoutUserInput = {
    id?: string
    fitnessLevel?: string | null
    fitnessGoals?: ProfileCreatefitnessGoalsInput | string[]
    medicalIssues?: ProfileCreatemedicalIssuesInput | string[]
    availableEquipment?: ProfileCreateavailableEquipmentInput | string[]
    trainingPreferences?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileCreateOrConnectWithoutUserInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
  }

  export type TrainingPlanCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    generatedBy?: string
    trainingSessions?: TrainingSessionCreateNestedManyWithoutTrainingPlanInput
  }

  export type TrainingPlanUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    generatedBy?: string
    trainingSessions?: TrainingSessionUncheckedCreateNestedManyWithoutTrainingPlanInput
  }

  export type TrainingPlanCreateOrConnectWithoutUserInput = {
    where: TrainingPlanWhereUniqueInput
    create: XOR<TrainingPlanCreateWithoutUserInput, TrainingPlanUncheckedCreateWithoutUserInput>
  }

  export type TrainingPlanCreateManyUserInputEnvelope = {
    data: TrainingPlanCreateManyUserInput | TrainingPlanCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TrainingSessionCreateWithoutUserInput = {
    id?: string
    dayOfWeek: number
    feedback?: string | null
    completed?: boolean
    scheduledDate?: Date | string | null
    completedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trainingPlan: TrainingPlanCreateNestedOneWithoutTrainingSessionsInput
    exerciseLogs?: ExerciseLogCreateNestedManyWithoutTrainingSessionInput
  }

  export type TrainingSessionUncheckedCreateWithoutUserInput = {
    id?: string
    trainingPlanId: string
    dayOfWeek: number
    feedback?: string | null
    completed?: boolean
    scheduledDate?: Date | string | null
    completedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    exerciseLogs?: ExerciseLogUncheckedCreateNestedManyWithoutTrainingSessionInput
  }

  export type TrainingSessionCreateOrConnectWithoutUserInput = {
    where: TrainingSessionWhereUniqueInput
    create: XOR<TrainingSessionCreateWithoutUserInput, TrainingSessionUncheckedCreateWithoutUserInput>
  }

  export type TrainingSessionCreateManyUserInputEnvelope = {
    data: TrainingSessionCreateManyUserInput | TrainingSessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ExerciseLogCreateWithoutUserInput = {
    id?: string
    exerciseName: string
    sets: number
    reps: string
    weight?: number | null
    rir?: number | null
    feedback?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trainingSession: TrainingSessionCreateNestedOneWithoutExerciseLogsInput
  }

  export type ExerciseLogUncheckedCreateWithoutUserInput = {
    id?: string
    trainingSessionId: string
    exerciseName: string
    sets: number
    reps: string
    weight?: number | null
    rir?: number | null
    feedback?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExerciseLogCreateOrConnectWithoutUserInput = {
    where: ExerciseLogWhereUniqueInput
    create: XOR<ExerciseLogCreateWithoutUserInput, ExerciseLogUncheckedCreateWithoutUserInput>
  }

  export type ExerciseLogCreateManyUserInputEnvelope = {
    data: ExerciseLogCreateManyUserInput | ExerciseLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithoutUserInput = {
    update: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type ProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fitnessLevel?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessGoals?: ProfileUpdatefitnessGoalsInput | string[]
    medicalIssues?: ProfileUpdatemedicalIssuesInput | string[]
    availableEquipment?: ProfileUpdateavailableEquipmentInput | string[]
    trainingPreferences?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fitnessLevel?: NullableStringFieldUpdateOperationsInput | string | null
    fitnessGoals?: ProfileUpdatefitnessGoalsInput | string[]
    medicalIssues?: ProfileUpdatemedicalIssuesInput | string[]
    availableEquipment?: ProfileUpdateavailableEquipmentInput | string[]
    trainingPreferences?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingPlanUpsertWithWhereUniqueWithoutUserInput = {
    where: TrainingPlanWhereUniqueInput
    update: XOR<TrainingPlanUpdateWithoutUserInput, TrainingPlanUncheckedUpdateWithoutUserInput>
    create: XOR<TrainingPlanCreateWithoutUserInput, TrainingPlanUncheckedCreateWithoutUserInput>
  }

  export type TrainingPlanUpdateWithWhereUniqueWithoutUserInput = {
    where: TrainingPlanWhereUniqueInput
    data: XOR<TrainingPlanUpdateWithoutUserInput, TrainingPlanUncheckedUpdateWithoutUserInput>
  }

  export type TrainingPlanUpdateManyWithWhereWithoutUserInput = {
    where: TrainingPlanScalarWhereInput
    data: XOR<TrainingPlanUpdateManyMutationInput, TrainingPlanUncheckedUpdateManyWithoutUserInput>
  }

  export type TrainingPlanScalarWhereInput = {
    AND?: TrainingPlanScalarWhereInput | TrainingPlanScalarWhereInput[]
    OR?: TrainingPlanScalarWhereInput[]
    NOT?: TrainingPlanScalarWhereInput | TrainingPlanScalarWhereInput[]
    id?: StringFilter<"TrainingPlan"> | string
    userId?: StringFilter<"TrainingPlan"> | string
    name?: StringFilter<"TrainingPlan"> | string
    description?: StringNullableFilter<"TrainingPlan"> | string | null
    createdAt?: DateTimeFilter<"TrainingPlan"> | Date | string
    updatedAt?: DateTimeFilter<"TrainingPlan"> | Date | string
    isActive?: BoolFilter<"TrainingPlan"> | boolean
    generatedBy?: StringFilter<"TrainingPlan"> | string
  }

  export type TrainingSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: TrainingSessionWhereUniqueInput
    update: XOR<TrainingSessionUpdateWithoutUserInput, TrainingSessionUncheckedUpdateWithoutUserInput>
    create: XOR<TrainingSessionCreateWithoutUserInput, TrainingSessionUncheckedCreateWithoutUserInput>
  }

  export type TrainingSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: TrainingSessionWhereUniqueInput
    data: XOR<TrainingSessionUpdateWithoutUserInput, TrainingSessionUncheckedUpdateWithoutUserInput>
  }

  export type TrainingSessionUpdateManyWithWhereWithoutUserInput = {
    where: TrainingSessionScalarWhereInput
    data: XOR<TrainingSessionUpdateManyMutationInput, TrainingSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type TrainingSessionScalarWhereInput = {
    AND?: TrainingSessionScalarWhereInput | TrainingSessionScalarWhereInput[]
    OR?: TrainingSessionScalarWhereInput[]
    NOT?: TrainingSessionScalarWhereInput | TrainingSessionScalarWhereInput[]
    id?: StringFilter<"TrainingSession"> | string
    trainingPlanId?: StringFilter<"TrainingSession"> | string
    userId?: StringFilter<"TrainingSession"> | string
    dayOfWeek?: IntFilter<"TrainingSession"> | number
    feedback?: StringNullableFilter<"TrainingSession"> | string | null
    completed?: BoolFilter<"TrainingSession"> | boolean
    scheduledDate?: DateTimeNullableFilter<"TrainingSession"> | Date | string | null
    completedDate?: DateTimeNullableFilter<"TrainingSession"> | Date | string | null
    createdAt?: DateTimeFilter<"TrainingSession"> | Date | string
    updatedAt?: DateTimeFilter<"TrainingSession"> | Date | string
  }

  export type ExerciseLogUpsertWithWhereUniqueWithoutUserInput = {
    where: ExerciseLogWhereUniqueInput
    update: XOR<ExerciseLogUpdateWithoutUserInput, ExerciseLogUncheckedUpdateWithoutUserInput>
    create: XOR<ExerciseLogCreateWithoutUserInput, ExerciseLogUncheckedCreateWithoutUserInput>
  }

  export type ExerciseLogUpdateWithWhereUniqueWithoutUserInput = {
    where: ExerciseLogWhereUniqueInput
    data: XOR<ExerciseLogUpdateWithoutUserInput, ExerciseLogUncheckedUpdateWithoutUserInput>
  }

  export type ExerciseLogUpdateManyWithWhereWithoutUserInput = {
    where: ExerciseLogScalarWhereInput
    data: XOR<ExerciseLogUpdateManyMutationInput, ExerciseLogUncheckedUpdateManyWithoutUserInput>
  }

  export type ExerciseLogScalarWhereInput = {
    AND?: ExerciseLogScalarWhereInput | ExerciseLogScalarWhereInput[]
    OR?: ExerciseLogScalarWhereInput[]
    NOT?: ExerciseLogScalarWhereInput | ExerciseLogScalarWhereInput[]
    id?: StringFilter<"ExerciseLog"> | string
    trainingSessionId?: StringFilter<"ExerciseLog"> | string
    userId?: StringFilter<"ExerciseLog"> | string
    exerciseName?: StringFilter<"ExerciseLog"> | string
    sets?: IntFilter<"ExerciseLog"> | number
    reps?: StringFilter<"ExerciseLog"> | string
    weight?: FloatNullableFilter<"ExerciseLog"> | number | null
    rir?: IntNullableFilter<"ExerciseLog"> | number | null
    feedback?: StringNullableFilter<"ExerciseLog"> | string | null
    createdAt?: DateTimeFilter<"ExerciseLog"> | Date | string
    updatedAt?: DateTimeFilter<"ExerciseLog"> | Date | string
  }

  export type UserCreateWithoutProfileInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    age?: number | null
    weight?: number | null
    height?: number | null
    experience?: string | null
    availability?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    trainingPlans?: TrainingPlanCreateNestedManyWithoutUserInput
    trainingSessions?: TrainingSessionCreateNestedManyWithoutUserInput
    exerciseLogs?: ExerciseLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProfileInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    age?: number | null
    weight?: number | null
    height?: number | null
    experience?: string | null
    availability?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    trainingPlans?: TrainingPlanUncheckedCreateNestedManyWithoutUserInput
    trainingSessions?: TrainingSessionUncheckedCreateNestedManyWithoutUserInput
    exerciseLogs?: ExerciseLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
  }

  export type UserUpsertWithoutProfileInput = {
    update: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
  }

  export type UserUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainingPlans?: TrainingPlanUpdateManyWithoutUserNestedInput
    trainingSessions?: TrainingSessionUpdateManyWithoutUserNestedInput
    exerciseLogs?: ExerciseLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainingPlans?: TrainingPlanUncheckedUpdateManyWithoutUserNestedInput
    trainingSessions?: TrainingSessionUncheckedUpdateManyWithoutUserNestedInput
    exerciseLogs?: ExerciseLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutTrainingPlansInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    age?: number | null
    weight?: number | null
    height?: number | null
    experience?: string | null
    availability?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    trainingSessions?: TrainingSessionCreateNestedManyWithoutUserInput
    exerciseLogs?: ExerciseLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTrainingPlansInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    age?: number | null
    weight?: number | null
    height?: number | null
    experience?: string | null
    availability?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    trainingSessions?: TrainingSessionUncheckedCreateNestedManyWithoutUserInput
    exerciseLogs?: ExerciseLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTrainingPlansInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTrainingPlansInput, UserUncheckedCreateWithoutTrainingPlansInput>
  }

  export type TrainingSessionCreateWithoutTrainingPlanInput = {
    id?: string
    dayOfWeek: number
    feedback?: string | null
    completed?: boolean
    scheduledDate?: Date | string | null
    completedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTrainingSessionsInput
    exerciseLogs?: ExerciseLogCreateNestedManyWithoutTrainingSessionInput
  }

  export type TrainingSessionUncheckedCreateWithoutTrainingPlanInput = {
    id?: string
    userId: string
    dayOfWeek: number
    feedback?: string | null
    completed?: boolean
    scheduledDate?: Date | string | null
    completedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    exerciseLogs?: ExerciseLogUncheckedCreateNestedManyWithoutTrainingSessionInput
  }

  export type TrainingSessionCreateOrConnectWithoutTrainingPlanInput = {
    where: TrainingSessionWhereUniqueInput
    create: XOR<TrainingSessionCreateWithoutTrainingPlanInput, TrainingSessionUncheckedCreateWithoutTrainingPlanInput>
  }

  export type TrainingSessionCreateManyTrainingPlanInputEnvelope = {
    data: TrainingSessionCreateManyTrainingPlanInput | TrainingSessionCreateManyTrainingPlanInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTrainingPlansInput = {
    update: XOR<UserUpdateWithoutTrainingPlansInput, UserUncheckedUpdateWithoutTrainingPlansInput>
    create: XOR<UserCreateWithoutTrainingPlansInput, UserUncheckedCreateWithoutTrainingPlansInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTrainingPlansInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTrainingPlansInput, UserUncheckedUpdateWithoutTrainingPlansInput>
  }

  export type UserUpdateWithoutTrainingPlansInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    trainingSessions?: TrainingSessionUpdateManyWithoutUserNestedInput
    exerciseLogs?: ExerciseLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTrainingPlansInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    trainingSessions?: TrainingSessionUncheckedUpdateManyWithoutUserNestedInput
    exerciseLogs?: ExerciseLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TrainingSessionUpsertWithWhereUniqueWithoutTrainingPlanInput = {
    where: TrainingSessionWhereUniqueInput
    update: XOR<TrainingSessionUpdateWithoutTrainingPlanInput, TrainingSessionUncheckedUpdateWithoutTrainingPlanInput>
    create: XOR<TrainingSessionCreateWithoutTrainingPlanInput, TrainingSessionUncheckedCreateWithoutTrainingPlanInput>
  }

  export type TrainingSessionUpdateWithWhereUniqueWithoutTrainingPlanInput = {
    where: TrainingSessionWhereUniqueInput
    data: XOR<TrainingSessionUpdateWithoutTrainingPlanInput, TrainingSessionUncheckedUpdateWithoutTrainingPlanInput>
  }

  export type TrainingSessionUpdateManyWithWhereWithoutTrainingPlanInput = {
    where: TrainingSessionScalarWhereInput
    data: XOR<TrainingSessionUpdateManyMutationInput, TrainingSessionUncheckedUpdateManyWithoutTrainingPlanInput>
  }

  export type TrainingPlanCreateWithoutTrainingSessionsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    generatedBy?: string
    user: UserCreateNestedOneWithoutTrainingPlansInput
  }

  export type TrainingPlanUncheckedCreateWithoutTrainingSessionsInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    generatedBy?: string
  }

  export type TrainingPlanCreateOrConnectWithoutTrainingSessionsInput = {
    where: TrainingPlanWhereUniqueInput
    create: XOR<TrainingPlanCreateWithoutTrainingSessionsInput, TrainingPlanUncheckedCreateWithoutTrainingSessionsInput>
  }

  export type UserCreateWithoutTrainingSessionsInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    age?: number | null
    weight?: number | null
    height?: number | null
    experience?: string | null
    availability?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    trainingPlans?: TrainingPlanCreateNestedManyWithoutUserInput
    exerciseLogs?: ExerciseLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTrainingSessionsInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    age?: number | null
    weight?: number | null
    height?: number | null
    experience?: string | null
    availability?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    trainingPlans?: TrainingPlanUncheckedCreateNestedManyWithoutUserInput
    exerciseLogs?: ExerciseLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTrainingSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTrainingSessionsInput, UserUncheckedCreateWithoutTrainingSessionsInput>
  }

  export type ExerciseLogCreateWithoutTrainingSessionInput = {
    id?: string
    exerciseName: string
    sets: number
    reps: string
    weight?: number | null
    rir?: number | null
    feedback?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutExerciseLogsInput
  }

  export type ExerciseLogUncheckedCreateWithoutTrainingSessionInput = {
    id?: string
    userId: string
    exerciseName: string
    sets: number
    reps: string
    weight?: number | null
    rir?: number | null
    feedback?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExerciseLogCreateOrConnectWithoutTrainingSessionInput = {
    where: ExerciseLogWhereUniqueInput
    create: XOR<ExerciseLogCreateWithoutTrainingSessionInput, ExerciseLogUncheckedCreateWithoutTrainingSessionInput>
  }

  export type ExerciseLogCreateManyTrainingSessionInputEnvelope = {
    data: ExerciseLogCreateManyTrainingSessionInput | ExerciseLogCreateManyTrainingSessionInput[]
    skipDuplicates?: boolean
  }

  export type TrainingPlanUpsertWithoutTrainingSessionsInput = {
    update: XOR<TrainingPlanUpdateWithoutTrainingSessionsInput, TrainingPlanUncheckedUpdateWithoutTrainingSessionsInput>
    create: XOR<TrainingPlanCreateWithoutTrainingSessionsInput, TrainingPlanUncheckedCreateWithoutTrainingSessionsInput>
    where?: TrainingPlanWhereInput
  }

  export type TrainingPlanUpdateToOneWithWhereWithoutTrainingSessionsInput = {
    where?: TrainingPlanWhereInput
    data: XOR<TrainingPlanUpdateWithoutTrainingSessionsInput, TrainingPlanUncheckedUpdateWithoutTrainingSessionsInput>
  }

  export type TrainingPlanUpdateWithoutTrainingSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    generatedBy?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutTrainingPlansNestedInput
  }

  export type TrainingPlanUncheckedUpdateWithoutTrainingSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    generatedBy?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpsertWithoutTrainingSessionsInput = {
    update: XOR<UserUpdateWithoutTrainingSessionsInput, UserUncheckedUpdateWithoutTrainingSessionsInput>
    create: XOR<UserCreateWithoutTrainingSessionsInput, UserUncheckedCreateWithoutTrainingSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTrainingSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTrainingSessionsInput, UserUncheckedUpdateWithoutTrainingSessionsInput>
  }

  export type UserUpdateWithoutTrainingSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    trainingPlans?: TrainingPlanUpdateManyWithoutUserNestedInput
    exerciseLogs?: ExerciseLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTrainingSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    trainingPlans?: TrainingPlanUncheckedUpdateManyWithoutUserNestedInput
    exerciseLogs?: ExerciseLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ExerciseLogUpsertWithWhereUniqueWithoutTrainingSessionInput = {
    where: ExerciseLogWhereUniqueInput
    update: XOR<ExerciseLogUpdateWithoutTrainingSessionInput, ExerciseLogUncheckedUpdateWithoutTrainingSessionInput>
    create: XOR<ExerciseLogCreateWithoutTrainingSessionInput, ExerciseLogUncheckedCreateWithoutTrainingSessionInput>
  }

  export type ExerciseLogUpdateWithWhereUniqueWithoutTrainingSessionInput = {
    where: ExerciseLogWhereUniqueInput
    data: XOR<ExerciseLogUpdateWithoutTrainingSessionInput, ExerciseLogUncheckedUpdateWithoutTrainingSessionInput>
  }

  export type ExerciseLogUpdateManyWithWhereWithoutTrainingSessionInput = {
    where: ExerciseLogScalarWhereInput
    data: XOR<ExerciseLogUpdateManyMutationInput, ExerciseLogUncheckedUpdateManyWithoutTrainingSessionInput>
  }

  export type TrainingSessionCreateWithoutExerciseLogsInput = {
    id?: string
    dayOfWeek: number
    feedback?: string | null
    completed?: boolean
    scheduledDate?: Date | string | null
    completedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trainingPlan: TrainingPlanCreateNestedOneWithoutTrainingSessionsInput
    user: UserCreateNestedOneWithoutTrainingSessionsInput
  }

  export type TrainingSessionUncheckedCreateWithoutExerciseLogsInput = {
    id?: string
    trainingPlanId: string
    userId: string
    dayOfWeek: number
    feedback?: string | null
    completed?: boolean
    scheduledDate?: Date | string | null
    completedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrainingSessionCreateOrConnectWithoutExerciseLogsInput = {
    where: TrainingSessionWhereUniqueInput
    create: XOR<TrainingSessionCreateWithoutExerciseLogsInput, TrainingSessionUncheckedCreateWithoutExerciseLogsInput>
  }

  export type UserCreateWithoutExerciseLogsInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    age?: number | null
    weight?: number | null
    height?: number | null
    experience?: string | null
    availability?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    trainingPlans?: TrainingPlanCreateNestedManyWithoutUserInput
    trainingSessions?: TrainingSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutExerciseLogsInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    age?: number | null
    weight?: number | null
    height?: number | null
    experience?: string | null
    availability?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    trainingPlans?: TrainingPlanUncheckedCreateNestedManyWithoutUserInput
    trainingSessions?: TrainingSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutExerciseLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutExerciseLogsInput, UserUncheckedCreateWithoutExerciseLogsInput>
  }

  export type TrainingSessionUpsertWithoutExerciseLogsInput = {
    update: XOR<TrainingSessionUpdateWithoutExerciseLogsInput, TrainingSessionUncheckedUpdateWithoutExerciseLogsInput>
    create: XOR<TrainingSessionCreateWithoutExerciseLogsInput, TrainingSessionUncheckedCreateWithoutExerciseLogsInput>
    where?: TrainingSessionWhereInput
  }

  export type TrainingSessionUpdateToOneWithWhereWithoutExerciseLogsInput = {
    where?: TrainingSessionWhereInput
    data: XOR<TrainingSessionUpdateWithoutExerciseLogsInput, TrainingSessionUncheckedUpdateWithoutExerciseLogsInput>
  }

  export type TrainingSessionUpdateWithoutExerciseLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainingPlan?: TrainingPlanUpdateOneRequiredWithoutTrainingSessionsNestedInput
    user?: UserUpdateOneRequiredWithoutTrainingSessionsNestedInput
  }

  export type TrainingSessionUncheckedUpdateWithoutExerciseLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainingPlanId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutExerciseLogsInput = {
    update: XOR<UserUpdateWithoutExerciseLogsInput, UserUncheckedUpdateWithoutExerciseLogsInput>
    create: XOR<UserCreateWithoutExerciseLogsInput, UserUncheckedCreateWithoutExerciseLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutExerciseLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutExerciseLogsInput, UserUncheckedUpdateWithoutExerciseLogsInput>
  }

  export type UserUpdateWithoutExerciseLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    trainingPlans?: TrainingPlanUpdateManyWithoutUserNestedInput
    trainingSessions?: TrainingSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutExerciseLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    trainingPlans?: TrainingPlanUncheckedUpdateManyWithoutUserNestedInput
    trainingSessions?: TrainingSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TrainingPlanCreateManyUserInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    generatedBy?: string
  }

  export type TrainingSessionCreateManyUserInput = {
    id?: string
    trainingPlanId: string
    dayOfWeek: number
    feedback?: string | null
    completed?: boolean
    scheduledDate?: Date | string | null
    completedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExerciseLogCreateManyUserInput = {
    id?: string
    trainingSessionId: string
    exerciseName: string
    sets: number
    reps: string
    weight?: number | null
    rir?: number | null
    feedback?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrainingPlanUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    generatedBy?: StringFieldUpdateOperationsInput | string
    trainingSessions?: TrainingSessionUpdateManyWithoutTrainingPlanNestedInput
  }

  export type TrainingPlanUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    generatedBy?: StringFieldUpdateOperationsInput | string
    trainingSessions?: TrainingSessionUncheckedUpdateManyWithoutTrainingPlanNestedInput
  }

  export type TrainingPlanUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    generatedBy?: StringFieldUpdateOperationsInput | string
  }

  export type TrainingSessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainingPlan?: TrainingPlanUpdateOneRequiredWithoutTrainingSessionsNestedInput
    exerciseLogs?: ExerciseLogUpdateManyWithoutTrainingSessionNestedInput
  }

  export type TrainingSessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainingPlanId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exerciseLogs?: ExerciseLogUncheckedUpdateManyWithoutTrainingSessionNestedInput
  }

  export type TrainingSessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainingPlanId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExerciseLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    exerciseName?: StringFieldUpdateOperationsInput | string
    sets?: IntFieldUpdateOperationsInput | number
    reps?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    rir?: NullableIntFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainingSession?: TrainingSessionUpdateOneRequiredWithoutExerciseLogsNestedInput
  }

  export type ExerciseLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainingSessionId?: StringFieldUpdateOperationsInput | string
    exerciseName?: StringFieldUpdateOperationsInput | string
    sets?: IntFieldUpdateOperationsInput | number
    reps?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    rir?: NullableIntFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExerciseLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainingSessionId?: StringFieldUpdateOperationsInput | string
    exerciseName?: StringFieldUpdateOperationsInput | string
    sets?: IntFieldUpdateOperationsInput | number
    reps?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    rir?: NullableIntFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingSessionCreateManyTrainingPlanInput = {
    id?: string
    userId: string
    dayOfWeek: number
    feedback?: string | null
    completed?: boolean
    scheduledDate?: Date | string | null
    completedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrainingSessionUpdateWithoutTrainingPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTrainingSessionsNestedInput
    exerciseLogs?: ExerciseLogUpdateManyWithoutTrainingSessionNestedInput
  }

  export type TrainingSessionUncheckedUpdateWithoutTrainingPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exerciseLogs?: ExerciseLogUncheckedUpdateManyWithoutTrainingSessionNestedInput
  }

  export type TrainingSessionUncheckedUpdateManyWithoutTrainingPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    scheduledDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExerciseLogCreateManyTrainingSessionInput = {
    id?: string
    userId: string
    exerciseName: string
    sets: number
    reps: string
    weight?: number | null
    rir?: number | null
    feedback?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExerciseLogUpdateWithoutTrainingSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    exerciseName?: StringFieldUpdateOperationsInput | string
    sets?: IntFieldUpdateOperationsInput | number
    reps?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    rir?: NullableIntFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutExerciseLogsNestedInput
  }

  export type ExerciseLogUncheckedUpdateWithoutTrainingSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    exerciseName?: StringFieldUpdateOperationsInput | string
    sets?: IntFieldUpdateOperationsInput | number
    reps?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    rir?: NullableIntFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExerciseLogUncheckedUpdateManyWithoutTrainingSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    exerciseName?: StringFieldUpdateOperationsInput | string
    sets?: IntFieldUpdateOperationsInput | number
    reps?: StringFieldUpdateOperationsInput | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    rir?: NullableIntFieldUpdateOperationsInput | number | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}