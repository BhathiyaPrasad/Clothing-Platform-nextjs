import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const orgDocId = "20240711-1011-SaluniFashion";
const orderItemsRef = collection(db, 'organizations', orgDocId, 'order_items');
const ordersRef = collection(db, 'organizations', orgDocId, 'orders');

let orderCounter = 0;
let currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');

const generateOrderId = () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  
  if (date !== currentDate) {
    currentDate = date;
    orderCounter = 0;
  }

  orderCounter += 1;
  const newOrderId = `OR-${date}-${orderCounter.toString().padStart(4, '0')}`;
  return newOrderId;
};

export const productOrder = async (cartItems) => {
  try {
    const orderId = generateOrderId();
    
    for (const item of cartItems) {
      await addDoc(orderItemsRef, {
        orderAutoID: "",
        orderID: orderId,
        lineOrder: 0,
        itemAutoID: item.Item_ID_Auto,
        itemID: item.Item_ID, // Assuming UUID is the item ID
        itemName: item.Item_Name,
        itemEngName: "", // Add the English name if available
        quantity: item.quantity,
        UUID: item.UUID,
        salePrice: item.Sales_Price,
        lineTotal: item.Sales_Price * item.quantity,
        remark: "",
        Deleted: 0
      });
      console.log('Order item added for item UUID:', item.UUID);
    }

    await addDoc(ordersRef, {
      orderAutoID: "", // Add appropriate auto ID if needed
      orderID: orderId,
      orderDate: new Date(),
      
    });
    
    console.log('Order added successfully with ID:', orderId);
  } catch (error) {
    console.error('Order item error:', error); // Log errors for debugging
  }

  console.log("Order processed", cartItems);
};


