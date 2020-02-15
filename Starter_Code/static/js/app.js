
function buildCharts(sample) {
  // getting data from the json file
  d3.json("samples.json").then(function(data) {
      console.log(data)

      var wfreq = data.metadata.map(d => d.wfreq)
      console.log(`Washing Freq: ${wfreq}`)
      
      // filter sample values by id 
      var samples = data.samples.filter(s => s.id.toString() === id)[0];
      
      console.log(samples);

      // Getting the top 10 
      var samplevalues = samples.sample_values.slice(0, 10).reverse();

      // get only top 10 otu ids for the plot OTU and reversing it. 
      var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
      
      // get the otu id's to the desired form for the plot
      var OTU_id = OTU_top.map(d => "OTU " + d)

      // get the top 10 labels for the plot
      var labels = samples.otu_labels.slice(0, 10);

    
      // create bar
      var trace = {
          x: samplevalues,
          y: OTU_id,
          text: labels,
          marker: {
            color: 'rgb(142,124,195)'},
          type:"bar",
          orientation: "h",
      };

      
      var data = [trace];

      // layout
      var layout = {
          title: "Top 10 OTU",
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
      var layout_b = {
          xaxis:{title: "OTU ID"},
          height: 600,
          width: 1000
      };

      
      var data1 = [trace1];

      // create plot
      Plotly.newPlot("bubble", data1, layout_b); 

      
    });
}  

function buildMetadata(sample) {
  // Make an API call to gather all data and then reduce to matching the sample selected
  d3.json("samples.json").then(function(data) {
      
      // get the info from metadata
      var metadata = data.metadata;

      console.log(metadata)

      // filter samples for id
      var result = metadata.filter(meta => meta.id.toString() === id)[0];

      var demoInfo = d3.select("#sample-metadata");
      
      demoInfo.html("");

      // refresh panel
      Object.entries(result).forEach((key) => {   
              demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
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