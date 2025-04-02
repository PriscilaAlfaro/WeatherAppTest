import React, { useState } from "react";
import { Input, Button, FlexboxGrid, } from "rsuite";

const SearchBar = ({ onSearch, isMobile }) => {
  const [newCity, setNewCity] = useState("");

  const handleEvent = (event) => {
    if (event.type === "click" || (event.type === "keydown" && event.key === "Enter")) {
      onSearch(newCity); 
    }
  };
  return (
    <FlexboxGrid justify="center" 
      style={styles.flexBoxGrid(isMobile)}>
        <Input 
        value={newCity} 
        onChange={(value) => setNewCity(value)}
        placeholder="Enter a city..." 
        onKeyDown={handleEvent}
        style={styles.input(isMobile)} />
        <Button appearance="primary" onClick={handleEvent} 
        style={styles.button(isMobile)}>
            Search
        </Button>
    </FlexboxGrid>
  );
};

export default SearchBar;

const styles = {
  flexBoxGrid: (isMobile)=>({ 
    marginBottom: "2rem", 
    marginTop: "1rem", 
    display: isMobile ? "inline-grid" : "flex",
    heigh: "104px",
    justifyItems: "center",
    alignItems: "center",
  }),
  input: (isMobile)=>({  
    borderRadius: "29px", 
    marginBottom: isMobile ? "16px" : "0", 
    height: "44px",
    width: "302px",
    padding: "0",
    border: "0",
    paddingLeft: "15px",
  }),
  button: (isMobile)=>({ 
    borderRadius: "29px", 
    backgroundColor: "#1090DB",
    height: "44px",
    width: isMobile ? "302px" : "188px",
    marginLeft: isMobile ? 0 : "15px"
  }) 
}