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
}

module.exports = User;