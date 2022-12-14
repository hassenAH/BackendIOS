import express from"express";
const router = express.Router()
import {getAllConversations,getAllMessages,getMyMessages,getMyConversations,createConversation,sendMessage,deleteConversation,deleteMessage,deleteAll} from "../Controller/MessageController.js";
router.route("/").get(getAllConversations);
router.route("/tout-messages").get(getAllMessages);
router.route("/my-conversations/:senderId").get(getMyConversations);
router.route("/my-messages/:conversationId").get(getMyMessages);
router.route("/create-conversation").post(createConversation);
router.route("/send-message").post(sendMessage);
router.route("/").delete(deleteConversation);
router.route("/message").delete(deleteMessage);
router.route("/deleteAll").delete(deleteAll);
export default router;