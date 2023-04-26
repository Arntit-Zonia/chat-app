import { Schema, model, Document } from "mongoose";

// do I need both?
interface IUser extends Document {
  socketId: string;
  username: string;
  room: string;
}

const UserSchema = new Schema<IUser>({
  socketId: { type: String, required: true },
  username: { type: String, required: true },
  room: { type: String, required: true },
});

const User = model<IUser>("User", UserSchema);

export default User;
