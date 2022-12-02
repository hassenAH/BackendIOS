import express from'express' ;
import multer from '../middleware/multer-config.js';
import  {GetCase,GetALLCase,addCase,UpdateCase,deleteCase,GetCasebyUser} from"../Controller/CaseController.js" ;





const router = express.Router();



/**
 * @swagger
 * components:
 *   schemas:
 *     Case:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The Auto-generated id of a categorie
 *         title:
 *           type: string
 *           description: title of a Case
 *         description:
 *           type: string
 *           description: description of a Case
 *         LastnameUser:
 *           type: string
 *           description: last name  of a user
 *         nameUser:
 *           type: string
 *           description: name of a user
 *         traite:
 *           type: bool
 *           description: etat of a Case
 *         Prix:
 *           type: Number
 *           description: etat of a Case
 *           
 *         
 *          
 *       example:
 *         title: divorce
 *         description:  La séparation de corps permet aux époux de rester mariés, mais de ne plus vivre ensemble.
 *         traite: false
 *         nameUser : hassen
 *         LastnameUser: ahmadi
 *         Prix : 2000
 * 
 *         
 *
 */
/**
 * @swagger
 *  tags:
 *    name: Case
 *    description: Case
 */
/**
 * @swagger
 * /Case/add:
 *   post:
 *     summary: Create a new Case
 *     tags: [Case]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Case'
 *     responses:
 *       200:
 *         description: The Case was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Case'
 *       500:
 *         description: Some server error
 */
router.post('/add',addCase)


/**
 * @swagger
 * /Case/update/{id}:
 *   post:
 *     summary: updates Case by id
 *     tags: [Case]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Case id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Case'
 *     responses:
 *       200:
 *         decsription: The Case was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Case'
 *       404:
 *         description: Case was not found.
 *       500:
 *         description: Some errors happend.
 *
 */
router.post('/update/:id',UpdateCase);


/**
 * @swagger
 *  /Case/delete/{id}:
 *    delete:
 *      summary: removes a Case
 *      tags: [Case]
 *      parameters:
 *        - in: path
 *          name: id
 *          description:  id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The Case was deleted
 *        404:
 *          description: The Case was not found
 *
 */
router.delete('/delete/:id',deleteCase)
/**
 * @swagger
 *  /Case/{id}:
 *    get:
 *      summary: Get a Case
 *      tags: [Case]
 *      parameters:
 *        - in: path
 *          name: id
 *          description:  id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Case by its id
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Case'
 *        404:
 *          description: The Case was not found
 *
 */
router.get('/:id',GetCase)
/**
 * @swagger
 *  /Case:
 *    get:
 *      summary: Get a Case
 *      tags: [Case]
 *     
 *      responses:
 *        200:
 *          description: Case 
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Case'
 *        404:
 *          description: The Case was not found
 *
 */
 router.get('/',GetALLCase)

 /**
 * @swagger
 * /Case/update/{id}:
 *   post:
 *     summary: updates Case by id
 *     tags: [Case]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Case id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Case'
 *     responses:
 *       200:
 *         decsription: The Case was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Case'
 *       404:
 *         description: Case was not found.
 *       500:
 *         description: Some errors happend.
 *
 */
router.post('/update/:id',UpdateCase);


export default router;