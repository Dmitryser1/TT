import mongoose, { Document, Schema, model} from 'mongoose';

interface ITask extends Document {
  title: string;
  description: string;
  createdAt: Date;
  dueDate?: Date;
  labels?: string[];
}

const taskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date },
  labels: { type: [String] }
});

const Task = model<ITask>('Task', taskSchema);

export default Task;
export { ITask };