class User
{

    constructor(name, gender, birth, country, email, password, photo, admin)
    {

        // define as propriedades da classe
        // utilizando underline indica que é um atributo privado

        this._id        = 0; 
        this._name      = name;
        this._gender    = gender;
        this._birth     = birth;
        this._country   = country;
        this._email     = email;
        this._password  = password;
        this._photo     = photo;
        this._admin     = admin;
        this._register  = new Date();

    }

    get id()
    {
        return this._id;
    }       

    get register()
    {
        return this._register;
    }    

    get name()
    {
        return this._name;
    }

    get gender()
    {
        return this._gender;
    }

    get birth()
    {
        return this._birth;
    }
    
    get country()
    {
        return this._country;
    }
    
    get email()
    {
        return this._email;
    }
    
    get password()
    {
        return this._password;
    }
    
    get photo()
    {
        return this._photo;
    }    

    get admin()
    {
        return this._admin;
    }        

    set photo(value)
    {
        this._photo = value;
    }

    loadFromJSON(json)
    {

        for (let name in json)
        {

            switch(name)
            {
                case '_register':
                    this[name] = new Date(json[name]);
                    break;
                default:
                    this[name] = json[name];
            }
            
        }

    }

    static getUsersStorage()
    {

        // cria um array de objetos
        let users = [];        

        // verifica se já existe
        if (localStorage.getItem("users"))
        {
            // se já tiver registros armazenados
            // carrega os registros já armazenados
            users = JSON.parse(localStorage.getItem("users"));
        
        }      

        return users;

    }    

    getNewID()
    {

        let usersID = parseInt(localStorage.getItem("userID"));

        if (!usersID > 0) usersID = 0;

        usersID++;

        localStorage.setItem("usersID", usersID);

        return usersID;

    }

    save()
    {

        // sessionStorage   armazena os dados na aba do navegador, e se perde quando a aba é fechada
        // localStorage     armazena os dados no navegador e sempre fica disponível naquela máquina

        // busca a lista de usuários já armazenada
        let users = User.getUsersStorage();

        // verifica se este ID já existe
        if (this.id > 0)
        {

            // *** alteração

            // localiza no array 'user', o regsitro que tenha o id = this.id
            // se tiver, precisa 'editar' o registro selecionado
            //let user = users.filter(u=>{return u._id === this.id});

            // gera um novo User, unindo os campos do array anterior
            // substitindo com o user atual (this)
            // let newUser = Object.assign({}, user, this);

            users.map(u =>
            {

                // localiza o registro a ser alterado pesquisando pelo 'id'
                if (u._id == this.id)
                {
                    // encontrei o id a ser alterado
                    // faz a alteração
                    // compara os dois registros 'u' e 'this'
                    // colocando a informação do 'this' no 'u'
                    Object.assign(u, this);
                }

                // retorna o registro para ser alterado no array user
                return u;

            });


        }
        else
        {

            // *** inclusão

            // gera um novo ID para inclusão
            this._id = this.getNewID();

            // inclui um novo usuário na array
            users.push(this);

        }

        // atualiza o localStorage
        localStorage.setItem("users", JSON.stringify(users));            
        
    }

    remove()
    {

        // busca a lista de usuários do localStorage
        let users = User.getUsersStorage(); 

        // percorre a lista, pra localizar o id a ser excluído
        users.forEach((userData, index)=>
        {

            if (this._id == userData._id)
            {
                // exclui o elemento com índice "index"
                // 1 significa que vai excluir apenas um a partir do index
                users.splice(index, 1);
            }

        });

        // armazena o array com um registro excluído para o localStorage
        localStorage.setItem("users", JSON.stringify(users));

    }

}