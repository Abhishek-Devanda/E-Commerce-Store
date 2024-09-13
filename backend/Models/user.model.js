import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "password must be at least 6 characters long"],
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    cartItems: [
      {
        quantity: {
          type: Number,
          
          default: 1,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      }],
    refreshToken: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    }
  },
  { timestamps: true }
);


UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    this.password = await bcrypt.hash(this.password, 10);
        next();
    
    } catch (error) {
      console.log(error);
        next(error);
    }
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}


const User = mongoose.model("User", UserSchema);
export default User;