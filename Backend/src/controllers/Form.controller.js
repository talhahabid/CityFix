import Form from "../models/Form.model.js";
import { errorHandler } from "../utils/error.js";

export const submitForm = async (req, res, next) => {
  const userId = req.params._id;
  const { location, problemType, receiveNotification } = req.body;
  const newForm = new Form({ userId, location, problemType, receiveNotification });

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
    next(errorHandler(503, error));
  }
};
