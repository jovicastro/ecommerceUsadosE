//src/models/User.js
const bcrypt = require('bcryptjs');
const db = require('../config/db.js');

class User {
    constructor(id, fullname, password, email, telephoneN, cep, addressN, admin){
        this.id = id;
        this.fullname = fullname;
        this.password = password;
        this.email = email;
        this.telephoneN = telephoneN;
        this.cep = cep;
        this.addressN = addressN;
        this.admin = admin;
    }
    async save() {
        // SE a senha não estiver já hasheada (importante para atualizações onde a senha não muda)
        // E SE this.password for uma senha nova/modificada
        if (this.password && !this.password.startsWith('$2a$') && !this.password.startsWith('$2b$')) { // Verifica se já não é um hash bcrypt
            const saltRounds = 3;
            this.password = await bcrypt.hash(this.password, saltRounds); // Substitui a senha pura pelo hash
        }

        // Lógica para inserir ou atualizar no banco usando this.password (que agora é o hash)
        // Exemplo para INSERT (você precisará adaptar para sua lógica de INSERT)
        const sql = `INSERT INTO users (fullname, password, email, telephoneN, cep, addressN, admin) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [this.fullname, this.password, this.email, this.telephoneN = telephoneN, this.cep = cep, this.addressN = addressN, this.admin];

        return new Promise((resolve, reject) => {
            db.query(sql, values, (error, result) => {
                if (error) {console.error('Erro ao salvar usuário no DB:', error); // Adicionado log de erro
                return reject(error);
                };
                this.id = result.insertId;
                resolve(this);
            });
        });
    }
}