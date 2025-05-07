document.addEventListener("DOMContentLoaded", function () {
  let coins = localStorage.getItem("coins")
    ? parseInt(localStorage.getItem("coins"))
    : 0;
  let purchasedItems = localStorage.getItem("purchasedItems")
    ? localStorage.getItem("purchasedItems").split(",")
    : [];

  const taskInput = document.getElementById("task-input");
  const addButton = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");
  const coinCount = document.getElementById("coin-count");
  const feedSection = document.getElementById("feed");
  const notificationBox = document.getElementById("notification-box");
  const inventoryList = document.getElementById("inventory-list");
  const hungerBar = document.getElementById("hunger-bar");
  const feedButton = document.getElementById("feed-btn");
  const characterImage = document.getElementById("character-image");
  const toggleButton = document.querySelector(".togglebutton");
  const regularTasksSelect = document.getElementById("regular-tasks");
  const customTaskInput = document.getElementById("custom-task-input");
  const addCustomTaskBtn = document.getElementById("add-custom-task-btn");
  const removeCustomTaskBtn = document.getElementById("remove-custom-task-btn");
  const buyButtons = document.querySelectorAll(".buy"); // Added selector for buy buttons

  coinCount.textContent = coins;

  const coinValues = {
    easy: 20,
    medium: 40,
    hard: 60,
  };

  function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.classList.add("notification", type);
    notification.textContent = message;
    notificationBox.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }

  // Load custom tasks from localStorage
  const savedTasks = localStorage.getItem("customTasks");
  if (savedTasks) {
    JSON.parse(savedTasks).forEach((task) => {
      const option = document.createElement("option");
      option.value = task;
      option.textContent = task;
      regularTasksSelect.appendChild(option);
    });
  }

  // Handle custom task addition
  if (addCustomTaskBtn && customTaskInput) {
    addCustomTaskBtn.addEventListener("click", function () {
      const customTask = customTaskInput.value.trim();

      if (customTask) {
        const option = document.createElement("option");
        option.value = customTask;
        option.textContent = customTask;
        regularTasksSelect.appendChild(option);

        let savedTasks = localStorage.getItem("customTasks");
        savedTasks = savedTasks ? JSON.parse(savedTasks) : [];
        savedTasks.push(customTask);
        localStorage.setItem("customTasks", JSON.stringify(savedTasks));

        customTaskInput.value = "";
        showNotification(`Added "${customTask}" to task list.`, "success");
      } else {
        showNotification("Please enter a custom task name!", "warning");
      }
    });
  }

  // Handle custom task removal
  if (removeCustomTaskBtn && regularTasksSelect) {
    removeCustomTaskBtn.addEventListener("click", function () {
      const selectedOption = regularTasksSelect.options[regularTasksSelect.selectedIndex];
      if (!selectedOption) return;

      const taskToRemove = selectedOption.value;
      let savedTasks = localStorage.getItem("customTasks");
      savedTasks = savedTasks ? JSON.parse(savedTasks) : [];

      if (savedTasks.includes(taskToRemove)) {
        // Update localStorage
        savedTasks = savedTasks.filter(task => task !== taskToRemove);
        localStorage.setItem("customTasks", JSON.stringify(savedTasks));

        // Remove option from dropdown
        regularTasksSelect.removeChild(selectedOption);
        showNotification(`Removed "${taskToRemove}" from task list.`, "success");
      } else {
        showNotification(`"${taskToRemove}" is not a removable custom task.`, "warning");
      }
    });
  }

  if (addButton && taskInput) {
    addButton.addEventListener("click", function () {
      const task = taskInput.value.trim();
      const difficulty = document.getElementById("difficulty").value;

      if (task) {
        const li = document.createElement("li");
        li.textContent = `${task} - Difficulty: ${difficulty}`;

        li.addEventListener("click", function () {
          coins += coinValues[difficulty];
          localStorage.setItem("coins", coins);
          coinCount.textContent = coins;
          li.remove();
          showNotification(
            `Task completed! You earned ${coinValues[difficulty]} coins.`,
            "success"
          );
        });

        taskList.appendChild(li);
        taskInput.value = "";
      } else {
        showNotification("Please enter a task!", "warning");
      }
    });

    taskInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        addButton.click();
      }
    });
  }

  function updateFeed() {
    if (!inventoryList) return;
    
    inventoryList.innerHTML = "";
    if (purchasedItems.length === 0 || purchasedItems[0] === "") {
      inventoryList.innerHTML = "<p>You haven't bought anything yet!</p>";
    } else {
      purchasedItems.forEach((item) => {
        const invItem = document.createElement("li");
        let parts = item.split(":");
        let productName = parts[0];
        let hungerValue = parts[1];
        invItem.textContent = `${productName} (Restores ${hungerValue} Hunger)`;
        inventoryList.appendChild(invItem);
      });
    }
  }

  let hunger = localStorage.getItem("hunger")
    ? parseInt(localStorage.getItem("hunger"))
    : 100;

  let isToggled = toggleButton ? toggleButton.checked : false;

  if (toggleButton) {
    toggleButton.addEventListener("change", function () {
      isToggled = toggleButton.checked;
      updateHungerDisplay();
    });
  }

  function updateHungerDisplay() {
    if (!hungerBar || !characterImage) return;
    
    hungerBar.style.width = hunger + "%";
    hungerBar.textContent = hunger + "%";
    updateCharacterImage(hunger);
    localStorage.setItem("hunger", hunger);
  }

  function updateCharacterImage(hungerValue) {
    if (!characterImage) return;
    
    let basePath = isToggled ? "assets/" : "assets2/";
    let imageSrc = "";

    if (hungerValue >= 95) {
      imageSrc = "95.jpeg";
    } else if (hungerValue >= 90) {
      imageSrc = "90.jpeg";
    } else if (hungerValue >= 85) {
      imageSrc = "85.jpeg";
    } else if (hungerValue >= 80) {
      imageSrc = "80.jpeg";
    } else if (hungerValue >= 75) {
      imageSrc = "75.jpeg";
    } else if (hungerValue >= 70) {
      imageSrc = "70.jpeg";
    } else if (hungerValue >= 65) {
      imageSrc = "65.jpeg";
    } else if (hungerValue >= 60) {
      imageSrc = "60.jpeg";
    } else if (hungerValue >= 55) {
      imageSrc = "55.jpeg";
    } else if (hungerValue >= 50) {
      imageSrc = "50.jpeg";
    } else if (hungerValue >= 45) {
      imageSrc = "45.jpeg";
    } else if (hungerValue >= 40) {
      imageSrc = "40.jpeg";
    } else if (hungerValue >= 35) {
      imageSrc = "35.jpeg";
    } else if (hungerValue >= 30) {
      imageSrc = "30.jpeg";
    } else if (hungerValue >= 25) {
      imageSrc = "25.jpeg";
    } else if (hungerValue >= 20) {
      imageSrc = "20.jpeg";
    } else if (hungerValue >= 15) {
      imageSrc = "15.jpeg";
    } else if (hungerValue >= 10) {
      imageSrc = "10.jpeg";
    } else {
      imageSrc = "5.jpeg";
    }

    characterImage.src = basePath + imageSrc;
  }

  if (feedButton) {
    feedButton.addEventListener("click", function () {
      if (purchasedItems.length > 0) {
        let foodItem = purchasedItems.shift();
        localStorage.setItem("purchasedItems", purchasedItems.join(","));
        updateFeed();

        let parts = foodItem.split(":");
        let productName = parts[0];
        let hungerValue = parseInt(parts[1]);

        hunger = Math.min(hunger + hungerValue, 100);
        updateHungerDisplay();

        showNotification(
          `Fed with ${productName}, restored ${hungerValue} hunger!`,
          "success"
        );
      } else {
        showNotification("No food items in inventory!", "warning");
      }
    });
  }

  // Add event listeners to buy buttons
  if (buyButtons) {
    buyButtons.forEach(button => {
      button.addEventListener("click", function() {
        const productName = this.getAttribute("data-name");
        const price = parseInt(this.getAttribute("data-price"));
        const hungerValue = parseInt(this.getAttribute("data-hunger"));
        
        if (coins >= price) {
          coins -= price;
          purchasedItems.push(productName + ":" + hungerValue);
          localStorage.setItem("coins", coins);
          localStorage.setItem("purchasedItems", purchasedItems.join(","));
          coinCount.textContent = coins;
          updateFeed();
          showNotification(`Successfully Bought ${productName}!`, "success");
        } else {
          showNotification("Not enough coins! Get back to tasks!", "error");
        }
      });
    });
  }

  setInterval(() => {
    if (hunger > 0) {
      hunger = Math.max(hunger - 1, 0);
      updateHungerDisplay();
    }
  }, 35000);

  updateHungerDisplay();
  updateFeed();

  const links = document.querySelectorAll(".nav-left .nav-item");
  const sections = document.querySelectorAll("section");

  if (links) {
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        sections.forEach((section) => section.classList.remove("active"));
        const target = link.getAttribute("href").substring(1);
        document.getElementById(target).classList.add("active");
      });
    });
  }

  // Add selected task from dropdown to task list
  if (regularTasksSelect) {
    regularTasksSelect.addEventListener("change", function () {
      const selectedTask = this.value;
      if (!selectedTask) return;
      
      const difficulty = document.getElementById("difficulty").value;

      const li = document.createElement("li");
      li.textContent = `${selectedTask} - Difficulty: ${difficulty}`;

      li.addEventListener("click", function () {
        coins += coinValues[difficulty];
        localStorage.setItem("coins", coins);
        coinCount.textContent = coins;
        li.remove();
        showNotification(
          `Task completed! You earned ${coinValues[difficulty]} coins.`,
          "success"
        );
      });
  
      taskList.appendChild(li);
      this.value = ""; // Reset dropdown after adding
    });
  }
});