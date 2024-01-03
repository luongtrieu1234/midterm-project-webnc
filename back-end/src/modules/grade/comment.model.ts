import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  order: { type: Number, required: true, default: 0 },
  date: { type: Date, default: Date.now },
});

export interface CommentModel {
  id: string;
  content: string;
  user: string;
  order: { type: number; default: 0 };
  date: Date;
}

export const Comment = mongoose.model<CommentModel>('Comment', CommentSchema);
