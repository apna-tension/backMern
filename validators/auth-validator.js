const { z } = require("zod");


// creating an object schema
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at lest of 6 character." })
    .max(255, { message: "Password must be at most of 255 character." }),
});


const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is required" })
    // .trim()
    .min(3, { message: "Name must be at lest of 3 character." })
    .max(255, { message: "Name must be at most of 255 character." }),
  phone: z
    .string({ required_error: "Phone is required" })
    .min(10, { message: "Phone must be at lest of 10 character." })
    .max(10, { message: "Phone must be at most of 10 character." }),
});



const contactSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    // .trim()
    .min(3, { message: "Name must be at lest of 3 character." })
    .max(255, { message: "Name must be at most of 255 character." }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  message: z
    .string({ required_error: "Message is required" })
    .min(10, { message: "Message must be at lest of 10 character." })
    .max(255, { message: "Message must be at most of 255 character." }),
});

module.exports = { signupSchema, loginSchema, contactSchema };
