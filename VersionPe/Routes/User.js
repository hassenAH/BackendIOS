import express from'express' ;
import  {RegisterUser,Login,UpdateUser,resetPass, deleteUser} from"../Controller/UserController.js" ;
import  verifyToken from "../middleware/auth.js";


const router = express.Router();




router.post('/compte',RegisterUser)
router.post('/Login',Login,verifyToken)
router.route('/updateUser/:id').patch(UpdateUser);
router.put('/resetpwd',resetPass)
router.delete('/delete/:id',deleteUser)



export default router;