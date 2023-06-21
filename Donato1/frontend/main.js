const dateElement = document.getElementsByClassName("date")[0];
const btn = document.getElementsByClassName("dateBtn")[0];

const showDate = async() => {
  const response = await fetch(`http://localhost:3000/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"      
        }
   });
   const data = await response.json();
   alert(data.msg)
}

btn.addEventListener("click", e => showDate());