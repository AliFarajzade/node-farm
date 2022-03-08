const http = require('http')
const fs = require('fs')
const url = require('url')
const replaceJSON = require('./modules/replaceJson')

const stringData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const JSONData = JSON.parse(stringData)

const overviewTemp = fs.readFileSync(
    `${__dirname}/templates/template-overview.html`,
    'utf-8'
)
const cardTemp = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    'utf-8'
)
const productTemp = fs.readFileSync(
    `${__dirname}/templates/template-product.html`,
    'utf-8'
)

const server = http.createServer((req, res) => {
    const {
        pathname: pathName,
        query: { id },
    } = url.parse(req.url, true)

    if (pathName === '/') {
        const htmlCardTemp = JSONData.map(productObj =>
            replaceJSON(cardTemp, productObj)
        ).join('')

        const htmlOverviewTemp = overviewTemp.replace(
            '{%PRODUCTS_CARDS%}',
            htmlCardTemp
        )
        res.writeHead(200, { 'Content-type': 'text/html' })

        res.end(htmlOverviewTemp)
    } else if (pathName === '/api') res.end(stringData)
    else if (pathName === '/products') {
        res.writeHead(200, { 'Content-type': 'text/html' })

        const productObj = JSONData[id]

        const output = replaceJSON(productTemp, productObj)

        res.end(output)
    } else res.end('Not Found')
})

server.listen('3000', '127.0.0.1', () => {
    console.log('Server is running on port 3000.')
})
