import express from'express' ;
import multer from '../middleware/multer-config.js';
import  {RegisterUser,Login,UpdateUser,resetPass,verify, deleteUser, GetUser,forgetPass,changepass,UpdateAvocat,GetallAvocat,GetAvocatByCategorie,GetNews,GetNew,UpdateSignature,addDocument} from"../Controller/UserController.js" ;
import  verifyToken from "../middleware/auth.js";
import multerConfig from '../middleware/multer-config.js';



const router = express.Router();



/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The Auto-generated id of a User
 *         first_name:
 *           type: integer
 *           description: first name of a user
 *         last_name:
 *           type: string
 *           description: last name of a user
 *         email:
 *           type: string
 *           descripton: email of a user
 *         password:
 *            type: string
 *            descripton: password of a user
 *         categorie:
 *            type: string
 *         experience:
 *            type: number
 *          
 *       example:
 *         first_name: ahmadi
 *         last_name: hassen
 *         email: hassenahmadi@ymail.com
 *         password: aaa
 *         categorie: droit civil
 *         experience : 5 
 *
 */
/**
 * @swagger
 *  tags:
 *    name: User
 *    description: users
 */
/**
 * @swagger
 * /user/compte:
 *   post:
 *     summary: Create a new User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error*
 */
router.post('/compte',RegisterUser)

/**
 * @swagger
 * /user/Signin:
 *   post:
 *     summary: Login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully Sign in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post('/Signin',Login,verifyToken)
/**
 * @swagger
 * /user/resetpwd:
 *   post:
 *     summary: send Code reset password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The code  was successfully sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
 router.post('/resetpwd',resetPass)
 /**
 * @swagger
 * /user/changepwd:
 *   post:
 *     summary:  change password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The code  was successfully sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
  router.post('/changepwd',changepass)
 /**
 * @swagger
 * /user/resetpassword:
 *   post:
 *     summary:   validate code for reset
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The password update successfully sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
  router.post('/resetpassword',forgetPass)
/**
 * @swagger
 * /user/updateUser/{id}:
 *   post:
 *     summary: updates posts by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         decsription: The user was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: user was not found.
 *       500:
 *         description: Some errors happend.
 *
 */
router.post('/updateUser/:id',multer,UpdateUser);
/**
 * @swagger
 * /user/addSignature/{id}:
 * 
 *   post:
 *     summary: Create a new User
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error*
 */
 router.post('/addSignature/:id',multer,UpdateSignature)
 /**
 * @swagger
 * /user/addDocument/{id}:
 * 
 *   post:
 *     summary: Create a new User
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error*
 */
  router.post('/addDocument/:id',multer,addDocument)
/**
 * @swagger
 * /user/UpdateAvocat/{id}:
 *   post:
 *     summary: updates avocat by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         decsription: The user was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: user was not found.
 *       500:
 *         description: Some errors happend.
 *
 */
 router.post('/UpdateAvocat/:id',UpdateAvocat);
/**
 * @swagger
 * /user/verify/{id}:
 *   get:
 *     summary: verify a user  by id
 *     tags: [User]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: verified by  id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: User can not be found
 */
router.get('/verify/:id',verify);

/**
 * @swagger
 *  /user/delete/{id}:
 *    delete:
 *      summary: removes a user
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          description:  id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The user was deleted
 *        404:
 *          description: The user was not found
 *
 */
router.delete('/delete/:id',deleteUser)
/**
 * @swagger
 *  /user/profil/{id}:
 *    get:
 *      summary: Get a user
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          description:  id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: User by its id
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *        404:
 *          description: The user was not found
 *
 */
router.get('/profil/:id',GetUser)
/**
 * @swagger
 *  /user/allAvocat:
 *    get:
 *      summary: Get all avocat
 *      tags: [User]
 *      
 *      responses:
 *        200:
 *          description: Users Avocat
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *        404:
 *          description: The user was not found
 *
 */
 router.get('/allAvocat',GetallAvocat)
 /**
 * @swagger
 *  /user/getbycategorie:
 *    post:
 *      summary: Get avocat by categorie
 *      tags: [User]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: User by its id
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *        404:
 *          description: The user was not found
 *
 */
router.post('/getbycategorie',GetAvocatByCategorie)
/**
 * @swagger
 *  /user/getNews:
 *    get:
 *      summary: Get all avocat
 *      tags: [User]
 *      
 *      responses:
 *        200:
 *          description: news 
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *        404:
 *          description: The user was not found
 *
 */
 router.get('/getNews',GetNews)
 /**
 * @swagger
 * /user/getnew:
 *   post:
 *     summary: search article
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             search : string
 *     responses:
 *       200:
 *         description: The news article was successfully sent
 *         
 *             
 *       500:
 *         description: Some server error
 */
  router.post('/getnew',GetNew)

export default router;