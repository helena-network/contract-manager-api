-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.1
-- PostgreSQL version: 10.0
-- Project Site: pgmodeler.io
-- Model Author: ---


-- Database creation must be done outside a multicommand file.
-- These commands were put in this file only as a convenience.
-- -- object: new_database | type: DATABASE --
-- -- DROP DATABASE IF EXISTS new_database;
-- CREATE DATABASE new_database;
-- -- ddl-end --
-- 

-- object: public.contract_registry | type: TABLE --
-- DROP TABLE IF EXISTS public.contract_registry CASCADE;
CREATE TABLE public.contract_registry(
	contract_name text DEFAULT no_name,
	version text,
	abi jsonb,
	address text,
	id serial NOT NULL,
	CONSTRAINT contract_registry_pk PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE public.contract_registry OWNER TO postgres;
-- ddl-end --


