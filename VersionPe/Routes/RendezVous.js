import express from'express' ;
import multer from '../middleware/multer-config.js';
import  {GetRendezVous,GetALLRendezVous,addRendezVous,UpdateRendezVous,deleteRendezVous} from"../Controller/RendezVousController.js" ;





const router = express.Router();



/**
 * @swagger
 * components:
 *   schemas:
 *     RendezVous:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The Auto-generated id of a categorie
 *         name:
 *           type: string
 *           description: title of a RendezVous
 *         date:
 *           type: date
 *           description: date of a RendezVous
 *         
 *         
 *          
 *       example:
 *         name: divorce case
 *         date: 09/12/2023
 *         
 *
 */
/**
 * @swagger
 *  tags:
 *    name: RendezVous
 *    description: RendezVous
 */
/**
 * @swagger
 * /RendezVous/add:
 *   post:
 *     summary: Create a new RendezVous
 *     tags: [RendezVous]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RendezVous'
 *     responses:
 *       200:
 *         description: The RendezVous was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RendezVous'
 *       500:
 *         description: Some server error
 */
router.post('/add',addRendezVous)


/**
 * @swagger
 * /RendezVous/update/{id}:
 *   post:
 *     summary: updates RendezVous by id
 *     tags: [RendezVous]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: RendezVous id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RendezVous'
 *     responses:
 *       200:
 *         decsription: The RendezVous was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RendezVous'
 *       404:
 *         description: RendezVous was not found.
 *       500:
 *         description: Some errors happend.
 *
 */
router.post('/update/:id',UpdateRendezVous);


/**
 * @swagger
 *  /RendezVous/delete/{id}:
 *    delete:
 *      summary: removes a RendezVous
 *      tags: [RendezVous]
 *      parameters:
 *        - in: path
 *          name: id
 *          description:  id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The RendezVous was deleted
 *        404:
 *          description: The RendezVous was not found
 *
 */
router.delete('/delete/:id',deleteRendezVous)
/**
 * @swagger
 *  /RendezVous/{id}:
 *    get:
 *      summary: Get a RendezVous
 *      tags: [RendezVous]
 *      parameters:
 *        - in: path
 *          name: id
 *          description:  id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: RendezVous by its id
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RendezVous'
 *        404:
 *          description: The RendezVous was not found
 *
 */
router.get('/:id',GetRendezVous)
/**
 * @swagger
 *  /RendezVous:
 *    get:
 *      summary: Get a RendezVous
 *      tags: [RendezVous]
 *     
 *      responses:
 *        200:
 *          description: RendezVous 
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RendezVous'
 *        404:
 *          description: The RendezVous was not found
 *
 */
 router.get('/',GetALLRendezVous)


export default router;