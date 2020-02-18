
function buildCharts(id) {
  // getting data from the json file
  d3.json("samples.json").then(function(data) {
      console.log(data)

      var wfreq = data.metadata.map(d => d.wfreq)
      console.log(`Washing Freq: ${wfreq}`)
      
      // filter for id 
      var samples = data.samples.filter(s => s.id.toString() === id)[0];
      
      console.log(samples);

      // find top 10 and sort
      var samplevalues = samples.sample_values.slice(0, 10).reverse();

      // set the chart by OTUs
      var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
      
      // set OTU ids
      var OTU_id = OTU_top.map(d => "OTU " + d)

      // get the top 10 labels
      var labels = samples.otu_labels.slice(0, 10);

    
      // create bar
      var trace = {
          x: samplevalues,
          y: OTU_id,
          text: labels,
          marker: {
            color: 'blue'},
          type:"bar",
          orientation: "h",
      };

      
      var data = [trace];

      // layout
      var layout = {
          title: "Top 10 Otu",
          yaxis:{
              tickmode:"linear",
          },
          margin: {
              l: 100,
              r: 100,
              t: 100,
              b: 30
          }
      };

      // create plot
      Plotly.newPlot("bar", data, layout);
    
      // create bubble
      var trace1 = {
          x: samples.otu_ids,
          y: samples.sample_values,
          mode: "markers",
          marker: {
              size: samples.sample_values,
              color: samples.otu_ids
          },
          text: samples.otu_labels

      };

      // layout
      var layout_bubble = {
          xaxis:{title: "Otu ID"},
          height: 600,
          width: 1000
      };

      
      var data = [trace1];

      // create plot
      Plotly.newPlot("bubble", data, layout_bubble); 

      
    });
}  

function buildMetadata(sample) {
  // API call for data
  d3.json("samples.json").then(function(data) {
      
      // set metadata
      var metadata = data.metadata;

      console.log(metadata)

      var panel = d3.select("#sample-metadata");
      
      panel.html("");

      // new panel set
      Object.entries(metadata).forEach((key) => {   
              panel.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
      });
  });
}

function init() {
  //Grab a reference to the dropdown select element
  var dropdown = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then(function(data) {
      console.log(data)

      // Use the first sample from the list to build the initial plots
      buildCharts(data.names[0]);
      buildMetadata(data.names[0]);

      // Loop through sampleNames to add "option" elements to the selector
      data.names.forEach(function(name) {
          dropdown.append("option").text(name).property("value");
      });

      
  });
}

// Fetch new data each time a new sample is selected
function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);
}
// Initialize the dashboard
init();