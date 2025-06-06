import { PrismaClient, Room } from "@prisma/client";
import { GenericRepository } from "../../../shared/interfaces/generic-repository.inerface";
import { prisma } from "../../../core/config/prisma.config";

export class RoomMaintenanceRepository implements GenericRepository<Room, number> {
    private readonly prisma: PrismaClient
    constructor() {
        this.prisma = prisma
    }

    async findAll(): Promise<Room[]> {
        try {
            const rooms: Room[] = await this.prisma.room.findMany({
                where: {
                    state: 1
                }
            })
            return rooms
        } catch (error) {
            console.error("Error fetching saa de cine: ", error)
            return []
        }
    }
    async findById(id: number): Promise<Room | null> {
        try {
            const room: Room | null = await this.prisma.room.findUnique({
                where: {
                    id: id
                }
            })

            return room
        } catch (error) {
            console.error("Error fetching sala de cine by id: ", error)
            return null
        }
    }
    async create(entity: Room): Promise<boolean> {
        try {
            // Map 'entity' to match Prisma's expected input type
            const { ...userData } = entity;
            await this.prisma.room.create({
                data: userData
            })
            return true
        } catch (error) {
            console.error("Error creating sala de cine: ", error)
            return false
        }
    }

    async update(entity: Room): Promise<boolean> {
        try {
            entity.auditUpdateDate = new Date()
            const { id, ...userData } = entity; // Exclude 'posts' from update data
            await this.prisma.room.update({
                where: {
                    id: id
                },
                data: userData
            })
            return true
        } catch (error) {
            console.error("Error updating sala de cine: ", error)
            return false
        }
    }

// ...existing code...
    async delete(id: number): Promise<boolean> {
        try {
            await this.prisma.room.update({
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
            console.error("Error deleting sala de cine: ", error)
            return false
        }
    }
// ...existing code...
}
