import { CinemaRoom, PrismaClient } from "@prisma/client";
import { GenericRepository } from "../../../shared/interfaces/generic-repository.inerface";
import { prisma } from "../../../core/config/prisma.config";

export class CinemaRoomAsociationRepository implements GenericRepository<CinemaRoom, number> {
    private readonly prisma: PrismaClient
    constructor() {
        this.prisma = prisma
    }

    async findAll(): Promise<CinemaRoom[]> {
        try {
            const cinemas: CinemaRoom[] = await this.prisma.cinemaRoom.findMany({
                where: {
                    state: 1
                },
                include: {
                    cinema: true,
                    room: true
                }
            })
            return cinemas
        } catch (error) {
            console.error("Error : ", error)
            return []
        }
    }
    async findById(id: number): Promise<CinemaRoom | null> {
        try {
            const cinemaRoom: CinemaRoom | null = await this.prisma.cinemaRoom.findUnique({
                where: {
                    id: id
                }
            })

            return cinemaRoom
        } catch (error) {
            console.error("Error : ", error)
            return null
        }
    }
    async create(entity: CinemaRoom): Promise<boolean> {
        try {
            // Map 'entity' to match Prisma's expected input type
            const { ...userData } = entity;
            await this.prisma.cinemaRoom.create({
                data: userData
            })
            return true
        } catch (error) {
            console.error("Error : ", error)
            return false
        }
    }

    async update(entity: CinemaRoom): Promise<boolean> {
        try {
            entity.auditUpdateDate = new Date()
            const { id, ...userData } = entity; // Exclude 'posts' from update data
            await this.prisma.cinemaRoom.update({
                where: {
                    id: id
                },
                data: userData
            })
            return true
        } catch (error) {
            console.error("Error: ", error)
            return false
        }
    }

    // ...existing code...
    async delete(id: number): Promise<boolean> {
        try {
            await this.prisma.cinemaRoom.update({
                where: {
                    id: id
                },
                data: {
                    state: 0,
                    auditDeleteDate: new Date()
                }
            })
            return true
        } catch (error) {
            console.error("Error deleting cinema: ", error)
            return false
        }
    }
    // ...existing code...
    async searchRoomStatusByName(roomName: string): Promise<string> {
        try {
            // Buscar la sala por nombre y contar cuántas películas están asignadas a ella
            const room = await this.prisma.room.findFirst({
                where: { name: roomName },
                include: {
                    cinemaRooms: {
                        where: { state: 1 },
                        include: { cinema: true }
                    }
                }
            });

            if (!room) return "Sala no encontrada";

            const movieCount = room.cinemaRooms.length;

            if (movieCount < 3) {
                return "Sala disponible";
            } else if (movieCount <= 5) {
                return `Sala con ${movieCount} películas asignadas`;
            } else {
                return "Sala no disponible";
            }
        } catch (error) {
            console.error("Error en RoomSearchRepository:", error);
            return "Error al buscar la sala";
        }
    }

}
