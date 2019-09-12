create table payment_service_authorizations(
  is_reversal boolean null default false,
  debit_credit text not null,
  local_time time not null,
  auth_amount decimal(14, 2) not null default 0,
  pan text null,
  approval_code text null,
  local_date date not null,
  terminal_number text null,
  auth_id varchar(255) not null,
  `source` text null,
  is_card_present boolean not null default false,
  etag text null,
  auth_date timestamp not null,
  is_success boolean not null default false,
  card_type text not null,
  reversal_reason text null,
  cashback_amount decimal(14, 2) null default 0,
  auth_reject_reason text null,
  id char(36) not null,
  created_by int null,
  created_at timestamp null,
  updated_by int null,
  updated_at timestamp null,
  payment_merchant_id char(36) not null,
  constraint payment_service_authorizations_pkey
    primary key (id)
);
create index payment_service_authorizations_auth_date_idx on payment_service_authorizations(auth_date);
create index payment_service_authorizations_auth_id_idx on payment_service_authorizations(auth_id);
create index payment_service_authorizations_local_date_idx on payment_service_authorizations(local_date);
create index payment_service_authorizations_payment_merchant_id_idx on payment_service_authorizations(payment_merchant_id);
create table payment_service_batches(
  etag text null,
  `source` text not null,
  terminal_number text null,
  net_deposit decimal(14, 2) not null default 0,
  batch_id varchar(255) not null,
  batch_date timestamp not null,
  id char(36) not null,
  created_by int null,
  created_at timestamp null,
  updated_by int null,
  updated_at timestamp null,
  payment_merchant_id char(36) not null,
  constraint payment_service_batches_pkey
    primary key (id)
);
create index payment_service_batches_batch_date_idx on payment_service_batches(batch_date);
create index payment_service_batches_batch_id_idx on payment_service_batches(batch_id);
create index payment_service_batches_payment_merchant_id_idx on payment_service_batches(payment_merchant_id);
create table payment_service_disputes(
  transaction_id varchar(255) null,
  loaded_date date not null,
  case_type text not null,
  resolved_date date null,
  pan text null,
  dispute_id int not null,
  resolution text null,
  second_request_date date null,
  family_id varchar(255) null,
  posted_date date null,
  debit_credit text not null,
  merchant_amount decimal(14, 2) null default 0,
  dispute_amount decimal(14, 2) not null default 0,
  case_status text not null,
  etag text null,
  case_number text not null,
  card_type text not null,
  transaction_date date null,
  status_message text not null,
  auth_code text null,
  reason_code text not null,
  reason_description text null,
  `source` text not null,
  id char(36) not null,
  created_by int null,
  created_at timestamp null,
  updated_by int null,
  updated_at timestamp null,
  payment_merchant_id char(36) not null,
  constraint payment_service_disputes_pkey
    primary key (id)
);
create index payment_service_disputes_dispute_id_idx on payment_service_disputes(dispute_id);
create index payment_service_disputes_family_id_idx on payment_service_disputes(family_id);
create index payment_service_disputes_loaded_date_idx on payment_service_disputes(loaded_date);
create index payment_service_disputes_payment_merchant_id_idx on payment_service_disputes(payment_merchant_id);
create index payment_service_disputes_posted_date_idx on payment_service_disputes(posted_date);
create index payment_service_disputes_resolved_date_idx on payment_service_disputes(resolved_date);
create index payment_service_disputes_second_request_date_idx on payment_service_disputes(second_request_date);
create index payment_service_disputes_transaction_date_idx on payment_service_disputes(transaction_date);
create index payment_service_disputes_transaction_id_idx on payment_service_disputes(transaction_id);
create table payment_service_transactions(
  ext_trans_id varchar(255) null,
  debit_credit text not null,
  etag text null,
  cashback_amount decimal(14, 2) null default 0,
  net_deposit decimal(14, 2) null default 0,
  pan text not null,
  authorized_amount decimal(14, 2) null default 0,
  is_card_present boolean not null default true,
  trans_date timestamp not null,
  local_time time null,
  trans_id varchar(255) not null,
  `source` text not null,
  terminal_number text not null,
  trans_amount decimal(14, 2) not null default 0,
  batch_id varchar(255) not null,
  card_type text not null,
  id char(36) not null,
  created_by int null,
  created_at timestamp null,
  updated_by int null,
  updated_at timestamp null,
  payment_merchant_id char(36) not null,
  constraint payment_service_transactions_pkey
    primary key (id)
);
create index payment_service_transactions_batch_id_idx on payment_service_transactions(batch_id);
create index payment_service_transactions_ext_trans_id_idx on payment_service_transactions(ext_trans_id);
create index payment_service_transactions_payment_merchant_id_idx on payment_service_transactions(payment_merchant_id);
create index payment_service_transactions_trans_date_idx on payment_service_transactions(trans_date);
create index payment_service_transactions_trans_id_idx on payment_service_transactions(trans_id);