
import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  // -------------------------------------------------
  // 1. GET – load items when the component mounts
  // -------------------------------------------------
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((data) => setItems(data));
  }, []);

  // -------------------------------------------------
  // 2. CREATE – callback for ItemForm
  // -------------------------------------------------
  function handleAddItem(newItem) {
    setItems((prev) => [...prev, newItem]);
  }

  // -------------------------------------------------
  // 3. UPDATE – callback for Item (toggle cart)
  // -------------------------------------------------
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((i) =>
      i.id === updatedItem.id ? updatedItem : i
    );
    setItems(updatedItems);
  }

  // -------------------------------------------------
  // 4. DELETE – callback for Item
  // -------------------------------------------------
  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((i) => i.id !== deletedItem.id);
    setItems(updatedItems);
  }

  // -------------------------------------------------
  // Filtering logic (unchanged from starter)
  // -------------------------------------------------
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  // -------------------------------------------------
  // Render
  // -------------------------------------------------
  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;