App = {
    web3Provider: null,
    contracts: {},

    init: function () {
        console.log("Initweb3 iniciado");
        return App.initWeb3();
    },



    initWeb3: function () {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3currentProvider;
        } else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },

    initContract: function () {
        $.getJSON('CadastroPessoa.json', function (data) {
            var CadastroPessoaArtifact = data;
            App.contracts.CadastroPessoa = TruffleContract(CadastroPessoaArtifact);

            App.contracts.CadastroPessoa.setProvider(App.web3Provider);
            return App.emailSend();
        });
        return bindEvents();
    },

    bindEvents: function () {
        $(document).on('enviaForm', App.emailSend);
    },

    emailSend: function (email, account) {
        var emailInstance;
        App.contracts.CadastroPessoa.deployed().then(function (instance) {
            emailInstance = instance;
            return emailInstance.getEmail.call();
        }).then(function (email) {
            for (i = 0; i < email.length; i++) {
                if (email[i] !== '0x0000000000000000000000000000000000000000') {
                    console.log("email cadastrado com sucesso");
                }
            }
        }).catch(function (err) {
            console.log(err.message);
        });
    },


};

(function () {
    $(window).load(function () {
      App.init();
    });
  });