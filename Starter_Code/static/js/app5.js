function buildCharts(sample) {
    d3.json("samples.json").then((data)=>{
        var washfreq = data.metadata.map(d => d.washfreq)
        console.log(`wash freq: ${washfreq}`)
        
        var sample_metadata = d3.select("#sample-metadata");

        

}