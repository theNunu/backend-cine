import { Request, Response } from "express";
import { RoomService } from "../services/room.maintenance.service";



export class RoomController {
    private readonly roomService: RoomService;

    constructor() {
        this.roomService = new RoomService();
    }

    getAllRooms = async (req: Request, res: Response): Promise<void> => {
        const result = await this.roomService.getAllRooms();
        res.status(result.code).json(result);
    };

    getRoomById = async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id, 10);
        const result = await this.roomService.getRoomById(id);
        res.status(result.code).json(result);
    };

    createRoom= async (req: Request, res: Response): Promise<void> => {
        const cinema = req.body;
        const result = await this.roomService.createRoom(cinema);
        res.status(result.code).json(result);
    };

    updateRoom = async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id, 10);
        const cinema = req.body;
        const result = await this.roomService.updateRoom(id, cinema);
        res.status(result.code).json(result);
    };

    deleteRoom = async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id, 10);
        const result = await this.roomService.deleteRoom(id);
        res.status(result.code).json(result);
    };
}
