CREATE TABLE IF NOT EXISTS mainmenu (
id integer PRIMARY KEY AUTOINCREMENT,
title text NOT NULL,
url text NOT NULL
);

CREATE TABLE IF NOT EXISTS catalog (
id integer PRIMARY KEY,
title text NOT NULL,
price integer NOT NULL,
imageurl text NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
name text NOT NULL,
surname text NOT NULL,
email text PRIMARY KEY NOT NULL,
password text NOT NULL
);
