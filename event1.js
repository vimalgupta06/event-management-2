document.addEventListener("DOMContentLoaded", () => {
    const eventForm = document.getElementById("eventForm");
    const eventList = document.getElementById("eventList");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
  
    // Add event
    eventForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const eventName = document.getElementById("eventName").value;
      const eventDate = document.getElementById("eventDate").value;
      const eventLocation = document.getElementById("eventLocation").value;
      const eventCategory = document.getElementById("eventCategory").value;
      const eventCapacity = document.getElementById("eventCapacity").value;
      const eventDescription = document.getElementById("eventDescription").value;
      const eventImageInput = document.getElementById("eventImage");
  
      const eventItem = document.createElement("div");
      eventItem.className = "event-item";
  
      let eventImageURL = "";
      if (eventImageInput.files && eventImageInput.files[0]) {
        const fileReader = new FileReader();
        fileReader.onload = function (e) {
          eventImageURL = e.target.result;
          eventItem.innerHTML = `
            <h3>${eventName}</h3>
            <p>Date: ${eventDate}</p>
            <p>Location: ${eventLocation}</p>
            <p>Category: ${eventCategory}</p>
            <p>Capacity: ${eventCapacity}</p>
            <p>Description: ${eventDescription}</p>
            <img src="${eventImageURL}" alt="${eventName} Image" />
          `;
          eventList.appendChild(eventItem);
        };
        fileReader.readAsDataURL(eventImageInput.files[0]);
      } else {
        eventItem.innerHTML = `
          <h3>${eventName}</h3>
          <p>Date: ${eventDate}</p>
          <p>Location: ${eventLocation}</p>
          <p>Category: ${eventCategory}</p>
          <p>Capacity: ${eventCapacity}</p>
          <p>Description: ${eventDescription}</p>
        `;
        eventList.appendChild(eventItem);
      }
  
      eventForm.reset();
    });
  
    // Updated search functionality
    searchButton.addEventListener("click", () => {
      const searchTerm = searchInput.value.toLowerCase().trim();
      const events = document.querySelectorAll(".event-item");
  
      // If search term is empty, reset visibility for all events
      if (searchTerm === "") {
        events.forEach((event) => {
          event.style.display = "block";
        });
        return;
      }
  
      // Filter events based on the search term
      let hasMatches = false;
      events.forEach((event) => {
        const eventName = event.querySelector("h3").textContent.toLowerCase();
        if (eventName.includes(searchTerm)) {
          event.style.display = "block";
          hasMatches = true;
        } else {
          event.style.display = "none";
        }
      });
  
      if (!hasMatches) {
        alert("No events found matching your search!");
      }
    });
  });
  