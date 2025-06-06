import { Request, Response } from "express";

import { CinemaRoomAsociationService } from "../services/cinema-room-asociation.service";



export class CinemaRoomAsociationController {
    private readonly cinemaRoomAsociationService : CinemaRoomAsociationService;

    constructor() {
        this.cinemaRoomAsociationService = new CinemaRoomAsociationService();
    }

    getAllCinemaRooms = async (req: Request, res: Response): Promise<void> => {
        const result = await this.cinemaRoomAsociationService.getAllCinemaRooms();
        res.status(result.code).json(result);
    };

    getCinemaRoomById = async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id, 10);
        const result = await this.cinemaRoomAsociationService.getCinemaRoomById(id);
        res.status(result.code).json(result);
    };

    createCinemaRoom = async (req: Request, res: Response): Promise<void> => {
        const cinema = req.body;
        const result = await this.cinemaRoomAsociationService.createCinemaRoom(cinema);
        res.status(result.code).json(result);
    };

    updateCinemaRoom = async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id, 10);
        const cinema = req.body;
        const result = await this.cinemaRoomAsociationService.updateCinemaRoom(id, cinema);
        res.status(result.code).json(result);
    };

    deleteCinemaRoom = async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id, 10);
        const result = await this.cinemaRoomAsociationService.deleteCinemaRoom(id);
        res.status(result.code).json(result);
    };
}
