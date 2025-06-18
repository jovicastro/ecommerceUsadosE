// Arquivo: src/models/User.js

const bcrypt = require('bcryptjs');
const db = require('../config/db.js'); // Agora importa a conexão com promise

class User {
    constructor(id, fullname, password, email, telephoneN, cep, address, addressN, admin, date) {
        this.id = id;
        this.fullname = fullname;
        this.password = password;
        this.email = email;
        this.telephoneN = telephoneN;
        this.cep = cep;
        this.address = address;
        this.addressN = addressN;
        this.admin = admin;
        this.date = date;
    }

    async save() {
        if (this.password && !this.password.startsWith('$2b$')) {
            const saltRounds = 10;
            this.password = await bcrypt.hash(this.password, saltRounds);
        }

        const sql = `
            INSERT INTO users 
                (fullname, password, email, telephoneN, cep, address, addressN, admin, date) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            this.fullname, this.password, this.email, this.telephoneN, 
            this.cep, this.address, this.addressN, this.admin, this.date
        ];

        // Com o db.js correto, esta linha AGORA VAI FUNCIONAR.
        const [result] = await db.execute(sql, values);
        
        this.id = result.insertId;
        return this;
    }

    static async findByEmail(email) {
        try{
            const sql = "SELECT * FROM users WHERE email = ?";

            const [rows] = await db.execute(sql, [email])

            if (rows.length > 0) {
                return rows[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error("erro em User.js/findByEmail", error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            const sql = 'SELECT * FROM users WHERE id = ?'; // Verifique se o nome da sua tabela é 'users'
            const [rows] = await db.execute(sql, [id]);

            if (rows.length === 0) {
                return null; // Retorna nulo se nenhum usuário for encontrado com esse ID
            }

            // Pega os dados do primeiro (e único) resultado
            const userData = rows[0];

            // Retorna uma nova instância da classe User com os dados do banco
            return new User(
                userData.id,
                userData.fullname,
                userData.password, // É importante retornar a senha aqui, mesmo que não seja enviada ao cliente
                userData.email,
                userData.telephoneN,
                userData.cep,
                userData.address,
                userData.addressN,
                userData.isAdmin,
                userData.date
            );
        } catch (error) {
            console.error("Erro ao buscar usuário por ID no modelo:", error);
            throw error; // Lança o erro para ser capturado pelo controller
        }
    }
}

module.exports = User;