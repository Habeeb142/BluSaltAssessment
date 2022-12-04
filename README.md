# BluSaltAssessment

This system comprises of 3 different MS:
Billing MS
Customer MS
BillingWorker MS

Stack Used: NODE JS
Database: MSSQL
QueryFormat: Stored Procedure

Billing MS:
This has 4 major endpoints which are listed below:
http://localhost:3000/FundAccount - Used in creating fund into the account and automatically create billing worker...One BillingWorker is created, a timer of 1second is triggered before an update of status is made into the BillingMS
http://localhost:3000/GetBilling/getAllBillings - Used in getting all billings that has been created by mapping it to the neccessary MS to retrieve meaniful info
http://localhost:3000/GetBilling/getBillingByTransactionId/:transactionId - Used in getting billings by transactionId that has been created by mapping it to the neccessary MS to retrieve meaniful info
http://localhost:3000/GetBilling/getAllBillings/:customerId - Used in getting billings by customerId that has been created by mapping it to the neccessary MS to retrieve meaniful info


Customer MS:
This has 6 major endpoints which are listed below:
http://localhost:2000/CreateCustomer - Used in creating a customer account
http://localhost:2000/GetCustomer/getAllCustomers - Used in getting all customers that has been created 
http://localhost:2000/GetCustomer/getByCustomerId/:customerId - Used in getting customer based on customerId 
http://localhost:2000/GetCustomer/getByEmail/:email - Used in getting customer based on email
http://localhost:2000/DeleteCustomer/:customerId - Used in gdeleting a customer from the database
http://localhost:2000/UpdateCustomer/updateActivationStatus/:customerId - Used in updating customer status

BillingWorker MS:
This has 3 major endpoints which are listed below:
http://localhost:4000/CreateBillingWorker - Used in creating a billing worker 
http://localhost:4000/GetBillingWorker/getAllBillingWorker - Used in getting all worker that has been created 
http://localhost:4000/GetCustomer/getBillingWorkerByTransactionId/:transactionId - Used in getting worker based on transactionId 

All endpoints are encrypted with the below bearer token:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.T-vHdnp4DIpuFBRqFrWr42yG-4zxUmxm7z7YHJeMon8
