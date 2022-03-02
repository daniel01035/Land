const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
	    host:"140.120.55.83",
	    network_id:"*",
      port: 8550
    }
  },
  compilers: {
    solc: {
      version: "0.4.26",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
};
