
class Order { //defining the class orders
    constructor(itemName, itemPrice, itemId, itemQty, userId, userName, orderId, orderTotal) 
    {  
        this.itemName = itemName,
        this.itemPrice = itemPrice,
        this.itemId = itemId,
        this.itemQty = itemQty,
        this.userId = userId,
        this.userName = userName,
        this.orderId = orderId,
        this.orderTotal = orderTotal
    }
}

//Check if there is any order in the local storage
let orders = []
let currentCart = []
let currentUser = []

function loadOrders (){
    if (localStorage.getItem('orders') === null) {
        //In case there is none, set an empty array
        orders = [];
} else {
    orders = JSON.parse(localStorage.getItem ('orders'));

    //for each order, add a new object to the user class with each of the atributes defined
        for (let i = 0; i < orders.length; i++) {
        orders[i] = new Order(orders[i].itemName, orders[i].itemPrice, orders[i].itemId, orders[i].itemQty, 
            orders[i].userId, orders[i].userName, orders[i].orderId, orders[i].orderTotal);
        }
    }
}

function userOrder (){
    
    currentUser = JSON.parse(localStorage.getItem('users'));
    currentCart = JSON.parse(localStorage.getItem('cart'));
    console.log(currentUser)

    
    for(let i = 0; i < currentUser.length; i++) {
        // check whoch user is logged in
        if(currentUser[i].logged == 1 ) {
            for(let x = 0 ; x < currentCart.length; x++){

                //Calculate the total of the line
                let qty = currentCart[x].price * currentCart[x].quantity;
                
                //Calculate a random Id
                let newId = Date.now()+Math.floor(Math.random() * 101);
                  
                    orders.push(new Order(currentCart[x].name, currentCart[x].price, currentCart[x].id, currentCart[x].quantity, 
                        currentUser[i].email, currentUser[i].firstname+' ' + currentUser[i].lastname, newId, qty));
                //Update the value of orders in the local storage
                localStorage.setItem('order', JSON.stringify(orders));
            }     
           
        }    
          
    }
          
}
userOrder ()
loadOrders()

function getOrders (){
    orders = JSON.parse(localStorage.getItem ('orders'));
    return orders
}

/**
 * ORDER VIEW
 */

// generateShopDOM is a function that generates the DOM (Shop) structure

const generateOrderDOM = () => {
    const orderCatalog = document.getElementById('order-lines') //the variable productCatalog will get elements 
    //from the list of xperiences we have in products.js
    const currentOrders = getOrders() //Here we get only the products that belong to the city we have selected
    console.log(currentOrders)
    var html = ''

    currentOrders.forEach((item) => {
        html += item.renderHTML() //for each product this line will generate an HTML page
    })

    orderCatalog.innerHTML = html //Required to change the HTML in each product page
}

// Invoke the generateShopDOM() function to render the DOM
generateOrderDOM()



      

