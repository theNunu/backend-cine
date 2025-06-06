import { Cinema, Room } from "@prisma/client";
import { BaseResponseI } from "../../../shared/interfaces/base.response";
import { RoomMaintenanceRepository } from "../repositories/room-maintenance.repository";

export class RoomService {
    private readonly RoomMaintenanceRepository!: RoomMaintenanceRepository

    constructor() {
        this.RoomMaintenanceRepository = new RoomMaintenanceRepository();
    }

    async getAllRooms(): Promise<BaseResponseI<Room[]>> {
        try {
            const rooms: Room[] = await this.RoomMaintenanceRepository.findAll()
            return {
                code: 200,
                message: "sala de cine fetched successfully",
                data: rooms
            }
        } catch (error) {
            console.error("Error fetching salas de cine: ", error)
            return {
                code: 500,
                message: "Error fetching salas de cine" + error,
                data: null
            }
        }
    }

    async getRoomById(id: number): Promise<BaseResponseI<Room>> {

        try {
            const rooms: Room | null = await this.RoomMaintenanceRepository.findById(id)
            if (!rooms) {
                return {
                    code: 404,
                    message: "la sala de cine no  existe",
                    data: null
                }
            }
            return {
                code: 200,
                message: "sala de cinefetched successfully",
                data: rooms

            }

        } catch (error) {
            console.error("no se puedo guardar la sala de cine: ", error)
            return {
                code: 500,
                message: "Error fetching la sala de cine by id" + error,
                data: null
            }
        }

    }

    async createRoom(room: Room): Promise<BaseResponseI<Room>> {
        try {
            const createdRoom = await this.RoomMaintenanceRepository.create(room);

            if (!createdRoom) {
                return {
                    code: 400,
                    message: "Error creating sala de cine",
                    data: null
                }
            }

            return {
                code: 201,
                message: "sala de cine created successfully",
                data: room
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

    async updateRoom(id: number, room: Room): Promise<BaseResponseI<Room>> {
        try {
            const foundRoom = await this.RoomMaintenanceRepository.findById(id);
            if (!foundRoom) { // "si no se encontró el usuario".
                return {
                    code: 400, //: HTTP 400 = error de solicitud.
                    message: "esa sala de cine  no existe", //mensaje que explica el error.
                    data: null //no hay datos que devolver.
                };
            }
            const roomToUpdate = { ...room, id }; //  crea un nuevo objeto combinando el user(UserI) con el campo id.
            // { ...user }: copia todas las propiedades del objeto user.
            //id: añade o sobreescribe el campo id.


            const cinemaIsUpdated = await this.RoomMaintenanceRepository.update(roomToUpdate);
            /*Si no se pudo actualizar (por alguna razón userIsUpdated es false), se devuelve un error con código 500. */
            if (!cinemaIsUpdated) {
                return {
                    code: 500,
                    message: "Error al actualizar la sala de cine",
                    data: null
                };
            }

            //Si todo fue bien, devuelve una respuesta de éxito (200) y los datos del usuario actualizado.
            return {
                code: 200,
                message: "sala de cine updated successfully",
                data: roomToUpdate
            };
        } catch (error) {
            console.error("Error updating SALA DE CINE: ", error);
            return {
                code: 500,
                message: "Error updating sala de cine" + error,
                data: null
            };
        }
    }

    async deleteRoom(id: number): Promise<BaseResponseI<Room>> {
        try {
            const foundRoom= await this.RoomMaintenanceRepository.findById(id);
            if (!foundRoom) {
                return {
                    code: 400,
                    message: "no puedes eliminar una sala  que no existe",
                    data: null
                };
            }
            const deleted = await this.RoomMaintenanceRepository.delete(id);
            return {
                code: 200,
                message: "sala eliminado correctamente",
                data: deleted ? foundRoom: null
                // si el id pasado  es igual a  deleted se eliminara (true), caso contrario sera nulo (false)
            };

        } catch (error) {
            console.error("Error deleting sla de cine: ", error);
            return {
                code: 500,
                message: "Error deleting sala de cine: " + error,
                data: null
            };

        }

    }


}