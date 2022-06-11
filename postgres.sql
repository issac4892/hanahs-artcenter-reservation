create table reservation
(
    id             uuid                                   not null
        constraint reservation_pk
            primary key,
    student_name   varchar                                not null,
    pin            varchar                                not null,
    student_id     varchar                                not null,
    neis_id        varchar                                not null,
    study_floor    integer                                not null,
    study_seat     integer                                not null,
    artcenter_seat integer                                not null,
    created_at     timestamp with time zone default now() not null
);

alter table reservation
    owner to postgres;

create unique index reservation_artcenter_seat_uindex
    on reservation (artcenter_seat);

create unique index reservation_id_uindex
    on reservation (id);

create unique index reservation_student_id_uindex
    on reservation (student_id);

create unique index reservation_neis_id_uindex
    on reservation (neis_id);

