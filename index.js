function plotData(){
    Plotly.d3.csv('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni.csv', function(err, rows){

        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]; });
        }

        var allRegionNames = unpack(rows, 'denominazione_regione'),
            allDay = unpack(rows, 'data'),
            allRicoverati = unpack(rows, 'ricoverati_con_sintomi'),
            allTi = unpack(rows, 'terapia_intensiva'),
            allTo = unpack(rows, 'totale_ospedalizzati'),
            allIdom = unpack(rows, 'isolamento_domiciliare'),
            allAttPos = unpack(rows, 'totale_attualmente_positivi'),
            allNewPos = unpack(rows, 'nuovi_attualmente_positivi'),
            allDimGuariti = unpack(rows, 'dimessi_guariti'),
            allMorti = unpack(rows, 'deceduti'),
            allTotCasi = unpack(rows, 'totale_casi'),
            allTamponi = unpack(rows, 'tamponi'),

            listofRegions = [],
            currentCountry,
            currentGdp = [],
            currentYear = [];
            currTitle = 'Abruzzo';
            currallRicoverati = [];
            currallTi = [];
            currallTo = [];
            currallIdom = [];
            currallAttPos = [];
            currallNewPos = [];
            currallDimGuariti = [];
            currallMorti = [];
            currallTotCasi = [];
            currallTamponi = [];

        for (var i = 0; i < allRegionNames.length; i++ ){
            if (listofRegions.indexOf(allRegionNames[i]) === -1 ){
                listofRegions.push(allRegionNames[i]);
            }
        }

        function getRegionData(chosenCountry) {
            currTitle = chosenCountry;
            currentYear = [];
            currallRicoverati = [];
            currallTi = [];
            currallTo = [];
            currallIdom = [];
            currallAttPos = [];
            currallNewPos = [];
            currallDimGuariti = [];
            currallMorti = [];
            currallTotCasi = [];
            currallTamponi = [];

            for (var i = 0 ; i < allRegionNames.length ; i++){
                if ( allRegionNames[i] === chosenCountry ) {
                    currentYear.push(allDay[i]);
                    currallRicoverati.push(allRicoverati[i]);
                    currallTi.push(allTi[i]);
                    currallTo.push(allTo[i]);
                    currallIdom.push(allIdom[i]);
                    currallAttPos.push(allAttPos[i]);
                    currallNewPos.push(allNewPos[i]);
                    currallDimGuariti.push(allDimGuariti[i]);
                    currallMorti.push(allMorti[i]);
                    currallTotCasi.push(allTotCasi[i]);
                    currallTamponi.push(allTamponi[i]);
                }
            }
        };

        // Default Region Data
        setBubblePlot('Abruzzo');

        function setBubblePlot(chosenCountry) {
            getRegionData(chosenCountry);

            var trace1 = {
                //visible: 'legendonly',
                x: currentYear,
                y: currallRicoverati,
                name: 'Ricoverati con sintomi',
                mode: 'markers',
                marker: {
                    size: 12,
                    opacity: 0.5
                }
            };

            var trace2 = {
                x: currentYear,
                y: currallTi,
                mode: 'markers',
                name: 'Terapia Intensiva',
                marker: {
                    size: 12,
                    opacity: 0.5
                }
            };

            var trace3 = {
                x: currentYear,
                y: currallTo,
                mode: 'markers',
                name: 'Totale ospedalizzati',
                marker: {
                    size: 12,
                    opacity: 0.5
                }
            };

            var trace4 = {
                x: currentYear,
                y: currallIdom,
                mode: 'markers',
                name: 'Isolamento domiciliare',
                marker: {
                    size: 12,
                    opacity: 0.5
                }
            };

            var trace5 = {
                x: currentYear,
                y: currallAttPos,
                mode: 'markers',
                name: 'Totale attualmente positivi',
                marker: {
                    size: 12,
                    opacity: 0.5
                }
            };

            var trace6 = {
                x: currentYear,
                y: currallNewPos,
                mode: 'markers',
                name: 'Nuovi attualmente positivi',
                marker: {
                    size: 12,
                    opacity: 0.5
                }
            };

            var trace7 = {
                x: currentYear,
                y: currallDimGuariti,
                mode: 'markers',
                name: 'Dimessi guariti',
                marker: {
                    size: 12,
                    opacity: 0.5
                }
            };

            var trace8 = {
                x: currentYear,
                y: currallMorti,
                mode: 'markers',
                name: 'Deceduti',
                marker: {
                    size: 12,
                    opacity: 0.5
                }
            };

            var trace9 = {
                x: currentYear,
                y: currallTotCasi,
                mode: 'markers',
                name: 'Totale casi',
                marker: {
                    size: 12,
                    opacity: 0.5
                }
            };

            var trace10 = {
                x: currentYear,
                y: currallTamponi,
                mode: 'markers',
                name: 'Tamponi',
                marker: {
                    size: 12,
                    opacity: 0.5
                }
            };

            var data = [trace1, 
                        trace2, 
                        trace3, 
                        trace4, 
                        trace5, 
                        trace6, 
                        trace7, 
                        trace8, 
                        trace9, 
                        trace10];

            var updatemenus=[
                {
                    buttons: [
                        {
                            args: [{'yaxis.type': 'linear',
                                    'yaxis.tickmode':'auto'}],
                            label: 'Linear',
                            method: 'relayout'
                        },
                        {
                            args: [{'yaxis.type':'log',
                                    'yaxis.dtick':1}],
                            label:'SemiLog',
                            method:'relayout'
                        }
                    ],
                    direction: 'left',
                    pad: {'r': 10, 't': 10},
                    showactive: true,
                    type: 'buttons',
                    x: 0.1,
                    xanchor: 'left',
                    y: 1.1,
                    yanchor: 'top'
                }
            ]

            var annotations = [
                {
                text: 'Plot type:',
                x: 0,
                y: 1.085,
                yref: 'paper',
                align: 'left',
                showarrow: false
                }
            ]

            var layout = {
                title: 'Andamento regionale ' + currTitle,
                height: 400,
                //width: 800,
                updatemenus: updatemenus,
                //annotations: annotations,
                showlegend: true,
                //legend: {"orientation": "h"},
                yaxis: {
                    autorange: true
                    
                    //type: 'log',
                    //fixedrange: true,
                    //range: [0,3.70]
                    //range: [0,5000]
                }
            };
            var options = {
                scrollZoom: true,
                displayModeBar: false
            };
            Plotly.newPlot('myDiv', data, layout,options);
        };

        var innerContainer = document.querySelector('[data-num="0"'),
            plotEl = innerContainer.querySelector('.plot'),
            countrySelector = innerContainer.querySelector('.countrydata');

        function assignOptions(textArray, selector) {
            for (var i = 0; i < textArray.length;  i++) {
                var currentOption = document.createElement('option');
                currentOption.text = textArray[i];
                selector.appendChild(currentOption);
            }
        }

        assignOptions(listofRegions, countrySelector);

        function updateCountry(){
            setBubblePlot(countrySelector.value);
        }

        countrySelector.addEventListener('change', updateCountry, false);
    });
}