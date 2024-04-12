export type NestedKeyOf<ObjectType> = ObjectType extends object
  ? {
      [Key in keyof ObjectType]:
        | `${Key & string}`
        | `${Key & string}.${NestedKeyOf<ObjectType[Key]>}`;
    }[keyof ObjectType]
  : never;

export type NestedValueOf<
  ObjectType,
  Property extends string
> = Property extends `${infer Key}.${infer Rest}`
  ? Key extends keyof ObjectType
    ? NestedValueOf<ObjectType[Key], Rest>
    : never
  : Property extends keyof ObjectType
  ? ObjectType[Property]
  : never;

export type NestedParametersOf<T> = T extends (args: infer P) => any
  ? P
  : never;

export type NestedReturnOf<T> = T extends (args: any) => infer R ? R : any;

export default function createTranslations<
  ObjectType extends object,
  K extends string
>(locals: Record<K, ObjectType>, local: K) {
  
  type TFuncType = <
    K extends NestedKeyOf<ObjectType>,
    A extends NestedParametersOf<NestedValueOf<ObjectType, K>>
  >(
    path: K,
    args?: A
  ) => NestedValueOf<ObjectType, K> extends (args: any) => infer R
    ? R
    : NestedValueOf<ObjectType, K>;

  const t: TFuncType = (path, args) => {
    if (!path) {
      return path as NestedValueOf<ObjectType, K>;
    }

    let value: any = locals[local];
    const parts = path.split(".");
    for (const part of parts) {
      value = value[part];
      if (value === undefined) {
        return path as NestedValueOf<ObjectType, K>;
      }
    }
    if (typeof value === "function") {
      return value(args ?? {});
    }
    return value;
  };
  return t;
}
