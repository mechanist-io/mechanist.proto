// base/base.schema.ts
import { Document, type Schema } from 'mongoose';
import { UUID } from 'uuidjs';

export class BaseDocument extends Document<string> {
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date | null;
}

export const BaseSchemaOptions = {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
};

export const withBaseSchema = <T extends Schema<unknown>>(schema: T): T => {
  schema.add({
    _id: {
      type: String,
      default: () => UUID.genV6().toString(),
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  });

  schema.set('timestamps', {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  });

  schema.index({ createdAt: -1 });
  schema.index({ updatedAt: -1 });
  schema.index({ deletedAt: -1 });
  // Optional: auto-filter out soft-deleted docs
  // schema.pre(/^find/, function(this: Query<any, any>, next: (err?: Error) => void) {
  //   this.where({ deletedAt: null });
  //   next();
  // });

  return schema;
};
