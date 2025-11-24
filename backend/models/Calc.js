import { Schema, model } from "mongoose";

const Calculator = new Schema({
  percent: {
    type: Number,
    required: true,
  },
  calcName: {
    type: String,
    required: true,
  },
});

export default model("Calculator", Calculator);
