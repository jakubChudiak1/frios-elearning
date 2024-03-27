import cors from "cors";

const corsOptions = {
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
  origin: "http://localhost:3000/{{lng}}",
};
export default corsOptions;
