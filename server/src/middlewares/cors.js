import cors from "cors";

const corsOptions = {
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
  origin: "https://frios-418822.lm.r.appspot.com",
  preflightContinue: false,
  credentials: true,
};
export default corsOptions;
