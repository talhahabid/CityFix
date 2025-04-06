import Form from "../models/Form.model.js";
import { errorHandler } from "../utils/error.js";

export const submitForm = async (req, res, next) => {
  const userId = req.params._id;
  const { location, problemType, receiveNotification } = req.body;
  const newForm = new Form({
    userId,
    location,
    problemType,
    receiveNotification,
  });

  try {
    const existingProblemAndLocation = await Form.findOne({
      location,
      problemType,
    });

    if (existingProblemAndLocation)
      return next(errorHandler(409, "Problem already exists at that location"));

    const temp = await newForm.save();
    res.status(201).json({ message: "Form submit success" });
  } catch (error) {
    next(errorHandler(503, error.message));
  }
};

export const getForms = async (req, res, next) => {
  console.log("Working");
  try {
    const forms = await Form.find();
    console.log("Working");

    res.status(200).json(forms);
    console.log("Working");
  } catch (error) {
    next(errorHandler(503, error.message));
  }
};

export const editFormStatus = async (req, res, next) => {
  const { _id } = req.params;
  const { reportStatus } = req.body;

  try {
    const form = await Form.findById(_id);
    if (!form) return next();

    form.reportStatus = reportStatus
    

    await form.save();

    res.status(200).json({
      message: "Form updated successfully"
    });
  } catch (error) {
    return next(error);
  }
};