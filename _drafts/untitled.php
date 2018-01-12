
create table cell_lineprop (
	cell_lineprop_id bigserial not null,
	primary key (cell_lineprop_id),
	cell_line_id bigint not null,
	foreign key (cell_line_id) references cell_line (cell_line_id) on delete cascade INITIALLY DEFERRED,
	type_id bigint not null,
	foreign key (type_id) references cvterm (cvterm_id) on delete cascade INITIALLY DEFERRED,
	value text null,
	rank int not null default 0,
	cvalue_id bigint,
  FOREIGN KEY (cvalue_id) REFERENCES cvterm (cvterm_id) ON DELETE SET NULL,
	constraint cell_lineprop_c1 unique (cell_line_id,type_id,rank)
);
CREATE INDEX cell_lineprop_idx1 ON cell_lineprop (cvalue_id);
COMMENT ON COLUMN cell_lineprop.cvalue_id IS 'The value of the property if that value should be the name of a controlled vocabulary term.  It is preferred that a property either use the value or cvalue_id column but not both.  For example, if the property type is "color" then the cvalue_id could be a term named "green".';

grant all on cell_lineprop to PUBLIC;
