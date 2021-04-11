function dropdownmenu() {
    d3.json("samples.json").then(function (data) {

        var samples = data.names
        console.log(samples);
        var id = d3.select("#selDataset")
        samples.forEach(element => {
            id.append("option").text(element).property("value", element)

        });
        buildtable(samples[0])
    })
}


function buildtable(newid) {
    d3.json("samples.json").then(function (data) {

        var samples = data.metadata
        // console.log(samples);
        var id = d3.select("#sample-metadata")
        var filteredData = samples.filter(x => x.id == newid)[0];
        console.log(filteredData);

        id.html("")

        Object.entries(filteredData).forEach(([key, value]) => {
            var row = id.append("tr");
            row.append("td").html(key)
            row.append("td").html(value)
        });
    });
}
function charts() {
    d3.json("samples.json").then(function (data) {
        var ids = data.samples[0].otu_ids;
        var samples = data.samples[0].sample_values.slice(0,10);
        console.log(samples);

        var trace1 = {
            type: "bar",
            // name: "belly",
            x: samples,
            y: ids,
            orientation:"h"
        };

        var data1 = [trace1];

        var layout = {
            title: "Top 10 OTU",
            margin: { t: 100, l: 175, r:100, b:30 }
        };
        Plotly.newPlot("bar", data1, layout);
    })
    
};

function optionChanged(newid) {
    buildtable(newid)
    charts(newid)
}
dropdownmenu()
charts()

