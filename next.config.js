//Node style
const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack"); //nextJS uses webpack under the hood

module.exports = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    return config;
  }
};
