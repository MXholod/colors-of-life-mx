//This allows to use ES Modules instead of CommonJS
// Transpile all code following this line with babel and use '@babel/preset-env' (aka ES6) preset.
require("@babel/register")({
    presets: ["@babel/preset-env"],
    plugins: [
        ["@babel/transform-runtime"]
    ]
});
  
// Import the entry point of our Application (rest of our application).
module.exports = require('./index.js');  