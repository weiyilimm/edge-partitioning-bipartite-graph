const express = require('express');
app = express()

require('dotenv').config()

app.set('view engine', 'ejs')
app.use('/api/', require('./routes/graph'))

const PORT = process.env.PORT || 4896
app.listen(PORT, () => {
  console.log(`Listening Port : ${PORT}`)
});