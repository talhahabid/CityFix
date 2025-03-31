import mongoose from "mongoose";

const formSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
  location: {
    type: String,
    required: true,
    unique: true,
  },
  problemType: {
    type: String,
    required: true,
    unique: true,
  },

  receiveNotification: {
    type: Boolean,
    required: true,
  },

  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Form = mongoose.model("Form", formSchema);

export default Form;
