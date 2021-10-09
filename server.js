import Express from "express";


const app = Express();


app.listen(5000, () => {
    console.log("server on port 5000")
})

app.get('/faber', (req, res) => {
    res.send("hola mundo. Si, faber es del otro equipo ");
})