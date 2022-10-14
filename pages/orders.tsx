import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import useSWR from 'swr';

type Order = {
  id: string;
  name: string;
  amount: string;
  price: string;
};

type Orders = {
  user: {
    id: string;
    name: string;
    city: string;
    postal: string;
  };
  orderItems: Order[];
};

type OrdersPageProps = {
  orders: Orders[];
};

const OrdersPage = ({ orders: initialOrders }: OrdersPageProps) => {
  const [orders, setOrders] = useState(initialOrders);

  const fetchOrders = async (url: string) => {
    const response = await fetch(url);
    const data: { orders: Orders } = await response.json();

    const orders = Object.values(data);

    setOrders(orders);

    return orders;
  };

  const { data: ordersList, error } = useSWR(
    'https://react-http-be6eb-default-rtdb.firebaseio.com/orders.json',
    fetchOrders
  );

  if (error) {
    return <p>Failed to load orders.</p>;
  }

  if (!ordersList && !orders) {
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

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    'https://react-http-be6eb-default-rtdb.firebaseio.com/orders.json'
  );
  const data = await response.json();
  const orders = Object.values(data);

  return {
    props: {
      orders,
    },
  };
};
