import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const OrdersPage = () => {
  // const [orders, setOrders] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // const getOrders = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(
  //       'https://react-http-be6eb-default-rtdb.firebaseio.com/orders.json'
  //     );

  //     if (!response.ok) {
  //       throw new Error('Something went wrong!');
  //     }

  //     const data = await response.json();
  //     const orders = Object.values(data);
  //     setOrders(orders);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getOrders();
  // }, []);

  const fetchOrders = async () => {
    const response = await fetch(
      'https://react-http-be6eb-default-rtdb.firebaseio.com/orders.json'
    );
    const data = await response.json();
    const orders = Object.values(data);
    return orders;
  };

  const { data: orders, error } = useSWR(
    'https://react-http-be6eb-default-rtdb.firebaseio.com/orders.json',
    fetchOrders
  );

  if (error) {
    return <p>Failed to load orders.</p>;
  }

  if (!orders) {
    return <p>Loading...</p>;
  }

  if (!orders?.length) {
    return <p>No Orders found</p>;
  }

  return (
    <ul>
      {orders.map(({ user, orderItems }, index) => (
        <li key={index}>
          <div className='user'>
            <h4>User: {user.name}</h4>
          </div>
          <div className='orders'>
            <ul>
              {orderItems.map(({ id, name, price, amount }) => (
                <li key={id}>
                  <p>Product: {name}</p>
                  <p>Price: {price}</p>
                  <p>Amount: {amount}</p>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default OrdersPage;
