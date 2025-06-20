import { Router } from "express";
import { CinemaController } from "../controllers/cinema.controller";

/**
 * @swagger
 * tags:
 *   name: Cines
 *   description: Endpoints para la gestión de cines
 */

const cinemaRouter = Router();
const cinemaController = new CinemaController();


cinemaRouter.get('/search/:name',cinemaController.getCinemasByName);
/**
 * @swagger
 * /cinemas:
 *   get:
 *     summary: Obtener todos los cines
 *     tags: [Cines]
 *     responses:
 *       200:
 *         description: Lista de todos los cines
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
cinemaRouter.get('/', cinemaController.getAllCinemas);

/**
 * @swagger
 * /cinemas/{id}:
 *   get:
 *     summary: Obtener un cine por ID
 *     tags: [Cines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cine
 *     responses:
 *       200:
 *         description: Datos del cine
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Cine no encontrado
 */
cinemaRouter.get('/:id', cinemaController.getCinemaById);

/**
 * @swagger
 * /cinemas:
 *   post:
 *     summary: Crear un nuevo cine
 *     tags: [Cines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               direccion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cine creado exitosamente
 */
cinemaRouter.post('/', cinemaController.createCinema);

/**
 * @swagger
 * /cinemas/{id}:
 *   put:
 *     summary: Actualizar un cine
 *     tags: [Cines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cine
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               direccion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cine actualizado
 *       404:
 *         description: Cine no encontrado
 */
cinemaRouter.put('/:id', cinemaController.updateCinema);

/**
 * @swagger
 * /cinemas/{id}:
 *   delete:
 *     summary: Eliminar un cine
 *     tags: [Cines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cine
 *     responses:
 *       200:
 *         description: Cine eliminado exitosamente
 *       404:
 *         description: Cine no encontrado
 */
cinemaRouter.delete('/:id', cinemaController.deleteCinema);

export default cinemaRouter;
