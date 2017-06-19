CREATE TABLE IF NOT EXISTS <%= table %>(
  id                   BIGSERIAL PRIMARY KEY,
  <% for (let i = 0; i < fields.length - 1; i++) {%><%= fields[i].name %>       <%= fields[i].type %>,
  <% } %><%= fields[fields.length - 1].name %>       <%= fields[fields.length - 1].type %>
);

<% for (let i = 0; i < searchableFields.length; i++) {%>
CREATE INDEX IF NOT EXISTS <%= table %>_<%= searchableFields[i].name %>_idx ON <%= table %> (<%= searchableFields[i].name %>);
CREATE INDEX IF NOT EXISTS <%= table %>_<%= searchableFields[i].name %>_varchar_idx ON <%= table %> (<%= searchableFields[i].name %> varchar_pattern_ops);
<% } %>
