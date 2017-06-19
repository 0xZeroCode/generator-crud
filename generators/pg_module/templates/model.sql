CREATE TABLE IF NOT EXISTS <%= table %>(
  id                   BIGSERIAL PRIMARY KEY,
  <% for (let i = 0; i < fields.length; i++) {%><%= fields[i].name %>       <%= fields[i].type %>,
  <% } %>create_date       timestamptz,
  update_date       timestamptz
);

<% for (let i = 0; i < searchableFields.length; i++) {%>
CREATE INDEX IF NOT EXISTS <%= table %>_<%= searchableFields[i].name %>_idx ON <%= table %> (<%= searchableFields[i].name %>);
CREATE INDEX IF NOT EXISTS <%= table %>_<%= searchableFields[i].name %>_varchar_idx ON <%= table %> (<%= searchableFields[i].name %> varchar_pattern_ops);
<% } %>
