import makeApp from './src/index.js';
import devConfig from './src/config/dev.config.js';
import prodConfig from './src/config/prod.config.js';
import 'dotenv/config'

const app = makeApp(process.env.NODE_ENV === 'prod' ? prodConfig : devConfig);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });