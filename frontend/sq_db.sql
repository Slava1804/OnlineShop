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
