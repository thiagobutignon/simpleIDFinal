pragma solidity ^0.4.0;
contract CadastroPessoa {
    struct dadosPublicos{
        address Owner;
        string name;
        string email;
        string phone;
        uint dateCreate;
    }
    
    struct emailVarios {
        string pessoaID;
        string email;
    }
    
    struct enderecoCadastro{
        string endereco;
        string bairro;
        string cep;
        string cidade;
        string uf;
        string idPessoa;
    }
    
    struct dataNascimentoCadastro{
        string idPessoa;
        string nascimento;
    }
    
    struct scoreCadastro{
        string idPessoa;
        string score;
    }
    
    struct cpfCadastro{
        string idPessoa;
        string cpf;
    }
    
    dataNascimentoCadastro[] listaDataNascimento;
    cpfCadastro[] listaCPF;
    enderecoCadastro[] listaEnderecos;
    dadosPublicos[] lstdadosPublicos;
    emailVarios[] lstEmailVarios;
    scoreCadastro[] listaScore;
    
    function dadosPublicosCadastro(string _name, string _email, string _phone) public {

        lstdadosPublicos.push(dadosPublicos({
            Owner: msg.sender,
            name: _name,
            email: _email,
            phone: _phone,
            dateCreate: now
        }));
    }
    
    function emailCadastro(string _pessoaID, string _email) public {
        lstEmailVarios.push(emailVarios({
            pessoaID: _pessoaID,
            email: _email
        }));
    }
    
    
    function dataNascimentoInput(string _pessoaID, string _nascimento) public{
        listaDataNascimento.push(dataNascimentoCadastro({
            idPessoa: _pessoaID,
            nascimento: _nascimento
        }));
        
    }
    
    function scoreInput(string _pessoaID, string _score) public{
        listaScore.push(scoreCadastro({
            idPessoa: _pessoaID,
            score: _score
        }));
    }
    
    function cpfInput(string _pessoaID, string _cpf) public{
        listaCPF.push(cpfCadastro({
            idPessoa: _pessoaID,
            cpf: _cpf
        }));
        
    }
    
    function enderecosInput(string _idPessoa, string _endereco, string _bairro, string _cep, string _cidade, string _uf) public{
        listaEnderecos.push(enderecoCadastro({
            idPessoa: _idPessoa,
            endereco: _endereco,
            bairro: _bairro,
            cep: _cep,
            cidade: _cidade,
            uf: _uf
        }));
        
    }
}