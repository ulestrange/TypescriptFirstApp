

import express, {Application} from "express" ;




const PORT = process.env.PORT || 3000;

const app: Application = express();



app.get("/ping", async (_req, res) => {
    res.json({
    message: "hello from Una - has this changed",
    });
});


app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
    });


