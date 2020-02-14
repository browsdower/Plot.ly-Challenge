function buildCharts(samples) {
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
  
  function buildCharts(sample) {
  
    // @TODO: Use `d3.json` to fetch the sample data for the plots
    
    d3.json("samples.json").then(function(data) {
  
      // @TODO: Build a Bubble Chart using the sample data
      var x_values = data.otu_ids;
      var y_values = data.sample_values;
      var m_size = data.sample_values;
      var m_colors = data.otu_ids; 
      var t_values = data.otu_labels;
  
      var trace1 = {
        x: x_values,
        y: y_values,
        text: t_values,
        mode: 'markers',
        marker: {
          color: m_colors,
          size: m_size
        } 
      };
    
      var data = [trace1];
  
      var layout = {
        xaxis: { title: "OTU ID"},
      };
  
      Plotly.newPlot('bubble', data, layout);
     
  
      // @TODO: Build a Pie Chart
    //   d3.json("samples.json").then(function(data) {  
    //   var pie_values = data.sample_values.slice(0,10);
    //     var pie_labels = data.otu_ids.slice(0,10);
    //     var pie_hover = data.otu_labels.slice(0,10);
  
    //     var data = [{
    //       values: pie_values,
    //       labels: pie_labels,
    //       hovertext: pie_hover,
    //       type: 'pie'
    //     }];
  
    //     Plotly.newPlot('pie', data);
  
    //   });
    });   
  }
  
  function buildMetadata(sample) {
    //This function will build the metadata panel
      
    // Use `d3.json` to fetch the metadata for a sample
    d3.json("samples.json").then(function(data) {
    //  get Wash Frequency (Scrubs Per week) for gauge plot
       
  
    // display the metadata in html:
        data=Object.entries(sample)
        selector=d3.select("#sample-metadata")
        selector.html("")
        selector.append('br')  
        data.forEach(function([key,value]){
                          selector.append('p')
                                  .text(`${key}:  ${value}`)})
      // BONUS: Build the Gauge Chart
    //   buildGauge(WFREQ_value);
  })}
  
  function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then(function(data) {
    var sampleNames = data.names;

      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initialize the dashboard
  init();