
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Trade
 * 
 */
export type Trade = $Result.DefaultSelection<Prisma.$TradePayload>
/**
 * Model PreTradeChecklist
 * 
 */
export type PreTradeChecklist = $Result.DefaultSelection<Prisma.$PreTradeChecklistPayload>
/**
 * Model Mistake
 * 
 */
export type Mistake = $Result.DefaultSelection<Prisma.$MistakePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Sessions
 * const sessions = await prisma.session.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Sessions
   * const sessions = await prisma.session.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trade`: Exposes CRUD operations for the **Trade** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trades
    * const trades = await prisma.trade.findMany()
    * ```
    */
  get trade(): Prisma.TradeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.preTradeChecklist`: Exposes CRUD operations for the **PreTradeChecklist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PreTradeChecklists
    * const preTradeChecklists = await prisma.preTradeChecklist.findMany()
    * ```
    */
  get preTradeChecklist(): Prisma.PreTradeChecklistDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mistake`: Exposes CRUD operations for the **Mistake** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mistakes
    * const mistakes = await prisma.mistake.findMany()
    * ```
    */
  get mistake(): Prisma.MistakeDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.6.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    Session: 'Session',
    Trade: 'Trade',
    PreTradeChecklist: 'PreTradeChecklist',
    Mistake: 'Mistake'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "session" | "trade" | "preTradeChecklist" | "mistake"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Trade: {
        payload: Prisma.$TradePayload<ExtArgs>
        fields: Prisma.TradeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TradeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TradeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          findFirst: {
            args: Prisma.TradeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TradeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          findMany: {
            args: Prisma.TradeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          create: {
            args: Prisma.TradeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          createMany: {
            args: Prisma.TradeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TradeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          delete: {
            args: Prisma.TradeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          update: {
            args: Prisma.TradeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          deleteMany: {
            args: Prisma.TradeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TradeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TradeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          upsert: {
            args: Prisma.TradeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          aggregate: {
            args: Prisma.TradeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrade>
          }
          groupBy: {
            args: Prisma.TradeGroupByArgs<ExtArgs>
            result: $Utils.Optional<TradeGroupByOutputType>[]
          }
          count: {
            args: Prisma.TradeCountArgs<ExtArgs>
            result: $Utils.Optional<TradeCountAggregateOutputType> | number
          }
        }
      }
      PreTradeChecklist: {
        payload: Prisma.$PreTradeChecklistPayload<ExtArgs>
        fields: Prisma.PreTradeChecklistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PreTradeChecklistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreTradeChecklistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PreTradeChecklistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreTradeChecklistPayload>
          }
          findFirst: {
            args: Prisma.PreTradeChecklistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreTradeChecklistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PreTradeChecklistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreTradeChecklistPayload>
          }
          findMany: {
            args: Prisma.PreTradeChecklistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreTradeChecklistPayload>[]
          }
          create: {
            args: Prisma.PreTradeChecklistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreTradeChecklistPayload>
          }
          createMany: {
            args: Prisma.PreTradeChecklistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PreTradeChecklistCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreTradeChecklistPayload>[]
          }
          delete: {
            args: Prisma.PreTradeChecklistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreTradeChecklistPayload>
          }
          update: {
            args: Prisma.PreTradeChecklistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreTradeChecklistPayload>
          }
          deleteMany: {
            args: Prisma.PreTradeChecklistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PreTradeChecklistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PreTradeChecklistUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreTradeChecklistPayload>[]
          }
          upsert: {
            args: Prisma.PreTradeChecklistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreTradeChecklistPayload>
          }
          aggregate: {
            args: Prisma.PreTradeChecklistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePreTradeChecklist>
          }
          groupBy: {
            args: Prisma.PreTradeChecklistGroupByArgs<ExtArgs>
            result: $Utils.Optional<PreTradeChecklistGroupByOutputType>[]
          }
          count: {
            args: Prisma.PreTradeChecklistCountArgs<ExtArgs>
            result: $Utils.Optional<PreTradeChecklistCountAggregateOutputType> | number
          }
        }
      }
      Mistake: {
        payload: Prisma.$MistakePayload<ExtArgs>
        fields: Prisma.MistakeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MistakeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MistakePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MistakeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MistakePayload>
          }
          findFirst: {
            args: Prisma.MistakeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MistakePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MistakeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MistakePayload>
          }
          findMany: {
            args: Prisma.MistakeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MistakePayload>[]
          }
          create: {
            args: Prisma.MistakeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MistakePayload>
          }
          createMany: {
            args: Prisma.MistakeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MistakeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MistakePayload>[]
          }
          delete: {
            args: Prisma.MistakeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MistakePayload>
          }
          update: {
            args: Prisma.MistakeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MistakePayload>
          }
          deleteMany: {
            args: Prisma.MistakeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MistakeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MistakeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MistakePayload>[]
          }
          upsert: {
            args: Prisma.MistakeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MistakePayload>
          }
          aggregate: {
            args: Prisma.MistakeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMistake>
          }
          groupBy: {
            args: Prisma.MistakeGroupByArgs<ExtArgs>
            result: $Utils.Optional<MistakeGroupByOutputType>[]
          }
          count: {
            args: Prisma.MistakeCountArgs<ExtArgs>
            result: $Utils.Optional<MistakeCountAggregateOutputType> | number
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
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    session?: SessionOmit
    trade?: TradeOmit
    preTradeChecklist?: PreTradeChecklistOmit
    mistake?: MistakeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
   * Count Type SessionCountOutputType
   */

  export type SessionCountOutputType = {
    trades: number
  }

  export type SessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trades?: boolean | SessionCountOutputTypeCountTradesArgs
  }

  // Custom InputTypes
  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionCountOutputType
     */
    select?: SessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeCountTradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeWhereInput
  }


  /**
   * Count Type TradeCountOutputType
   */

  export type TradeCountOutputType = {
    mistakes: number
  }

  export type TradeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mistakes?: boolean | TradeCountOutputTypeCountMistakesArgs
  }

  // Custom InputTypes
  /**
   * TradeCountOutputType without action
   */
  export type TradeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeCountOutputType
     */
    select?: TradeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TradeCountOutputType without action
   */
  export type TradeCountOutputTypeCountMistakesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MistakeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionAvgAggregateOutputType = {
    id: number | null
    total_pnl: number | null
    discipline_score: number | null
  }

  export type SessionSumAggregateOutputType = {
    id: number | null
    total_pnl: number | null
    discipline_score: number | null
  }

  export type SessionMinAggregateOutputType = {
    id: number | null
    date: Date | null
    start_time: Date | null
    end_time: Date | null
    total_pnl: number | null
    discipline_score: number | null
    emotional_state: string | null
    notes: string | null
    conclusion: string | null
    is_closed: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: number | null
    date: Date | null
    start_time: Date | null
    end_time: Date | null
    total_pnl: number | null
    discipline_score: number | null
    emotional_state: string | null
    notes: string | null
    conclusion: string | null
    is_closed: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    date: number
    start_time: number
    end_time: number
    total_pnl: number
    discipline_score: number
    emotional_state: number
    notes: number
    conclusion: number
    is_closed: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type SessionAvgAggregateInputType = {
    id?: true
    total_pnl?: true
    discipline_score?: true
  }

  export type SessionSumAggregateInputType = {
    id?: true
    total_pnl?: true
    discipline_score?: true
  }

  export type SessionMinAggregateInputType = {
    id?: true
    date?: true
    start_time?: true
    end_time?: true
    total_pnl?: true
    discipline_score?: true
    emotional_state?: true
    notes?: true
    conclusion?: true
    is_closed?: true
    created_at?: true
    updated_at?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    date?: true
    start_time?: true
    end_time?: true
    total_pnl?: true
    discipline_score?: true
    emotional_state?: true
    notes?: true
    conclusion?: true
    is_closed?: true
    created_at?: true
    updated_at?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    date?: true
    start_time?: true
    end_time?: true
    total_pnl?: true
    discipline_score?: true
    emotional_state?: true
    notes?: true
    conclusion?: true
    is_closed?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _avg?: SessionAvgAggregateInputType
    _sum?: SessionSumAggregateInputType
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: number
    date: Date
    start_time: Date
    end_time: Date | null
    total_pnl: number
    discipline_score: number
    emotional_state: string
    notes: string | null
    conclusion: string | null
    is_closed: boolean
    created_at: Date
    updated_at: Date
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    start_time?: boolean
    end_time?: boolean
    total_pnl?: boolean
    discipline_score?: boolean
    emotional_state?: boolean
    notes?: boolean
    conclusion?: boolean
    is_closed?: boolean
    created_at?: boolean
    updated_at?: boolean
    trades?: boolean | Session$tradesArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    start_time?: boolean
    end_time?: boolean
    total_pnl?: boolean
    discipline_score?: boolean
    emotional_state?: boolean
    notes?: boolean
    conclusion?: boolean
    is_closed?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    start_time?: boolean
    end_time?: boolean
    total_pnl?: boolean
    discipline_score?: boolean
    emotional_state?: boolean
    notes?: boolean
    conclusion?: boolean
    is_closed?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    date?: boolean
    start_time?: boolean
    end_time?: boolean
    total_pnl?: boolean
    discipline_score?: boolean
    emotional_state?: boolean
    notes?: boolean
    conclusion?: boolean
    is_closed?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "start_time" | "end_time" | "total_pnl" | "discipline_score" | "emotional_state" | "notes" | "conclusion" | "is_closed" | "created_at" | "updated_at", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trades?: boolean | Session$tradesArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      trades: Prisma.$TradePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      date: Date
      start_time: Date
      end_time: Date | null
      total_pnl: number
      discipline_score: number
      emotional_state: string
      notes: string | null
      conclusion: string | null
      is_closed: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
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
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
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
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trades<T extends Session$tradesArgs<ExtArgs> = {}>(args?: Subset<T, Session$tradesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'Int'>
    readonly date: FieldRef<"Session", 'DateTime'>
    readonly start_time: FieldRef<"Session", 'DateTime'>
    readonly end_time: FieldRef<"Session", 'DateTime'>
    readonly total_pnl: FieldRef<"Session", 'Float'>
    readonly discipline_score: FieldRef<"Session", 'Int'>
    readonly emotional_state: FieldRef<"Session", 'String'>
    readonly notes: FieldRef<"Session", 'String'>
    readonly conclusion: FieldRef<"Session", 'String'>
    readonly is_closed: FieldRef<"Session", 'Boolean'>
    readonly created_at: FieldRef<"Session", 'DateTime'>
    readonly updated_at: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session.trades
   */
  export type Session$tradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    where?: TradeWhereInput
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    cursor?: TradeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Trade
   */

  export type AggregateTrade = {
    _count: TradeCountAggregateOutputType | null
    _avg: TradeAvgAggregateOutputType | null
    _sum: TradeSumAggregateOutputType | null
    _min: TradeMinAggregateOutputType | null
    _max: TradeMaxAggregateOutputType | null
  }

  export type TradeAvgAggregateOutputType = {
    id: number | null
    session_id: number | null
    rr_planned: number | null
    entry_price: number | null
    sl_price: number | null
    tp_price: number | null
    result_pnl: number | null
  }

  export type TradeSumAggregateOutputType = {
    id: number | null
    session_id: number | null
    rr_planned: number | null
    entry_price: number | null
    sl_price: number | null
    tp_price: number | null
    result_pnl: number | null
  }

  export type TradeMinAggregateOutputType = {
    id: number | null
    session_id: number | null
    time: Date | null
    asset: string | null
    direction: string | null
    setup_type: string | null
    rr_planned: number | null
    entry_price: number | null
    sl_price: number | null
    tp_price: number | null
    result_pnl: number | null
    screenshot_pre: string | null
    screenshot_post: string | null
    is_in_plan: boolean | null
    notes: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TradeMaxAggregateOutputType = {
    id: number | null
    session_id: number | null
    time: Date | null
    asset: string | null
    direction: string | null
    setup_type: string | null
    rr_planned: number | null
    entry_price: number | null
    sl_price: number | null
    tp_price: number | null
    result_pnl: number | null
    screenshot_pre: string | null
    screenshot_post: string | null
    is_in_plan: boolean | null
    notes: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TradeCountAggregateOutputType = {
    id: number
    session_id: number
    time: number
    asset: number
    direction: number
    setup_type: number
    rr_planned: number
    entry_price: number
    sl_price: number
    tp_price: number
    result_pnl: number
    screenshot_pre: number
    screenshot_post: number
    is_in_plan: number
    notes: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type TradeAvgAggregateInputType = {
    id?: true
    session_id?: true
    rr_planned?: true
    entry_price?: true
    sl_price?: true
    tp_price?: true
    result_pnl?: true
  }

  export type TradeSumAggregateInputType = {
    id?: true
    session_id?: true
    rr_planned?: true
    entry_price?: true
    sl_price?: true
    tp_price?: true
    result_pnl?: true
  }

  export type TradeMinAggregateInputType = {
    id?: true
    session_id?: true
    time?: true
    asset?: true
    direction?: true
    setup_type?: true
    rr_planned?: true
    entry_price?: true
    sl_price?: true
    tp_price?: true
    result_pnl?: true
    screenshot_pre?: true
    screenshot_post?: true
    is_in_plan?: true
    notes?: true
    created_at?: true
    updated_at?: true
  }

  export type TradeMaxAggregateInputType = {
    id?: true
    session_id?: true
    time?: true
    asset?: true
    direction?: true
    setup_type?: true
    rr_planned?: true
    entry_price?: true
    sl_price?: true
    tp_price?: true
    result_pnl?: true
    screenshot_pre?: true
    screenshot_post?: true
    is_in_plan?: true
    notes?: true
    created_at?: true
    updated_at?: true
  }

  export type TradeCountAggregateInputType = {
    id?: true
    session_id?: true
    time?: true
    asset?: true
    direction?: true
    setup_type?: true
    rr_planned?: true
    entry_price?: true
    sl_price?: true
    tp_price?: true
    result_pnl?: true
    screenshot_pre?: true
    screenshot_post?: true
    is_in_plan?: true
    notes?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type TradeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trade to aggregate.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Trades
    **/
    _count?: true | TradeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TradeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TradeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TradeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TradeMaxAggregateInputType
  }

  export type GetTradeAggregateType<T extends TradeAggregateArgs> = {
        [P in keyof T & keyof AggregateTrade]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrade[P]>
      : GetScalarType<T[P], AggregateTrade[P]>
  }




  export type TradeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeWhereInput
    orderBy?: TradeOrderByWithAggregationInput | TradeOrderByWithAggregationInput[]
    by: TradeScalarFieldEnum[] | TradeScalarFieldEnum
    having?: TradeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TradeCountAggregateInputType | true
    _avg?: TradeAvgAggregateInputType
    _sum?: TradeSumAggregateInputType
    _min?: TradeMinAggregateInputType
    _max?: TradeMaxAggregateInputType
  }

  export type TradeGroupByOutputType = {
    id: number
    session_id: number
    time: Date
    asset: string
    direction: string
    setup_type: string
    rr_planned: number
    entry_price: number | null
    sl_price: number | null
    tp_price: number | null
    result_pnl: number
    screenshot_pre: string | null
    screenshot_post: string | null
    is_in_plan: boolean
    notes: string | null
    created_at: Date
    updated_at: Date
    _count: TradeCountAggregateOutputType | null
    _avg: TradeAvgAggregateOutputType | null
    _sum: TradeSumAggregateOutputType | null
    _min: TradeMinAggregateOutputType | null
    _max: TradeMaxAggregateOutputType | null
  }

  type GetTradeGroupByPayload<T extends TradeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TradeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TradeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TradeGroupByOutputType[P]>
            : GetScalarType<T[P], TradeGroupByOutputType[P]>
        }
      >
    >


  export type TradeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    session_id?: boolean
    time?: boolean
    asset?: boolean
    direction?: boolean
    setup_type?: boolean
    rr_planned?: boolean
    entry_price?: boolean
    sl_price?: boolean
    tp_price?: boolean
    result_pnl?: boolean
    screenshot_pre?: boolean
    screenshot_post?: boolean
    is_in_plan?: boolean
    notes?: boolean
    created_at?: boolean
    updated_at?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
    checklist?: boolean | Trade$checklistArgs<ExtArgs>
    mistakes?: boolean | Trade$mistakesArgs<ExtArgs>
    _count?: boolean | TradeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    session_id?: boolean
    time?: boolean
    asset?: boolean
    direction?: boolean
    setup_type?: boolean
    rr_planned?: boolean
    entry_price?: boolean
    sl_price?: boolean
    tp_price?: boolean
    result_pnl?: boolean
    screenshot_pre?: boolean
    screenshot_post?: boolean
    is_in_plan?: boolean
    notes?: boolean
    created_at?: boolean
    updated_at?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    session_id?: boolean
    time?: boolean
    asset?: boolean
    direction?: boolean
    setup_type?: boolean
    rr_planned?: boolean
    entry_price?: boolean
    sl_price?: boolean
    tp_price?: boolean
    result_pnl?: boolean
    screenshot_pre?: boolean
    screenshot_post?: boolean
    is_in_plan?: boolean
    notes?: boolean
    created_at?: boolean
    updated_at?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectScalar = {
    id?: boolean
    session_id?: boolean
    time?: boolean
    asset?: boolean
    direction?: boolean
    setup_type?: boolean
    rr_planned?: boolean
    entry_price?: boolean
    sl_price?: boolean
    tp_price?: boolean
    result_pnl?: boolean
    screenshot_pre?: boolean
    screenshot_post?: boolean
    is_in_plan?: boolean
    notes?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type TradeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "session_id" | "time" | "asset" | "direction" | "setup_type" | "rr_planned" | "entry_price" | "sl_price" | "tp_price" | "result_pnl" | "screenshot_pre" | "screenshot_post" | "is_in_plan" | "notes" | "created_at" | "updated_at", ExtArgs["result"]["trade"]>
  export type TradeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
    checklist?: boolean | Trade$checklistArgs<ExtArgs>
    mistakes?: boolean | Trade$mistakesArgs<ExtArgs>
    _count?: boolean | TradeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TradeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }
  export type TradeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }

  export type $TradePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Trade"
    objects: {
      session: Prisma.$SessionPayload<ExtArgs>
      checklist: Prisma.$PreTradeChecklistPayload<ExtArgs> | null
      mistakes: Prisma.$MistakePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      session_id: number
      time: Date
      asset: string
      direction: string
      setup_type: string
      rr_planned: number
      entry_price: number | null
      sl_price: number | null
      tp_price: number | null
      result_pnl: number
      screenshot_pre: string | null
      screenshot_post: string | null
      is_in_plan: boolean
      notes: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["trade"]>
    composites: {}
  }

  type TradeGetPayload<S extends boolean | null | undefined | TradeDefaultArgs> = $Result.GetResult<Prisma.$TradePayload, S>

  type TradeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TradeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TradeCountAggregateInputType | true
    }

  export interface TradeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Trade'], meta: { name: 'Trade' } }
    /**
     * Find zero or one Trade that matches the filter.
     * @param {TradeFindUniqueArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TradeFindUniqueArgs>(args: SelectSubset<T, TradeFindUniqueArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Trade that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TradeFindUniqueOrThrowArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TradeFindUniqueOrThrowArgs>(args: SelectSubset<T, TradeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trade that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindFirstArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TradeFindFirstArgs>(args?: SelectSubset<T, TradeFindFirstArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trade that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindFirstOrThrowArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TradeFindFirstOrThrowArgs>(args?: SelectSubset<T, TradeFindFirstOrThrowArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Trades that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trades
     * const trades = await prisma.trade.findMany()
     * 
     * // Get first 10 Trades
     * const trades = await prisma.trade.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tradeWithIdOnly = await prisma.trade.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TradeFindManyArgs>(args?: SelectSubset<T, TradeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Trade.
     * @param {TradeCreateArgs} args - Arguments to create a Trade.
     * @example
     * // Create one Trade
     * const Trade = await prisma.trade.create({
     *   data: {
     *     // ... data to create a Trade
     *   }
     * })
     * 
     */
    create<T extends TradeCreateArgs>(args: SelectSubset<T, TradeCreateArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Trades.
     * @param {TradeCreateManyArgs} args - Arguments to create many Trades.
     * @example
     * // Create many Trades
     * const trade = await prisma.trade.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TradeCreateManyArgs>(args?: SelectSubset<T, TradeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trades and returns the data saved in the database.
     * @param {TradeCreateManyAndReturnArgs} args - Arguments to create many Trades.
     * @example
     * // Create many Trades
     * const trade = await prisma.trade.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trades and only return the `id`
     * const tradeWithIdOnly = await prisma.trade.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TradeCreateManyAndReturnArgs>(args?: SelectSubset<T, TradeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Trade.
     * @param {TradeDeleteArgs} args - Arguments to delete one Trade.
     * @example
     * // Delete one Trade
     * const Trade = await prisma.trade.delete({
     *   where: {
     *     // ... filter to delete one Trade
     *   }
     * })
     * 
     */
    delete<T extends TradeDeleteArgs>(args: SelectSubset<T, TradeDeleteArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Trade.
     * @param {TradeUpdateArgs} args - Arguments to update one Trade.
     * @example
     * // Update one Trade
     * const trade = await prisma.trade.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TradeUpdateArgs>(args: SelectSubset<T, TradeUpdateArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Trades.
     * @param {TradeDeleteManyArgs} args - Arguments to filter Trades to delete.
     * @example
     * // Delete a few Trades
     * const { count } = await prisma.trade.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TradeDeleteManyArgs>(args?: SelectSubset<T, TradeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trades
     * const trade = await prisma.trade.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TradeUpdateManyArgs>(args: SelectSubset<T, TradeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trades and returns the data updated in the database.
     * @param {TradeUpdateManyAndReturnArgs} args - Arguments to update many Trades.
     * @example
     * // Update many Trades
     * const trade = await prisma.trade.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Trades and only return the `id`
     * const tradeWithIdOnly = await prisma.trade.updateManyAndReturn({
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
    updateManyAndReturn<T extends TradeUpdateManyAndReturnArgs>(args: SelectSubset<T, TradeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Trade.
     * @param {TradeUpsertArgs} args - Arguments to update or create a Trade.
     * @example
     * // Update or create a Trade
     * const trade = await prisma.trade.upsert({
     *   create: {
     *     // ... data to create a Trade
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Trade we want to update
     *   }
     * })
     */
    upsert<T extends TradeUpsertArgs>(args: SelectSubset<T, TradeUpsertArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Trades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeCountArgs} args - Arguments to filter Trades to count.
     * @example
     * // Count the number of Trades
     * const count = await prisma.trade.count({
     *   where: {
     *     // ... the filter for the Trades we want to count
     *   }
     * })
    **/
    count<T extends TradeCountArgs>(
      args?: Subset<T, TradeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TradeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Trade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TradeAggregateArgs>(args: Subset<T, TradeAggregateArgs>): Prisma.PrismaPromise<GetTradeAggregateType<T>>

    /**
     * Group by Trade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeGroupByArgs} args - Group by arguments.
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
      T extends TradeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TradeGroupByArgs['orderBy'] }
        : { orderBy?: TradeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TradeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTradeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Trade model
   */
  readonly fields: TradeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Trade.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TradeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends SessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SessionDefaultArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    checklist<T extends Trade$checklistArgs<ExtArgs> = {}>(args?: Subset<T, Trade$checklistArgs<ExtArgs>>): Prisma__PreTradeChecklistClient<$Result.GetResult<Prisma.$PreTradeChecklistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    mistakes<T extends Trade$mistakesArgs<ExtArgs> = {}>(args?: Subset<T, Trade$mistakesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MistakePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Trade model
   */
  interface TradeFieldRefs {
    readonly id: FieldRef<"Trade", 'Int'>
    readonly session_id: FieldRef<"Trade", 'Int'>
    readonly time: FieldRef<"Trade", 'DateTime'>
    readonly asset: FieldRef<"Trade", 'String'>
    readonly direction: FieldRef<"Trade", 'String'>
    readonly setup_type: FieldRef<"Trade", 'String'>
    readonly rr_planned: FieldRef<"Trade", 'Float'>
    readonly entry_price: FieldRef<"Trade", 'Float'>
    readonly sl_price: FieldRef<"Trade", 'Float'>
    readonly tp_price: FieldRef<"Trade", 'Float'>
    readonly result_pnl: FieldRef<"Trade", 'Float'>
    readonly screenshot_pre: FieldRef<"Trade", 'String'>
    readonly screenshot_post: FieldRef<"Trade", 'String'>
    readonly is_in_plan: FieldRef<"Trade", 'Boolean'>
    readonly notes: FieldRef<"Trade", 'String'>
    readonly created_at: FieldRef<"Trade", 'DateTime'>
    readonly updated_at: FieldRef<"Trade", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Trade findUnique
   */
  export type TradeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade findUniqueOrThrow
   */
  export type TradeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade findFirst
   */
  export type TradeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trades.
     */
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade findFirstOrThrow
   */
  export type TradeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trades.
     */
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade findMany
   */
  export type TradeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trades to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trades.
     */
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade create
   */
  export type TradeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * The data needed to create a Trade.
     */
    data: XOR<TradeCreateInput, TradeUncheckedCreateInput>
  }

  /**
   * Trade createMany
   */
  export type TradeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Trades.
     */
    data: TradeCreateManyInput | TradeCreateManyInput[]
  }

  /**
   * Trade createManyAndReturn
   */
  export type TradeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * The data used to create many Trades.
     */
    data: TradeCreateManyInput | TradeCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Trade update
   */
  export type TradeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * The data needed to update a Trade.
     */
    data: XOR<TradeUpdateInput, TradeUncheckedUpdateInput>
    /**
     * Choose, which Trade to update.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade updateMany
   */
  export type TradeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Trades.
     */
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyInput>
    /**
     * Filter which Trades to update
     */
    where?: TradeWhereInput
    /**
     * Limit how many Trades to update.
     */
    limit?: number
  }

  /**
   * Trade updateManyAndReturn
   */
  export type TradeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * The data used to update Trades.
     */
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyInput>
    /**
     * Filter which Trades to update
     */
    where?: TradeWhereInput
    /**
     * Limit how many Trades to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Trade upsert
   */
  export type TradeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * The filter to search for the Trade to update in case it exists.
     */
    where: TradeWhereUniqueInput
    /**
     * In case the Trade found by the `where` argument doesn't exist, create a new Trade with this data.
     */
    create: XOR<TradeCreateInput, TradeUncheckedCreateInput>
    /**
     * In case the Trade was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TradeUpdateInput, TradeUncheckedUpdateInput>
  }

  /**
   * Trade delete
   */
  export type TradeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter which Trade to delete.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade deleteMany
   */
  export type TradeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trades to delete
     */
    where?: TradeWhereInput
    /**
     * Limit how many Trades to delete.
     */
    limit?: number
  }

  /**
   * Trade.checklist
   */
  export type Trade$checklistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreTradeChecklist
     */
    select?: PreTradeChecklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreTradeChecklist
     */
    omit?: PreTradeChecklistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreTradeChecklistInclude<ExtArgs> | null
    where?: PreTradeChecklistWhereInput
  }

  /**
   * Trade.mistakes
   */
  export type Trade$mistakesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mistake
     */
    select?: MistakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mistake
     */
    omit?: MistakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MistakeInclude<ExtArgs> | null
    where?: MistakeWhereInput
    orderBy?: MistakeOrderByWithRelationInput | MistakeOrderByWithRelationInput[]
    cursor?: MistakeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MistakeScalarFieldEnum | MistakeScalarFieldEnum[]
  }

  /**
   * Trade without action
   */
  export type TradeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
  }


  /**
   * Model PreTradeChecklist
   */

  export type AggregatePreTradeChecklist = {
    _count: PreTradeChecklistCountAggregateOutputType | null
    _avg: PreTradeChecklistAvgAggregateOutputType | null
    _sum: PreTradeChecklistSumAggregateOutputType | null
    _min: PreTradeChecklistMinAggregateOutputType | null
    _max: PreTradeChecklistMaxAggregateOutputType | null
  }

  export type PreTradeChecklistAvgAggregateOutputType = {
    id: number | null
    trade_id: number | null
    risk_score: number | null
  }

  export type PreTradeChecklistSumAggregateOutputType = {
    id: number | null
    trade_id: number | null
    risk_score: number | null
  }

  export type PreTradeChecklistMinAggregateOutputType = {
    id: number | null
    trade_id: number | null
    has_fomo: boolean | null
    is_extended: boolean | null
    is_chasing: boolean | null
    is_revenge_trade: boolean | null
    has_confirmation: boolean | null
    is_correct_session: boolean | null
    has_clear_sl: boolean | null
    follows_higher_tf: boolean | null
    risk_score: number | null
    created_at: Date | null
  }

  export type PreTradeChecklistMaxAggregateOutputType = {
    id: number | null
    trade_id: number | null
    has_fomo: boolean | null
    is_extended: boolean | null
    is_chasing: boolean | null
    is_revenge_trade: boolean | null
    has_confirmation: boolean | null
    is_correct_session: boolean | null
    has_clear_sl: boolean | null
    follows_higher_tf: boolean | null
    risk_score: number | null
    created_at: Date | null
  }

  export type PreTradeChecklistCountAggregateOutputType = {
    id: number
    trade_id: number
    has_fomo: number
    is_extended: number
    is_chasing: number
    is_revenge_trade: number
    has_confirmation: number
    is_correct_session: number
    has_clear_sl: number
    follows_higher_tf: number
    risk_score: number
    created_at: number
    _all: number
  }


  export type PreTradeChecklistAvgAggregateInputType = {
    id?: true
    trade_id?: true
    risk_score?: true
  }

  export type PreTradeChecklistSumAggregateInputType = {
    id?: true
    trade_id?: true
    risk_score?: true
  }

  export type PreTradeChecklistMinAggregateInputType = {
    id?: true
    trade_id?: true
    has_fomo?: true
    is_extended?: true
    is_chasing?: true
    is_revenge_trade?: true
    has_confirmation?: true
    is_correct_session?: true
    has_clear_sl?: true
    follows_higher_tf?: true
    risk_score?: true
    created_at?: true
  }

  export type PreTradeChecklistMaxAggregateInputType = {
    id?: true
    trade_id?: true
    has_fomo?: true
    is_extended?: true
    is_chasing?: true
    is_revenge_trade?: true
    has_confirmation?: true
    is_correct_session?: true
    has_clear_sl?: true
    follows_higher_tf?: true
    risk_score?: true
    created_at?: true
  }

  export type PreTradeChecklistCountAggregateInputType = {
    id?: true
    trade_id?: true
    has_fomo?: true
    is_extended?: true
    is_chasing?: true
    is_revenge_trade?: true
    has_confirmation?: true
    is_correct_session?: true
    has_clear_sl?: true
    follows_higher_tf?: true
    risk_score?: true
    created_at?: true
    _all?: true
  }

  export type PreTradeChecklistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PreTradeChecklist to aggregate.
     */
    where?: PreTradeChecklistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreTradeChecklists to fetch.
     */
    orderBy?: PreTradeChecklistOrderByWithRelationInput | PreTradeChecklistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PreTradeChecklistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreTradeChecklists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreTradeChecklists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PreTradeChecklists
    **/
    _count?: true | PreTradeChecklistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PreTradeChecklistAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PreTradeChecklistSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PreTradeChecklistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PreTradeChecklistMaxAggregateInputType
  }

  export type GetPreTradeChecklistAggregateType<T extends PreTradeChecklistAggregateArgs> = {
        [P in keyof T & keyof AggregatePreTradeChecklist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePreTradeChecklist[P]>
      : GetScalarType<T[P], AggregatePreTradeChecklist[P]>
  }




  export type PreTradeChecklistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PreTradeChecklistWhereInput
    orderBy?: PreTradeChecklistOrderByWithAggregationInput | PreTradeChecklistOrderByWithAggregationInput[]
    by: PreTradeChecklistScalarFieldEnum[] | PreTradeChecklistScalarFieldEnum
    having?: PreTradeChecklistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PreTradeChecklistCountAggregateInputType | true
    _avg?: PreTradeChecklistAvgAggregateInputType
    _sum?: PreTradeChecklistSumAggregateInputType
    _min?: PreTradeChecklistMinAggregateInputType
    _max?: PreTradeChecklistMaxAggregateInputType
  }

  export type PreTradeChecklistGroupByOutputType = {
    id: number
    trade_id: number
    has_fomo: boolean
    is_extended: boolean
    is_chasing: boolean
    is_revenge_trade: boolean
    has_confirmation: boolean
    is_correct_session: boolean
    has_clear_sl: boolean
    follows_higher_tf: boolean
    risk_score: number
    created_at: Date
    _count: PreTradeChecklistCountAggregateOutputType | null
    _avg: PreTradeChecklistAvgAggregateOutputType | null
    _sum: PreTradeChecklistSumAggregateOutputType | null
    _min: PreTradeChecklistMinAggregateOutputType | null
    _max: PreTradeChecklistMaxAggregateOutputType | null
  }

  type GetPreTradeChecklistGroupByPayload<T extends PreTradeChecklistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PreTradeChecklistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PreTradeChecklistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PreTradeChecklistGroupByOutputType[P]>
            : GetScalarType<T[P], PreTradeChecklistGroupByOutputType[P]>
        }
      >
    >


  export type PreTradeChecklistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trade_id?: boolean
    has_fomo?: boolean
    is_extended?: boolean
    is_chasing?: boolean
    is_revenge_trade?: boolean
    has_confirmation?: boolean
    is_correct_session?: boolean
    has_clear_sl?: boolean
    follows_higher_tf?: boolean
    risk_score?: boolean
    created_at?: boolean
    trade?: boolean | TradeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preTradeChecklist"]>

  export type PreTradeChecklistSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trade_id?: boolean
    has_fomo?: boolean
    is_extended?: boolean
    is_chasing?: boolean
    is_revenge_trade?: boolean
    has_confirmation?: boolean
    is_correct_session?: boolean
    has_clear_sl?: boolean
    follows_higher_tf?: boolean
    risk_score?: boolean
    created_at?: boolean
    trade?: boolean | TradeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preTradeChecklist"]>

  export type PreTradeChecklistSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trade_id?: boolean
    has_fomo?: boolean
    is_extended?: boolean
    is_chasing?: boolean
    is_revenge_trade?: boolean
    has_confirmation?: boolean
    is_correct_session?: boolean
    has_clear_sl?: boolean
    follows_higher_tf?: boolean
    risk_score?: boolean
    created_at?: boolean
    trade?: boolean | TradeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preTradeChecklist"]>

  export type PreTradeChecklistSelectScalar = {
    id?: boolean
    trade_id?: boolean
    has_fomo?: boolean
    is_extended?: boolean
    is_chasing?: boolean
    is_revenge_trade?: boolean
    has_confirmation?: boolean
    is_correct_session?: boolean
    has_clear_sl?: boolean
    follows_higher_tf?: boolean
    risk_score?: boolean
    created_at?: boolean
  }

  export type PreTradeChecklistOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "trade_id" | "has_fomo" | "is_extended" | "is_chasing" | "is_revenge_trade" | "has_confirmation" | "is_correct_session" | "has_clear_sl" | "follows_higher_tf" | "risk_score" | "created_at", ExtArgs["result"]["preTradeChecklist"]>
  export type PreTradeChecklistInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trade?: boolean | TradeDefaultArgs<ExtArgs>
  }
  export type PreTradeChecklistIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trade?: boolean | TradeDefaultArgs<ExtArgs>
  }
  export type PreTradeChecklistIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trade?: boolean | TradeDefaultArgs<ExtArgs>
  }

  export type $PreTradeChecklistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PreTradeChecklist"
    objects: {
      trade: Prisma.$TradePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      trade_id: number
      has_fomo: boolean
      is_extended: boolean
      is_chasing: boolean
      is_revenge_trade: boolean
      has_confirmation: boolean
      is_correct_session: boolean
      has_clear_sl: boolean
      follows_higher_tf: boolean
      risk_score: number
      created_at: Date
    }, ExtArgs["result"]["preTradeChecklist"]>
    composites: {}
  }

  type PreTradeChecklistGetPayload<S extends boolean | null | undefined | PreTradeChecklistDefaultArgs> = $Result.GetResult<Prisma.$PreTradeChecklistPayload, S>

  type PreTradeChecklistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PreTradeChecklistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PreTradeChecklistCountAggregateInputType | true
    }

  export interface PreTradeChecklistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PreTradeChecklist'], meta: { name: 'PreTradeChecklist' } }
    /**
     * Find zero or one PreTradeChecklist that matches the filter.
     * @param {PreTradeChecklistFindUniqueArgs} args - Arguments to find a PreTradeChecklist
     * @example
     * // Get one PreTradeChecklist
     * const preTradeChecklist = await prisma.preTradeChecklist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PreTradeChecklistFindUniqueArgs>(args: SelectSubset<T, PreTradeChecklistFindUniqueArgs<ExtArgs>>): Prisma__PreTradeChecklistClient<$Result.GetResult<Prisma.$PreTradeChecklistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PreTradeChecklist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PreTradeChecklistFindUniqueOrThrowArgs} args - Arguments to find a PreTradeChecklist
     * @example
     * // Get one PreTradeChecklist
     * const preTradeChecklist = await prisma.preTradeChecklist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PreTradeChecklistFindUniqueOrThrowArgs>(args: SelectSubset<T, PreTradeChecklistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PreTradeChecklistClient<$Result.GetResult<Prisma.$PreTradeChecklistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PreTradeChecklist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreTradeChecklistFindFirstArgs} args - Arguments to find a PreTradeChecklist
     * @example
     * // Get one PreTradeChecklist
     * const preTradeChecklist = await prisma.preTradeChecklist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PreTradeChecklistFindFirstArgs>(args?: SelectSubset<T, PreTradeChecklistFindFirstArgs<ExtArgs>>): Prisma__PreTradeChecklistClient<$Result.GetResult<Prisma.$PreTradeChecklistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PreTradeChecklist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreTradeChecklistFindFirstOrThrowArgs} args - Arguments to find a PreTradeChecklist
     * @example
     * // Get one PreTradeChecklist
     * const preTradeChecklist = await prisma.preTradeChecklist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PreTradeChecklistFindFirstOrThrowArgs>(args?: SelectSubset<T, PreTradeChecklistFindFirstOrThrowArgs<ExtArgs>>): Prisma__PreTradeChecklistClient<$Result.GetResult<Prisma.$PreTradeChecklistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PreTradeChecklists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreTradeChecklistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PreTradeChecklists
     * const preTradeChecklists = await prisma.preTradeChecklist.findMany()
     * 
     * // Get first 10 PreTradeChecklists
     * const preTradeChecklists = await prisma.preTradeChecklist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const preTradeChecklistWithIdOnly = await prisma.preTradeChecklist.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PreTradeChecklistFindManyArgs>(args?: SelectSubset<T, PreTradeChecklistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreTradeChecklistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PreTradeChecklist.
     * @param {PreTradeChecklistCreateArgs} args - Arguments to create a PreTradeChecklist.
     * @example
     * // Create one PreTradeChecklist
     * const PreTradeChecklist = await prisma.preTradeChecklist.create({
     *   data: {
     *     // ... data to create a PreTradeChecklist
     *   }
     * })
     * 
     */
    create<T extends PreTradeChecklistCreateArgs>(args: SelectSubset<T, PreTradeChecklistCreateArgs<ExtArgs>>): Prisma__PreTradeChecklistClient<$Result.GetResult<Prisma.$PreTradeChecklistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PreTradeChecklists.
     * @param {PreTradeChecklistCreateManyArgs} args - Arguments to create many PreTradeChecklists.
     * @example
     * // Create many PreTradeChecklists
     * const preTradeChecklist = await prisma.preTradeChecklist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PreTradeChecklistCreateManyArgs>(args?: SelectSubset<T, PreTradeChecklistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PreTradeChecklists and returns the data saved in the database.
     * @param {PreTradeChecklistCreateManyAndReturnArgs} args - Arguments to create many PreTradeChecklists.
     * @example
     * // Create many PreTradeChecklists
     * const preTradeChecklist = await prisma.preTradeChecklist.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PreTradeChecklists and only return the `id`
     * const preTradeChecklistWithIdOnly = await prisma.preTradeChecklist.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PreTradeChecklistCreateManyAndReturnArgs>(args?: SelectSubset<T, PreTradeChecklistCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreTradeChecklistPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PreTradeChecklist.
     * @param {PreTradeChecklistDeleteArgs} args - Arguments to delete one PreTradeChecklist.
     * @example
     * // Delete one PreTradeChecklist
     * const PreTradeChecklist = await prisma.preTradeChecklist.delete({
     *   where: {
     *     // ... filter to delete one PreTradeChecklist
     *   }
     * })
     * 
     */
    delete<T extends PreTradeChecklistDeleteArgs>(args: SelectSubset<T, PreTradeChecklistDeleteArgs<ExtArgs>>): Prisma__PreTradeChecklistClient<$Result.GetResult<Prisma.$PreTradeChecklistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PreTradeChecklist.
     * @param {PreTradeChecklistUpdateArgs} args - Arguments to update one PreTradeChecklist.
     * @example
     * // Update one PreTradeChecklist
     * const preTradeChecklist = await prisma.preTradeChecklist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PreTradeChecklistUpdateArgs>(args: SelectSubset<T, PreTradeChecklistUpdateArgs<ExtArgs>>): Prisma__PreTradeChecklistClient<$Result.GetResult<Prisma.$PreTradeChecklistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PreTradeChecklists.
     * @param {PreTradeChecklistDeleteManyArgs} args - Arguments to filter PreTradeChecklists to delete.
     * @example
     * // Delete a few PreTradeChecklists
     * const { count } = await prisma.preTradeChecklist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PreTradeChecklistDeleteManyArgs>(args?: SelectSubset<T, PreTradeChecklistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PreTradeChecklists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreTradeChecklistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PreTradeChecklists
     * const preTradeChecklist = await prisma.preTradeChecklist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PreTradeChecklistUpdateManyArgs>(args: SelectSubset<T, PreTradeChecklistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PreTradeChecklists and returns the data updated in the database.
     * @param {PreTradeChecklistUpdateManyAndReturnArgs} args - Arguments to update many PreTradeChecklists.
     * @example
     * // Update many PreTradeChecklists
     * const preTradeChecklist = await prisma.preTradeChecklist.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PreTradeChecklists and only return the `id`
     * const preTradeChecklistWithIdOnly = await prisma.preTradeChecklist.updateManyAndReturn({
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
    updateManyAndReturn<T extends PreTradeChecklistUpdateManyAndReturnArgs>(args: SelectSubset<T, PreTradeChecklistUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreTradeChecklistPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PreTradeChecklist.
     * @param {PreTradeChecklistUpsertArgs} args - Arguments to update or create a PreTradeChecklist.
     * @example
     * // Update or create a PreTradeChecklist
     * const preTradeChecklist = await prisma.preTradeChecklist.upsert({
     *   create: {
     *     // ... data to create a PreTradeChecklist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PreTradeChecklist we want to update
     *   }
     * })
     */
    upsert<T extends PreTradeChecklistUpsertArgs>(args: SelectSubset<T, PreTradeChecklistUpsertArgs<ExtArgs>>): Prisma__PreTradeChecklistClient<$Result.GetResult<Prisma.$PreTradeChecklistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PreTradeChecklists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreTradeChecklistCountArgs} args - Arguments to filter PreTradeChecklists to count.
     * @example
     * // Count the number of PreTradeChecklists
     * const count = await prisma.preTradeChecklist.count({
     *   where: {
     *     // ... the filter for the PreTradeChecklists we want to count
     *   }
     * })
    **/
    count<T extends PreTradeChecklistCountArgs>(
      args?: Subset<T, PreTradeChecklistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PreTradeChecklistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PreTradeChecklist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreTradeChecklistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PreTradeChecklistAggregateArgs>(args: Subset<T, PreTradeChecklistAggregateArgs>): Prisma.PrismaPromise<GetPreTradeChecklistAggregateType<T>>

    /**
     * Group by PreTradeChecklist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreTradeChecklistGroupByArgs} args - Group by arguments.
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
      T extends PreTradeChecklistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PreTradeChecklistGroupByArgs['orderBy'] }
        : { orderBy?: PreTradeChecklistGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PreTradeChecklistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPreTradeChecklistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PreTradeChecklist model
   */
  readonly fields: PreTradeChecklistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PreTradeChecklist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PreTradeChecklistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trade<T extends TradeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TradeDefaultArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PreTradeChecklist model
   */
  interface PreTradeChecklistFieldRefs {
    readonly id: FieldRef<"PreTradeChecklist", 'Int'>
    readonly trade_id: FieldRef<"PreTradeChecklist", 'Int'>
    readonly has_fomo: FieldRef<"PreTradeChecklist", 'Boolean'>
    readonly is_extended: FieldRef<"PreTradeChecklist", 'Boolean'>
    readonly is_chasing: FieldRef<"PreTradeChecklist", 'Boolean'>
    readonly is_revenge_trade: FieldRef<"PreTradeChecklist", 'Boolean'>
    readonly has_confirmation: FieldRef<"PreTradeChecklist", 'Boolean'>
    readonly is_correct_session: FieldRef<"PreTradeChecklist", 'Boolean'>
    readonly has_clear_sl: FieldRef<"PreTradeChecklist", 'Boolean'>
    readonly follows_higher_tf: FieldRef<"PreTradeChecklist", 'Boolean'>
    readonly risk_score: FieldRef<"PreTradeChecklist", 'Int'>
    readonly created_at: FieldRef<"PreTradeChecklist", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PreTradeChecklist findUnique
   */
  export type PreTradeChecklistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreTradeChecklist
     */
    select?: PreTradeChecklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreTradeChecklist
     */
    omit?: PreTradeChecklistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreTradeChecklistInclude<ExtArgs> | null
    /**
     * Filter, which PreTradeChecklist to fetch.
     */
    where: PreTradeChecklistWhereUniqueInput
  }

  /**
   * PreTradeChecklist findUniqueOrThrow
   */
  export type PreTradeChecklistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreTradeChecklist
     */
    select?: PreTradeChecklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreTradeChecklist
     */
    omit?: PreTradeChecklistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreTradeChecklistInclude<ExtArgs> | null
    /**
     * Filter, which PreTradeChecklist to fetch.
     */
    where: PreTradeChecklistWhereUniqueInput
  }

  /**
   * PreTradeChecklist findFirst
   */
  export type PreTradeChecklistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreTradeChecklist
     */
    select?: PreTradeChecklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreTradeChecklist
     */
    omit?: PreTradeChecklistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreTradeChecklistInclude<ExtArgs> | null
    /**
     * Filter, which PreTradeChecklist to fetch.
     */
    where?: PreTradeChecklistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreTradeChecklists to fetch.
     */
    orderBy?: PreTradeChecklistOrderByWithRelationInput | PreTradeChecklistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PreTradeChecklists.
     */
    cursor?: PreTradeChecklistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreTradeChecklists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreTradeChecklists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreTradeChecklists.
     */
    distinct?: PreTradeChecklistScalarFieldEnum | PreTradeChecklistScalarFieldEnum[]
  }

  /**
   * PreTradeChecklist findFirstOrThrow
   */
  export type PreTradeChecklistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreTradeChecklist
     */
    select?: PreTradeChecklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreTradeChecklist
     */
    omit?: PreTradeChecklistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreTradeChecklistInclude<ExtArgs> | null
    /**
     * Filter, which PreTradeChecklist to fetch.
     */
    where?: PreTradeChecklistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreTradeChecklists to fetch.
     */
    orderBy?: PreTradeChecklistOrderByWithRelationInput | PreTradeChecklistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PreTradeChecklists.
     */
    cursor?: PreTradeChecklistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreTradeChecklists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreTradeChecklists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreTradeChecklists.
     */
    distinct?: PreTradeChecklistScalarFieldEnum | PreTradeChecklistScalarFieldEnum[]
  }

  /**
   * PreTradeChecklist findMany
   */
  export type PreTradeChecklistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreTradeChecklist
     */
    select?: PreTradeChecklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreTradeChecklist
     */
    omit?: PreTradeChecklistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreTradeChecklistInclude<ExtArgs> | null
    /**
     * Filter, which PreTradeChecklists to fetch.
     */
    where?: PreTradeChecklistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreTradeChecklists to fetch.
     */
    orderBy?: PreTradeChecklistOrderByWithRelationInput | PreTradeChecklistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PreTradeChecklists.
     */
    cursor?: PreTradeChecklistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreTradeChecklists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreTradeChecklists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreTradeChecklists.
     */
    distinct?: PreTradeChecklistScalarFieldEnum | PreTradeChecklistScalarFieldEnum[]
  }

  /**
   * PreTradeChecklist create
   */
  export type PreTradeChecklistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreTradeChecklist
     */
    select?: PreTradeChecklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreTradeChecklist
     */
    omit?: PreTradeChecklistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreTradeChecklistInclude<ExtArgs> | null
    /**
     * The data needed to create a PreTradeChecklist.
     */
    data: XOR<PreTradeChecklistCreateInput, PreTradeChecklistUncheckedCreateInput>
  }

  /**
   * PreTradeChecklist createMany
   */
  export type PreTradeChecklistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PreTradeChecklists.
     */
    data: PreTradeChecklistCreateManyInput | PreTradeChecklistCreateManyInput[]
  }

  /**
   * PreTradeChecklist createManyAndReturn
   */
  export type PreTradeChecklistCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreTradeChecklist
     */
    select?: PreTradeChecklistSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PreTradeChecklist
     */
    omit?: PreTradeChecklistOmit<ExtArgs> | null
    /**
     * The data used to create many PreTradeChecklists.
     */
    data: PreTradeChecklistCreateManyInput | PreTradeChecklistCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreTradeChecklistIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PreTradeChecklist update
   */
  export type PreTradeChecklistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreTradeChecklist
     */
    select?: PreTradeChecklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreTradeChecklist
     */
    omit?: PreTradeChecklistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreTradeChecklistInclude<ExtArgs> | null
    /**
     * The data needed to update a PreTradeChecklist.
     */
    data: XOR<PreTradeChecklistUpdateInput, PreTradeChecklistUncheckedUpdateInput>
    /**
     * Choose, which PreTradeChecklist to update.
     */
    where: PreTradeChecklistWhereUniqueInput
  }

  /**
   * PreTradeChecklist updateMany
   */
  export type PreTradeChecklistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PreTradeChecklists.
     */
    data: XOR<PreTradeChecklistUpdateManyMutationInput, PreTradeChecklistUncheckedUpdateManyInput>
    /**
     * Filter which PreTradeChecklists to update
     */
    where?: PreTradeChecklistWhereInput
    /**
     * Limit how many PreTradeChecklists to update.
     */
    limit?: number
  }

  /**
   * PreTradeChecklist updateManyAndReturn
   */
  export type PreTradeChecklistUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreTradeChecklist
     */
    select?: PreTradeChecklistSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PreTradeChecklist
     */
    omit?: PreTradeChecklistOmit<ExtArgs> | null
    /**
     * The data used to update PreTradeChecklists.
     */
    data: XOR<PreTradeChecklistUpdateManyMutationInput, PreTradeChecklistUncheckedUpdateManyInput>
    /**
     * Filter which PreTradeChecklists to update
     */
    where?: PreTradeChecklistWhereInput
    /**
     * Limit how many PreTradeChecklists to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreTradeChecklistIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PreTradeChecklist upsert
   */
  export type PreTradeChecklistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreTradeChecklist
     */
    select?: PreTradeChecklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreTradeChecklist
     */
    omit?: PreTradeChecklistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreTradeChecklistInclude<ExtArgs> | null
    /**
     * The filter to search for the PreTradeChecklist to update in case it exists.
     */
    where: PreTradeChecklistWhereUniqueInput
    /**
     * In case the PreTradeChecklist found by the `where` argument doesn't exist, create a new PreTradeChecklist with this data.
     */
    create: XOR<PreTradeChecklistCreateInput, PreTradeChecklistUncheckedCreateInput>
    /**
     * In case the PreTradeChecklist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PreTradeChecklistUpdateInput, PreTradeChecklistUncheckedUpdateInput>
  }

  /**
   * PreTradeChecklist delete
   */
  export type PreTradeChecklistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreTradeChecklist
     */
    select?: PreTradeChecklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreTradeChecklist
     */
    omit?: PreTradeChecklistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreTradeChecklistInclude<ExtArgs> | null
    /**
     * Filter which PreTradeChecklist to delete.
     */
    where: PreTradeChecklistWhereUniqueInput
  }

  /**
   * PreTradeChecklist deleteMany
   */
  export type PreTradeChecklistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PreTradeChecklists to delete
     */
    where?: PreTradeChecklistWhereInput
    /**
     * Limit how many PreTradeChecklists to delete.
     */
    limit?: number
  }

  /**
   * PreTradeChecklist without action
   */
  export type PreTradeChecklistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreTradeChecklist
     */
    select?: PreTradeChecklistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreTradeChecklist
     */
    omit?: PreTradeChecklistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreTradeChecklistInclude<ExtArgs> | null
  }


  /**
   * Model Mistake
   */

  export type AggregateMistake = {
    _count: MistakeCountAggregateOutputType | null
    _avg: MistakeAvgAggregateOutputType | null
    _sum: MistakeSumAggregateOutputType | null
    _min: MistakeMinAggregateOutputType | null
    _max: MistakeMaxAggregateOutputType | null
  }

  export type MistakeAvgAggregateOutputType = {
    id: number | null
    trade_id: number | null
    penalty_score: number | null
  }

  export type MistakeSumAggregateOutputType = {
    id: number | null
    trade_id: number | null
    penalty_score: number | null
  }

  export type MistakeMinAggregateOutputType = {
    id: number | null
    trade_id: number | null
    mistake_type: string | null
    penalty_score: number | null
    note: string | null
    created_at: Date | null
  }

  export type MistakeMaxAggregateOutputType = {
    id: number | null
    trade_id: number | null
    mistake_type: string | null
    penalty_score: number | null
    note: string | null
    created_at: Date | null
  }

  export type MistakeCountAggregateOutputType = {
    id: number
    trade_id: number
    mistake_type: number
    penalty_score: number
    note: number
    created_at: number
    _all: number
  }


  export type MistakeAvgAggregateInputType = {
    id?: true
    trade_id?: true
    penalty_score?: true
  }

  export type MistakeSumAggregateInputType = {
    id?: true
    trade_id?: true
    penalty_score?: true
  }

  export type MistakeMinAggregateInputType = {
    id?: true
    trade_id?: true
    mistake_type?: true
    penalty_score?: true
    note?: true
    created_at?: true
  }

  export type MistakeMaxAggregateInputType = {
    id?: true
    trade_id?: true
    mistake_type?: true
    penalty_score?: true
    note?: true
    created_at?: true
  }

  export type MistakeCountAggregateInputType = {
    id?: true
    trade_id?: true
    mistake_type?: true
    penalty_score?: true
    note?: true
    created_at?: true
    _all?: true
  }

  export type MistakeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mistake to aggregate.
     */
    where?: MistakeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mistakes to fetch.
     */
    orderBy?: MistakeOrderByWithRelationInput | MistakeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MistakeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mistakes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mistakes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Mistakes
    **/
    _count?: true | MistakeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MistakeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MistakeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MistakeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MistakeMaxAggregateInputType
  }

  export type GetMistakeAggregateType<T extends MistakeAggregateArgs> = {
        [P in keyof T & keyof AggregateMistake]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMistake[P]>
      : GetScalarType<T[P], AggregateMistake[P]>
  }




  export type MistakeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MistakeWhereInput
    orderBy?: MistakeOrderByWithAggregationInput | MistakeOrderByWithAggregationInput[]
    by: MistakeScalarFieldEnum[] | MistakeScalarFieldEnum
    having?: MistakeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MistakeCountAggregateInputType | true
    _avg?: MistakeAvgAggregateInputType
    _sum?: MistakeSumAggregateInputType
    _min?: MistakeMinAggregateInputType
    _max?: MistakeMaxAggregateInputType
  }

  export type MistakeGroupByOutputType = {
    id: number
    trade_id: number
    mistake_type: string
    penalty_score: number
    note: string | null
    created_at: Date
    _count: MistakeCountAggregateOutputType | null
    _avg: MistakeAvgAggregateOutputType | null
    _sum: MistakeSumAggregateOutputType | null
    _min: MistakeMinAggregateOutputType | null
    _max: MistakeMaxAggregateOutputType | null
  }

  type GetMistakeGroupByPayload<T extends MistakeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MistakeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MistakeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MistakeGroupByOutputType[P]>
            : GetScalarType<T[P], MistakeGroupByOutputType[P]>
        }
      >
    >


  export type MistakeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trade_id?: boolean
    mistake_type?: boolean
    penalty_score?: boolean
    note?: boolean
    created_at?: boolean
    trade?: boolean | TradeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mistake"]>

  export type MistakeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trade_id?: boolean
    mistake_type?: boolean
    penalty_score?: boolean
    note?: boolean
    created_at?: boolean
    trade?: boolean | TradeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mistake"]>

  export type MistakeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trade_id?: boolean
    mistake_type?: boolean
    penalty_score?: boolean
    note?: boolean
    created_at?: boolean
    trade?: boolean | TradeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mistake"]>

  export type MistakeSelectScalar = {
    id?: boolean
    trade_id?: boolean
    mistake_type?: boolean
    penalty_score?: boolean
    note?: boolean
    created_at?: boolean
  }

  export type MistakeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "trade_id" | "mistake_type" | "penalty_score" | "note" | "created_at", ExtArgs["result"]["mistake"]>
  export type MistakeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trade?: boolean | TradeDefaultArgs<ExtArgs>
  }
  export type MistakeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trade?: boolean | TradeDefaultArgs<ExtArgs>
  }
  export type MistakeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trade?: boolean | TradeDefaultArgs<ExtArgs>
  }

  export type $MistakePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mistake"
    objects: {
      trade: Prisma.$TradePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      trade_id: number
      mistake_type: string
      penalty_score: number
      note: string | null
      created_at: Date
    }, ExtArgs["result"]["mistake"]>
    composites: {}
  }

  type MistakeGetPayload<S extends boolean | null | undefined | MistakeDefaultArgs> = $Result.GetResult<Prisma.$MistakePayload, S>

  type MistakeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MistakeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MistakeCountAggregateInputType | true
    }

  export interface MistakeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Mistake'], meta: { name: 'Mistake' } }
    /**
     * Find zero or one Mistake that matches the filter.
     * @param {MistakeFindUniqueArgs} args - Arguments to find a Mistake
     * @example
     * // Get one Mistake
     * const mistake = await prisma.mistake.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MistakeFindUniqueArgs>(args: SelectSubset<T, MistakeFindUniqueArgs<ExtArgs>>): Prisma__MistakeClient<$Result.GetResult<Prisma.$MistakePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mistake that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MistakeFindUniqueOrThrowArgs} args - Arguments to find a Mistake
     * @example
     * // Get one Mistake
     * const mistake = await prisma.mistake.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MistakeFindUniqueOrThrowArgs>(args: SelectSubset<T, MistakeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MistakeClient<$Result.GetResult<Prisma.$MistakePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mistake that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MistakeFindFirstArgs} args - Arguments to find a Mistake
     * @example
     * // Get one Mistake
     * const mistake = await prisma.mistake.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MistakeFindFirstArgs>(args?: SelectSubset<T, MistakeFindFirstArgs<ExtArgs>>): Prisma__MistakeClient<$Result.GetResult<Prisma.$MistakePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mistake that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MistakeFindFirstOrThrowArgs} args - Arguments to find a Mistake
     * @example
     * // Get one Mistake
     * const mistake = await prisma.mistake.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MistakeFindFirstOrThrowArgs>(args?: SelectSubset<T, MistakeFindFirstOrThrowArgs<ExtArgs>>): Prisma__MistakeClient<$Result.GetResult<Prisma.$MistakePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Mistakes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MistakeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mistakes
     * const mistakes = await prisma.mistake.findMany()
     * 
     * // Get first 10 Mistakes
     * const mistakes = await prisma.mistake.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mistakeWithIdOnly = await prisma.mistake.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MistakeFindManyArgs>(args?: SelectSubset<T, MistakeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MistakePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mistake.
     * @param {MistakeCreateArgs} args - Arguments to create a Mistake.
     * @example
     * // Create one Mistake
     * const Mistake = await prisma.mistake.create({
     *   data: {
     *     // ... data to create a Mistake
     *   }
     * })
     * 
     */
    create<T extends MistakeCreateArgs>(args: SelectSubset<T, MistakeCreateArgs<ExtArgs>>): Prisma__MistakeClient<$Result.GetResult<Prisma.$MistakePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Mistakes.
     * @param {MistakeCreateManyArgs} args - Arguments to create many Mistakes.
     * @example
     * // Create many Mistakes
     * const mistake = await prisma.mistake.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MistakeCreateManyArgs>(args?: SelectSubset<T, MistakeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Mistakes and returns the data saved in the database.
     * @param {MistakeCreateManyAndReturnArgs} args - Arguments to create many Mistakes.
     * @example
     * // Create many Mistakes
     * const mistake = await prisma.mistake.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Mistakes and only return the `id`
     * const mistakeWithIdOnly = await prisma.mistake.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MistakeCreateManyAndReturnArgs>(args?: SelectSubset<T, MistakeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MistakePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Mistake.
     * @param {MistakeDeleteArgs} args - Arguments to delete one Mistake.
     * @example
     * // Delete one Mistake
     * const Mistake = await prisma.mistake.delete({
     *   where: {
     *     // ... filter to delete one Mistake
     *   }
     * })
     * 
     */
    delete<T extends MistakeDeleteArgs>(args: SelectSubset<T, MistakeDeleteArgs<ExtArgs>>): Prisma__MistakeClient<$Result.GetResult<Prisma.$MistakePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mistake.
     * @param {MistakeUpdateArgs} args - Arguments to update one Mistake.
     * @example
     * // Update one Mistake
     * const mistake = await prisma.mistake.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MistakeUpdateArgs>(args: SelectSubset<T, MistakeUpdateArgs<ExtArgs>>): Prisma__MistakeClient<$Result.GetResult<Prisma.$MistakePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Mistakes.
     * @param {MistakeDeleteManyArgs} args - Arguments to filter Mistakes to delete.
     * @example
     * // Delete a few Mistakes
     * const { count } = await prisma.mistake.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MistakeDeleteManyArgs>(args?: SelectSubset<T, MistakeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mistakes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MistakeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mistakes
     * const mistake = await prisma.mistake.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MistakeUpdateManyArgs>(args: SelectSubset<T, MistakeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mistakes and returns the data updated in the database.
     * @param {MistakeUpdateManyAndReturnArgs} args - Arguments to update many Mistakes.
     * @example
     * // Update many Mistakes
     * const mistake = await prisma.mistake.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Mistakes and only return the `id`
     * const mistakeWithIdOnly = await prisma.mistake.updateManyAndReturn({
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
    updateManyAndReturn<T extends MistakeUpdateManyAndReturnArgs>(args: SelectSubset<T, MistakeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MistakePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Mistake.
     * @param {MistakeUpsertArgs} args - Arguments to update or create a Mistake.
     * @example
     * // Update or create a Mistake
     * const mistake = await prisma.mistake.upsert({
     *   create: {
     *     // ... data to create a Mistake
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mistake we want to update
     *   }
     * })
     */
    upsert<T extends MistakeUpsertArgs>(args: SelectSubset<T, MistakeUpsertArgs<ExtArgs>>): Prisma__MistakeClient<$Result.GetResult<Prisma.$MistakePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Mistakes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MistakeCountArgs} args - Arguments to filter Mistakes to count.
     * @example
     * // Count the number of Mistakes
     * const count = await prisma.mistake.count({
     *   where: {
     *     // ... the filter for the Mistakes we want to count
     *   }
     * })
    **/
    count<T extends MistakeCountArgs>(
      args?: Subset<T, MistakeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MistakeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mistake.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MistakeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MistakeAggregateArgs>(args: Subset<T, MistakeAggregateArgs>): Prisma.PrismaPromise<GetMistakeAggregateType<T>>

    /**
     * Group by Mistake.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MistakeGroupByArgs} args - Group by arguments.
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
      T extends MistakeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MistakeGroupByArgs['orderBy'] }
        : { orderBy?: MistakeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MistakeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMistakeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Mistake model
   */
  readonly fields: MistakeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Mistake.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MistakeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trade<T extends TradeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TradeDefaultArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Mistake model
   */
  interface MistakeFieldRefs {
    readonly id: FieldRef<"Mistake", 'Int'>
    readonly trade_id: FieldRef<"Mistake", 'Int'>
    readonly mistake_type: FieldRef<"Mistake", 'String'>
    readonly penalty_score: FieldRef<"Mistake", 'Int'>
    readonly note: FieldRef<"Mistake", 'String'>
    readonly created_at: FieldRef<"Mistake", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Mistake findUnique
   */
  export type MistakeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mistake
     */
    select?: MistakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mistake
     */
    omit?: MistakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MistakeInclude<ExtArgs> | null
    /**
     * Filter, which Mistake to fetch.
     */
    where: MistakeWhereUniqueInput
  }

  /**
   * Mistake findUniqueOrThrow
   */
  export type MistakeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mistake
     */
    select?: MistakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mistake
     */
    omit?: MistakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MistakeInclude<ExtArgs> | null
    /**
     * Filter, which Mistake to fetch.
     */
    where: MistakeWhereUniqueInput
  }

  /**
   * Mistake findFirst
   */
  export type MistakeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mistake
     */
    select?: MistakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mistake
     */
    omit?: MistakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MistakeInclude<ExtArgs> | null
    /**
     * Filter, which Mistake to fetch.
     */
    where?: MistakeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mistakes to fetch.
     */
    orderBy?: MistakeOrderByWithRelationInput | MistakeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mistakes.
     */
    cursor?: MistakeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mistakes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mistakes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mistakes.
     */
    distinct?: MistakeScalarFieldEnum | MistakeScalarFieldEnum[]
  }

  /**
   * Mistake findFirstOrThrow
   */
  export type MistakeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mistake
     */
    select?: MistakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mistake
     */
    omit?: MistakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MistakeInclude<ExtArgs> | null
    /**
     * Filter, which Mistake to fetch.
     */
    where?: MistakeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mistakes to fetch.
     */
    orderBy?: MistakeOrderByWithRelationInput | MistakeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mistakes.
     */
    cursor?: MistakeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mistakes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mistakes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mistakes.
     */
    distinct?: MistakeScalarFieldEnum | MistakeScalarFieldEnum[]
  }

  /**
   * Mistake findMany
   */
  export type MistakeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mistake
     */
    select?: MistakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mistake
     */
    omit?: MistakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MistakeInclude<ExtArgs> | null
    /**
     * Filter, which Mistakes to fetch.
     */
    where?: MistakeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mistakes to fetch.
     */
    orderBy?: MistakeOrderByWithRelationInput | MistakeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Mistakes.
     */
    cursor?: MistakeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mistakes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mistakes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mistakes.
     */
    distinct?: MistakeScalarFieldEnum | MistakeScalarFieldEnum[]
  }

  /**
   * Mistake create
   */
  export type MistakeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mistake
     */
    select?: MistakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mistake
     */
    omit?: MistakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MistakeInclude<ExtArgs> | null
    /**
     * The data needed to create a Mistake.
     */
    data: XOR<MistakeCreateInput, MistakeUncheckedCreateInput>
  }

  /**
   * Mistake createMany
   */
  export type MistakeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Mistakes.
     */
    data: MistakeCreateManyInput | MistakeCreateManyInput[]
  }

  /**
   * Mistake createManyAndReturn
   */
  export type MistakeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mistake
     */
    select?: MistakeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mistake
     */
    omit?: MistakeOmit<ExtArgs> | null
    /**
     * The data used to create many Mistakes.
     */
    data: MistakeCreateManyInput | MistakeCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MistakeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Mistake update
   */
  export type MistakeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mistake
     */
    select?: MistakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mistake
     */
    omit?: MistakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MistakeInclude<ExtArgs> | null
    /**
     * The data needed to update a Mistake.
     */
    data: XOR<MistakeUpdateInput, MistakeUncheckedUpdateInput>
    /**
     * Choose, which Mistake to update.
     */
    where: MistakeWhereUniqueInput
  }

  /**
   * Mistake updateMany
   */
  export type MistakeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Mistakes.
     */
    data: XOR<MistakeUpdateManyMutationInput, MistakeUncheckedUpdateManyInput>
    /**
     * Filter which Mistakes to update
     */
    where?: MistakeWhereInput
    /**
     * Limit how many Mistakes to update.
     */
    limit?: number
  }

  /**
   * Mistake updateManyAndReturn
   */
  export type MistakeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mistake
     */
    select?: MistakeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mistake
     */
    omit?: MistakeOmit<ExtArgs> | null
    /**
     * The data used to update Mistakes.
     */
    data: XOR<MistakeUpdateManyMutationInput, MistakeUncheckedUpdateManyInput>
    /**
     * Filter which Mistakes to update
     */
    where?: MistakeWhereInput
    /**
     * Limit how many Mistakes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MistakeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Mistake upsert
   */
  export type MistakeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mistake
     */
    select?: MistakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mistake
     */
    omit?: MistakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MistakeInclude<ExtArgs> | null
    /**
     * The filter to search for the Mistake to update in case it exists.
     */
    where: MistakeWhereUniqueInput
    /**
     * In case the Mistake found by the `where` argument doesn't exist, create a new Mistake with this data.
     */
    create: XOR<MistakeCreateInput, MistakeUncheckedCreateInput>
    /**
     * In case the Mistake was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MistakeUpdateInput, MistakeUncheckedUpdateInput>
  }

  /**
   * Mistake delete
   */
  export type MistakeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mistake
     */
    select?: MistakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mistake
     */
    omit?: MistakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MistakeInclude<ExtArgs> | null
    /**
     * Filter which Mistake to delete.
     */
    where: MistakeWhereUniqueInput
  }

  /**
   * Mistake deleteMany
   */
  export type MistakeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mistakes to delete
     */
    where?: MistakeWhereInput
    /**
     * Limit how many Mistakes to delete.
     */
    limit?: number
  }

  /**
   * Mistake without action
   */
  export type MistakeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mistake
     */
    select?: MistakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mistake
     */
    omit?: MistakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MistakeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SessionScalarFieldEnum: {
    id: 'id',
    date: 'date',
    start_time: 'start_time',
    end_time: 'end_time',
    total_pnl: 'total_pnl',
    discipline_score: 'discipline_score',
    emotional_state: 'emotional_state',
    notes: 'notes',
    conclusion: 'conclusion',
    is_closed: 'is_closed',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const TradeScalarFieldEnum: {
    id: 'id',
    session_id: 'session_id',
    time: 'time',
    asset: 'asset',
    direction: 'direction',
    setup_type: 'setup_type',
    rr_planned: 'rr_planned',
    entry_price: 'entry_price',
    sl_price: 'sl_price',
    tp_price: 'tp_price',
    result_pnl: 'result_pnl',
    screenshot_pre: 'screenshot_pre',
    screenshot_post: 'screenshot_post',
    is_in_plan: 'is_in_plan',
    notes: 'notes',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type TradeScalarFieldEnum = (typeof TradeScalarFieldEnum)[keyof typeof TradeScalarFieldEnum]


  export const PreTradeChecklistScalarFieldEnum: {
    id: 'id',
    trade_id: 'trade_id',
    has_fomo: 'has_fomo',
    is_extended: 'is_extended',
    is_chasing: 'is_chasing',
    is_revenge_trade: 'is_revenge_trade',
    has_confirmation: 'has_confirmation',
    is_correct_session: 'is_correct_session',
    has_clear_sl: 'has_clear_sl',
    follows_higher_tf: 'follows_higher_tf',
    risk_score: 'risk_score',
    created_at: 'created_at'
  };

  export type PreTradeChecklistScalarFieldEnum = (typeof PreTradeChecklistScalarFieldEnum)[keyof typeof PreTradeChecklistScalarFieldEnum]


  export const MistakeScalarFieldEnum: {
    id: 'id',
    trade_id: 'trade_id',
    mistake_type: 'mistake_type',
    penalty_score: 'penalty_score',
    note: 'note',
    created_at: 'created_at'
  };

  export type MistakeScalarFieldEnum = (typeof MistakeScalarFieldEnum)[keyof typeof MistakeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: IntFilter<"Session"> | number
    date?: DateTimeFilter<"Session"> | Date | string
    start_time?: DateTimeFilter<"Session"> | Date | string
    end_time?: DateTimeNullableFilter<"Session"> | Date | string | null
    total_pnl?: FloatFilter<"Session"> | number
    discipline_score?: IntFilter<"Session"> | number
    emotional_state?: StringFilter<"Session"> | string
    notes?: StringNullableFilter<"Session"> | string | null
    conclusion?: StringNullableFilter<"Session"> | string | null
    is_closed?: BoolFilter<"Session"> | boolean
    created_at?: DateTimeFilter<"Session"> | Date | string
    updated_at?: DateTimeFilter<"Session"> | Date | string
    trades?: TradeListRelationFilter
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrderInput | SortOrder
    total_pnl?: SortOrder
    discipline_score?: SortOrder
    emotional_state?: SortOrder
    notes?: SortOrderInput | SortOrder
    conclusion?: SortOrderInput | SortOrder
    is_closed?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    trades?: TradeOrderByRelationAggregateInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    date?: DateTimeFilter<"Session"> | Date | string
    start_time?: DateTimeFilter<"Session"> | Date | string
    end_time?: DateTimeNullableFilter<"Session"> | Date | string | null
    total_pnl?: FloatFilter<"Session"> | number
    discipline_score?: IntFilter<"Session"> | number
    emotional_state?: StringFilter<"Session"> | string
    notes?: StringNullableFilter<"Session"> | string | null
    conclusion?: StringNullableFilter<"Session"> | string | null
    is_closed?: BoolFilter<"Session"> | boolean
    created_at?: DateTimeFilter<"Session"> | Date | string
    updated_at?: DateTimeFilter<"Session"> | Date | string
    trades?: TradeListRelationFilter
  }, "id">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrderInput | SortOrder
    total_pnl?: SortOrder
    discipline_score?: SortOrder
    emotional_state?: SortOrder
    notes?: SortOrderInput | SortOrder
    conclusion?: SortOrderInput | SortOrder
    is_closed?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _avg?: SessionAvgOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
    _sum?: SessionSumOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Session"> | number
    date?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    start_time?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    end_time?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
    total_pnl?: FloatWithAggregatesFilter<"Session"> | number
    discipline_score?: IntWithAggregatesFilter<"Session"> | number
    emotional_state?: StringWithAggregatesFilter<"Session"> | string
    notes?: StringNullableWithAggregatesFilter<"Session"> | string | null
    conclusion?: StringNullableWithAggregatesFilter<"Session"> | string | null
    is_closed?: BoolWithAggregatesFilter<"Session"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type TradeWhereInput = {
    AND?: TradeWhereInput | TradeWhereInput[]
    OR?: TradeWhereInput[]
    NOT?: TradeWhereInput | TradeWhereInput[]
    id?: IntFilter<"Trade"> | number
    session_id?: IntFilter<"Trade"> | number
    time?: DateTimeFilter<"Trade"> | Date | string
    asset?: StringFilter<"Trade"> | string
    direction?: StringFilter<"Trade"> | string
    setup_type?: StringFilter<"Trade"> | string
    rr_planned?: FloatFilter<"Trade"> | number
    entry_price?: FloatNullableFilter<"Trade"> | number | null
    sl_price?: FloatNullableFilter<"Trade"> | number | null
    tp_price?: FloatNullableFilter<"Trade"> | number | null
    result_pnl?: FloatFilter<"Trade"> | number
    screenshot_pre?: StringNullableFilter<"Trade"> | string | null
    screenshot_post?: StringNullableFilter<"Trade"> | string | null
    is_in_plan?: BoolFilter<"Trade"> | boolean
    notes?: StringNullableFilter<"Trade"> | string | null
    created_at?: DateTimeFilter<"Trade"> | Date | string
    updated_at?: DateTimeFilter<"Trade"> | Date | string
    session?: XOR<SessionScalarRelationFilter, SessionWhereInput>
    checklist?: XOR<PreTradeChecklistNullableScalarRelationFilter, PreTradeChecklistWhereInput> | null
    mistakes?: MistakeListRelationFilter
  }

  export type TradeOrderByWithRelationInput = {
    id?: SortOrder
    session_id?: SortOrder
    time?: SortOrder
    asset?: SortOrder
    direction?: SortOrder
    setup_type?: SortOrder
    rr_planned?: SortOrder
    entry_price?: SortOrderInput | SortOrder
    sl_price?: SortOrderInput | SortOrder
    tp_price?: SortOrderInput | SortOrder
    result_pnl?: SortOrder
    screenshot_pre?: SortOrderInput | SortOrder
    screenshot_post?: SortOrderInput | SortOrder
    is_in_plan?: SortOrder
    notes?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    session?: SessionOrderByWithRelationInput
    checklist?: PreTradeChecklistOrderByWithRelationInput
    mistakes?: MistakeOrderByRelationAggregateInput
  }

  export type TradeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TradeWhereInput | TradeWhereInput[]
    OR?: TradeWhereInput[]
    NOT?: TradeWhereInput | TradeWhereInput[]
    session_id?: IntFilter<"Trade"> | number
    time?: DateTimeFilter<"Trade"> | Date | string
    asset?: StringFilter<"Trade"> | string
    direction?: StringFilter<"Trade"> | string
    setup_type?: StringFilter<"Trade"> | string
    rr_planned?: FloatFilter<"Trade"> | number
    entry_price?: FloatNullableFilter<"Trade"> | number | null
    sl_price?: FloatNullableFilter<"Trade"> | number | null
    tp_price?: FloatNullableFilter<"Trade"> | number | null
    result_pnl?: FloatFilter<"Trade"> | number
    screenshot_pre?: StringNullableFilter<"Trade"> | string | null
    screenshot_post?: StringNullableFilter<"Trade"> | string | null
    is_in_plan?: BoolFilter<"Trade"> | boolean
    notes?: StringNullableFilter<"Trade"> | string | null
    created_at?: DateTimeFilter<"Trade"> | Date | string
    updated_at?: DateTimeFilter<"Trade"> | Date | string
    session?: XOR<SessionScalarRelationFilter, SessionWhereInput>
    checklist?: XOR<PreTradeChecklistNullableScalarRelationFilter, PreTradeChecklistWhereInput> | null
    mistakes?: MistakeListRelationFilter
  }, "id">

  export type TradeOrderByWithAggregationInput = {
    id?: SortOrder
    session_id?: SortOrder
    time?: SortOrder
    asset?: SortOrder
    direction?: SortOrder
    setup_type?: SortOrder
    rr_planned?: SortOrder
    entry_price?: SortOrderInput | SortOrder
    sl_price?: SortOrderInput | SortOrder
    tp_price?: SortOrderInput | SortOrder
    result_pnl?: SortOrder
    screenshot_pre?: SortOrderInput | SortOrder
    screenshot_post?: SortOrderInput | SortOrder
    is_in_plan?: SortOrder
    notes?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: TradeCountOrderByAggregateInput
    _avg?: TradeAvgOrderByAggregateInput
    _max?: TradeMaxOrderByAggregateInput
    _min?: TradeMinOrderByAggregateInput
    _sum?: TradeSumOrderByAggregateInput
  }

  export type TradeScalarWhereWithAggregatesInput = {
    AND?: TradeScalarWhereWithAggregatesInput | TradeScalarWhereWithAggregatesInput[]
    OR?: TradeScalarWhereWithAggregatesInput[]
    NOT?: TradeScalarWhereWithAggregatesInput | TradeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Trade"> | number
    session_id?: IntWithAggregatesFilter<"Trade"> | number
    time?: DateTimeWithAggregatesFilter<"Trade"> | Date | string
    asset?: StringWithAggregatesFilter<"Trade"> | string
    direction?: StringWithAggregatesFilter<"Trade"> | string
    setup_type?: StringWithAggregatesFilter<"Trade"> | string
    rr_planned?: FloatWithAggregatesFilter<"Trade"> | number
    entry_price?: FloatNullableWithAggregatesFilter<"Trade"> | number | null
    sl_price?: FloatNullableWithAggregatesFilter<"Trade"> | number | null
    tp_price?: FloatNullableWithAggregatesFilter<"Trade"> | number | null
    result_pnl?: FloatWithAggregatesFilter<"Trade"> | number
    screenshot_pre?: StringNullableWithAggregatesFilter<"Trade"> | string | null
    screenshot_post?: StringNullableWithAggregatesFilter<"Trade"> | string | null
    is_in_plan?: BoolWithAggregatesFilter<"Trade"> | boolean
    notes?: StringNullableWithAggregatesFilter<"Trade"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Trade"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Trade"> | Date | string
  }

  export type PreTradeChecklistWhereInput = {
    AND?: PreTradeChecklistWhereInput | PreTradeChecklistWhereInput[]
    OR?: PreTradeChecklistWhereInput[]
    NOT?: PreTradeChecklistWhereInput | PreTradeChecklistWhereInput[]
    id?: IntFilter<"PreTradeChecklist"> | number
    trade_id?: IntFilter<"PreTradeChecklist"> | number
    has_fomo?: BoolFilter<"PreTradeChecklist"> | boolean
    is_extended?: BoolFilter<"PreTradeChecklist"> | boolean
    is_chasing?: BoolFilter<"PreTradeChecklist"> | boolean
    is_revenge_trade?: BoolFilter<"PreTradeChecklist"> | boolean
    has_confirmation?: BoolFilter<"PreTradeChecklist"> | boolean
    is_correct_session?: BoolFilter<"PreTradeChecklist"> | boolean
    has_clear_sl?: BoolFilter<"PreTradeChecklist"> | boolean
    follows_higher_tf?: BoolFilter<"PreTradeChecklist"> | boolean
    risk_score?: IntFilter<"PreTradeChecklist"> | number
    created_at?: DateTimeFilter<"PreTradeChecklist"> | Date | string
    trade?: XOR<TradeScalarRelationFilter, TradeWhereInput>
  }

  export type PreTradeChecklistOrderByWithRelationInput = {
    id?: SortOrder
    trade_id?: SortOrder
    has_fomo?: SortOrder
    is_extended?: SortOrder
    is_chasing?: SortOrder
    is_revenge_trade?: SortOrder
    has_confirmation?: SortOrder
    is_correct_session?: SortOrder
    has_clear_sl?: SortOrder
    follows_higher_tf?: SortOrder
    risk_score?: SortOrder
    created_at?: SortOrder
    trade?: TradeOrderByWithRelationInput
  }

  export type PreTradeChecklistWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    trade_id?: number
    AND?: PreTradeChecklistWhereInput | PreTradeChecklistWhereInput[]
    OR?: PreTradeChecklistWhereInput[]
    NOT?: PreTradeChecklistWhereInput | PreTradeChecklistWhereInput[]
    has_fomo?: BoolFilter<"PreTradeChecklist"> | boolean
    is_extended?: BoolFilter<"PreTradeChecklist"> | boolean
    is_chasing?: BoolFilter<"PreTradeChecklist"> | boolean
    is_revenge_trade?: BoolFilter<"PreTradeChecklist"> | boolean
    has_confirmation?: BoolFilter<"PreTradeChecklist"> | boolean
    is_correct_session?: BoolFilter<"PreTradeChecklist"> | boolean
    has_clear_sl?: BoolFilter<"PreTradeChecklist"> | boolean
    follows_higher_tf?: BoolFilter<"PreTradeChecklist"> | boolean
    risk_score?: IntFilter<"PreTradeChecklist"> | number
    created_at?: DateTimeFilter<"PreTradeChecklist"> | Date | string
    trade?: XOR<TradeScalarRelationFilter, TradeWhereInput>
  }, "id" | "trade_id">

  export type PreTradeChecklistOrderByWithAggregationInput = {
    id?: SortOrder
    trade_id?: SortOrder
    has_fomo?: SortOrder
    is_extended?: SortOrder
    is_chasing?: SortOrder
    is_revenge_trade?: SortOrder
    has_confirmation?: SortOrder
    is_correct_session?: SortOrder
    has_clear_sl?: SortOrder
    follows_higher_tf?: SortOrder
    risk_score?: SortOrder
    created_at?: SortOrder
    _count?: PreTradeChecklistCountOrderByAggregateInput
    _avg?: PreTradeChecklistAvgOrderByAggregateInput
    _max?: PreTradeChecklistMaxOrderByAggregateInput
    _min?: PreTradeChecklistMinOrderByAggregateInput
    _sum?: PreTradeChecklistSumOrderByAggregateInput
  }

  export type PreTradeChecklistScalarWhereWithAggregatesInput = {
    AND?: PreTradeChecklistScalarWhereWithAggregatesInput | PreTradeChecklistScalarWhereWithAggregatesInput[]
    OR?: PreTradeChecklistScalarWhereWithAggregatesInput[]
    NOT?: PreTradeChecklistScalarWhereWithAggregatesInput | PreTradeChecklistScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PreTradeChecklist"> | number
    trade_id?: IntWithAggregatesFilter<"PreTradeChecklist"> | number
    has_fomo?: BoolWithAggregatesFilter<"PreTradeChecklist"> | boolean
    is_extended?: BoolWithAggregatesFilter<"PreTradeChecklist"> | boolean
    is_chasing?: BoolWithAggregatesFilter<"PreTradeChecklist"> | boolean
    is_revenge_trade?: BoolWithAggregatesFilter<"PreTradeChecklist"> | boolean
    has_confirmation?: BoolWithAggregatesFilter<"PreTradeChecklist"> | boolean
    is_correct_session?: BoolWithAggregatesFilter<"PreTradeChecklist"> | boolean
    has_clear_sl?: BoolWithAggregatesFilter<"PreTradeChecklist"> | boolean
    follows_higher_tf?: BoolWithAggregatesFilter<"PreTradeChecklist"> | boolean
    risk_score?: IntWithAggregatesFilter<"PreTradeChecklist"> | number
    created_at?: DateTimeWithAggregatesFilter<"PreTradeChecklist"> | Date | string
  }

  export type MistakeWhereInput = {
    AND?: MistakeWhereInput | MistakeWhereInput[]
    OR?: MistakeWhereInput[]
    NOT?: MistakeWhereInput | MistakeWhereInput[]
    id?: IntFilter<"Mistake"> | number
    trade_id?: IntFilter<"Mistake"> | number
    mistake_type?: StringFilter<"Mistake"> | string
    penalty_score?: IntFilter<"Mistake"> | number
    note?: StringNullableFilter<"Mistake"> | string | null
    created_at?: DateTimeFilter<"Mistake"> | Date | string
    trade?: XOR<TradeScalarRelationFilter, TradeWhereInput>
  }

  export type MistakeOrderByWithRelationInput = {
    id?: SortOrder
    trade_id?: SortOrder
    mistake_type?: SortOrder
    penalty_score?: SortOrder
    note?: SortOrderInput | SortOrder
    created_at?: SortOrder
    trade?: TradeOrderByWithRelationInput
  }

  export type MistakeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MistakeWhereInput | MistakeWhereInput[]
    OR?: MistakeWhereInput[]
    NOT?: MistakeWhereInput | MistakeWhereInput[]
    trade_id?: IntFilter<"Mistake"> | number
    mistake_type?: StringFilter<"Mistake"> | string
    penalty_score?: IntFilter<"Mistake"> | number
    note?: StringNullableFilter<"Mistake"> | string | null
    created_at?: DateTimeFilter<"Mistake"> | Date | string
    trade?: XOR<TradeScalarRelationFilter, TradeWhereInput>
  }, "id">

  export type MistakeOrderByWithAggregationInput = {
    id?: SortOrder
    trade_id?: SortOrder
    mistake_type?: SortOrder
    penalty_score?: SortOrder
    note?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: MistakeCountOrderByAggregateInput
    _avg?: MistakeAvgOrderByAggregateInput
    _max?: MistakeMaxOrderByAggregateInput
    _min?: MistakeMinOrderByAggregateInput
    _sum?: MistakeSumOrderByAggregateInput
  }

  export type MistakeScalarWhereWithAggregatesInput = {
    AND?: MistakeScalarWhereWithAggregatesInput | MistakeScalarWhereWithAggregatesInput[]
    OR?: MistakeScalarWhereWithAggregatesInput[]
    NOT?: MistakeScalarWhereWithAggregatesInput | MistakeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Mistake"> | number
    trade_id?: IntWithAggregatesFilter<"Mistake"> | number
    mistake_type?: StringWithAggregatesFilter<"Mistake"> | string
    penalty_score?: IntWithAggregatesFilter<"Mistake"> | number
    note?: StringNullableWithAggregatesFilter<"Mistake"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Mistake"> | Date | string
  }

  export type SessionCreateInput = {
    date?: Date | string
    start_time: Date | string
    end_time?: Date | string | null
    total_pnl?: number
    discipline_score?: number
    emotional_state?: string
    notes?: string | null
    conclusion?: string | null
    is_closed?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    trades?: TradeCreateNestedManyWithoutSessionInput
  }

  export type SessionUncheckedCreateInput = {
    id?: number
    date?: Date | string
    start_time: Date | string
    end_time?: Date | string | null
    total_pnl?: number
    discipline_score?: number
    emotional_state?: string
    notes?: string | null
    conclusion?: string | null
    is_closed?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    trades?: TradeUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_pnl?: FloatFieldUpdateOperationsInput | number
    discipline_score?: IntFieldUpdateOperationsInput | number
    emotional_state?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    conclusion?: NullableStringFieldUpdateOperationsInput | string | null
    is_closed?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_pnl?: FloatFieldUpdateOperationsInput | number
    discipline_score?: IntFieldUpdateOperationsInput | number
    emotional_state?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    conclusion?: NullableStringFieldUpdateOperationsInput | string | null
    is_closed?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: TradeUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionCreateManyInput = {
    id?: number
    date?: Date | string
    start_time: Date | string
    end_time?: Date | string | null
    total_pnl?: number
    discipline_score?: number
    emotional_state?: string
    notes?: string | null
    conclusion?: string | null
    is_closed?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_pnl?: FloatFieldUpdateOperationsInput | number
    discipline_score?: IntFieldUpdateOperationsInput | number
    emotional_state?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    conclusion?: NullableStringFieldUpdateOperationsInput | string | null
    is_closed?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_pnl?: FloatFieldUpdateOperationsInput | number
    discipline_score?: IntFieldUpdateOperationsInput | number
    emotional_state?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    conclusion?: NullableStringFieldUpdateOperationsInput | string | null
    is_closed?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeCreateInput = {
    time?: Date | string
    asset?: string
    direction: string
    setup_type?: string
    rr_planned?: number
    entry_price?: number | null
    sl_price?: number | null
    tp_price?: number | null
    result_pnl?: number
    screenshot_pre?: string | null
    screenshot_post?: string | null
    is_in_plan?: boolean
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    session: SessionCreateNestedOneWithoutTradesInput
    checklist?: PreTradeChecklistCreateNestedOneWithoutTradeInput
    mistakes?: MistakeCreateNestedManyWithoutTradeInput
  }

  export type TradeUncheckedCreateInput = {
    id?: number
    session_id: number
    time?: Date | string
    asset?: string
    direction: string
    setup_type?: string
    rr_planned?: number
    entry_price?: number | null
    sl_price?: number | null
    tp_price?: number | null
    result_pnl?: number
    screenshot_pre?: string | null
    screenshot_post?: string | null
    is_in_plan?: boolean
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    checklist?: PreTradeChecklistUncheckedCreateNestedOneWithoutTradeInput
    mistakes?: MistakeUncheckedCreateNestedManyWithoutTradeInput
  }

  export type TradeUpdateInput = {
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    asset?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    setup_type?: StringFieldUpdateOperationsInput | string
    rr_planned?: FloatFieldUpdateOperationsInput | number
    entry_price?: NullableFloatFieldUpdateOperationsInput | number | null
    sl_price?: NullableFloatFieldUpdateOperationsInput | number | null
    tp_price?: NullableFloatFieldUpdateOperationsInput | number | null
    result_pnl?: FloatFieldUpdateOperationsInput | number
    screenshot_pre?: NullableStringFieldUpdateOperationsInput | string | null
    screenshot_post?: NullableStringFieldUpdateOperationsInput | string | null
    is_in_plan?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: SessionUpdateOneRequiredWithoutTradesNestedInput
    checklist?: PreTradeChecklistUpdateOneWithoutTradeNestedInput
    mistakes?: MistakeUpdateManyWithoutTradeNestedInput
  }

  export type TradeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    session_id?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    asset?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    setup_type?: StringFieldUpdateOperationsInput | string
    rr_planned?: FloatFieldUpdateOperationsInput | number
    entry_price?: NullableFloatFieldUpdateOperationsInput | number | null
    sl_price?: NullableFloatFieldUpdateOperationsInput | number | null
    tp_price?: NullableFloatFieldUpdateOperationsInput | number | null
    result_pnl?: FloatFieldUpdateOperationsInput | number
    screenshot_pre?: NullableStringFieldUpdateOperationsInput | string | null
    screenshot_post?: NullableStringFieldUpdateOperationsInput | string | null
    is_in_plan?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    checklist?: PreTradeChecklistUncheckedUpdateOneWithoutTradeNestedInput
    mistakes?: MistakeUncheckedUpdateManyWithoutTradeNestedInput
  }

  export type TradeCreateManyInput = {
    id?: number
    session_id: number
    time?: Date | string
    asset?: string
    direction: string
    setup_type?: string
    rr_planned?: number
    entry_price?: number | null
    sl_price?: number | null
    tp_price?: number | null
    result_pnl?: number
    screenshot_pre?: string | null
    screenshot_post?: string | null
    is_in_plan?: boolean
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TradeUpdateManyMutationInput = {
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    asset?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    setup_type?: StringFieldUpdateOperationsInput | string
    rr_planned?: FloatFieldUpdateOperationsInput | number
    entry_price?: NullableFloatFieldUpdateOperationsInput | number | null
    sl_price?: NullableFloatFieldUpdateOperationsInput | number | null
    tp_price?: NullableFloatFieldUpdateOperationsInput | number | null
    result_pnl?: FloatFieldUpdateOperationsInput | number
    screenshot_pre?: NullableStringFieldUpdateOperationsInput | string | null
    screenshot_post?: NullableStringFieldUpdateOperationsInput | string | null
    is_in_plan?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    session_id?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    asset?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    setup_type?: StringFieldUpdateOperationsInput | string
    rr_planned?: FloatFieldUpdateOperationsInput | number
    entry_price?: NullableFloatFieldUpdateOperationsInput | number | null
    sl_price?: NullableFloatFieldUpdateOperationsInput | number | null
    tp_price?: NullableFloatFieldUpdateOperationsInput | number | null
    result_pnl?: FloatFieldUpdateOperationsInput | number
    screenshot_pre?: NullableStringFieldUpdateOperationsInput | string | null
    screenshot_post?: NullableStringFieldUpdateOperationsInput | string | null
    is_in_plan?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreTradeChecklistCreateInput = {
    has_fomo?: boolean
    is_extended?: boolean
    is_chasing?: boolean
    is_revenge_trade?: boolean
    has_confirmation?: boolean
    is_correct_session?: boolean
    has_clear_sl?: boolean
    follows_higher_tf?: boolean
    risk_score?: number
    created_at?: Date | string
    trade: TradeCreateNestedOneWithoutChecklistInput
  }

  export type PreTradeChecklistUncheckedCreateInput = {
    id?: number
    trade_id: number
    has_fomo?: boolean
    is_extended?: boolean
    is_chasing?: boolean
    is_revenge_trade?: boolean
    has_confirmation?: boolean
    is_correct_session?: boolean
    has_clear_sl?: boolean
    follows_higher_tf?: boolean
    risk_score?: number
    created_at?: Date | string
  }

  export type PreTradeChecklistUpdateInput = {
    has_fomo?: BoolFieldUpdateOperationsInput | boolean
    is_extended?: BoolFieldUpdateOperationsInput | boolean
    is_chasing?: BoolFieldUpdateOperationsInput | boolean
    is_revenge_trade?: BoolFieldUpdateOperationsInput | boolean
    has_confirmation?: BoolFieldUpdateOperationsInput | boolean
    is_correct_session?: BoolFieldUpdateOperationsInput | boolean
    has_clear_sl?: BoolFieldUpdateOperationsInput | boolean
    follows_higher_tf?: BoolFieldUpdateOperationsInput | boolean
    risk_score?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    trade?: TradeUpdateOneRequiredWithoutChecklistNestedInput
  }

  export type PreTradeChecklistUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    trade_id?: IntFieldUpdateOperationsInput | number
    has_fomo?: BoolFieldUpdateOperationsInput | boolean
    is_extended?: BoolFieldUpdateOperationsInput | boolean
    is_chasing?: BoolFieldUpdateOperationsInput | boolean
    is_revenge_trade?: BoolFieldUpdateOperationsInput | boolean
    has_confirmation?: BoolFieldUpdateOperationsInput | boolean
    is_correct_session?: BoolFieldUpdateOperationsInput | boolean
    has_clear_sl?: BoolFieldUpdateOperationsInput | boolean
    follows_higher_tf?: BoolFieldUpdateOperationsInput | boolean
    risk_score?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreTradeChecklistCreateManyInput = {
    id?: number
    trade_id: number
    has_fomo?: boolean
    is_extended?: boolean
    is_chasing?: boolean
    is_revenge_trade?: boolean
    has_confirmation?: boolean
    is_correct_session?: boolean
    has_clear_sl?: boolean
    follows_higher_tf?: boolean
    risk_score?: number
    created_at?: Date | string
  }

  export type PreTradeChecklistUpdateManyMutationInput = {
    has_fomo?: BoolFieldUpdateOperationsInput | boolean
    is_extended?: BoolFieldUpdateOperationsInput | boolean
    is_chasing?: BoolFieldUpdateOperationsInput | boolean
    is_revenge_trade?: BoolFieldUpdateOperationsInput | boolean
    has_confirmation?: BoolFieldUpdateOperationsInput | boolean
    is_correct_session?: BoolFieldUpdateOperationsInput | boolean
    has_clear_sl?: BoolFieldUpdateOperationsInput | boolean
    follows_higher_tf?: BoolFieldUpdateOperationsInput | boolean
    risk_score?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreTradeChecklistUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    trade_id?: IntFieldUpdateOperationsInput | number
    has_fomo?: BoolFieldUpdateOperationsInput | boolean
    is_extended?: BoolFieldUpdateOperationsInput | boolean
    is_chasing?: BoolFieldUpdateOperationsInput | boolean
    is_revenge_trade?: BoolFieldUpdateOperationsInput | boolean
    has_confirmation?: BoolFieldUpdateOperationsInput | boolean
    is_correct_session?: BoolFieldUpdateOperationsInput | boolean
    has_clear_sl?: BoolFieldUpdateOperationsInput | boolean
    follows_higher_tf?: BoolFieldUpdateOperationsInput | boolean
    risk_score?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MistakeCreateInput = {
    mistake_type: string
    penalty_score?: number
    note?: string | null
    created_at?: Date | string
    trade: TradeCreateNestedOneWithoutMistakesInput
  }

  export type MistakeUncheckedCreateInput = {
    id?: number
    trade_id: number
    mistake_type: string
    penalty_score?: number
    note?: string | null
    created_at?: Date | string
  }

  export type MistakeUpdateInput = {
    mistake_type?: StringFieldUpdateOperationsInput | string
    penalty_score?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    trade?: TradeUpdateOneRequiredWithoutMistakesNestedInput
  }

  export type MistakeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    trade_id?: IntFieldUpdateOperationsInput | number
    mistake_type?: StringFieldUpdateOperationsInput | string
    penalty_score?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MistakeCreateManyInput = {
    id?: number
    trade_id: number
    mistake_type: string
    penalty_score?: number
    note?: string | null
    created_at?: Date | string
  }

  export type MistakeUpdateManyMutationInput = {
    mistake_type?: StringFieldUpdateOperationsInput | string
    penalty_score?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MistakeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    trade_id?: IntFieldUpdateOperationsInput | number
    mistake_type?: StringFieldUpdateOperationsInput | string
    penalty_score?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TradeListRelationFilter = {
    every?: TradeWhereInput
    some?: TradeWhereInput
    none?: TradeWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TradeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    total_pnl?: SortOrder
    discipline_score?: SortOrder
    emotional_state?: SortOrder
    notes?: SortOrder
    conclusion?: SortOrder
    is_closed?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type SessionAvgOrderByAggregateInput = {
    id?: SortOrder
    total_pnl?: SortOrder
    discipline_score?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    total_pnl?: SortOrder
    discipline_score?: SortOrder
    emotional_state?: SortOrder
    notes?: SortOrder
    conclusion?: SortOrder
    is_closed?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    total_pnl?: SortOrder
    discipline_score?: SortOrder
    emotional_state?: SortOrder
    notes?: SortOrder
    conclusion?: SortOrder
    is_closed?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type SessionSumOrderByAggregateInput = {
    id?: SortOrder
    total_pnl?: SortOrder
    discipline_score?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type SessionScalarRelationFilter = {
    is?: SessionWhereInput
    isNot?: SessionWhereInput
  }

  export type PreTradeChecklistNullableScalarRelationFilter = {
    is?: PreTradeChecklistWhereInput | null
    isNot?: PreTradeChecklistWhereInput | null
  }

  export type MistakeListRelationFilter = {
    every?: MistakeWhereInput
    some?: MistakeWhereInput
    none?: MistakeWhereInput
  }

  export type MistakeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TradeCountOrderByAggregateInput = {
    id?: SortOrder
    session_id?: SortOrder
    time?: SortOrder
    asset?: SortOrder
    direction?: SortOrder
    setup_type?: SortOrder
    rr_planned?: SortOrder
    entry_price?: SortOrder
    sl_price?: SortOrder
    tp_price?: SortOrder
    result_pnl?: SortOrder
    screenshot_pre?: SortOrder
    screenshot_post?: SortOrder
    is_in_plan?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TradeAvgOrderByAggregateInput = {
    id?: SortOrder
    session_id?: SortOrder
    rr_planned?: SortOrder
    entry_price?: SortOrder
    sl_price?: SortOrder
    tp_price?: SortOrder
    result_pnl?: SortOrder
  }

  export type TradeMaxOrderByAggregateInput = {
    id?: SortOrder
    session_id?: SortOrder
    time?: SortOrder
    asset?: SortOrder
    direction?: SortOrder
    setup_type?: SortOrder
    rr_planned?: SortOrder
    entry_price?: SortOrder
    sl_price?: SortOrder
    tp_price?: SortOrder
    result_pnl?: SortOrder
    screenshot_pre?: SortOrder
    screenshot_post?: SortOrder
    is_in_plan?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TradeMinOrderByAggregateInput = {
    id?: SortOrder
    session_id?: SortOrder
    time?: SortOrder
    asset?: SortOrder
    direction?: SortOrder
    setup_type?: SortOrder
    rr_planned?: SortOrder
    entry_price?: SortOrder
    sl_price?: SortOrder
    tp_price?: SortOrder
    result_pnl?: SortOrder
    screenshot_pre?: SortOrder
    screenshot_post?: SortOrder
    is_in_plan?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TradeSumOrderByAggregateInput = {
    id?: SortOrder
    session_id?: SortOrder
    rr_planned?: SortOrder
    entry_price?: SortOrder
    sl_price?: SortOrder
    tp_price?: SortOrder
    result_pnl?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type TradeScalarRelationFilter = {
    is?: TradeWhereInput
    isNot?: TradeWhereInput
  }

  export type PreTradeChecklistCountOrderByAggregateInput = {
    id?: SortOrder
    trade_id?: SortOrder
    has_fomo?: SortOrder
    is_extended?: SortOrder
    is_chasing?: SortOrder
    is_revenge_trade?: SortOrder
    has_confirmation?: SortOrder
    is_correct_session?: SortOrder
    has_clear_sl?: SortOrder
    follows_higher_tf?: SortOrder
    risk_score?: SortOrder
    created_at?: SortOrder
  }

  export type PreTradeChecklistAvgOrderByAggregateInput = {
    id?: SortOrder
    trade_id?: SortOrder
    risk_score?: SortOrder
  }

  export type PreTradeChecklistMaxOrderByAggregateInput = {
    id?: SortOrder
    trade_id?: SortOrder
    has_fomo?: SortOrder
    is_extended?: SortOrder
    is_chasing?: SortOrder
    is_revenge_trade?: SortOrder
    has_confirmation?: SortOrder
    is_correct_session?: SortOrder
    has_clear_sl?: SortOrder
    follows_higher_tf?: SortOrder
    risk_score?: SortOrder
    created_at?: SortOrder
  }

  export type PreTradeChecklistMinOrderByAggregateInput = {
    id?: SortOrder
    trade_id?: SortOrder
    has_fomo?: SortOrder
    is_extended?: SortOrder
    is_chasing?: SortOrder
    is_revenge_trade?: SortOrder
    has_confirmation?: SortOrder
    is_correct_session?: SortOrder
    has_clear_sl?: SortOrder
    follows_higher_tf?: SortOrder
    risk_score?: SortOrder
    created_at?: SortOrder
  }

  export type PreTradeChecklistSumOrderByAggregateInput = {
    id?: SortOrder
    trade_id?: SortOrder
    risk_score?: SortOrder
  }

  export type MistakeCountOrderByAggregateInput = {
    id?: SortOrder
    trade_id?: SortOrder
    mistake_type?: SortOrder
    penalty_score?: SortOrder
    note?: SortOrder
    created_at?: SortOrder
  }

  export type MistakeAvgOrderByAggregateInput = {
    id?: SortOrder
    trade_id?: SortOrder
    penalty_score?: SortOrder
  }

  export type MistakeMaxOrderByAggregateInput = {
    id?: SortOrder
    trade_id?: SortOrder
    mistake_type?: SortOrder
    penalty_score?: SortOrder
    note?: SortOrder
    created_at?: SortOrder
  }

  export type MistakeMinOrderByAggregateInput = {
    id?: SortOrder
    trade_id?: SortOrder
    mistake_type?: SortOrder
    penalty_score?: SortOrder
    note?: SortOrder
    created_at?: SortOrder
  }

  export type MistakeSumOrderByAggregateInput = {
    id?: SortOrder
    trade_id?: SortOrder
    penalty_score?: SortOrder
  }

  export type TradeCreateNestedManyWithoutSessionInput = {
    create?: XOR<TradeCreateWithoutSessionInput, TradeUncheckedCreateWithoutSessionInput> | TradeCreateWithoutSessionInput[] | TradeUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutSessionInput | TradeCreateOrConnectWithoutSessionInput[]
    createMany?: TradeCreateManySessionInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type TradeUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<TradeCreateWithoutSessionInput, TradeUncheckedCreateWithoutSessionInput> | TradeCreateWithoutSessionInput[] | TradeUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutSessionInput | TradeCreateOrConnectWithoutSessionInput[]
    createMany?: TradeCreateManySessionInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type TradeUpdateManyWithoutSessionNestedInput = {
    create?: XOR<TradeCreateWithoutSessionInput, TradeUncheckedCreateWithoutSessionInput> | TradeCreateWithoutSessionInput[] | TradeUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutSessionInput | TradeCreateOrConnectWithoutSessionInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutSessionInput | TradeUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: TradeCreateManySessionInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutSessionInput | TradeUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutSessionInput | TradeUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type TradeUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<TradeCreateWithoutSessionInput, TradeUncheckedCreateWithoutSessionInput> | TradeCreateWithoutSessionInput[] | TradeUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutSessionInput | TradeCreateOrConnectWithoutSessionInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutSessionInput | TradeUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: TradeCreateManySessionInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutSessionInput | TradeUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutSessionInput | TradeUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type SessionCreateNestedOneWithoutTradesInput = {
    create?: XOR<SessionCreateWithoutTradesInput, SessionUncheckedCreateWithoutTradesInput>
    connectOrCreate?: SessionCreateOrConnectWithoutTradesInput
    connect?: SessionWhereUniqueInput
  }

  export type PreTradeChecklistCreateNestedOneWithoutTradeInput = {
    create?: XOR<PreTradeChecklistCreateWithoutTradeInput, PreTradeChecklistUncheckedCreateWithoutTradeInput>
    connectOrCreate?: PreTradeChecklistCreateOrConnectWithoutTradeInput
    connect?: PreTradeChecklistWhereUniqueInput
  }

  export type MistakeCreateNestedManyWithoutTradeInput = {
    create?: XOR<MistakeCreateWithoutTradeInput, MistakeUncheckedCreateWithoutTradeInput> | MistakeCreateWithoutTradeInput[] | MistakeUncheckedCreateWithoutTradeInput[]
    connectOrCreate?: MistakeCreateOrConnectWithoutTradeInput | MistakeCreateOrConnectWithoutTradeInput[]
    createMany?: MistakeCreateManyTradeInputEnvelope
    connect?: MistakeWhereUniqueInput | MistakeWhereUniqueInput[]
  }

  export type PreTradeChecklistUncheckedCreateNestedOneWithoutTradeInput = {
    create?: XOR<PreTradeChecklistCreateWithoutTradeInput, PreTradeChecklistUncheckedCreateWithoutTradeInput>
    connectOrCreate?: PreTradeChecklistCreateOrConnectWithoutTradeInput
    connect?: PreTradeChecklistWhereUniqueInput
  }

  export type MistakeUncheckedCreateNestedManyWithoutTradeInput = {
    create?: XOR<MistakeCreateWithoutTradeInput, MistakeUncheckedCreateWithoutTradeInput> | MistakeCreateWithoutTradeInput[] | MistakeUncheckedCreateWithoutTradeInput[]
    connectOrCreate?: MistakeCreateOrConnectWithoutTradeInput | MistakeCreateOrConnectWithoutTradeInput[]
    createMany?: MistakeCreateManyTradeInputEnvelope
    connect?: MistakeWhereUniqueInput | MistakeWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SessionUpdateOneRequiredWithoutTradesNestedInput = {
    create?: XOR<SessionCreateWithoutTradesInput, SessionUncheckedCreateWithoutTradesInput>
    connectOrCreate?: SessionCreateOrConnectWithoutTradesInput
    upsert?: SessionUpsertWithoutTradesInput
    connect?: SessionWhereUniqueInput
    update?: XOR<XOR<SessionUpdateToOneWithWhereWithoutTradesInput, SessionUpdateWithoutTradesInput>, SessionUncheckedUpdateWithoutTradesInput>
  }

  export type PreTradeChecklistUpdateOneWithoutTradeNestedInput = {
    create?: XOR<PreTradeChecklistCreateWithoutTradeInput, PreTradeChecklistUncheckedCreateWithoutTradeInput>
    connectOrCreate?: PreTradeChecklistCreateOrConnectWithoutTradeInput
    upsert?: PreTradeChecklistUpsertWithoutTradeInput
    disconnect?: PreTradeChecklistWhereInput | boolean
    delete?: PreTradeChecklistWhereInput | boolean
    connect?: PreTradeChecklistWhereUniqueInput
    update?: XOR<XOR<PreTradeChecklistUpdateToOneWithWhereWithoutTradeInput, PreTradeChecklistUpdateWithoutTradeInput>, PreTradeChecklistUncheckedUpdateWithoutTradeInput>
  }

  export type MistakeUpdateManyWithoutTradeNestedInput = {
    create?: XOR<MistakeCreateWithoutTradeInput, MistakeUncheckedCreateWithoutTradeInput> | MistakeCreateWithoutTradeInput[] | MistakeUncheckedCreateWithoutTradeInput[]
    connectOrCreate?: MistakeCreateOrConnectWithoutTradeInput | MistakeCreateOrConnectWithoutTradeInput[]
    upsert?: MistakeUpsertWithWhereUniqueWithoutTradeInput | MistakeUpsertWithWhereUniqueWithoutTradeInput[]
    createMany?: MistakeCreateManyTradeInputEnvelope
    set?: MistakeWhereUniqueInput | MistakeWhereUniqueInput[]
    disconnect?: MistakeWhereUniqueInput | MistakeWhereUniqueInput[]
    delete?: MistakeWhereUniqueInput | MistakeWhereUniqueInput[]
    connect?: MistakeWhereUniqueInput | MistakeWhereUniqueInput[]
    update?: MistakeUpdateWithWhereUniqueWithoutTradeInput | MistakeUpdateWithWhereUniqueWithoutTradeInput[]
    updateMany?: MistakeUpdateManyWithWhereWithoutTradeInput | MistakeUpdateManyWithWhereWithoutTradeInput[]
    deleteMany?: MistakeScalarWhereInput | MistakeScalarWhereInput[]
  }

  export type PreTradeChecklistUncheckedUpdateOneWithoutTradeNestedInput = {
    create?: XOR<PreTradeChecklistCreateWithoutTradeInput, PreTradeChecklistUncheckedCreateWithoutTradeInput>
    connectOrCreate?: PreTradeChecklistCreateOrConnectWithoutTradeInput
    upsert?: PreTradeChecklistUpsertWithoutTradeInput
    disconnect?: PreTradeChecklistWhereInput | boolean
    delete?: PreTradeChecklistWhereInput | boolean
    connect?: PreTradeChecklistWhereUniqueInput
    update?: XOR<XOR<PreTradeChecklistUpdateToOneWithWhereWithoutTradeInput, PreTradeChecklistUpdateWithoutTradeInput>, PreTradeChecklistUncheckedUpdateWithoutTradeInput>
  }

  export type MistakeUncheckedUpdateManyWithoutTradeNestedInput = {
    create?: XOR<MistakeCreateWithoutTradeInput, MistakeUncheckedCreateWithoutTradeInput> | MistakeCreateWithoutTradeInput[] | MistakeUncheckedCreateWithoutTradeInput[]
    connectOrCreate?: MistakeCreateOrConnectWithoutTradeInput | MistakeCreateOrConnectWithoutTradeInput[]
    upsert?: MistakeUpsertWithWhereUniqueWithoutTradeInput | MistakeUpsertWithWhereUniqueWithoutTradeInput[]
    createMany?: MistakeCreateManyTradeInputEnvelope
    set?: MistakeWhereUniqueInput | MistakeWhereUniqueInput[]
    disconnect?: MistakeWhereUniqueInput | MistakeWhereUniqueInput[]
    delete?: MistakeWhereUniqueInput | MistakeWhereUniqueInput[]
    connect?: MistakeWhereUniqueInput | MistakeWhereUniqueInput[]
    update?: MistakeUpdateWithWhereUniqueWithoutTradeInput | MistakeUpdateWithWhereUniqueWithoutTradeInput[]
    updateMany?: MistakeUpdateManyWithWhereWithoutTradeInput | MistakeUpdateManyWithWhereWithoutTradeInput[]
    deleteMany?: MistakeScalarWhereInput | MistakeScalarWhereInput[]
  }

  export type TradeCreateNestedOneWithoutChecklistInput = {
    create?: XOR<TradeCreateWithoutChecklistInput, TradeUncheckedCreateWithoutChecklistInput>
    connectOrCreate?: TradeCreateOrConnectWithoutChecklistInput
    connect?: TradeWhereUniqueInput
  }

  export type TradeUpdateOneRequiredWithoutChecklistNestedInput = {
    create?: XOR<TradeCreateWithoutChecklistInput, TradeUncheckedCreateWithoutChecklistInput>
    connectOrCreate?: TradeCreateOrConnectWithoutChecklistInput
    upsert?: TradeUpsertWithoutChecklistInput
    connect?: TradeWhereUniqueInput
    update?: XOR<XOR<TradeUpdateToOneWithWhereWithoutChecklistInput, TradeUpdateWithoutChecklistInput>, TradeUncheckedUpdateWithoutChecklistInput>
  }

  export type TradeCreateNestedOneWithoutMistakesInput = {
    create?: XOR<TradeCreateWithoutMistakesInput, TradeUncheckedCreateWithoutMistakesInput>
    connectOrCreate?: TradeCreateOrConnectWithoutMistakesInput
    connect?: TradeWhereUniqueInput
  }

  export type TradeUpdateOneRequiredWithoutMistakesNestedInput = {
    create?: XOR<TradeCreateWithoutMistakesInput, TradeUncheckedCreateWithoutMistakesInput>
    connectOrCreate?: TradeCreateOrConnectWithoutMistakesInput
    upsert?: TradeUpsertWithoutMistakesInput
    connect?: TradeWhereUniqueInput
    update?: XOR<XOR<TradeUpdateToOneWithWhereWithoutMistakesInput, TradeUpdateWithoutMistakesInput>, TradeUncheckedUpdateWithoutMistakesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type TradeCreateWithoutSessionInput = {
    time?: Date | string
    asset?: string
    direction: string
    setup_type?: string
    rr_planned?: number
    entry_price?: number | null
    sl_price?: number | null
    tp_price?: number | null
    result_pnl?: number
    screenshot_pre?: string | null
    screenshot_post?: string | null
    is_in_plan?: boolean
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    checklist?: PreTradeChecklistCreateNestedOneWithoutTradeInput
    mistakes?: MistakeCreateNestedManyWithoutTradeInput
  }

  export type TradeUncheckedCreateWithoutSessionInput = {
    id?: number
    time?: Date | string
    asset?: string
    direction: string
    setup_type?: string
    rr_planned?: number
    entry_price?: number | null
    sl_price?: number | null
    tp_price?: number | null
    result_pnl?: number
    screenshot_pre?: string | null
    screenshot_post?: string | null
    is_in_plan?: boolean
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    checklist?: PreTradeChecklistUncheckedCreateNestedOneWithoutTradeInput
    mistakes?: MistakeUncheckedCreateNestedManyWithoutTradeInput
  }

  export type TradeCreateOrConnectWithoutSessionInput = {
    where: TradeWhereUniqueInput
    create: XOR<TradeCreateWithoutSessionInput, TradeUncheckedCreateWithoutSessionInput>
  }

  export type TradeCreateManySessionInputEnvelope = {
    data: TradeCreateManySessionInput | TradeCreateManySessionInput[]
  }

  export type TradeUpsertWithWhereUniqueWithoutSessionInput = {
    where: TradeWhereUniqueInput
    update: XOR<TradeUpdateWithoutSessionInput, TradeUncheckedUpdateWithoutSessionInput>
    create: XOR<TradeCreateWithoutSessionInput, TradeUncheckedCreateWithoutSessionInput>
  }

  export type TradeUpdateWithWhereUniqueWithoutSessionInput = {
    where: TradeWhereUniqueInput
    data: XOR<TradeUpdateWithoutSessionInput, TradeUncheckedUpdateWithoutSessionInput>
  }

  export type TradeUpdateManyWithWhereWithoutSessionInput = {
    where: TradeScalarWhereInput
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyWithoutSessionInput>
  }

  export type TradeScalarWhereInput = {
    AND?: TradeScalarWhereInput | TradeScalarWhereInput[]
    OR?: TradeScalarWhereInput[]
    NOT?: TradeScalarWhereInput | TradeScalarWhereInput[]
    id?: IntFilter<"Trade"> | number
    session_id?: IntFilter<"Trade"> | number
    time?: DateTimeFilter<"Trade"> | Date | string
    asset?: StringFilter<"Trade"> | string
    direction?: StringFilter<"Trade"> | string
    setup_type?: StringFilter<"Trade"> | string
    rr_planned?: FloatFilter<"Trade"> | number
    entry_price?: FloatNullableFilter<"Trade"> | number | null
    sl_price?: FloatNullableFilter<"Trade"> | number | null
    tp_price?: FloatNullableFilter<"Trade"> | number | null
    result_pnl?: FloatFilter<"Trade"> | number
    screenshot_pre?: StringNullableFilter<"Trade"> | string | null
    screenshot_post?: StringNullableFilter<"Trade"> | string | null
    is_in_plan?: BoolFilter<"Trade"> | boolean
    notes?: StringNullableFilter<"Trade"> | string | null
    created_at?: DateTimeFilter<"Trade"> | Date | string
    updated_at?: DateTimeFilter<"Trade"> | Date | string
  }

  export type SessionCreateWithoutTradesInput = {
    date?: Date | string
    start_time: Date | string
    end_time?: Date | string | null
    total_pnl?: number
    discipline_score?: number
    emotional_state?: string
    notes?: string | null
    conclusion?: string | null
    is_closed?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SessionUncheckedCreateWithoutTradesInput = {
    id?: number
    date?: Date | string
    start_time: Date | string
    end_time?: Date | string | null
    total_pnl?: number
    discipline_score?: number
    emotional_state?: string
    notes?: string | null
    conclusion?: string | null
    is_closed?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SessionCreateOrConnectWithoutTradesInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutTradesInput, SessionUncheckedCreateWithoutTradesInput>
  }

  export type PreTradeChecklistCreateWithoutTradeInput = {
    has_fomo?: boolean
    is_extended?: boolean
    is_chasing?: boolean
    is_revenge_trade?: boolean
    has_confirmation?: boolean
    is_correct_session?: boolean
    has_clear_sl?: boolean
    follows_higher_tf?: boolean
    risk_score?: number
    created_at?: Date | string
  }

  export type PreTradeChecklistUncheckedCreateWithoutTradeInput = {
    id?: number
    has_fomo?: boolean
    is_extended?: boolean
    is_chasing?: boolean
    is_revenge_trade?: boolean
    has_confirmation?: boolean
    is_correct_session?: boolean
    has_clear_sl?: boolean
    follows_higher_tf?: boolean
    risk_score?: number
    created_at?: Date | string
  }

  export type PreTradeChecklistCreateOrConnectWithoutTradeInput = {
    where: PreTradeChecklistWhereUniqueInput
    create: XOR<PreTradeChecklistCreateWithoutTradeInput, PreTradeChecklistUncheckedCreateWithoutTradeInput>
  }

  export type MistakeCreateWithoutTradeInput = {
    mistake_type: string
    penalty_score?: number
    note?: string | null
    created_at?: Date | string
  }

  export type MistakeUncheckedCreateWithoutTradeInput = {
    id?: number
    mistake_type: string
    penalty_score?: number
    note?: string | null
    created_at?: Date | string
  }

  export type MistakeCreateOrConnectWithoutTradeInput = {
    where: MistakeWhereUniqueInput
    create: XOR<MistakeCreateWithoutTradeInput, MistakeUncheckedCreateWithoutTradeInput>
  }

  export type MistakeCreateManyTradeInputEnvelope = {
    data: MistakeCreateManyTradeInput | MistakeCreateManyTradeInput[]
  }

  export type SessionUpsertWithoutTradesInput = {
    update: XOR<SessionUpdateWithoutTradesInput, SessionUncheckedUpdateWithoutTradesInput>
    create: XOR<SessionCreateWithoutTradesInput, SessionUncheckedCreateWithoutTradesInput>
    where?: SessionWhereInput
  }

  export type SessionUpdateToOneWithWhereWithoutTradesInput = {
    where?: SessionWhereInput
    data: XOR<SessionUpdateWithoutTradesInput, SessionUncheckedUpdateWithoutTradesInput>
  }

  export type SessionUpdateWithoutTradesInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_pnl?: FloatFieldUpdateOperationsInput | number
    discipline_score?: IntFieldUpdateOperationsInput | number
    emotional_state?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    conclusion?: NullableStringFieldUpdateOperationsInput | string | null
    is_closed?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutTradesInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_pnl?: FloatFieldUpdateOperationsInput | number
    discipline_score?: IntFieldUpdateOperationsInput | number
    emotional_state?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    conclusion?: NullableStringFieldUpdateOperationsInput | string | null
    is_closed?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreTradeChecklistUpsertWithoutTradeInput = {
    update: XOR<PreTradeChecklistUpdateWithoutTradeInput, PreTradeChecklistUncheckedUpdateWithoutTradeInput>
    create: XOR<PreTradeChecklistCreateWithoutTradeInput, PreTradeChecklistUncheckedCreateWithoutTradeInput>
    where?: PreTradeChecklistWhereInput
  }

  export type PreTradeChecklistUpdateToOneWithWhereWithoutTradeInput = {
    where?: PreTradeChecklistWhereInput
    data: XOR<PreTradeChecklistUpdateWithoutTradeInput, PreTradeChecklistUncheckedUpdateWithoutTradeInput>
  }

  export type PreTradeChecklistUpdateWithoutTradeInput = {
    has_fomo?: BoolFieldUpdateOperationsInput | boolean
    is_extended?: BoolFieldUpdateOperationsInput | boolean
    is_chasing?: BoolFieldUpdateOperationsInput | boolean
    is_revenge_trade?: BoolFieldUpdateOperationsInput | boolean
    has_confirmation?: BoolFieldUpdateOperationsInput | boolean
    is_correct_session?: BoolFieldUpdateOperationsInput | boolean
    has_clear_sl?: BoolFieldUpdateOperationsInput | boolean
    follows_higher_tf?: BoolFieldUpdateOperationsInput | boolean
    risk_score?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreTradeChecklistUncheckedUpdateWithoutTradeInput = {
    id?: IntFieldUpdateOperationsInput | number
    has_fomo?: BoolFieldUpdateOperationsInput | boolean
    is_extended?: BoolFieldUpdateOperationsInput | boolean
    is_chasing?: BoolFieldUpdateOperationsInput | boolean
    is_revenge_trade?: BoolFieldUpdateOperationsInput | boolean
    has_confirmation?: BoolFieldUpdateOperationsInput | boolean
    is_correct_session?: BoolFieldUpdateOperationsInput | boolean
    has_clear_sl?: BoolFieldUpdateOperationsInput | boolean
    follows_higher_tf?: BoolFieldUpdateOperationsInput | boolean
    risk_score?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MistakeUpsertWithWhereUniqueWithoutTradeInput = {
    where: MistakeWhereUniqueInput
    update: XOR<MistakeUpdateWithoutTradeInput, MistakeUncheckedUpdateWithoutTradeInput>
    create: XOR<MistakeCreateWithoutTradeInput, MistakeUncheckedCreateWithoutTradeInput>
  }

  export type MistakeUpdateWithWhereUniqueWithoutTradeInput = {
    where: MistakeWhereUniqueInput
    data: XOR<MistakeUpdateWithoutTradeInput, MistakeUncheckedUpdateWithoutTradeInput>
  }

  export type MistakeUpdateManyWithWhereWithoutTradeInput = {
    where: MistakeScalarWhereInput
    data: XOR<MistakeUpdateManyMutationInput, MistakeUncheckedUpdateManyWithoutTradeInput>
  }

  export type MistakeScalarWhereInput = {
    AND?: MistakeScalarWhereInput | MistakeScalarWhereInput[]
    OR?: MistakeScalarWhereInput[]
    NOT?: MistakeScalarWhereInput | MistakeScalarWhereInput[]
    id?: IntFilter<"Mistake"> | number
    trade_id?: IntFilter<"Mistake"> | number
    mistake_type?: StringFilter<"Mistake"> | string
    penalty_score?: IntFilter<"Mistake"> | number
    note?: StringNullableFilter<"Mistake"> | string | null
    created_at?: DateTimeFilter<"Mistake"> | Date | string
  }

  export type TradeCreateWithoutChecklistInput = {
    time?: Date | string
    asset?: string
    direction: string
    setup_type?: string
    rr_planned?: number
    entry_price?: number | null
    sl_price?: number | null
    tp_price?: number | null
    result_pnl?: number
    screenshot_pre?: string | null
    screenshot_post?: string | null
    is_in_plan?: boolean
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    session: SessionCreateNestedOneWithoutTradesInput
    mistakes?: MistakeCreateNestedManyWithoutTradeInput
  }

  export type TradeUncheckedCreateWithoutChecklistInput = {
    id?: number
    session_id: number
    time?: Date | string
    asset?: string
    direction: string
    setup_type?: string
    rr_planned?: number
    entry_price?: number | null
    sl_price?: number | null
    tp_price?: number | null
    result_pnl?: number
    screenshot_pre?: string | null
    screenshot_post?: string | null
    is_in_plan?: boolean
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    mistakes?: MistakeUncheckedCreateNestedManyWithoutTradeInput
  }

  export type TradeCreateOrConnectWithoutChecklistInput = {
    where: TradeWhereUniqueInput
    create: XOR<TradeCreateWithoutChecklistInput, TradeUncheckedCreateWithoutChecklistInput>
  }

  export type TradeUpsertWithoutChecklistInput = {
    update: XOR<TradeUpdateWithoutChecklistInput, TradeUncheckedUpdateWithoutChecklistInput>
    create: XOR<TradeCreateWithoutChecklistInput, TradeUncheckedCreateWithoutChecklistInput>
    where?: TradeWhereInput
  }

  export type TradeUpdateToOneWithWhereWithoutChecklistInput = {
    where?: TradeWhereInput
    data: XOR<TradeUpdateWithoutChecklistInput, TradeUncheckedUpdateWithoutChecklistInput>
  }

  export type TradeUpdateWithoutChecklistInput = {
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    asset?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    setup_type?: StringFieldUpdateOperationsInput | string
    rr_planned?: FloatFieldUpdateOperationsInput | number
    entry_price?: NullableFloatFieldUpdateOperationsInput | number | null
    sl_price?: NullableFloatFieldUpdateOperationsInput | number | null
    tp_price?: NullableFloatFieldUpdateOperationsInput | number | null
    result_pnl?: FloatFieldUpdateOperationsInput | number
    screenshot_pre?: NullableStringFieldUpdateOperationsInput | string | null
    screenshot_post?: NullableStringFieldUpdateOperationsInput | string | null
    is_in_plan?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: SessionUpdateOneRequiredWithoutTradesNestedInput
    mistakes?: MistakeUpdateManyWithoutTradeNestedInput
  }

  export type TradeUncheckedUpdateWithoutChecklistInput = {
    id?: IntFieldUpdateOperationsInput | number
    session_id?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    asset?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    setup_type?: StringFieldUpdateOperationsInput | string
    rr_planned?: FloatFieldUpdateOperationsInput | number
    entry_price?: NullableFloatFieldUpdateOperationsInput | number | null
    sl_price?: NullableFloatFieldUpdateOperationsInput | number | null
    tp_price?: NullableFloatFieldUpdateOperationsInput | number | null
    result_pnl?: FloatFieldUpdateOperationsInput | number
    screenshot_pre?: NullableStringFieldUpdateOperationsInput | string | null
    screenshot_post?: NullableStringFieldUpdateOperationsInput | string | null
    is_in_plan?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    mistakes?: MistakeUncheckedUpdateManyWithoutTradeNestedInput
  }

  export type TradeCreateWithoutMistakesInput = {
    time?: Date | string
    asset?: string
    direction: string
    setup_type?: string
    rr_planned?: number
    entry_price?: number | null
    sl_price?: number | null
    tp_price?: number | null
    result_pnl?: number
    screenshot_pre?: string | null
    screenshot_post?: string | null
    is_in_plan?: boolean
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    session: SessionCreateNestedOneWithoutTradesInput
    checklist?: PreTradeChecklistCreateNestedOneWithoutTradeInput
  }

  export type TradeUncheckedCreateWithoutMistakesInput = {
    id?: number
    session_id: number
    time?: Date | string
    asset?: string
    direction: string
    setup_type?: string
    rr_planned?: number
    entry_price?: number | null
    sl_price?: number | null
    tp_price?: number | null
    result_pnl?: number
    screenshot_pre?: string | null
    screenshot_post?: string | null
    is_in_plan?: boolean
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    checklist?: PreTradeChecklistUncheckedCreateNestedOneWithoutTradeInput
  }

  export type TradeCreateOrConnectWithoutMistakesInput = {
    where: TradeWhereUniqueInput
    create: XOR<TradeCreateWithoutMistakesInput, TradeUncheckedCreateWithoutMistakesInput>
  }

  export type TradeUpsertWithoutMistakesInput = {
    update: XOR<TradeUpdateWithoutMistakesInput, TradeUncheckedUpdateWithoutMistakesInput>
    create: XOR<TradeCreateWithoutMistakesInput, TradeUncheckedCreateWithoutMistakesInput>
    where?: TradeWhereInput
  }

  export type TradeUpdateToOneWithWhereWithoutMistakesInput = {
    where?: TradeWhereInput
    data: XOR<TradeUpdateWithoutMistakesInput, TradeUncheckedUpdateWithoutMistakesInput>
  }

  export type TradeUpdateWithoutMistakesInput = {
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    asset?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    setup_type?: StringFieldUpdateOperationsInput | string
    rr_planned?: FloatFieldUpdateOperationsInput | number
    entry_price?: NullableFloatFieldUpdateOperationsInput | number | null
    sl_price?: NullableFloatFieldUpdateOperationsInput | number | null
    tp_price?: NullableFloatFieldUpdateOperationsInput | number | null
    result_pnl?: FloatFieldUpdateOperationsInput | number
    screenshot_pre?: NullableStringFieldUpdateOperationsInput | string | null
    screenshot_post?: NullableStringFieldUpdateOperationsInput | string | null
    is_in_plan?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: SessionUpdateOneRequiredWithoutTradesNestedInput
    checklist?: PreTradeChecklistUpdateOneWithoutTradeNestedInput
  }

  export type TradeUncheckedUpdateWithoutMistakesInput = {
    id?: IntFieldUpdateOperationsInput | number
    session_id?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    asset?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    setup_type?: StringFieldUpdateOperationsInput | string
    rr_planned?: FloatFieldUpdateOperationsInput | number
    entry_price?: NullableFloatFieldUpdateOperationsInput | number | null
    sl_price?: NullableFloatFieldUpdateOperationsInput | number | null
    tp_price?: NullableFloatFieldUpdateOperationsInput | number | null
    result_pnl?: FloatFieldUpdateOperationsInput | number
    screenshot_pre?: NullableStringFieldUpdateOperationsInput | string | null
    screenshot_post?: NullableStringFieldUpdateOperationsInput | string | null
    is_in_plan?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    checklist?: PreTradeChecklistUncheckedUpdateOneWithoutTradeNestedInput
  }

  export type TradeCreateManySessionInput = {
    id?: number
    time?: Date | string
    asset?: string
    direction: string
    setup_type?: string
    rr_planned?: number
    entry_price?: number | null
    sl_price?: number | null
    tp_price?: number | null
    result_pnl?: number
    screenshot_pre?: string | null
    screenshot_post?: string | null
    is_in_plan?: boolean
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TradeUpdateWithoutSessionInput = {
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    asset?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    setup_type?: StringFieldUpdateOperationsInput | string
    rr_planned?: FloatFieldUpdateOperationsInput | number
    entry_price?: NullableFloatFieldUpdateOperationsInput | number | null
    sl_price?: NullableFloatFieldUpdateOperationsInput | number | null
    tp_price?: NullableFloatFieldUpdateOperationsInput | number | null
    result_pnl?: FloatFieldUpdateOperationsInput | number
    screenshot_pre?: NullableStringFieldUpdateOperationsInput | string | null
    screenshot_post?: NullableStringFieldUpdateOperationsInput | string | null
    is_in_plan?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    checklist?: PreTradeChecklistUpdateOneWithoutTradeNestedInput
    mistakes?: MistakeUpdateManyWithoutTradeNestedInput
  }

  export type TradeUncheckedUpdateWithoutSessionInput = {
    id?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    asset?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    setup_type?: StringFieldUpdateOperationsInput | string
    rr_planned?: FloatFieldUpdateOperationsInput | number
    entry_price?: NullableFloatFieldUpdateOperationsInput | number | null
    sl_price?: NullableFloatFieldUpdateOperationsInput | number | null
    tp_price?: NullableFloatFieldUpdateOperationsInput | number | null
    result_pnl?: FloatFieldUpdateOperationsInput | number
    screenshot_pre?: NullableStringFieldUpdateOperationsInput | string | null
    screenshot_post?: NullableStringFieldUpdateOperationsInput | string | null
    is_in_plan?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    checklist?: PreTradeChecklistUncheckedUpdateOneWithoutTradeNestedInput
    mistakes?: MistakeUncheckedUpdateManyWithoutTradeNestedInput
  }

  export type TradeUncheckedUpdateManyWithoutSessionInput = {
    id?: IntFieldUpdateOperationsInput | number
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    asset?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    setup_type?: StringFieldUpdateOperationsInput | string
    rr_planned?: FloatFieldUpdateOperationsInput | number
    entry_price?: NullableFloatFieldUpdateOperationsInput | number | null
    sl_price?: NullableFloatFieldUpdateOperationsInput | number | null
    tp_price?: NullableFloatFieldUpdateOperationsInput | number | null
    result_pnl?: FloatFieldUpdateOperationsInput | number
    screenshot_pre?: NullableStringFieldUpdateOperationsInput | string | null
    screenshot_post?: NullableStringFieldUpdateOperationsInput | string | null
    is_in_plan?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MistakeCreateManyTradeInput = {
    id?: number
    mistake_type: string
    penalty_score?: number
    note?: string | null
    created_at?: Date | string
  }

  export type MistakeUpdateWithoutTradeInput = {
    mistake_type?: StringFieldUpdateOperationsInput | string
    penalty_score?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MistakeUncheckedUpdateWithoutTradeInput = {
    id?: IntFieldUpdateOperationsInput | number
    mistake_type?: StringFieldUpdateOperationsInput | string
    penalty_score?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MistakeUncheckedUpdateManyWithoutTradeInput = {
    id?: IntFieldUpdateOperationsInput | number
    mistake_type?: StringFieldUpdateOperationsInput | string
    penalty_score?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
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