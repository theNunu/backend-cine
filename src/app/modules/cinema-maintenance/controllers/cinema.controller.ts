import { Request, Response } from "express";
import { CinemaService } from "../../cinema-maintenance/services/cinema.service";


export class CinemaController {
    private readonly cinemaService: CinemaService;

    constructor() {
        this.cinemaService = new CinemaService();
    }

    getAllCinemas = async (req: Request, res: Response): Promise<void> => {
        const result = await this.cinemaService.getAllCinemas();
        res.status(result.code).json(result);
    };

    getCinemaById = async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id, 10);
        const result = await this.cinemaService.getCinemaById(id);
        res.status(result.code).json(result);
    };

    createCinema = async (req: Request, res: Response): Promise<void> => {
        const cinema = req.body;
        const result = await this.cinemaService.createCinema(cinema);
        res.status(result.code).json(result);
    };

    updateCinema = async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id, 10);
        const cinema = req.body;
        const result = await this.cinemaService.updateCinema(id, cinema);
        res.status(result.code).json(result);
    };

    deleteCinema = async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id, 10);
        const result = await this.cinemaService.deleteCinema(id);
        res.status(result.code).json(result);
    };

    getCinemasByName = async (req: Request, res: Response): Promise<void> => {
        const name = req.params.name;
        const result = await this.cinemaService.getCinemaByName(name);
        res.status(result.code).json(result);
    }

}
