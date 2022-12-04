exports.concatResponses = async(billing, worker, customer) => {

    let data = []
    await billing.forEach(element => {
        data.push({
            billing: {
                ...element
            },
            worker: {
                ...worker.find(dat=>dat.transactionId==element.transactionId)
            },
            customer: {
                ...customer.find(dat=>dat.customerId=element.customerId)
            }
        })
    });
    return data
}