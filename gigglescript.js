document.addEventListener("DOMContentLoaded", function () {
  const previewContainer = document.getElementById("preview-container");
  const layerThumbnails = document.getElementById("layer-thumbnails");
  const resetButton = document.getElementById("reset-button");
  const downloadButton = document.getElementById("download-button");
  const randomizeButton = document.getElementById("randomize-button");

  // Sample data for layers (replace with your own)
  const layerGroups = [
    {
      name: "Bakgruond :",
      layers: [
        // { name: "Background 1", src: "background1.png" },
        { name: "Background 2", src: "background2.png" },
        { name: "Background 3", src: "background3.png" },
        { name: "Background 4", src: "background4.png" },
        { name: "Background 5", src: "background5.png" },
        { name: "Background 6", src: "background6.png" },
      ],
      zIndex: 1,
    },
    {
      name: "Bodie :",
      layers: [
        { name: "Body 1", src: "body1.png" },
        { name: "Body 2", src: "body2.png" },
        { name: "Body 3", src: "body3.png" },
        { name: "Body 4", src: "body4.png" },
        { name: "Body 5", src: "body5.png" },
        // { name: "Body 6", src: "body6.png" },
      ],
      zIndex: 2,
    },
    {
      name: "Glusses :",
      layers: [
        { name: "Glasses 1", src: "glasses1.png" },
        { name: "Glasses 2", src: "glasses2.png" },
      ],
      zIndex: 3,
    },
    {
      name: "Hat :",
      layers: [
        { name: "Hat 1", src: "hat.png" },
        { name: "Hat 2", src: "hat2.png" },
        { name: "Hat 3", src: "hat3.png" },
        { name: "Hat 4", src: "hat4.png" },
        { name: "Hat 5", src: "hat5.png" },
        { name: "Hat 6", src: "hat6.png" },
      ],
      zIndex: 4,
    },
    {
      name: "Mouoth :",
      layers: [
        { name: "Mouth 1", src: "mouth1.png" },
        { name: "Mouth 2", src: "mouth2.png" },
        { name: "Mouth 3", src: "mouth3.png" },
        { name: "Mouth 4", src: "mouth4.png" },
        // { name: "Mouth 5", src: "mouth5.png" },
        // { name: "Mouth 6", src: "mouth6.png" },
      ],
      zIndex: 5,
    },
  ];

  const selectedLayers = {}; // Object to store selected layers by category
  const selectedLayerElements = []; // Array to store references to selected layer elements

  // Populate layer thumbnails
  layerGroups.forEach((group) => {
    const groupDiv = document.createElement("div");
    groupDiv.innerHTML = `<h3>${group.name}</h3>`;
    group.layers.forEach((layer) => {
      const img = document.createElement("img");
      img.src = layer.src;
      img.alt = layer.name;
      img.classList.add("layer-thumbnail");
      img.addEventListener("click", () =>
        toggleLayer(layer, group.zIndex, group.name)
      );
      groupDiv.appendChild(img);
    });
    layerThumbnails.appendChild(groupDiv);
  });

  // Function to toggle layer visibility
  function toggleLayer(layer, zIndex, category) {
    const existingLayer = selectedLayers[category];

    // Remove the existing layer if it exists
    if (existingLayer) {
      previewContainer.removeChild(existingLayer);
      // Remove reference from selectedLayerElements array
      const index = selectedLayerElements.indexOf(existingLayer);
      if (index !== -1) {
        selectedLayerElements.splice(index, 1);
      }
    }

    // Add the clicked layer
    const img = document.createElement("img");
    img.src = layer.src;
    img.alt = layer.name;
    img.classList.add("preview-layer");
    img.style.zIndex = zIndex;
    previewContainer.appendChild(img);

    // Store the selected layer in the object and array
    selectedLayers[category] = img;
    selectedLayerElements.push(img);
  }

  // Event listener for reset button
  resetButton.addEventListener("click", () => {
    selectedLayerElements.forEach((element) => {
      previewContainer.removeChild(element);
    });
    // Clear the object storing selected layers
    for (const category in selectedLayers) {
      delete selectedLayers[category];
    }
    // Clear the array storing selected layer elements
    selectedLayerElements.length = 0;
  });

  // Event listener for download button
  downloadButton.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    canvas.width = previewContainer.offsetWidth;
    canvas.height = previewContainer.offsetHeight;
    const ctx = canvas.getContext("2d");

    // Draw all previewed layers onto the canvas
    selectedLayerElements.forEach((element) => {
      ctx.drawImage(element, 0, 0, canvas.width, canvas.height);
    });

    // Convert canvas to image data URL
    const dataURL = canvas.toDataURL("image/png");

    // Create download link
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "meme.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // Event listener for randomize button
  randomizeButton.addEventListener("click", () => {
    // Clear the existing selected layers
    selectedLayerElements.forEach((element) => {
      previewContainer.removeChild(element);
    });

    // Clear the object storing selected layers
    for (const category in selectedLayers) {
      delete selectedLayers[category];
    }

    // Clear the array storing selected layer elements
    selectedLayerElements.length = 0;

    // Randomly select one image from each layer category
    layerGroups.forEach((group) => {
      const randomIndex = Math.floor(Math.random() * group.layers.length);
      const randomLayer = group.layers[randomIndex];
      toggleLayer(randomLayer, group.zIndex, group.name);
    });
  });
});
