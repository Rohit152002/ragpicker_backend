import expressAsyncHandler from "express-async-handler";
import addharValidator from "aadhaar-validator";
const registration = expressAsyncHandler(async (req, res) => {
  try {
    const { username, role, addhar, phonenumber } = req.body;
    if (!username || !role || !addhar || !phonenumber) {
      res.status(404);
      throw "Add Details";
    }

    if (!addharValidator.isValidNumber(addhar)) {
      res.status(400);
      throw "Not a valid addhar number";
    }
    return res.status(201).json({
      success: true,
      message: req.body,
    });
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

export { registration };
