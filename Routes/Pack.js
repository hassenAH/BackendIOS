import express from'express' ;
import multer from '../middleware/multer-config.js';
import  {Getpack,GetALLpack,addPack,UpdatePack,deletepack} from"../Controller/PackController.js" ;





const router = express.Router();



/**
 * @swagger
 * components:
 *   schemas:
 *     Pack:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The Auto-generated id of a categorie
 *         name:
 *           type: string
 *           description: first name of a Pack
 *         title:
 *           type: string
 *           description: title of a Pack
 *         description:
 *           type: string
 *           description: description of a Pack
 *         prix:
 *           type: number
 *           description: prix of a Pack
 *         
 *          
 *       example:
 *         name: pack gold
 *         id: 63862f0d8a99779c8ceec914
 *         title
 * : "divorce enticipe"
 *         description: analyse de dossier et frais de demande avec suivie de dossier
 *         prix: 150
 *         
 *
 */
/**
 * @swagger
 *  tags:
 *    name: Pack
 *    description: Pack
 */
/**
 * @swagger
 * /pack/add:
 *   post:
 *     summary: Create a new pack
 *     tags: [Pack]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pack'
 *     responses:
 *       200:
 *         description: The Pack was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pack'
 *       500:
 *         description: Some server error
 */
router.post('/add',addPack)


/**
 * @swagger
 * /Pack/update/{id}:
 *   post:
 *     summary: updates Pack by id
 *     tags: [Pack]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Pack id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pack'
 *     responses:
 *       200:
 *         decsription: The Pack was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pack'
 *       404:
 *         description: Pack was not found.
 *       500:
 *         description: Some errors happend.
 *
 */
router.post('/update/:id',UpdatePack);


/**
 * @swagger
 *  /Pack/delete/{id}:
 *    delete:
 *      summary: removes a Pack
 *      tags: [Pack]
 *      parameters:
 *        - in: path
 *          name: id
 *          description:  id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The Pack was deleted
 *        404:
 *          description: The Pack was not found
 *
 */
router.delete('/delete/:id',deletepack)
/**
 * @swagger
 *  /Pack/{id}:
 *    get:
 *      summary: Get a Pack
 *      tags: [Pack]
 *      parameters:
 *        - in: path
 *          name: id
 *          description:  id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Pack by its id
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pack'
 *        404:
 *          description: The Pack was not found
 *
 */
router.get('/:id',Getpack)
/**
 * @swagger
 *  /pack:
 *    get:
 *      summary: Get a Pack
 *      tags: [Pack]
 *     
 *      responses:
 *        200:
 *          description: Pack 
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pack'
 *        404:
 *          description: The Pack was not found
 *
 */
 router.get('/',GetALLpack)


export default router;