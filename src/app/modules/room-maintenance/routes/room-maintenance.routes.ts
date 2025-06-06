import { Router } from "express";
import { RoomController } from "../controllers/room-maintenance.controller";

const roomRouter = Router();
const roomController = new RoomController();

/**
 * @swagger
 * tags:
 *   name: Salas
 *   description: Endpoints para la gestión de salas
 */

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Obtener todas las salas
 *     tags: [Salas]
 *     responses:
 *       200:
 *         description: Lista de salas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseRoomList'
 */
roomRouter.get('/', roomController.getAllRooms);

/**
 * @swagger
 * /rooms/{id}:
 *   get:
 *     summary: Obtener una sala por ID
 *     tags: [Salas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la sala
 *     responses:
 *       200:
 *         description: Detalle de la sala
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseRoom'
 */
roomRouter.get('/:id', roomController.getRoomById); // Corrige si usas `getAllRooms` erróneamente

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Crear una nueva sala
 *     tags: [Salas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       201:
 *         description: Sala creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseRoom'
 */
roomRouter.post('/', roomController.createRoom);

/**
 * @swagger
 * /rooms/{id}:
 *   put:
 *     summary: Actualizar una sala existente
 *     tags: [Salas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la sala a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       200:
 *         description: Sala actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseRoom'
 */
roomRouter.put('/:id', roomController.updateRoom);

/**
 * @swagger
 * /rooms/{id}:
 *   delete:
 *     summary: Eliminar una sala
 *     tags: [Salas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la sala a eliminar
 *     responses:
 *       200:
 *         description: Sala eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericResponse'
 */
roomRouter.delete('/:id', roomController.deleteRoom);

export default roomRouter;
