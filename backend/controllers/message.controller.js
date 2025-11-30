import { sendEmail } from "../services/EmailService.js";

export const sendMessage = async (req, res) => {
    const { name, email, message } = req.body;

    try{

        const adminEmail = 'francisaaronrodriguez23@gmail.com';
        await sendEmail(adminEmail, `New message from ${name}`, message);

        res.status(200).json({ message: "Message sent successfully" });
        
    }catch(err){
        console.log("Error in sendMessage controller:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

