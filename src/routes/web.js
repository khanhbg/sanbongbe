import express from "express";
import testRouter from "./test.js"
import userRouter from "./userRouter.js"

let initWebRoutes = (app) => {
   app.use('/test', testRouter);
   app.use('/user', userRouter);
   //app.use('/',testRouter);
   //return app.use
}
export default initWebRoutes;
