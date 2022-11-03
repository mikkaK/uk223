--USERS
insert into users (id, email,first_name,last_name, password)
values ('ba804cb9-fa14-42a5-afaf-be488742fc54', 'admin@example.com', 'James','Bond', '1234' ),
('0d8fa44c-54fd-4cd0-ace9-2a7da57992de', 'user@example.com', 'Tyler','Durden', '1234')
 ON CONFLICT DO NOTHING;


--ROLES
INSERT INTO role(id, name)
VALUES ('d29e709c-0ff1-4f4c-a7ef-09f656c390f1', 'DEFAULT'),
       ('54b17c6b-d95e-4c6c-8a37-e0b7feac797d', 'ADMIN'),
       ('dd8b982f-c663-465b-b2c9-68c78e8a8840', 'USER')
ON CONFLICT DO NOTHING;

--AUTHORITIES
INSERT INTO authority(id, name)
VALUES ('2ebf301e-6c61-4076-98e3-2a38b31daf86', 'DEFAULT'),
       ('6b1a56bf-bb98-4413-b093-96dbd55cd043', 'READ'),
       ('ef259518-ea09-4982-a87b-a0ac84c01d0b', 'WRITE'),
       ('84af6f73-4bda-40e2-a559-1df36039cccc', 'DELETE')
ON CONFLICT DO NOTHING;

--GROUPS
INSERT INTO groups(id, group_logo, group_motto, group_name)
VALUES ('406a23f2-a483-481d-9564-54c13061e683', 'https://example.com', 'example', 'example'),
       ('4f2ee6c0-189d-4d79-9056-d56917d4d8ac', 'https://example2.com', 'example2', 'example2')
ON CONFLICT DO NOTHING;

--assign roles to users
insert into users_role (users_id, role_id)
values ('ba804cb9-fa14-42a5-afaf-be488742fc54', 'd29e709c-0ff1-4f4c-a7ef-09f656c390f1'),
       ('0d8fa44c-54fd-4cd0-ace9-2a7da57992de', 'd29e709c-0ff1-4f4c-a7ef-09f656c390f1')
 ON CONFLICT DO NOTHING;

--assign authorities to roles
INSERT INTO role_authority(role_id, authority_id)
VALUES ('d29e709c-0ff1-4f4c-a7ef-09f656c390f1', '2ebf301e-6c61-4076-98e3-2a38b31daf86'),
       ('54b17c6b-d95e-4c6c-8a37-e0b7feac797d', '6b1a56bf-bb98-4413-b093-96dbd55cd043'),
       ('54b17c6b-d95e-4c6c-8a37-e0b7feac797d', 'ef259518-ea09-4982-a87b-a0ac84c01d0b'),
       ('54b17c6b-d95e-4c6c-8a37-e0b7feac797d', '84af6f73-4bda-40e2-a559-1df36039cccc')
ON CONFLICT DO NOTHING;
--assign groups to users
INSERT INTO users_group(group_id, users_id)
VALUES ('406a23f2-a483-481d-9564-54c13061e683', 'ba804cb9-fa14-42a5-afaf-be488742fc54'),
       ('4f2ee6c0-189d-4d79-9056-d56917d4d8ac', '0d8fa44c-54fd-4cd0-ace9-2a7da57992de')
ON CONFLICT DO NOTHING;