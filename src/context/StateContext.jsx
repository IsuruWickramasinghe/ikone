import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { auth, db } from '../config/firebase';

import { doc, getDoc, getDocs, setDoc, collection } from 'firebase/firestore';

const Context = createContext();

export const StateContext = ({ children }) => {

  const [selectedQuantities, setSelectedQuantities] = useState(1);
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : []
  });
  const [totalPrice, setTotalPrice] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem('totalPrice') !== null ? JSON.parse(localStorage.getItem('totalPrice')) : 0
  });
  const [totalQuantities, setTotalQuantities] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem('totalQuantities') !== null ? JSON.parse(localStorage.getItem('totalQuantities')) : 0
  });

  const [user, setUser] = useState(null);
  const [userFormData, setUserFormData] = useState({});
  const [userAddressForm,setUserAddressFrom] = useState({});
  const [userOrderHistory,setUserOrderHistory] = useState([])
  const [selectedSize,setSelectedSize] = useState('')

  let foundProduct;


  // handle user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        getUserData(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);
  // get user data
  const getUserData = async (currentUser) => {
    try {

      // user order history
      const userOrdersSheet = [];
      const getDataUserOrderHistory = await getDocs(collection(db, 'ikoneUsers', currentUser.uid, 'userPurchases'));
      getDataUserOrderHistory.forEach((userOrderDoc)=>{
        userOrdersSheet.push({
          id: userOrderDoc.id,
          data: userOrderDoc.data()
        })
      })
      setUserOrderHistory(userOrdersSheet);

      // user data
      const getDataSnap = await getDoc(doc(db, 'ikoneUsers', currentUser.uid));
      if (getDataSnap.exists()) {
        setUserFormData(getDataSnap.data());
      }
  
      // user address
      const getAddressSnap = await getDoc(doc(db, 'ikoneUsersAddress', currentUser.uid));
      if (getAddressSnap.exists()) {
        setUserAddressFrom(getAddressSnap.data());
      }

    } catch (error) {
      console.log(error)
    }
  };
  
  // update user data
  const handleUserData = async (e) => {
    e.preventDefault();
    const dataSnap = {};
    const userFormDoc = document.querySelector('#userDocForm');
    const userFormDocs = userFormDoc.querySelectorAll('input');
    userFormDocs.forEach((docUserForm) => {
      dataSnap[docUserForm.name] = docUserForm.value;
    });
    setUserFormData(dataSnap);
    try {
      await setDoc(doc(db, 'ikoneUsers', user.uid), dataSnap);
      toast.success('Details Successfully Saved!');
    } catch (error) {
      console.log(error);
      toast.error('Check again');
    }
  };
  // update user address
  const handleUserAddress = async (e) => {
    e.preventDefault();
    const dataSnap = {};
    const userFormDoc = document.querySelector('#userAddressForm');
    const userFormDocs = userFormDoc.querySelectorAll('input');
    userFormDocs.forEach((docUserForm) => {
      dataSnap[docUserForm.name] = docUserForm.value;
    });
    setUserAddressFrom(dataSnap);
    try {
      await setDoc(doc(db, 'ikoneUsersAddress', user.uid), dataSnap);
      toast.success('Address Successfully Saved!');
    } catch (error) {
      console.log(error);
      toast.error('Check again');
    }
  }
  // update user purchase history
  const handleUserPurchaseHistory = async () => {
    if(user){
      if(cartItems != []){
        try {
          const updatePromises = cartItems.map(async (cartProduct) => {
            await setDoc(doc(collection(db, 'ikoneUsers', user.uid, 'userPurchases')), {
              productName: cartProduct.slug.current,
              productImages: cartProduct.image[0],
              productPrice: cartProduct.price,
              productSize: JSON.stringify(cartProduct.selectedSizeAndQuantities),
              isOrderShipped: false,
              isOrderCompleted: false,
            });
          });
      
          await Promise.all(updatePromises);
  
          localStorage.clear();
          setCartItems([]);
          setTotalPrice(0);
          setTotalQuantities(0);
  
          toast.success('User purchase history updated')
        } catch (error) {
          console.log('Error updating user purchase history:', error);
        }
      }
    }
  };

  // Add to cart or update cart
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          const isSelectedSizeExists = cartProduct.selectedSizeAndQuantities.find(
            (sizeObj) => sizeObj.size === selectedSize
          );
          if (isSelectedSizeExists) {
            isSelectedSizeExists.quantity += quantity;
          } else {
            cartProduct.selectedSizeAndQuantities.push({ size: selectedSize, quantity: quantity });
          }
          cartProduct.quantity += quantity;
        }
        return cartProduct;
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      product.selectedSizeAndQuantities = [{ size: selectedSize, quantity: quantity }];
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${selectedQuantities} ${product.name} added to the cart.`);
    
    
  };

  // remove item from cart
  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
    toast.success(`${product.name} Removed`)
  }

  // set local storage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', totalPrice);
    localStorage.setItem('totalQuantities', totalQuantities);
  }, [cartItems, totalPrice, totalQuantities]);

  // Quantities changers
  const changeQuantitiesMax = () => {
    setSelectedQuantities((prevSelectedQuantities) => prevSelectedQuantities + 1);
  };
  const changeQuantitiesMin = () => {
    setSelectedQuantities((prevSelectedQuantities) => {
      if (prevSelectedQuantities > 1) {
        return prevSelectedQuantities - 1;
      }
      return prevSelectedQuantities;
    });
  };

  // toggle cart item quantiity
  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)

    if(value === 'inc') {
      const updatedData = cartItems.map(item => (item._id === id ? { ...item, quantity: item.quantity + 1 } : item));
      setCartItems(updatedData);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        const updatedData = cartItems.map(item => (item._id === id ? { ...item, quantity: item.quantity - 1 } : item));
        setCartItems(updatedData);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }

  return (
    <Context.Provider
      value={{
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        selectedQuantities,
        changeQuantitiesMax,
        changeQuantitiesMin,
        onAdd,
        onRemove,
        toggleCartItemQuanitity,
        user,
        userFormData,
        userAddressForm,
        userOrderHistory,
        handleUserData,
        handleUserAddress,
        setUserOrderHistory,
        selectedSize,
        setSelectedSize,
        handleUserPurchaseHistory,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
