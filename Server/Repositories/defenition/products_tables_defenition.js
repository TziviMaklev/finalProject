const cars = `
CREATE TABLE IF NOT EXISTS cars (
  id INT  PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_details varchar(255) NOT NULL,
  cost VARCHAR(255) NOT NULL,
  km VARCHAR(255) NOT NULL,
  statuse VARCHAR(255) NOT NULL,
  year_of_production VARCHAR(255) NOT NULL,
  several_years_in_use VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  product_type VARCHAR(255) NOT NULL,
  imageFilePath VARCHAR(255)
);
`;

const  furniture= `
CREATE TABLE IF NOT EXISTS  furniture(
  id INT  PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_details varchar(255) NOT NULL,
  cost VARCHAR(255) NOT NULL,
  product_type VARCHAR(255) NOT NULL,
  several_years_in_use VARCHAR(255) NOT NULL,
  statuse VARCHAR(255) NOT NULL,
  dateAdded DATE DEFAULT CURRENT_DATE,
  imageFilePath VARCHAR(255)
);
`;

const  appliances= `
CREATE TABLE IF NOT EXISTS  appliances(
  id INT  PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_details varchar(255) NOT NULL,
  cost VARCHAR(255) NOT NULL,
  product_type VARCHAR(255) NOT NULL,
  several_years_in_use VARCHAR(255) NOT NULL,
  statuse VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  imageFilePath VARCHAR(255)
);
`;

const  animals= `
CREATE TABLE IF NOT EXISTS  animals(
    id INT  PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_details varchar(255) NOT NULL,
    cost VARCHAR(255) NOT NULL,
    product_type VARCHAR(255) NOT NULL,
    age VARCHAR(255) NOT NULL,
    health_condition VARCHAR(255) NOT NULL,
    dateAdded DATE DEFAULT CURRENT_DATE,
    imageFilePath VARCHAR(255)
);

`;

const  businesses= `
CREATE TABLE IF NOT EXISTS  businesses(
    id INT  PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_details varchar(255) NOT NULL,
    cost VARCHAR(255) NOT NULL,
    product_type VARCHAR(255) NOT NULL,
    several_years_open VARCHAR(255) NOT NULL,
    expected_profit_per_year VARCHAR(255) NOT NULL,
    place VARCHAR(255) NOT NULL,
    dateAdded DATE DEFAULT CURRENT_DATE,
    imageFilePath VARCHAR(255)
);
`;

const tables = {
    cars,
    furniture,
    appliances,
    animals,
    businesses
};

module.exports = tables;