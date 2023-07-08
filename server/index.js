const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const bodyParser=require('body-parser');
const Router=require('./routes/routes');
dotenv.config();
require("./db/config");
const PORT = 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));