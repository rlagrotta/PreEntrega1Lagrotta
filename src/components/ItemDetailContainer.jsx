import React, { useEffect, useState } from 'react';
import ItemDetail from './ItemDetail';
import { getOneProduct } from "../mock/data";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {
  const { id } = useParams();

  const [item, setItem] = useState(null); // Inicializado como null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onAdd = (cantidad) => {
    alert(`Agregaste al carrito ${cantidad} de productos`);
  };

  useEffect(() => {
    // Llama a la función para obtener el producto por ID
    setLoading(true); // Reinicia el estado de carga para cada cambio de ID
    getOneProduct(id)
      .then((product) => {
        setItem(product); // Asigna el producto al estado
        setLoading(false); // Cambia el estado de carga
        console.log("Producto obtenido:", product); // Depura el producto
      })
      .catch((err) => {
        setError(err.message); // Maneja errores
        setLoading(false);
      });
  }, [id]); // Se ejecutará cada vez que cambie el ID

  if (loading) {
    return <p style={{ textAlign: "center" }}>Cargando producto...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return item ? (
    <ItemDetail onAdd={onAdd} item={item} />
  ) : (
    <p>No se encontró el producto.</p>
  );
};

export default ItemDetailContainer;
