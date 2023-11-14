TRUNCATE art RESTART IDENTITY;

INSERT INTO art (user_id, title, description, likes) 
VALUES
  (1, 'monalisa', 'by vinci', 90),
  (2, 'table and flowers', 'by van gogh', 80),
  (3, 'abaporu', 'by tarsila', 90);