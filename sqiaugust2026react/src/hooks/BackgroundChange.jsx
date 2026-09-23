import React, { useState } from "react";

const BackgroundChange = () => {
  const [count, setCount] = useState(0);

  let [dark, setDark] = useState(false);

  const theme = ()=>{
    if(dark){
        document.body.style.backgroundColor = 'white';
    }
    else{
        document.body.style.backgroundColor = 'black';
        // document.head.style.backgroundColor = 'black'
    };

    setDark(!dark);

  }
};

export default BackgroundChange;