create table `users` (
    `id` binary(36) primary key not null,
    `email` varchar(255) not null,
    `password` varchar(255) not null,
    `name` varchar(255) not null,
    `gender` enum('male', 'female', 'other')
);

create table `configs` (
    `id` binary(36) primary key not null,
    `user_id` binary(36) not null,
    `config_name` varchar(255) not null,
    `created` datetime,
    foreign key (`user_id`) references `users`(`id`)
);