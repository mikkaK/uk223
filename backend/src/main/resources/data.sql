--GROUPS
INSERT INTO groups(id, group_logo, group_motto, group_name)
VALUES ('406a23f2-a483-481d-9564-54c13061e683', 'https://example.com', 'example', 'example'),
       ('4f2ee6c0-189d-4d79-9056-d56917d4d8ac', 'https://example2.com', 'example2', 'example2')
ON CONFLICT DO NOTHING;
--USERS
insert into users (id, email,first_name,last_name, password, group_id)
values  ('6a46c002-f5d5-4a80-9dac-55f97ed97c7b','admin@example.com','James','Bond','$2a$10$ryJhl1vNecp5gk5MbHxmLO1ar5wBq3VT05v1JVisL7gnkI9uvZ3Ai','406a23f2-a483-481d-9564-54c13061e683'),
        ('4b1789ff-fd7a-4151-90e0-555587701229','Mayra_Swift@hotmail.com','Payton','Volkman','$2a$10$SHX379AEfwi84Ph5I6MvguAwna5S19Ju1jtmJF6rw6femMWZU6/sy','406a23f2-a483-481d-9564-54c13061e683'),
        ('25ad5636-e3fc-489f-83ad-25be0b126f43','Micah.Goldner34@yahoo.com','Percival','Schulist','$2a$10$q7GDYwdAxqEQJTuWGU6CjuEAwmOYGju/8y/J40nOVFPAa9X.B7Qn6','406a23f2-a483-481d-9564-54c13061e683'),
        ('926d112c-706c-4b16-b8f1-31cdd5a1f739','Kianna_Zieme@gmail.com','Ava','Franecki','$2a$10$qeM2OegzX3rHn.YodTLmSuqpC1hs4Ui4MNrSPTnkab2TabbVKbwUC','4f2ee6c0-189d-4d79-9056-d56917d4d8ac'),
        ('dc6ef408-0c29-4222-97e9-386c19d4e249','Oliver_Keebler64@hotmail.com','Ebony','Becker','$2a$10$oWsMHf6fATg5D7y4t9EsGuJKTYOBDAIZtvggBBjS5JblWPvsudMce','4f2ee6c0-189d-4d79-9056-d56917d4d8ac'),
        ('48c1b610-fb05-4fd1-8ae6-cfa02213de87','Giuseppe_Lemke@gmail.com','Kolby','Ferry','$2a$10$A/cIBvO1PUy8ns2Hz371k.ZsJyctLXFIdGqN1bJkzxsBKr2mEV9vu','4f2ee6c0-189d-4d79-9056-d56917d4d8ac'),
        ('08c3512d-16fb-4a12-acfc-08379ec06720','Ramon_Beier72@yahoo.com','Kurtis','Tillman','$2a$10$A56wl6UtZ9fEfiIgQI35kOw9Ry4at.aYToWtQoO6pp0kAzmT3igPm','406a23f2-a483-481d-9564-54c13061e683'),
        ('233c019c-e0c0-4893-bfc1-d0aab176a8ae','user@example.com','Tyler','Durden','$2a$10$fKikqFAPa0MaLrDcepvVAeB6T/UuS1XCp5KHzqEdRtluGOyIdh8G2','406a23f2-a483-481d-9564-54c13061e683'),
        ('197d8b72-ca8d-4be1-ae51-3f4247b52adc','Michele11@yahoo.com','Micheal','Sipes','$2a$10$puqpQY20RxH9J27JBgo/qOKyX7yBAC1AED.WQ9rPVRXDfOw2H9/aG','4f2ee6c0-189d-4d79-9056-d56917d4d8ac'),
        ('4333b3b5-9c65-457f-801f-a4cf9e38938d','Telly77@yahoo.com','Taylor','Ruecker','$2a$10$G5BDqcyFVeV5RiEk2w6MU.zAMgUbMagXjcNCVy7EqfbY4J7XKlDp.','4f2ee6c0-189d-4d79-9056-d56917d4d8ac'),
        ('8fdbe75b-12b0-4dee-a521-0b6c0bcef5e5','Felicia62@hotmail.com','Titus','Murray','$2a$10$w9Mn.g6Pi3JDjH5Aa0BG2uWw0M8szSc4FMiD7/rodiMPcn6zlBxdq','406a23f2-a483-481d-9564-54c13061e683'),
        ('867e2de6-d3f9-4067-8315-fc1ecd209003','Saul79@gmail.com','Emerson','Schultz','$2a$10$P4RcYiAIH/6Yn4wD3dFjg.JzVi.T0YuhzeMI5BI.Hb8fdEzEx3huO','4f2ee6c0-189d-4d79-9056-d56917d4d8ac'),
        ('f508a131-2684-4261-946b-5b412da8b156','Marion_VonRueden47@hotmail.com','Chyna','Padberg','$2a$10$NXtPwf8UqH6jRgBsCEoLbOmP1wRUtrmHfjb5HzVCSzYobBWUEY/ee','406a23f2-a483-481d-9564-54c13061e683'),
        ('14f55334-e47a-4a65-b1cd-4444376b6cdc','Dee.Schuster@yahoo.com','Adella','Bode','$2a$10$PznJVTJI4Xa92FVmAcNdXuLtGhBL.J2vz49xK1PO206RK30x.z4VK','406a23f2-a483-481d-9564-54c13061e683'),
        ('6d38cf17-19c8-40f5-8b23-c8d2c99d6579','Leonard36@hotmail.com','Dangelo','Doyle','$2a$10$ck8Spe83qpTGiLSEaVqC7ubqnxugG/eymcdy8U7XQqf/MabQ0Busi','406a23f2-a483-481d-9564-54c13061e683'),
        ('f4466ca3-f4ae-404c-bb87-8288dca54383','Fanny.Bogan21@yahoo.com','Ernest','Dietrich','$2a$10$Z14L4/37E3BtaOJF.QWJZuRUT4Put95d1se5PxW7hctG5oBk6AT4i','4f2ee6c0-189d-4d79-9056-d56917d4d8ac')
