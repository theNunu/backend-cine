import { Cinema, PrismaClient } from "@prisma/client";
import { GenericRepository } from "../../../shared/interfaces/generic-repository.inerface";
import { prisma } from "../../../core/config/prisma.config";

export class CinemaRepository implements GenericRepository<Cinema, number> {
    private readonly prisma: PrismaClient
    constructor() {
        this.prisma = prisma
    }

    async findAll(): Promise<Cinema[]> {
        try {
            const cinemas: Cinema[] = await this.prisma.cinema.findMany({
                where: {
                    state: 1
                }
            })
            return cinemas
        } catch (error) {
            console.error("Error fetching cinemas: ", error)
            return []
        }
    }
    async findById(id: number): Promise<Cinema | null> {
        try {
            const cinema: Cinema | null = await this.prisma.cinema.findUnique({
                where: {
                    id: id
                }
            })

            return cinema
        } catch (error) {
            console.error("Error fetching cinema by id: ", error)
            return null
        }
    }
    async create(entity: Cinema): Promise<boolean> {
        try {
            // Map 'entity' to match Prisma's expected input type
            const { ...userData } = entity;
            await this.prisma.cinema.create({
                data: userData
            })
            return true
        } catch (error) {
            console.error("Error creating cinema: ", error)
            return false
        }
    }

    async update(entity: Cinema): Promise<boolean> {
        try {
            entity.auditUpdateDate = new Date()
            const { id, ...userData } = entity; // Exclude 'posts' from update data
            await this.prisma.cinema.update({
                where: {
                    id: id
                },
                data: userData
            })
            return true
        } catch (error) {
            console.error("Error updating cinema: ", error)
            return false
        }
    }

// ...existing code...
    async delete(id: number): Promise<boolean> {
        try {
            await this.prisma.cinema.update({
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
}
