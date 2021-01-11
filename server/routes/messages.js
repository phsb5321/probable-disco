const Message = require("../models/message");
const express = require("express")
const router = express.Router()
const io = require("../utils/socket")

router.get("/", (req, res) => {
    Message.find()
        .then(data => {
            res.status(200)
                .json({
                    message: "Sucsses!",
                    data: data
                })
        })
})

router.post("/", (req, res) => {
    const { message, user } = req.body;
    const item = { message, user };
    const messageData = new Message(item);
    messageData.save();

    io.getIO().emit("Message",
        {
            message: "Message Reicived",
            value: messageData
        })

    res.status(200).json({ message: "Sucsses!" })
})

router.delete("/", async (req, res) => {
    try {
        await Message.deleteMany({})
            .then(res.status(200).json({ message: "Finne !" }))
    } catch (error) {
        res.status(400).json({ message: "Something went wrong !" })
    }
})

// router.put("/", (req, res) => {

// })

module.exports = router;