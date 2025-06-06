import { Router } from "express";
import cinemaRouter from "../app/modules/cinema-maintenance/routes/cinema.routes";
import roomRouter from "../app/modules/room-maintenance/routes/room-maintenance.routes";
import cinemaRoomAsociationRouter from "../app/modules/cinema-room-asociation/routes/cinema-room-asociation.routes";

const mainRouter = Router()

mainRouter.use('/cinemas', cinemaRouter)

mainRouter.use('/rooms', roomRouter)

mainRouter.use('/cinema-room-asociations', cinemaRoomAsociationRouter)

export default mainRouter;