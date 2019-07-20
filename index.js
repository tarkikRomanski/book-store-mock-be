const express = require('express');
const app = express();

const port = process.env.PORT || 8080;

// Mock data
const books = require('./data/books');
const categories = require('./data/categories');

const booksPageQuantity = calculatePages(books);

app.get('/api/books', (req, res) => {
    const page = parseInt(req.query.page || 1);
    const baseUrl = `${req.protocol}://${req.get('host')}/api/books`;

    res.json(pagination(books, page, booksPageQuantity, baseUrl, prepareBookList));
});

app.get('/api/books/:book', (req, res) => {
    const bookId = parseInt(req.params.book);
    const book = books.find(item => item.id === bookId);

    if (!book) {
        console.error(`User tried open book with id ${bookId}`);
        res.status(404);
        res.json({});
        return true;
    }

    res.json(prepareBookItem(book));
});

app.get('/api/:category/books', (req, res) => {
    const page = parseInt(req.query.page || 1);
    const categoryTitle = req.params.category;
    const baseUrl = `${req.protocol}://${req.get('host')}/api/${categoryTitle}/books`;
    const category = categories.find(item => item.title.toLowerCase() === categoryTitle.toLowerCase());

    if (!category) {
        console.error(`User tried open category ${categoryTitle}`);
        res.status(404);
        res.json({});
        return true;
    }

    const categoryBooks = books.filter(book => book.category === category.id);

    res.json(pagination(categoryBooks, page, calculatePages(categoryBooks), baseUrl, prepareBookList));
});

app.get('/api/categories', (req, res) => {
    res.json(categories);
});

app.get('/api/search', (req, res) => {
    if (!req.query.s) {
        return res.json([]);
    }

    const searchString = req.query.s.toLowerCase();
    const fullSearch = +(req.query.full || 0);
    const page = parseInt(req.query.page || 1);
    const foundBooks = books.filter(item => item.title.toLowerCase().indexOf(searchString) > -1);
    const baseUrl = `${req.protocol}://${req.get('host')}/api/search?s=${searchString}&full=${fullSearch}`;

    fullSearch
        ? res.json(pagination(foundBooks, page, calculatePages(foundBooks), baseUrl, prepareBookList))
        : res.json(foundBooks.slice(0,9).map(prepareBookBasic));
});

function pagination(items, currentPage, pageQuantity, baseUrl, preparingFunction = item => item, perPage = 15) {
    if (currentPage > pageQuantity) {
        currentPage = pageQuantity;
    }

    if (baseUrl.indexOf('?') < 0) {
        baseUrl += '?';
    }

    return {
        page: currentPage,
        pageCount: pageQuantity,
        items: items.slice(currentPage * perPage - perPage, currentPage * perPage).map(preparingFunction),
        prevPage: currentPage > 1 ? `${baseUrl}&page=${currentPage - 1}` : null,
        nextPage: currentPage !== pageQuantity ? `${baseUrl}&page=${currentPage + 1}` : null,
    };
}

function calculatePages(items, perPage = 15) {
    return  Math.ceil(items.length / perPage);
}

function prepareBookList(item) {
    return {
        id: item.id,
        title: item.title,
        price: parseFloat(item.price),
        author: item.author,
        categoryId: item.category,
        categoryName: categories.find(category => category.id === item.category).title,
        sale: item.sale,
        tag: item.tag,
        in_stock: item.in_stock,
        cover: item.cover
    }
}

function prepareBookBasic(item) {
    return {
        id: item.id,
        title: item.title,
        author: item.author,
        cover: item.cover,
        price: parseFloat(item.price)
    }
}

function prepareBookItem(item) {
    const similar = books.filter(book => book.similar === item.similar).map(prepareBookBasic).slice(0, 5);

    return {
        id: item.id,
        title: item.title,
        price: parseFloat(item.price),
        author: item.author,
        categoryName: categories.find(category => category.id === item.category).title,
        sale: item.sale,
        tag: item.tag,
        in_stock: item.in_stock,
        cover: item.cover,
        description: item.description,
        product_information: item.product_information,
        other_details: item.other_details,
        similar
    }
}

app.listen(port, () => console.log(`Testing server listening on port ${port}!`));
