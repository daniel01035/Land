var SimpleStorage = artifacts.require("./price.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
};