ON CONFLICT DO NOTHING;


--ROLES
INSERT INTO role(id, name)
VALUES ('54b17c6b-d95e-4c6c-8a37-e0b7feac797d', 'ADMIN'),
       ('dd8b982f-c663-465b-b2c9-68c78e8a8840', 'USER')
ON CONFLICT DO NOTHING;

--AUTHORITIES
INSERT INTO authority(id, name)
VALUES 	 ('b4cca629-6b19-4ff9-803d-f7c5e4f30de8','USER_MODIFY'),
           ('1f03c639-fa5a-4d9f-819b-a0b49fb65299','USER_DELETE'),
           ('683b8ed3-0b82-4dc6-9a8a-ce3995a497f3','USER_CREATE'),
           ('7cce5810-81b3-487b-a5a0-4856ede2bf46','USER_READ')
ON CONFLICT DO NOTHING;

--assign roles to users
insert into users_role (users_id, role_id)
values 	 ('25ad5636-e3fc-489f-83ad-25be0b126f43','54b17c6b-d95e-4c6c-8a37-e0b7feac797d'),
           ('6a46c002-f5d5-4a80-9dac-55f97ed97c7b','dd8b982f-c663-465b-b2c9-68c78e8a8840'),
           ('233c019c-e0c0-4893-bfc1-d0aab176a8ae','dd8b982f-c663-465b-b2c9-68c78e8a8840'),
           ('4b1789ff-fd7a-4151-90e0-555587701229','dd8b982f-c663-465b-b2c9-68c78e8a8840'),
           ('08c3512d-16fb-4a12-acfc-08379ec06720','dd8b982f-c663-465b-b2c9-68c78e8a8840'),
           ('8fdbe75b-12b0-4dee-a521-0b6c0bcef5e5','dd8b982f-c663-465b-b2c9-68c78e8a8840'),
           ('f508a131-2684-4261-946b-5b412da8b156','dd8b982f-c663-465b-b2c9-68c78e8a8840'),
           ('14f55334-e47a-4a65-b1cd-4444376b6cdc','dd8b982f-c663-465b-b2c9-68c78e8a8840'),
           ('6d38cf17-19c8-40f5-8b23-c8d2c99d6579','dd8b982f-c663-465b-b2c9-68c78e8a8840'),
           ('926d112c-706c-4b16-b8f1-31cdd5a1f739','dd8b982f-c663-465b-b2c9-68c78e8a8840'),
           ('48c1b610-fb05-4fd1-8ae6-cfa02213de87','dd8b982f-c663-465b-b2c9-68c78e8a8840'),
           ('867e2de6-d3f9-4067-8315-fc1ecd209003','dd8b982f-c663-465b-b2c9-68c78e8a8840'),
           ('4333b3b5-9c65-457f-801f-a4cf9e38938d','dd8b982f-c663-465b-b2c9-68c78e8a8840'),
           ('dc6ef408-0c29-4222-97e9-386c19d4e249','dd8b982f-c663-465b-b2c9-68c78e8a8840'),
           ('197d8b72-ca8d-4be1-ae51-3f4247b52adc','dd8b982f-c663-465b-b2c9-68c78e8a8840'),
           ('f4466ca3-f4ae-404c-bb87-8288dca54383','dd8b982f-c663-465b-b2c9-68c78e8a8840')

ON CONFLICT DO NOTHING;

--assign authorities to roles
INSERT INTO role_authority(role_id, authority_id)
VALUES 	 ('54b17c6b-d95e-4c6c-8a37-e0b7feac797d','b4cca629-6b19-4ff9-803d-f7c5e4f30de8'),
           ('54b17c6b-d95e-4c6c-8a37-e0b7feac797d','1f03c639-fa5a-4d9f-819b-a0b49fb65299'),
           ('54b17c6b-d95e-4c6c-8a37-e0b7feac797d','683b8ed3-0b82-4dc6-9a8a-ce3995a497f3'),
           ('54b17c6b-d95e-4c6c-8a37-e0b7feac797d','7cce5810-81b3-487b-a5a0-4856ede2bf46')
ON CONFLICT DO NOTHING;