DROP TABLE IF EXISTS art;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS users;

CREATE TABLE Users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50) UNIQUE NOT NULL ,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY(user_id)
);

CREATE TABLE art (
    art_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(10000),
    likes INT NOT NULL,
    PRIMARY KEY(art_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE comments (
    comment_id INT GENERATED ALWAYS AS IDENTITY,
    art_id INT NOT NULL,
    user_id INT NOT NULL,
    content VARCHAR(4000),
    PRIMARY KEY(comment_id),
    FOREIGN KEY (art_id) REFERENCES art(art_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);



INSERT INTO Users (username, password)
VALUES
    ('user1', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user2', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user3', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user4', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user5', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user6', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user7', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user8', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user9', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user10', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user11', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user12', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user13', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user14', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user15', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user16', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user17', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user18', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user19', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user20', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user21', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user22', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user23', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user24', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user25', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user26', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user27', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user28', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user29', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user30', '$2b$10$.HLNUQ9PqjWw/21a8TRj4uDXhxGDLx0j/zpzcTpzLbo1BvZNah6Dq'),
    ('user', '$2b$10$gFWE8CNP/t2mlonOC34aA.f7Gr5bi.ZG4tB6hlnRmuCCkyr9k7wIC');


-- Insert dummy data into the art table
INSERT INTO art (user_id, title, description, likes)
VALUES
    (1, 'Sunset Landscape', 'A beautiful landscape with a colorful sunset.', 15),
    (2, 'Abstract Sculpture', 'A unique abstract sculpture made from recycled materials.', 8),
    (1, 'Portrait of a Woman', 'A detailed portrait capturing the essence of a woman.', 22),
    (3, 'City Skyline at Night', 'A city skyline illuminated against the night sky.', 10),
    (2, 'Still Life with Flowers', 'A classic still life composition featuring vibrant flowers.', 18),
    (3, 'Digital Art Exploration', 'Experimenting with digital tools to create abstract art.', 5),
    (1, 'Wildlife Photography', 'Capturing the beauty of wildlife in their natural habitat.', 12),
    (2, 'Surreal Fantasy World', 'Creating a surreal fantasy world with imaginative elements.', 25),
    (3, 'Black and White Architecture', 'Exploring architectural details in black and white photography.', 14),
    (1, 'Impressionist Seascape', 'An impressionistic portrayal of the sea and sky.', 20);

-- Insert dummy data into the comments table
INSERT INTO comments (art_id, user_id, content)
VALUES
    (1, 4, 'This sunset painting is amazing!'),
    (1, 2, 'I love the colors you used.'),
    (2, 3, 'The abstract sculpture is so intriguing.'),
    (3, 1, 'Great job capturing the woman''s expression.'),
    (3, 5, 'The details in the portrait are stunning.'),
    (4, 2, 'The city skyline looks breathtaking.'),
    (5, 3, 'The still life composition is very well done.'),
    (6, 4, 'I like the experimental digital art.'),
    (7, 1, 'The wildlife photography is incredible.'),
    (8, 5, 'The surreal fantasy world is mind-blowing.'),
    (9, 3, 'The black and white architecture is captivating.'),
    (10, 4, 'The seascape has a dreamy quality to it.'),
    (1, 2, 'I can''t get enough of this sunset painting!'),
    (2, 5, 'The abstract sculpture is a masterpiece.'),
    (3, 3, 'The portrait captures so much emotion.'),
    (4, 1, 'I feel like I''m in the city with this skyline.'),
    (5, 4, 'The still life is a work of art.'),
    (6, 2, 'Digital art allows for such creativity.'),
    (7, 5, 'Wildlife photography at its best.');