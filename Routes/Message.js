import express from"express";
const router = express.Router()
import {getAllConversations,getAllMessages,getMyMessages,getMyConversations,createConversation,sendMessage,deleteConversation,deleteMessage,deleteAll} from "../Controller/MessageController.js";

router.route("/dis").get(getAllConversations);
router.route("/dis/tout-messages").get(getAllMessages);
router.route("/dis/my-conversations/:senderId").get(getMyConversations);
router.route("/dis/my-messages/:conversationId").get(getMyMessages);
router.route("/dis/create-conversation").post(createConversation);
router.route("/dis/sendmessage").post(sendMessage);
router.route("/dis").delete(deleteConversation);
router.route("/dis/message").delete(deleteMessage);
router.route("/dis/deleteAll").delete(deleteAll);

export default router;