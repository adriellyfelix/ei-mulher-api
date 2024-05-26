import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type LikeDocument = HydratedDocument<Like>;

@Schema()
export class Like {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: 'User' })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Post' })
  postId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Comment' })
  commentId: MongooseSchema.Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
