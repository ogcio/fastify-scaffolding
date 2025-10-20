import { type Static, type TSchema, Type } from "@sinclair/typebox";
import { PaginationLinksSchema } from "./pagination.js";

const ResponseMetadataSchema = Type.Optional(
  Type.Object({
    links: Type.Optional(PaginationLinksSchema),
    totalCount: Type.Optional(
      Type.Number({
        description: "Number representing the total number of available items",
      }),
    ),
  }),
);

type GenericResponse<T> = {
  data: T;
  metadata?: Static<typeof ResponseMetadataSchema>;
};

const getGenericResponseSchema = <T extends TSchema>(dataType: T) =>
  Type.Object({
    data: dataType,
    metadata: ResponseMetadataSchema,
  });

export { getGenericResponseSchema };
export type { GenericResponse };
