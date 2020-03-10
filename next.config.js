require('dotenv').config();
const path = require('path');
const Dotenv = require('dotenv-webpack');

const withCSS = require('@zeit/next-css');

let modules = {
  webpack: config => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ];

    return config;
  },
};

modules = withCSS(modules);

module.exports = modules;
