API
There are seven default actions defined for each resource. Each of that actions has an automatically generated REST API endpoint (i.e. /api/resources/{resourceId}/actions/{action})

---
List
allows you to list and filer all the records for a given resource

Endpoint: /api/resources/[RESOURCE-ID]/actions/list

Method: GET

Request params: 

direction - sorting direction, possible values asc,desc

sortBy - name of the sorting column 

page - requested page number 

perPage - number of records per page (max 500)

filers.[field_name] - filters applied 

Response:

meta

total - total number of records in the resource

perPage - number of records in a single page

page - number of requested page

direction- sorting direction, possible values asc,desc

sortBy- id of the sorting column

records - list of records with resource metadata

Example 

https://demo.adminjs.com/admin/api/resources/Admin/actions/list?direction=desc&sortBy=_id&filters.email=admin&page=1
---
New
is responsible for creating a new record in a given resource

Endpoint: /api/resources/[RESOURCE-ID]/actions/new

Method: POST

Request payload: 

FormData object with all required fields for the given resource

Response:

meta

total - total number of records in the resource

perPage - number of records in a single page

page - number of requested page

direction- sorting direction, possible values asc,desc

sortBy- id of the sorting column

records - list of records with resource metadata

Example 

Endpoint: https://demo.adminjs.co/admin/api/resources/User/actions/new
---
Search
allows you to search records in a given resource by a query string (by default it's the title property)

Endpoint: /api/resources/[RESOURCE-ID]/actions/search/[SEARCH-PHRASE]?[SEARCH-CONDITIONS]

Method: GET

Request params: 

title - searching by title

filers.[field_name] - searching by field values

page - requested page number 

perPage - number of records per page (max 500)

sortBy - id of the sorting column 

direction - sorting direction, possible values asc,desc

Response:

records - list of records with resource metadata

record - record you're requesting

params - all record data 

id - record id

title - record title

recordActions- list all actions and their parameters available on this record

bulkActions- list of all bulk actions and their parameters available on this record

Example:

Endpoint: https://adminjs-demo.herokuapp.com/admin/api/resources/categories/actions/search/Games
---
Show
is responsible for showing the details of a record

Endpoint:  /api/resources/User/records/[RESOURCE-ID]/show

Method: GET

Response:

record - record you're requesting

params - all record data 

id - record id

title - record title

recordActions- list all actions and their parameters available on this record scoped to the logged in user

bulkActions- list of all bulk actions and their parameters available on this record scoped to the logged in user

Example 

Endpoint: https://demo.adminjs.co/admin/api/resources/User/records/63d3b2c982bf27f5606e44eb/show
---
Edit
is responsible for editing record in a given resource

Endpoint: /api/resources/[RESOURCE-ID]/records/[RECORD-ID]/edit

Method: POST

Request payload: 

FormData Object with all required fields for the given resource

Response:

redirectUrl - URL that the user should be directed to after a successful update

notice 

message - the message that is later displayed in the dashboard

type - a type of response, possible values are success,error,info

record - record you're requesting

params - all record data 

id - record id

title - record title

recordActions- list all actions and their parameters available on this record

bulkActions- list of all bulk actions and their parameters available on this record

records - list of records with resource metadata

Example 

Endpoint: https://demo.adminjs.co/admin/api/resources/User/actions/new
---
Delete
is responsible for deleting single records

Endpoint: /api/resources/[RESOURCE-ID]/records/[RECORD-ID]/delete

Method: GET

Response

record - record you're requesting

params - all record data 

id - record id

title - record title

recordActions- list all actions and their parameters available on this record

bulkActions- list of all bulk actions and their parameters available on this record

Example 

Endpoint: https://demo.adminjs.co/admin/api/resources/User/records/63d3b2c982bf27f5606e44eb/delete
---
Bulk Delete
is responsible for deleting multiple records at once

Endpoint: /api/resources/[RESOURCE-ID]/actions/bulkDelete

Method: POST

Request payload:

{
  "recordIds": ["recordId1", "recordId2"]
}

Response:

redirectUrl - URL that the user should be directed to after a successful update

notice 

message - the message that is later displayed in the dashboard

type - a type of response, possible values are success,error,info

Example 

Endpoint: https://demo.adminjs.co/admin/api/resources/User/actions/bulkDelete
---

https://docs.adminjs.co/basics/api/list  