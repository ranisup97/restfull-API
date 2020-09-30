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

app.get('/topup', (req, res) => {
    let {
        page,
        limit
    } = req.query;

    if (!limit) limit = 5;
    else limit = parseInt(limit);

    if (!page) page = 1;
    else page = parseInt(page);

    db.query(
        `SELECT * FROM topup LIMIT ${limit} OFFSET ${(page-1) * limit}`,
        (err, result, fields) => {
            if (!err) {
                res.status(200).send({
                    success: true,
                    message: 'success get all topup data',
                    data: result
                })
            } else {
                console.log(err)
                res.status(500).send({
                    success: false,
                    message: 'failed to fetch topup data',
                    data: []
                });
            }
        });
});

//get method
app.get('/topup', (req, res) => {
    db.query(`SELECT * FROM topup`, (err, result, fields) => {
        if (!err)
            res.status(200).send({
                success: true,
                message: 'success get all topup data',
                data: result
            })
        else
            res.status(500).send({
                success: false,
                message: 'failed to fetch topup data',
                data: []
            });
    });
});



//DELETE TOPUP

app.delete('/topup/:id_topup', (req, res) => {
    const {
        id_topup
    } = req.params
    db.query(`DELETE FROM topup WHERE id_topup=${id_topup}`, (err, result, fields) => {
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

//POST METHOD
app.post('/topup', (req, res) => {
    const {
        no_account,
        amount_topup,
        description,
        sender_topup,
        receiver_topup,
        verified,
    } = req.body;
    if (
        no_account &&
        amount_topup &&
        description &&
        sender_topup &&
        receiver_topup &&
        verified
    ) {
        db.query(
            `INSERT INTO topup (no_account, amount_topup, description,
      sender_topup, receiver_topup, verified) VALUES ('${no_account}',
      '${amount_topup}', '${description}', '${sender_topup}','${receiver_topup}',
      ${verified})`,
            (err, result, fields) => {
                if (!err) {
                    res.status(201).send({
                        success: true,
                        message: "Success created topup data",
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


//Search by name
app.get('/search/:receiver_topup', (req, res) => {
    // console.log(req.params)
    const {
        receiver_topup
    } = req.params
    // console.log(req.body)

    db.query(`SELECT * FROM topup WHERE receiver_topup LIKE '${receiver_topup}%' ORDER BY receiver_topup ASC`,
        (err, result, fields) => {

            if (!err) {
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
app.patch("/topup/:id_topup", (req, res) => {
    const {
        id_topup
    } = req.params;
    const {
        no_account = "",
            amount_topup = "",
            description = "",
            sender_topup = "",
            receiver_topup = "",
            verified = "",
    } = req.body;

    if (
        no_account.trim() ||
        amount_topup.trim() ||
        description.trim() ||
        sender_topup.trim() ||
        receiver_topup.trim() ||
        verified.trim()
    ) {
        db.query(`SELECT * FROM topup where id_topup=${id_topup}`, (err, result, fields) => {
            if (!err) {
                if (result.length) {
                    const data = Object.entries(req.body).map((item) => {
                        return parseInt(item[1]) > 0 ?
                            `${item[0]}=${item[1]}` :
                            `${item[0]}='${item[1]}'`;
                    });
                    console.log(data)
                    let query = `UPDATE topup SET ${data} WHERE id_topup=${id_topup}`;
                    db.query(query, (err, result, fields) => {
                        if (result.affectedRows) {
                            res.status(200).send({
                                success: true,
                                message: `User ${id_topup} Succesfully updated`,
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
                        message: "id_topup not found",
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
app.put("/topup/:id_topup", (req, res) => {
    const {
        id_topup
    } = req.params;
    const {
        no_account,
        amount_topup,
        description,
        sender_topup,
        receiver_topup,
        verified,
    } = req.body;
    if (
        no_account &&
        amount_topup &&
        description &&
        sender_topup &&
        verified
    ) {
        let query = `UPDATE topup SET no_account='${no_account}', amount_topup='${amount_topup}', description='${description}', sender_topup='${sender_topup}', receiver_topup='${receiver_topup}', verified=${verified} where id_topup=${id_topup}`;
        db.query(query, (err, result, fields) => {
            if (!err) {
                res.status(201).send({
                    success: true,
                    message: `Success update user data ${id_topup}`,
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