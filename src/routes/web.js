
import userRouter from "./userRouter.js"
import homeRouter from "./homeRouter.js"
import adminRouter from "./adminRouter.js"
import fbRouter from "./fb.js"

let initWebRoutes = (app) => {
   app.use('/user', userRouter);
   app.use('/home', homeRouter);
   app.use('/admin', adminRouter);
   app.use('/fb', fbRouter);
}
export default initWebRoutes;
