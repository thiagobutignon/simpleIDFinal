var CadastroPessoa = artifacts.require("CadastroPessoa");

module.exports = function(deployer) {
  deployer.deploy(CadastroPessoa);
};