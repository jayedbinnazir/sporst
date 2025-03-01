import { checkSchema } from "express-validator";

const userValidatorSchema = checkSchema({
    name: {
        notEmpty: {
           errorMessage: "firstName is required",
        },
     },
     phone: {
      notEmpty: {
        errorMessage: 'Phone number is required',
      },
      matches: {
        options: [/^\+8801\d{9}$/],  // Updated regex for Bangladeshi numbers
        errorMessage: 'Phone number must be a valid Bangladeshi number (e.g., +8801512345678)',
      },
      trim: true,  // Trim whitespace from the phone number
    },
    

   email: {
      notEmpty: {
         errorMessage: "email address is required !",
      },
      trim: true,
      isEmail: {
         errorMessage: "is not valid email address",
      },
   },
 
   password: {
      notEmpty: {
         errorMessage: "password is required",
      },
      isLength: {
         options: { min: 8 },
         errorMessage: "Password must be at least 8 characters long",
      },
   },
});

export default userValidatorSchema;