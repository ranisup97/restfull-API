# Restful API
*This program is about restful api, where there are methods create, read, update, delete and also search
This program also uses the mysql module, node js and express js*

**How to Install modules in this program**
1. npm init -y
2. npm i mysql express body-parser

Link postman documentation on restful APIs and flowchart
1. [this is postman documentation on restful APIs] (https://documenter.getpostman.com/view/12579753/TVRd9WjW)
2. [Link Flowchart API](https://drive.google.com/drive/folders/1tjuwHoouO-ZYVN3iN9l7lTriOyBJooEw?usp=sharing)

## 1 Node JS
Node.js adalah platform  buatan Ryan Dahl untuk menjalankan aplikasi web berbasis JavaScript yang dikenalkan pada tahun 2009.
Node.js, di sisi lain, merupakan platform untuk menjalankan kode JavaScript pada sisi server. Ia bertugas untuk mengeksekusi kode JavaScript sebelum halaman website ditampilkan di browser. Dengan demikian, Node.js dapat menjalankan situs, aplikasi web, dan game berbasis browser dengan performa tinggi. 

## 2 Expres JS
**Express.js** adalah satu web framework paling populer di dunia Node.js. Dokumentasinya yang lengkap dan penggunaannya yang cukup mudah, dapat membuat kita mengembangkan berbagai produk seperti aplikasi web ataupun RESTful API. Express.js pun dapat digunakan menjadi pijakan untuk membangun web framework yang lebih kompleks seperti, Sails.js, MEAN (MongoDB, Express.js, Angular.js, Node.js) dan MERN (MongoDB, Express.js, React.js, Node.js). Express.js dibuat oleh TJ Holowaychuk dan sekarang dikelola oleh komunitas.

**Beberapa keunggulan yang dimiliki oleh Express.js antara lain:**

* Dukungan pembuatan middleware
* Dukungan terhadap berbagai HTTP verb seperti POST, GET, PUT, DELETE, OPTION, HEAD, dan lainnya
* Sudah terpasang template engine Jade
* manajemen file statik seperti CSS dan Javascript
* Sangat bebas untuk dikostumisasi

## 3 API
**API** adalah singkatan dari *Application Programming Interface*, dan memungkinkan developer untuk mengintegrasikan dua bagian dari aplikasi atau dengan aplikasi yang berbeda secara bersamaan. API terdiri dari berbagai elemen seperti function, protocols, dan tools lainnya yang memungkinkan developers untuk membuat aplikasi. Tujuan penggunaan API adalah untuk mempercepat proses development dengan menyediakan function secara terpisah sehingga developer tidak perlu membuat fitur yang serupa. Penerapan API akan sangaat terasa jika fitur yang diinginkan sudah sangat kompleks, tentu membutuhkan waktu untuk membuat yang serupa dengannya. Misalnya: integrasi dengan payment gateway. Terdapat berbagai jenis sistem API yang dapat digunakan, termasuk sistem operasi, library, dan web. 

## 4 mysql
MySQL adalah sebuah database management system (manajemen basis data) menggunakan perintah dasar SQL (Structured Query Language).
MySQL adalah DBMS yang open source dengan dua bentuk lisensi, yaitu Free Software (perangkat lunak bebas) dan Shareware (perangkat lunak berpemilik yang penggunaannya terbatas). Jadi MySQL adalah database server yang gratis dengan lisensi GNU General Public License (GPL) sehingga dapat dipakai untuk keperluan pribadi atau komersil tanpa harus membayar lisensi yang ada. SQL sendiri merupakan suatu bahasa yang dipakai di dalam pengambilan data pada relational database atau database yang terstruktur. Jadi MySQL adalah database management system yang menggunakan bahasa SQL sebagai bahasa penghubung antara perangkat lunak aplikasi dengan database server.

## 5 MVC
MVC adalah konsep arsitektur dalam pembangunan aplikasi berbasis web yang membagi aplikasi web menjadi 3 bagian besar. Yang mana setiap bagian memiliki tugas-tugas serta tanggung jawab masing-masing. Tiga bagian tersebut adalah: model, view dan controller.

Model: Bertugas untuk mengatur, menyiapkan, memanipulasi dan mengorganisasikan data (dari database) sesuai dengan instruksi dari controller.
View: Bertugas untuk menyajikan informasi (yang mudah dimengerti) kepada user sesuai dengan instruksi dari controller.
Controller: Bertugas untuk mengatur apa yang harus dilakukan model, dan view mana yang harus ditampilkan berdasarkan permintaan dari user. Namun, terkadang permintaan dari user tidak selalu memerlukan aksi dari model. Misalnya seperti menampilkan halaman form untuk registrasi user.

## 6 CRUD
* CRUD adalah akronim untuk Create, Read, Update, dan Delete. Proses ini sangat berkaitan dengan pengambilan atau transaksi data dari atau ke database
Lebih jelasnya, berikut ini ulasan operasi CRUD beserta contohnya:

* Create (C) merupakan proses pembuatan data baru. Proses ini biasanya dilakukan ketika Anda mendaftar pada sebuah halaman website. Data yang Anda masukkan akan disimpan di dalam database menggunakan operasi Create.

* Read (R) merupakan proses pengambilan data dari database. Proses ini biasanya terjadi ketika Anda ingin melakukan proses login di halaman website tertentu. Saat Anda klik “Login” maka website akan menjalankan proses “Read” untuk melakukan verifikasi akun yang Anda gunakan.

Contoh operasi yang lebih sederhana yaitu ketika Anda mengakses sebuah halaman website, saat itu pula proses Read berjalan. Hasil dari operasi ini adalah tampilan halaman website yang Anda lihat di browser.
* Update (U) adalah proses mengubah data yang berada di dalam database. Contoh proses ini ketika Anda mengubah profil di dalam akun sosial media. Saat Anda klik “Ubah”,  website akan mengirimkan proses Update ke dalam database. Kemudian database meresponnya dengan mengubah data lama menjadi data baru yang Anda tambahkan melalui halaman profil.
* Delete (D) adalah proses untuk menghapus data yang ada di database. Proses ini mirip dengan Update, bedanya, proses Delete akan mengubah data yang ada di database menjadi ‘tidak ada’.
