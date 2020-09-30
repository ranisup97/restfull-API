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

app.get('/profile', (req, res) => {
    let {
        page,
        limit
    } = req.query;

    if (!limit) limit = 5;
    else limit = parseInt(limit);

    if (!page) page = 1;
    else page = parseInt(page);

    db.query(
        `SELECT * FROM profile LIMIT ${limit} OFFSET ${(page-1) * limit}`,
        (err, result, fields) => {
            if (!err) {
                res.status(200).send({
                    success: true,
                    message: 'success get all profile data',
                    data: result
                })
            } else {
                console.log(err)
                res.status(500).send({
                    success: false,
                    message: 'failed to fetch profile data',
                    data: []
                });
            }
        });
});

//get method
app.get('/profile', (req, res) => {
    db.query(`SELECT * FROM profile`, (err, result, fields) => {
        if (!err)
            res.status(200).send({
                success: true,
                message: 'success get all profile data',
                data: result
            })
        else
            res.status(500).send({
                success: false,
                message: 'failed to fetch profile data',
                data: []
            });
    });
});



//POST METHOD
app.post('/profile', (req, res) => {
    const {
        firstName,
        lastName,
        phone,
        email,
        password,
        balance,
        verified,
        photo,
        pin,
    } = req.body;
    if (
        firstName &&
        lastName &&
        phone &&
        email &&
        password &&
        balance &&
        verified &&
        photo &&
        pin
    ) {
        db.query(
            `INSERT INTO profile (firstName, lastName,
      phone, email, password, balance, verified,
      photo, pin) VALUES ('${firstName}',
      '${lastName}', '${phone}', '${email}',
      '${password}', '${balance}', ${verified}, '${photo}', '${pin}')`,
            (err, result, fields) => {
                if (!err) {
                    res.status(201).send({
                        success: true,
                        message: "Success created profile data",
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

app.delete('/profile/:id', (req, res) => {
    const {
        id
    } = req.params
    db.query(`DELETE FROM profile WHERE id=${id}`, (err, result, fields) => {
        if (!err) {
            res.status(200).send({
                success: true,
                message: 'success delete all profile data',
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
app.get('/search/:firstName', (req, res) => {
    // console.log(req.params)
    const {
        firstName
    } = req.params
    // console.log(req.body)

    db.query(`SELECT * FROM profile WHERE firstName LIKE '${firstName}%' ORDER BY firstName ASC`, (err, result, fields) => {

        if (!err) {
            res.status(200).send({
                success: true,
                message: 'success Search profile data',
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
app.patch("/profile/:id", (req, res) => {
    const {
        id
    } = req.params;
    const {
        firstName = "",
            lastName = "",
            phone = "",
            email = "",
            password = "",
            balance = "",
            verified = "",
            photo = "",
            pin = "",
    } = req.body;

    if (
        firstName.trim() ||
        lastName.trim() ||
        phone.trim() ||
        email.trim() ||
        password.trim() ||
        balance.trim() ||
        verified.trim() ||
        photo.trim() ||
        pin.trim()
    ) {
        db.query(`SELECT * FROM profile where id=${id}`, (err, result, fields) => {
            if (!err) {
                if (result.length) {
                    const data = Object.entries(req.body).map((item) => {
                        return parseInt(item[1]) > 0 ?
                            `${item[0]}=${item[1]}` :
                            `${item[0]}='${item[1]}'`;
                    });
                    console.log(data)
                    let query = `UPDATE profile SET ${data} WHERE id=${id}`;
                    db.query(query, (err, result, fields) => {
                        if (result.affectedRows) {
                            res.status(200).send({
                                success: true,
                                message: `User ${id} Succesfully updated`,
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
                        message: "id not found",
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
app.put("/profile/:id", (req, res) => {
    const {
        id
    } = req.params;
    const {
        firstName,
        lastName,
        phone,
        email,
        password,
        balance,
        verified,
        photo,
        pin,
    } = req.body;
    if (
        firstName &&
        lastName &&
        phone &&
        email &&
        password &&
        balance &&
        verified &&
        photo &&
        pin
    ) {
        let query = `UPDATE profile SET firstName='${firstName}', lastName='${lastName}', phone='${phone}', email='${email}', password='${password}', balance='${balance}', verified=${verified}, photo='${photo}', pin='${pin}' where id=${id}`;
        db.query(query, (err, result, fields) => {
            if (!err) {
                res.status(201).send({
                    success: true,
                    message: `Success update user data ${id}`,
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