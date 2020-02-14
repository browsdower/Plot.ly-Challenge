function buildCharts(samples) {
//     // Make an API call to gather all data and then reduce to matching the sample selected
//     //TODO: 
    d3.json("samples.json").then(function(data) {

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

      console.log(`OTU IDS: ${OTU_id}`)


      // get the top 10 labels for the plot
      var labels = samples.otu_labels.slice(0, 10);

    //   console.log(`Sample Values: ${samplevalues}`)
    //   console.log(`Id Values: ${OTU_top}`)
      // create trace variable for the plot
      var trace = {
          x: samplevalues,
          y: OTU_id,
          text: labels,
          marker: {
            color: 'rgb(142,124,195)'},
          type:"bar",
          orientation: "h",
      };

      // create data variable
      var data = [trace];

      // create layout variable to set plots layout
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

      // create the bar plot
      Plotly.newPlot("bar", data, layout);

      var sample_data = otu_ids.map( (x, i) => {
        return {"otu_ids": x, "otu_labels": otu_labels[i], "sample_values": sample_values[i]}        
      });
  
      sample_data = sample_data.sort(function(a, b) {
        return b.sample_values - a.sample_values;
      });
  
      sample_data = sample_data.slice(0, 10);
  
      var trace2 = {
        labels: sample_data.map(row => row.otu_ids),
        values: sample_data.map(row => row.sample_values),
        hovertext: sample_data.map(row => row.otu_labels),
        type: 'bar'
      };
  
      var data2 = [trace2];
  
      Plotly.newPlot("bar", data2);
  
    });
  }

function buildMetadata(sample) {
    // Make an API call to gather all data and then reduce to matching the sample selected
    //TODO: 
    d3.json("samples.json").then(function(data) {
    /// get the metadata info for the demographic panel
    var metadata = data.metadata;

    console.log(metadata)

    // filter meta data info by id
    var result = metadata.filter(meta => meta.id.toString() === id)[0];

    // select demographic panel to put data
    var demographicInfo = d3.select("#sample-metadata");
    
    // empty the demographic info panel each time before getting new id info
    demographicInfo.html("");

    // grab the necessary demographic data data for the id and append the info to the panel
    Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
    });
});
}

function init() {
    
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
    


    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text("BB_" + sample)
          .property("value", sample);

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
  
  
function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
      }
  
  // Initialize the dashboard
  // init();