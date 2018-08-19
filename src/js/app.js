App = {
  web3Provider: null,
  contracts: {},

  init: function () {
    // Remover
    
    $.postJSON('/', function(data){
      console.log('POST: ' + data);
   //   var petsRow = $('#petsRow');
  //    petTemplate.find('.panel-title').text(data[i].name);
//      petsRow.append(petTemplate.html());
    });

    // // Load pets.
    /*
     $.getJSON('../pets.json', function (data) {
      console.log('GET funcionando!'); 
      
       var petsRow = $('#petsRow');
       var petTemplate = $('#petTemplate');

       for (i = 0; i < data.length; i++) {
         petTemplate.find('.panel-title').text(data[i].name);
         petTemplate.find('img').attr('src', data[i].picture);
         petTemplate.find('.pet-breed').text(data[i].breed);
         petTemplate.find('.pet-age').text(data[i].age);
         petTemplate.find('.pet-location').text(data[i].location);
         petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

         petsRow.append(petTemplate.html());
       }
      
       
     });
     */
    return App.initWeb3();
  },

  initWeb3: function () {
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function () {

    console.log('Inicializa o contrato!');
    /*
    $.postJSON('/', function (data){
      console.log('POST: ' + data);
      var petsRow = $('#petsRow');
      petTemplate.find('.panel-title').text(data[0].nome);
      petsRow.append(petTemplate.html());
    });
    */

    //  Ele pega os dados que estao na build do contrato
    $.getJSON('CadastroPessoa.json', function(data) {
    // //   // Get the necessary contract artifact file and instantiate it with truffle-contract
        var AdoptionArtifact = data;
        App.contracts.CadastroPessoa = TruffleContract(AdoptionArtifact);
    
    // //   // Set the provider for our contract
        App.contracts.CadastroPessoa.setProvider(App.web3Provider);
    
    // //   // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted();
     });

     return App.bindEvents();
  },

  bindEvents: function () {
    // faz o push para o block chain
     $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function (adopters, account) {
    var adoptionInstance;

App.contracts.CadastroPessoa.deployed().then(function(instance) {
  adoptionInstance = instance;

  return adoptionInstance.getAdopters.call();

}).then(function(adopters) {
  for (i = 0; i < adopters.length; i++) {
    if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
      $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
    }
  }
}).catch(function(err) {
  console.log(err.message);
});
  },

  handleAdopt: function (event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    var adoptionInstance;

web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0];

  App.contracts.CadastroPessoa.deployed().then(function(instance) {
    adoptionInstance = instance;

    // Execute adopt as a transaction by sending account
    return adoptionInstance.adopt(petId, {from: account});
  }).then(function(result) {
    return App.markAdopted();
  }).catch(function(err) {
    console.log(err.message);
  });
});
  }

};

$(function () {
  $(window).load(function () {
    App.init();
  });
});