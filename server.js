const app = require("./app");
const PORT  = process.env.PORT || 3000

const server = app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server listening at port ${server.address().port}`);
});
