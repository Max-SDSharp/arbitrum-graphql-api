import app from './app'
const PORT: number = Number(process.env.PORT) || 3001

app.listen(PORT, () => {
  console.log(`App is running at port: ${PORT}`)
})
