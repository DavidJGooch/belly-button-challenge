const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

//get sample #1 from dropdown for graphing
function indata() {
    d3.json(url).then(function(data) {
        console.log(data);
        let datanames = data.names;
        let selector = d3.select('#selectDataset')
        for (let i = 0; i < names.length; i++) {
            selector.append('option').text(datanames[i]).property('value', datanames[i]);
        }
        let Sampleone = names[0];
        charts(Sampleone)
        chartsinfo(Sampleone)
    });
}

//create charts
function charts(samplecharts) {
    // read in json data
    d3.json(url).then(function(data) {
        let samplesdata = data.samples.filter(i => i.id == samplecharts)
        let thisSample = samplesdata[0]
        let otuids = thisSample.otuids;
        let frmtdotuids = otuids.map(i => `OTU ${i}`).slice(0,10).reverse()
            console.log(frmtdotuids)
        let outnames = thisSample.outnames;
        let samplevalues = thisSample.samplevalues;
            console.log(samplevalues)
        let samplevaluestop10 = thisSample.samplevalues.slice(0,10).reverse();
            console.log(samplevaluestop10);
        let barchdata = [{
            x: samplevaluestop10,
            y: frmtdotuids,
            text: outnames,
            type: 'bar',
            orientation: 'h' 
        }];
        let barchlayout = {
            hovermode: 'closest',
            height: 600,
            width: 400}

        Plotly.newPlot("bar", barchdata, barchlayout);
        let bubblechdata = [{
            x: otuids,
            y: samplevalues,
            text: outnames,
            mode: 'markers',
            marker: {
                color: otuids,
                size: samplevalues,
                colorscale: 'Earth'}
              }];
        let bubblechlayout = {
            height: 500,
            width: 1000,
            xaxis: {title: {text: 'OTU ID'}}
        }
        Plotly.newPlot("bubble", bubblechdata, bubblechlayout)
    })
};

function demoInfo(samplecharts) {
    d3.json(url).then(function(data) {
      let metadata = data.metadata;
      let datalist = metadata.filter(i => i.id == samplecharts)
      let thisdata = datalist[0]
          console.log(thisdata)
      let metadataBox = d3.select("#sample-metadata")
      metadataBox.html("")
      Object.entries(thisdata).forEach(([key,value]) => {
          metadataBox.append("h6").text(key + ": " + value)
      });
  })
  }

  function optochange(samplecharts){
    charts(samplecharts)
    demoInfo(samplecharts)
  };

  indata();