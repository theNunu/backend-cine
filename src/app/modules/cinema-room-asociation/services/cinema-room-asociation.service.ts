import { Cinema, CinemaRoom } from "@prisma/client";

import { BaseResponseI } from "../../../shared/interfaces/base.response";
import { CinemaRoomAsociationRepository } from "../repositories/cinema-room-asociation.repository";
import { CinemaRepository } from "../../cinema-maintenance/repositories/cinema.repository";
import { RoomMaintenanceRepository } from "../../room-maintenance/repositories/room-maintenance.repository";
export class CinemaRoomAsociationService {
    private readonly CinemaRoomAsociationRepository !: CinemaRoomAsociationRepository
    private readonly cinema!: CinemaRepository;
    private readonly room!: RoomMaintenanceRepository

    constructor() {
        this.CinemaRoomAsociationRepository= new CinemaRoomAsociationRepository();
        this.cinema =  new CinemaRepository();
        this.room = new RoomMaintenanceRepository();
    }

    async getAllCinemaRooms(): Promise<BaseResponseI<CinemaRoom[]>> {
        try {
            const cinemaRooms: CinemaRoom[] = await this.CinemaRoomAsociationRepository.findAll()
            return {
                code: 200,
                message: "Users fetched successfully",
                data: cinemaRooms
            }
        } catch (error) {
            console.error("Error fetching peliculas: ", error)
            return {
                code: 500,
                message: "Error fetching peliculas" + error,
                data: null
            }
        }
    }

    async getCinemaRoomById(id: number): Promise<BaseResponseI<CinemaRoom>> {

        try {
            const cinemas: CinemaRoom | null = await this.CinemaRoomAsociationRepository.findById(id)
            if (!cinemas) {
                return {
                    code: 404,
                    message: "la pelicula  existe",
                    data: null
                }
            }
            return {
                code: 200,
                message: "peliucuña fetched successfully",
                data: cinemas

            }

        } catch (error) {
            console.error("no se puedo guardar la pelicula: ", error)
            return {
                code: 500,
                message: "Error fetching pelicula by id" + error,
                data: null
            }
        }

    }

    async createCinemaRoom(cinemaRoom: CinemaRoom): Promise<BaseResponseI<CinemaRoom>> {
        try {

            var cinemaExist = this.cinema.findById(cinemaRoom.cinemaId)
            var roomExist = this.room.findById(cinemaRoom.roomId)

            if(!cinemaExist) {
                return {
                    code: 404,
                    message: "The movie does not exist",
                    data: null
                }
            }

            if(!roomExist) {
                return {
                    code: 404,
                    message: "The room does not exist",
                    data: null
                }
            }

            const createdCinema = await this.CinemaRoomAsociationRepository.create(cinemaRoom);

            if (!createdCinema) {
                return {
                    code: 400,
                    message: "Error creating cinema",
                    data: null
                }
            }

            return {
                code: 201,
                message: "cinema created successfully",
                data: cinemaRoom
            }
        } catch (error) {
            console.error("Error creating user: ", error)
            return {
                code: 500,
                message: "Error creating user" + error,
                data: null
            }
        }
    }

    async updateCinemaRoom(id: number, cinemaRoom: CinemaRoom): Promise<BaseResponseI<CinemaRoom>> {

        try {

            var cinemaExist = this.cinema.findById(cinemaRoom.cinemaId)
            var roomExist = this.room.findById(cinemaRoom.roomId)

            if(!cinemaExist) {
                return {
                    code: 404,
                    message: "The movie does not exist",
                    data: null
                }
            }

            if(!roomExist) {
                return {
                    code: 404,
                    message: "The room does not exist",
                    data: null
                }
            }

            const foundCinema = await this.CinemaRoomAsociationRepository.findById(id);
            if (!foundCinema) { // "si no se encontró el usuario".
                return {
                    code: 400, //: HTTP 400 = error de solicitud.
                    message: "esa pelicula  no existe", //mensaje que explica el error.
                    data: null //no hay datos que devolver.
                };
            }
            const cinemaToUpdate = { ...cinemaRoom, id }; //  crea un nuevo objeto combinando el user(UserI) con el campo id.
            // { ...user }: copia todas las propiedades del objeto user.
            //id: añade o sobreescribe el campo id.


            const cinemaIsUpdated = await this.CinemaRoomAsociationRepository.update(cinemaToUpdate);
            /*Si no se pudo actualizar (por alguna razón userIsUpdated es false), se devuelve un error con código 500. */
            if (!cinemaIsUpdated) {
                return {
                    code: 500,
                    message: "Error al actualizar  la pelicula",
                    data: null
                };
            }

            //Si todo fue bien, devuelve una respuesta de éxito (200) y los datos del usuario actualizado.
            return {
                code: 200,
                message: "pelicula updated successfully",
                data: cinemaToUpdate
            };
        } catch (error) {
            console.error("Error updating cinema: ", error);
            return {
                code: 500,
                message: "Error updating cinema" + error,
                data: null
            };
        }
    }

    async deleteCinemaRoom(id: number): Promise<BaseResponseI<CinemaRoom>> {
        try {
            const foundCinema = await this.CinemaRoomAsociationRepository.findById(id);
            if (!foundCinema) {
                return {
                    code: 400,
                    message: "no puedes eliminar un usuario que no existe",
                    data: null
                };
            }
            const deleted = await this.CinemaRoomAsociationRepository.delete(id);
            return {
                code: 200,
                message: "User eliminado correctamente",
                data: deleted ? foundCinema : null
                // si el id pasado  es igual a  deleted se eliminara (true), caso contrario sera nulo (false)
            };

        } catch (error) {
            console.error("Error deleting cinema: ", error);
            return {
                code: 500,
                message: "Error deleting cinema" + error,
                data: null
            };

        }

    }

     async getRoomStatus(roomName: string): Promise<BaseResponseI<string>> {
        try {
            const message = await this.CinemaRoomAsociationRepository.searchRoomStatusByName(roomName);

            return {
                code: 200,
                message: "Consulta exitosa",
                data: message
            };
        } catch (error) {
            return {
                code: 500,
                message: "Error al obtener el estado de la sala" + error,
                data: null
            };
        }
    }



}