function buildCharts(sample) {
    // Make an API call to gather all data and then reduce to matching the sample selected
    //TODO: 

};

function buildMetadata(sample) {
    // Make an API call to gather all data and then reduce to matching the sample selected
    //TODO: 

};

function init() {
    
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
    
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
      
      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);

      // Loop through sampleNames to add "option" elements to the selector
      //TODO: 


    });
  }
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initialize the dashboard
  init();