const passwords = `
CREATE TABLE IF NOT EXISTS passwords (
  user_id INT PRIMARY KEY   AUTO_INCREMENT,
  user_name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
`;

const user_info = `
CREATE TABLE IF NOT EXISTS user_info (
  user_id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  allowed BOOL NOT NULL , 
  manger BOOL NOT NULL 
);
`;

const reserved_ads = `
CREATE TABLE IF NOT EXISTS reserved_ads (
  user_id INT NOT NULL,
  product_id INT  NOT NULL,
  product_type VARCHAR(255) NOT NULL,
  PRIMARY KEY(user_id,product_id,product_type)
);
`;

const  user_messages= `
CREATE TABLE IF NOT EXISTS  user_messages(
  messages_id INT  PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  sender_id INT  NOT NULL ,
  body longtext NOT NULL
);
`;
const  manager= `
CREATE TABLE IF NOT EXISTS  manager(
  user_id INT NOT NULL PRIMARY KEY
);
`;

const tables = {
    passwords,
    user_info,
    reserved_ads,
    user_messages , 
    manager
};

module.exports = tables;