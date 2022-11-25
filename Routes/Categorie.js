import express from'express' ;
import multer from '../middleware/multer-config.js';
import  {GetCategorie,deleteCategorie,UpdateCategorie,addCategorie, GetALLCategorie} from"../Controller/CategorieController.js" ;





const router = express.Router();



/**
 * @swagger
 * components:
 *   schemas:
 *     categorie:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The Auto-generated id of a categorie
 *         name:
 *           type: string
 *           description: first name of a categorie
 *         
 *          
 *       example:
 *         name: droit civil
 *         
 *
 */
/**
 * @swagger
 *  tags:
 *    name: categorie
 *    description: Categories
 */
/**
 * @swagger
 * /categorie/add:
 *   post:
 *     summary: Create a new User
 *     tags: [categorie]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/categorie'
 *     responses:
 *       200:
 *         description: The categorie was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/categorie'
 *       500:
 *         description: Some server error
 */
router.post('/add',multer,addCategorie)


/**
 * @swagger
 * /categorie/update/{id}:
 *   post:
 *     summary: updates posts by id
 *     tags: [categorie]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: categorie id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/categorie'
 *     responses:
 *       200:
 *         decsription: The categorie was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/categorie'
 *       404:
 *         description: categorie was not found.
 *       500:
 *         description: Some errors happend.
 *
 */
router.post('/update/:id',multer,UpdateCategorie);


/**
 * @swagger
 *  /categorie/delete/{id}:
 *    delete:
 *      summary: removes a categorie
 *      tags: [categorie]
 *      parameters:
 *        - in: path
 *          name: id
 *          description:  id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The categorie was deleted
 *        404:
 *          description: The categorie was not found
 *
 */
router.delete('/delete/:id',deleteCategorie)
/**
 * @swagger
 *  /categorie/{id}:
 *    get:
 *      summary: Get a categorie
 *      tags: [categorie]
 *      parameters:
 *        - in: path
 *          name: id
 *          description:  id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: categorie by its id
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/categorie'
 *        404:
 *          description: The categorie was not found
 *
 */
router.get('/:id',GetCategorie)
/**
 * @swagger
 *  /categorie:
 *    get:
 *      summary: Get all categorie
 *      tags: [categorie]
 *     
 *      responses:
 *        200:
 *          description: categorie 
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/categorie'
 *        404:
 *          description: The categorie was not found
 *
 */
 router.get('/',GetALLCategorie)

export default router;