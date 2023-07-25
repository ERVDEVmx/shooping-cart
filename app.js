const { useState } = React;

// simulate getting products from DataBase
const products = [
  { id: 1, name: "Apples_:", country: "Italy", cost: 3, instock: 10 },
  { id: 2, name: "Oranges:", country: "Spain", cost: 4, instock: 3 },
  { id: 3, name: "Beans__:", country: "USA", cost: 2, instock: 5 },
  { id: 4, name: "Cabbage:", country: "USA", cost: 1, instock: 8 },
];

// A function that simulates getting data from a database
const getProducts = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(products), 1000);
  });
}

function App() {
  const [productList, setProductList] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = product => {
    setCart([...cart, product]);
    const updatedList = productList.map(item =>
      item.id === product.id
        ? { ...item, instock: item.instock - 1 }
        : item
    );
    setProductList(updatedList);
  };

  const restockProducts = async () => {
    const data = await getProducts();
    setProductList(data);
  };

  const handlePayment = () => {
    const confirmation = window.confirm(`Total cost is ${getTotalCost()}. Proceed?`);
    if (confirmation) {
      alert('Your purchase was successful!');
      setCart([]);
    }
  };

  const getTotalCost = () => {
    return cart.reduce((totalCost, item) => totalCost + item.cost, 0);
  };

  useState(() => {
    restockProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {productList.map(product => (
        <div key={product.id}>
          <p>Name: {product.name}</p>
          <p>Country: {product.country}</p>
          <p>Cost: {product.cost}</p>
          <p>Stock: {product.instock}</p>
          <button onClick={() => addToCart(product)} disabled={product.instock === 0}>
            Add to Cart
          </button>
        </div>
      ))}

      <h2>Cart</h2>
      {cart.map((product, index) => (
        <div key={index}>
          <p>Name: {product.name}</p>
          <p>Country: {product.country}</p>
          <p>Cost: {product.cost}</p>
        </div>
      ))}

      <h3>Total Cost: {getTotalCost()}</h3>

      <button onClick={handlePayment}>Pay</button>
      <button onClick={restockProducts}>Restock Products</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));