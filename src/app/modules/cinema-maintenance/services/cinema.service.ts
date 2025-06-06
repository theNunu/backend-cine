import { Cinema } from "@prisma/client";
import { CinemaRepository } from "../repositories/cinema.repository";
import { BaseResponseI } from "../../../shared/interfaces/base.response";

export class CinemaService {
    private readonly CinemaRepository !: CinemaRepository
            olpk
    constructor() {
        this.CinemaRepository = new CinemaRepository();
    }

    async getAllCinemas(): Promise<BaseResponseI<Cinema[]>> {
        try {
            const cinemas: Cinema[] = await this.CinemaRepository.findAll()
            return {
                code: 200,
                message: "Users fetched successfully",
                data: cinemas
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

    async getCinemaById(id: number): Promise<BaseResponseI<Cinema>> {

        try {
            const cinemas: Cinema | null = await this.CinemaRepository.findById(id)
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

    async createCinema(cinema: Cinema): Promise<BaseResponseI<Cinema>> {
        try {
            const createdCinema = await this.CinemaRepository.create(cinema);

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
                data: cinema
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

    async updateCinema(id: number, cinema: Cinema): Promise<BaseResponseI<Cinema>> {
        try {
            const foundCinema = await this.CinemaRepository.findById(id);
            if (!foundCinema) { // "si no se encontró el usuario".
                return {
                    code: 400, //: HTTP 400 = error de solicitud.
                    message: "esa pelicula  no existe", //mensaje que explica el error.
                    data: null //no hay datos que devolver.
                };
            }
            const cinemaToUpdate = { ...cinema, id }; //  crea un nuevo objeto combinando el user(UserI) con el campo id.
            // { ...user }: copia todas las propiedades del objeto user.
            //id: añade o sobreescribe el campo id.


            const cinemaIsUpdated = await this.CinemaRepository.update(cinemaToUpdate);
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

    async deleteCinema(id: number): Promise<BaseResponseI<Cinema>> {
        try {
            const foundCinema = await this.CinemaRepository.findById(id);
            if (!foundCinema) {
                return {
                    code: 400,
                    message: "no puedes eliminar un usuario que no existe",
                    data: null
                };
            }
            const deleted = await this.CinemaRepository.delete(id);
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


}