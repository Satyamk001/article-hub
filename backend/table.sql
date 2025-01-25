CREATE TABLE appuser (
                id INT PRIMARY KEY ,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
               status VARCHAR(20),
               isDeletable VARCHAR(20),
               UNIQUE(email)
            )

