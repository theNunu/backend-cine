import { Router } from "express";
import { CinemaRoomAsociationController } from "../controllers/cinema-room-asociation.controller";

const cinemaRoomAsociationRouter = Router();
const cinemaRoomAsociationController = new CinemaRoomAsociationController();

/**
 * @swagger
 * tags:
 *   name: AsociaciónCineSala
 *   description: Endpoints para la gestión de asociaciones entre cines y salas
 */

/**
 * @swagger
 * /cinema-room-asociations:
 *   get:
 *     summary: Obtener todas las asociaciones de cine y sala
 *     tags: [AsociaciónCineSala]
 *     responses:
 *       200:
 *         description: Lista de asociaciones cine-sala
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseCinemaRoomList'
 */
cinemaRoomAsociationRouter.get('/', cinemaRoomAsociationController.getAllCinemaRooms);

/**
 * @swagger
 * /cinema-room-asociations/{id}:
 *   get:
 *     summary: Obtener una asociación cine-sala por ID
 *     tags: [AsociaciónCineSala]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asociación
 *     responses:
 *       200:
 *         description: Detalle de la asociación cine-sala
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseCinemaRoom'
 */
cinemaRoomAsociationRouter.get('/:id', cinemaRoomAsociationController.getCinemaRoomById);

/**
 * @swagger
 * /cinema-room-asociations:
 *   post:
 *     summary: Crear una nueva asociación entre cine y sala
 *     tags: [AsociaciónCineSala]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CinemaRoom'
 *     responses:
 *       201:
 *         description: Asociación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseCinemaRoom'
 */
cinemaRoomAsociationRouter.post('/', cinemaRoomAsociationController.createCinemaRoom);

/**
 * @swagger
 * /cinema-room-asociations/{id}:
 *   put:
 *     summary: Actualizar una asociación existente
 *     tags: [AsociaciónCineSala]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asociación a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CinemaRoom'
 *     responses:
 *       200:
 *         description: Asociación actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseCinemaRoom'
 */
cinemaRoomAsociationRouter.put('/:id', cinemaRoomAsociationController.updateCinemaRoom);

/**
 * @swagger
 * /cinema-room-asociations/{id}:
 *   delete:
 *     summary: Eliminar una asociación cine-sala
 *     tags: [AsociaciónCineSala]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asociación a eliminar
 *     responses:
 *       200:
 *         description: Asociación eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericResponse'
 */
cinemaRoomAsociationRouter.delete('/:id', cinemaRoomAsociationController.deleteCinemaRoom);

export default cinemaRoomAsociationRouter;
