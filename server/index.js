const exp = require("express");
const cors = require("cors");
const dbcn = require("./database.js");

dbcn();

const app = exp();

app.use(cors());
app.use(exp.json());

const bookRoutes = require("./routes/book.route");

app.use("/", bookRoutes);

const PORT = 5600;

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});