CREATE TABLE accounts:

CREATE EXTENSION "uuid-ossp";

CREATE TABLE accounts(
    id UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4(),
    username VARCHAR(50), 
    email VARCHAR(50),
    phone VARCHAR(12),
    password VARCHAR(255),
    city VARCHAR(50),
    address VARCHAR(50),
    rating INT,
    description VARCHAR(200)
);


-- Product:

CREATE TABLE product (
    id UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4(),
    pname VARCHAR(200),
    category VARCHAR(200),
    unit VARCHAR(100),
    price INT,
    prating INT,
    deliverycharge INT,
    description VARCHAR(500),
    deliverylocation VARCHAR(200),
    minquantity INT,
    maxquantity INT
);