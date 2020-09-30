const bodyParser = require('body-parser')
// const { request } = require('express')
const express = require('express')
const app = express()
const db = require('./src/helper/db')

//midleware
app.use(bodyParser.urlencoded({
    extended: false
}))


//pagination

app.get('/transfer', (req, res) => {
    let {
        page,
        limit
    } = req.query;

    if (!limit) limit = 5;
    else limit = parseInt(limit);

    if (!page) page = 1;
    else page = parseInt(page);

    db.query(
        `SELECT * FROM transfer LIMIT ${limit} OFFSET ${(page-1) * limit}`,
        (err, result, fields) => {
            if (!err) {
                res.status(200).send({
                    success: true,
                    message: 'success get all transfer data',
                    data: result
                })
            } else {
                console.log(err)
                res.status(500).send({
                    success: false,
                    message: 'failed to fetch transfer data',
                    data: []
                });
            }
        });
});

//get method
app.get('/transfer', (req, res) => {
    db.query(`SELECT * FROM transfer`, (err, result, fields) => {
        if (!err)
            res.status(200).send({
                success: true,
                message: 'success get all transfer data',
                data: result
            })
        else
            res.status(500).send({
                success: false,
                message: 'failed to fetch transfer data',
                data: []
            });
    });
});

//POST METHOD
app.post('/transfer', (req, res) => {
    const {
        amount,
        notes,
        receiver_name,
        receiver_phone,
        sender_name,
        sender_phone,
        verified_transaction,
    } = req.body;
    if (
        amount &&
        notes &&
        receiver_name &&
        receiver_phone &&
        sender_name &&
        sender_phone &&
        verified_transaction
    ) {
        db.query(
            `INSERT INTO transfer (amount, notes, receiver_name, receiver_phone, sender_name, sender_phone, verified_transaction) VALUES ('${amount}',
      '${notes}', '${receiver_name}', '${receiver_phone}',
      '${sender_name}', '${sender_phone}', ${verified_transaction})`,
            (err, result, fields) => {
                if (!err) {
                    res.status(201).send({
                        success: true,
                        message: "Success created transfer data",
                        data: result,
                    });
                } else {
                    console.log(err);
                    res.status(500).send({
                        success: false,
                        message: "Internal Server Error",
                        data: [],
                    });
                }
                db.end();
            }
        );
    } else {
        res.status(400).send({
            success: false,
            message: "All Fields must be filled",
            data: []
        });
    }
});

//DELETE USER

app.delete('/transfer/:id_transfer', (req, res) => {
    const {
        id_transfer
    } = req.params
    db.query(`DELETE FROM transfer WHERE id_transfer=${id_transfer}`, (err, result, fields) => {
        if (!err) {
            res.status(200).send({
                success: true,
                message: 'success delete all users data',
                data: result
            })
        } else {
            res.status(500).send({
                success: false,
                message: 'failed delete data',
                data: []
            });
        }
    });
});

//Search by name
app.get('/search/:receiver_name', (req, res) => {
    // console.log(req.params)
    const {
        receiver_name
    } = req.params
    // console.log(req.params)
    // console.log(req.body)

    db.query(`SELECT * FROM transfer WHERE receiver_name LIKE '${receiver_name}%' ORDER BY receiver_name ASC`,
        (err, result, fields) => {

            if (!err) {
                console.log(err)
                res.status(200).send({
                    success: true,
                    message: 'success Search users data',
                    data: result
                })
            } else {
                console.log(err)
                res.status(500).send({
                    success: false,
                    message: 'failed Search data',
                    data: []
                });
            }
        });
});

//UPDATE METHOD (PATCH)
app.patch("/transfer/:id_transfer", (req, res) => {
    const {
        id_transfer
    } = req.params;
    const {
        amount = "",
            notes = "",
            receiver_name = "",
            receiver_phone = "",
            sender_name = "",
            sender_phone = "",
            verified_transaction = "",
    } = req.body;

    if (
        amount.trim() ||
        notes.trim() ||
        receiver_name.trim() ||
        receiver_phone.trim() ||
        sender_name.trim() ||
        sender_phone.trim() ||
        verified_transaction.trim()
    ) {
        db.query(`SELECT * FROM transfer where id_transfer=${id_transfer}`, (err, result, fields) => {
            if (!err) {
                if (result.length) {
                    const data = Object.entries(req.body).map((item) => {
                        return parseInt(item[1]) > 0 ?
                            `${item[0]}=${item[1]}` :
                            `${item[0]}='${item[1]}'`;
                    });
                    console.log(data)
                    let query = `UPDATE transfer SET ${data} WHERE id_transfer=${id_transfer}`;
                    db.query(query, (err, result, fields) => {
                        if (result.affectedRows) {
                            res.status(200).send({
                                success: true,
                                message: `User ${id_transfer} Succesfully updated`,
                            });
                        } else {
                            res.status(400).send({
                                success: false,
                                message: "Failed update user",
                            });
                        }
                    });
                } else {
                    res.status(400).send({
                        success: false,
                        message: "id_transfer not found",
                    });
                }
            } else {
                console.log(err);
                res.status(500).send({
                    success: false,
                    message: "Failed update user",
                });
            }
        });
    }
});

//UPDATE METHOD (PUT)
app.put("/transfer/:id_transfer", (req, res) => {
    const {
        id_transfer
    } = req.params;
    const {
        amount,
        notes,
        receiver_name,
        receiver_phone,
        sender_name,
        sender_phone,
        verified_transaction,
    } = req.body;
    if (
        amount &&
        notes &&
        receiver_name &&
        receiver_phone &&
        sender_name &&
        sender_phone &&
        verified_transaction
    ) {
        let query = `UPDATE transfer SET amount='${amount}', notes = '${notes}',
     receiver_name ='${receiver_name}',
      receiver_phone ='${receiver_phone}',
       sender_name ='${sender_name}',
        sender_phone ='${sender_phone}', 
        verified_transaction = ${verified_transaction}
        where id_transfer = ${id_transfer}`;
        db.query(query, (err, result, fields) => {
            if (!err) {
                res.status(201).send({
                    success: true,
                    message: `Success update user data ${id_transfer}`,
                    data: result,
                });
            } else {
                console.log(err);
                res.status(500).send({
                    success: false,
                    message: "Internal Server Error",
                    data: [],
                });
            }
            db.end();
        });
    } else {
        res.status(400).send({
            success: false,
            message: "All Fields must be filled",
            data: [],
        });
    }
});


app.listen(8000, () => {
    console.log('server running on port 8000')
})