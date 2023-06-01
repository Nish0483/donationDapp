const Donation = artifacts.require("Donation");

module.exports = function(deployer) {
  deployer.deploy(Donation, { from: '0xbED62AE1Ad0E900CDDd12461f5fB940a733cbb92'});
};
