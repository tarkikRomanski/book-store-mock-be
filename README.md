# book-store-mock-be

Books Quantity: **1000**

Category Quantity: **10**

### Endpoint for testing
- `https://book-store-mock-be.herokuapp.com/api/books?page=1` - list of the all books with pagination
- `https://book-store-mock-be.herokuapp.com/api/{category}/books?page=1` - list of the books by category with pagination
- `https://book-store-mock-be.herokuapp.com/api/books/{bookId}` - a book by id
- `https://book-store-mock-be.herokuapp.com/api/categories` - list of the categories without pagination

### Response structure
- `items` - list of the items which requested
- `page` = the current page
- `pageCount` - quantity of the all pages by request
- `nextPage` - link of the next page(`null` when current page is the last)
- `prevPage` - link of the prev page(`null` when current page is the first)

### Data structure
- **A book from list:**
    ```json
    {
        "id": 1,
        "title": "Venus Beauty Institute (Vénus beauté)",
        "price": 129.56,
        "author": "Brig Wethey",
        "categoryId": 4,
        "categoryName": "Technology",
        "sale": null,
        "tag": null,
        "in_stock": false,
        "cover": "http://dummyimage.com/700x1220.png/ff4444/ffffff"
    }
    ```

- **A single book:**
    ```json
    {
        "id": 1,
        "title": "Venus Beauty Institute (Vénus beauté)",
        "price": 129.56,
        "author": "Brig Wethey",
        "categoryName": "Technology",
        "sale": null,
        "tag": null,
        "in_stock": false,
        "cover": "http://dummyimage.com/700x1220.png/ff4444/ffffff",
        "description": "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.",
        "product_information": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum.",
        "other_details": null,
        "similar": []
    }
    ```

- **A short books data (*similar books*)**
    ```json
    {
        "id": 1,
        "title": "Venus Beauty Institute (Vénus beauté)",
        "author": "Brig Wethey",
        "cover": "http://dummyimage.com/700x1220.png/ff4444/ffffff"
    }
    ```

- **A category**
    ```json
    {
        "id": 1,
        "title": "Health Care",
        "parent": "fiction"
    }
    ```
