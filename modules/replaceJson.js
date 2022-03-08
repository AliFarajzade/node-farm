module.exports = (htmlTemp, dataObj) => {
    let output = htmlTemp

    output = output.replace(/{%IMAGE%}/g, dataObj.image)
    output = output.replace(/{%PRODUCT_NAME%}/g, dataObj.productName)
    output = output.replace(/{%QUANTITY%}/g, dataObj.quantity)
    output = output.replace(/{%PRICE%}/g, dataObj.price)
    output = output.replace(/{%ID%}/g, dataObj.id)
    output = output.replace(/{%COUNTRY_NAME%}/g, dataObj.from)
    output = output.replace(/{%NUTRIENTS%}/g, dataObj.nutrients)
    output = output.replace(/{%DESCRIPTION%}/g, dataObj.description)

    if (!dataObj.organic)
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')

    return output
}
