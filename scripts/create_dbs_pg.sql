CREATE TABLE payment_service_authorizations (
	is_reversal bool NULL DEFAULT false,
	debit_credit text NOT NULL,
	local_time time NOT NULL,
	auth_amount numeric(14,2) NOT NULL DEFAULT NULL::numeric,
	pan text NULL,
	approval_code text NULL,
	local_date date NOT NULL,
	terminal_number text NULL,
	auth_id text NOT NULL,
	"source" text NULL,
	is_card_present bool NOT NULL DEFAULT false,
	etag text NULL,
	auth_date timestamptz NOT NULL,
	is_success bool NOT NULL DEFAULT false,
	card_type text NOT NULL,
	reversal_reason text NULL,
	cashback_amount numeric(14,2) NULL DEFAULT NULL::numeric,
	auth_reject_reason text NULL,
	id serial NOT NULL,
	created_by int4 NULL,
	created_at timestamptz NULL,
	updated_by int4 NULL,
	updated_at timestamptz NULL,
	-- location_id int4 NOT NULL,
	payment_service_merchant_id int4 NOT NULL,
	CONSTRAINT payment_service_authorizations_pkey PRIMARY KEY (id)
);
CREATE INDEX payment_service_authorizations_auth_date_idx ON payment_service_authorizations USING btree (auth_date);
CREATE INDEX payment_service_authorizations_auth_id_idx ON payment_service_authorizations USING btree (auth_id);
CREATE INDEX payment_service_authorizations_local_date_idx ON payment_service_authorizations USING btree (local_date);
-- CREATE INDEX payment_service_authorizations_location_id_idx ON payment_service_authorizations USING btree (location_id);
CREATE INDEX payment_service_authorizations_payment_service_merchant_id_idx ON payment_service_authorizations USING btree (payment_service_merchant_id);

CREATE TABLE payment_service_batches (
	etag text NULL,
	"source" text NOT NULL,
	terminal_number text NULL,
	net_deposit numeric(14,2) NOT NULL DEFAULT NULL::numeric,
	batch_id text NOT NULL,
	batch_date timestamptz NOT NULL,
	id serial NOT NULL,
	created_by int4 NULL,
	created_at timestamptz NULL,
	updated_by int4 NULL,
	updated_at timestamptz NULL,
	-- location_id int4 NOT NULL,
	payment_service_merchant_id int4 NOT NULL,
	CONSTRAINT payment_service_batches_pkey PRIMARY KEY (id)
);
CREATE INDEX payment_service_batches_batch_date_idx ON payment_service_batches USING btree (batch_date);
CREATE INDEX payment_service_batches_batch_id_idx ON payment_service_batches USING btree (batch_id);
-- CREATE INDEX payment_service_batches_location_id_idx ON payment_service_batches USING btree (location_id);
CREATE INDEX payment_service_batches_payment_service_merchant_id_idx ON payment_service_batches USING btree (payment_service_merchant_id);

CREATE TABLE payment_service_disputes (
	transaction_id text NULL,
	loaded_date date NOT NULL,
	case_type text NOT NULL,
	resolved_date date NULL,
	pan text NULL,
	dispute_id int4 NOT NULL,
	resolution text NULL,
	second_request_date date NULL,
	family_id text NULL,
	posted_date date NULL,
	debit_credit text NOT NULL,
	merchant_amount numeric(14,2) NULL DEFAULT NULL::numeric,
	dispute_amount numeric(14,2) NOT NULL DEFAULT NULL::numeric,
	case_status text NOT NULL,
	etag text NULL,
	case_number text NOT NULL,
	card_type text NOT NULL,
	transaction_date date NULL,
	status_message text NOT NULL,
	auth_code text NULL,
	reason_code text NOT NULL,
	reason_description text NULL,
	"source" text NOT NULL,
	id serial NOT NULL,
	created_by int4 NULL,
	created_at timestamptz NULL,
	updated_by int4 NULL,
	updated_at timestamptz NULL,
	-- location_id int4 NOT NULL,
	payment_service_merchant_id int4 NOT NULL,
	CONSTRAINT payment_service_disputes_pkey PRIMARY KEY (id)
);
CREATE INDEX payment_service_disputes_dispute_id_idx ON payment_service_disputes USING btree (dispute_id);
CREATE INDEX payment_service_disputes_family_id_idx ON payment_service_disputes USING btree (family_id);
CREATE INDEX payment_service_disputes_loaded_date_idx ON payment_service_disputes USING btree (loaded_date);
-- CREATE INDEX payment_service_disputes_location_id_idx ON payment_service_disputes USING btree (location_id);
CREATE INDEX payment_service_disputes_payment_service_merchant_id_idx ON payment_service_disputes USING btree (payment_service_merchant_id);
CREATE INDEX payment_service_disputes_posted_date_idx ON payment_service_disputes USING btree (posted_date);
CREATE INDEX payment_service_disputes_resolved_date_idx ON payment_service_disputes USING btree (resolved_date);
CREATE INDEX payment_service_disputes_second_request_date_idx ON payment_service_disputes USING btree (second_request_date);
CREATE INDEX payment_service_disputes_transaction_date_idx ON payment_service_disputes USING btree (transaction_date);
CREATE INDEX payment_service_disputes_transaction_id_idx ON payment_service_disputes USING btree (transaction_id);


CREATE TABLE payment_service_transactions (
	ext_trans_id text NULL,
	debit_credit text NOT NULL,
	etag text NULL,
	cashback_amount numeric(14,2) NULL DEFAULT NULL::numeric,
	net_deposit numeric(14,2) NULL DEFAULT NULL::numeric,
	pan text NOT NULL,
	authorized_amount numeric(14,2) NULL DEFAULT NULL::numeric,
	is_card_present bool NOT NULL DEFAULT true,
	trans_date timestamptz NOT NULL,
	local_time time NULL,
	trans_id text NOT NULL,
	"source" text NOT NULL,
	terminal_number text NOT NULL,
	trans_amount numeric(14,2) NOT NULL DEFAULT NULL::numeric,
	batch_id text NOT NULL,
	card_type text NOT NULL,
	id serial NOT NULL,
	created_by int4 NULL,
	created_at timestamptz NULL,
	updated_by int4 NULL,
	updated_at timestamptz NULL,
	-- location_id int4 NOT NULL,
	payment_service_merchant_id int4 NOT NULL,
	CONSTRAINT payment_service_transactions_pkey PRIMARY KEY (id)
);
CREATE INDEX payment_service_transactions_batch_id_idx ON payment_service_transactions USING btree (batch_id);
CREATE INDEX payment_service_transactions_ext_trans_id_idx ON payment_service_transactions USING btree (ext_trans_id);
-- CREATE INDEX payment_service_transactions_location_id_idx ON payment_service_transactions USING btree (location_id);
CREATE INDEX payment_service_transactions_payment_service_merchant_id_idx ON payment_service_transactions USING btree (payment_service_merchant_id);
CREATE INDEX payment_service_transactions_trans_date_idx ON payment_service_transactions USING btree (trans_date);
CREATE INDEX payment_service_transactions_trans_id_idx ON payment_service_transactions USING btree (trans_id);
