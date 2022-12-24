import express from'express' ;
import multer from '../middleware/multer-config.js';
import  {GetRendezVous,GetALLRendezVous,addRendezVous,UpdateRendezVous,deleteRendezVous,GetALLRendezVousByClient,GetALLRendezVousByAvocat} from"../Controller/RendezVousController.js" ;





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
 *         idUser:
 *           type: string
 *           description: title of a RendezVous
 *         idAvocat:
 *           type: string
 *           description: title of a RendezVous
 *         date:
 *           type: date
 *           description: date of a RendezVous
 *         
 *         
 *          
 *       example:
 *         idUser : 63862f0d8a99779c8ceec914
 *         idAvocat : 63862f4f8a99779c8ceec921
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
 * /RendezVous/getbyAvocat:
 *   post:
 *     summary: get Avocat Rendez vous
 *     tags: [RendezVous]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             idAvocat:String
 *     responses:
 *       200:
 *         description: The RendezVous showed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RendezVous'
 *       500:
 *         description: Some server error
 */
router.post('/getbyAvocat',GetALLRendezVousByAvocat)
/**
 * @swagger
 * /RendezVous/getbyClient:
 *   post:
 *     summary: get CLient Rendez vous
 *     tags: [RendezVous]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            idUser:String
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
 router.post('/getbyClient',GetALLRendezVousByClient)



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