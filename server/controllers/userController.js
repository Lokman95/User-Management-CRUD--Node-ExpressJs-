const mysql = require("mysql");

//database connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

exports.view = (req, res) => {
  //user connection
  connection.query(
    "SELECT * FROM user WHERE status = 'active'",
    (err, data) => {
      if (!err) {
        let deleteUser = req.query.delete;
        res.render("home", { data, deleteUser });
      } else {
        console.log(err);
      }
      console.log(data);
    }
  );
};

//search filter
exports.find = (req, res) => {
  let searchItems = req.body.search;
  //user connection
  connection.query(
    "SELECT * FROM user WHERE first_name LIKE ?",
    ["%" + searchItems + "%"],
    (err, data) => {
      if (!err) {
        res.render("home", { data });
      } else {
        console.log(err);
      }
      console.log(data);
    }
  );
};
exports.form = (req, res) => {
  res.render("addUser");
};

exports.add = (req, res) => {
  const { first_name, last_name, email, phone, comment } = req.body;
  //user connection
  connection.query(
    "INSERT INTO user (first_name, last_name, email, phone, comment) VALUES (?, ?, ?, ?, ?)",
    [first_name, last_name, email, phone, comment],
    (err, data) => {
      if (!err) {
        res.render("addUser", { alert: "User Created successfully" });
      } else {
        console.log(err);
      }
      console.log(data);
    }
  );
};

exports.update = (req, res) => {
  //user connection
  connection.query(
    "SELECT * FROM user WHERE id = ?",
    [req.params.id],
    (err, data) => {
      if (!err) {
        res.render("editUser", { data });
      } else {
        console.log(err);
      }
      console.log(data);
    }
  );
};

exports.saveUpdate = (req, res) => {
  const { first_name, last_name, email, phone, comment } = req.body;
  //user connection
  connection.query(
    "UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comment = ? WHERE id = ?",
    [first_name, last_name, email, phone, comment, req.params.id],

    (err, data) => {
      if (!err) {
        pool.getConnection((err, connection) => {
          if (err) throw err;
          console.log("connected to database" + connection.threadId);

          //user connection
          connection.query(
            "SELECT * FROM user WHERE id = ?",
            [req.params.id],
            (err, data) => {
              connection.release();
              if (!err) {
                res.render("editUser", {
                  data,
                  alert: `${first_name} Updated successfully`,
                });
              } else {
                console.log(err);
              }
              console.log(data);
            }
          );
        });
      } else {
        console.log(err);
      }
      console.log(data);
    }
  );
};

exports.delete = (req, res) => {
  //user connection
  connection.query(
    "DELETE FROM user WHERE id = ?",
    [req.params.id],
    (err, data) => {
      if (!err) {
        let deleteUser = encodeURIComponent("User Deleted Succesfully");
        res.redirect("/?delete=" + deleteUser);
      } else {
        console.log(err);
      }
      console.log(data);
    }
  );
};

exports.viewUser = (req, res) => {
  //user connection
  connection.query(
    "SELECT * FROM user WHERE id = ?",
    [req.params.id],
    (err, data) => {
      if (!err) {
        res.render("viewUser", { data });
      } else {
        console.log(err);
      }
      console.log(data);
    }
  );
};
