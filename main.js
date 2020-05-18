var columnDefs = [
  {
    field: 'Machine Name',
    headerName: "Machine Name",
    enableValue: true,
    suppressMenu: true ,
    pinned: 'left',
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains', 'notContains'],
      clearButton: true,
      textFormatter: function(r) {
        if (r == null) return null;

        return r
          .toLowerCase()
          .replace(/\s/g, '')
          .replace(/[àáâãäå]/g, 'a')
          .replace(/æ/g, 'ae')
          .replace(/ç/g, 'c')
          .replace(/[èéêë]/g, 'e')
          .replace(/[ìíîï]/g, 'i')
          .replace(/ñ/g, 'n')
          .replace(/[òóôõö]/g, 'o')
          .replace(/œ/g, 'oe')
          .replace(/[ùúûü]/g, 'u')
          .replace(/[ýÿ]/g, 'y')
          .replace(/\W/g, '');
      },
      debounceMs: 0,
      caseSensitive: true,
      suppressAndOrCondition: true,
    },
  },
  {
    field: 'Description',
    headerName: "Description",
    width: 500,
    suppressMenu: true ,

    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains', 'notContains'],
      clearButton: true,
      textFormatter: function(r) {
        if (r == null) return null;

        return r
          .toLowerCase()
          .replace(/\s/g, '')
          .replace(/[àáâãäå]/g, 'a')
          .replace(/æ/g, 'ae')
          .replace(/ç/g, 'c')
          .replace(/[èéêë]/g, 'e')
          .replace(/[ìíîï]/g, 'i')
          .replace(/ñ/g, 'n')
          .replace(/[òóôõö]/g, 'o')
          .replace(/œ/g, 'oe')
          .replace(/[ùúûü]/g, 'u')
          .replace(/[ýÿ]/g, 'y')
          .replace(/\W/g, '');
      },
      debounceMs: 0,
      caseSensitive: true,
      suppressAndOrCondition: true,
    },
  },
  {
    field: 'vCPUs',
    headerName: "vCPUs",
    suppressMenu: true ,

    width: 500,
    filter: 'agNumberColumnFilter',
    filterParams: {
      clearButton: true,
    }
  },
  {
    field: 'Fractional vCPUs',
    headerName: "Fractional vCPUs",

    width: 500,
    suppressMenu: true ,
    filter: 'agNumberColumnFilter',
    filterParams: {
      clearButton: true,
    }
  },
  {
    field: 'Memory(GBs)',
    headerName: "Memory(GBs)",

    suppressMenu: true ,
    width: 500,
    filter: 'agTextColumnFilter',
    filter: 'agNumberColumnFilter',
    filterParams: {
      clearButton: true,
    }
  },
  {
    field: 'Max Number Of persistent Disks(PDs)',
    headerName: "Max Number Of persistent Disks(PDs)",

    width: 500,
    suppressMenu: true ,
    filter: 'agTextColumnFilter',
    filter: 'agNumberColumnFilter',
    filterParams: {
      clearButton: true,
    }
  },
  {
    field: 'Max Total PD Size(TBs)',
    headerName: "Max Total PD Size(TBs)",

    width: 500,
    suppressMenu: true ,
    filter: 'agTextColumnFilter',
    filter: 'agNumberColumnFilter',
    filterParams: {
      clearButton: true,
    }
  },
  {
    field: 'Local SSD',
    headerName: "Local SSD",

    width: 500,
    suppressMenu: true ,
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains', 'notContains'],
      clearButton: true,
      textFormatter: function(r) {
        if (r == null) return null;

        return r
          .toLowerCase()
          .replace(/\s/g, '')
          .replace(/[àáâãäå]/g, 'a')
          .replace(/æ/g, 'ae')
          .replace(/ç/g, 'c')
          .replace(/[èéêë]/g, 'e')
          .replace(/[ìíîï]/g, 'i')
          .replace(/ñ/g, 'n')
          .replace(/[òóôõö]/g, 'o')
          .replace(/œ/g, 'oe')
          .replace(/[ùúûü]/g, 'u')
          .replace(/[ýÿ]/g, 'y')
          .replace(/\W/g, '');
      },
      debounceMs: 0,
      caseSensitive: true,
      suppressAndOrCondition: true,
    }
  },
  {
    field: 'Network Egress Bandwidth(Gbps)',
    headerName: "Network Egress Bandwidth(Gbps)",

    width: 500,
    suppressMenu: true ,
    filter: 'agTextColumnFilter',
    filter: 'agNumberColumnFilter',
    filterParams: {
      clearButton: true,
    }
  },
  {
    field: 'Price (USD)',
    headerName: "Price (USD)",

    width: 500,
    suppressMenu: true ,
    filter: 'agTextColumnFilter',
    filter: 'agNumberColumnFilter',
    filterParams: {
      clearButton: true,
    }
  },
  {
      field: 'Preemptible price (USD)',
      headerName: "Preemptible price (USD)",
      width: 500,
      suppressMenu: true ,
      filter: 'agTextColumnFilter',
      filter: 'agNumberColumnFilter',
      filterParams: {
        clearButton: true,
      }
    }
];

var gridOptions = {
  defaultColDef: {
    flex: 1,
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: false,
  },
  columnDefs: columnDefs,
  rowData: null,
  suppressMenuHide: true,
  rowSelection: 'multiple',
  rowMultiSelectWithClick: true,
};

function onBtnExport() {
  gridOptions.api.exportDataAsCsv();
//  gridOptions.api.exportDataAsExcel();
}

function onBtnSelect(){
  var getdata = gridOptions.api.getSelectedRows();
  gridOptions.api.setRowData(getdata);
}

function autoSizeAll(skipHeader) {
  var allColumnIds = [];
  gridOptions.columnApi.getAllColumns().forEach(function(column) {
    allColumnIds.push(column.colId);
  });

  gridOptions.columnApi.autoSizeColumns(allColumnIds, skipHeader);
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);

  getnewdata('IOWA(us-central-1)');
});

function getnewdata(fileName) {
  agGrid
    .simpleHttpRequest({
      url:
        'http://localhost/GCP_Compare/jsondata/'+fileName+'_data.json',
    })
    .then(function(data) {
      gridOptions.api.setRowData(data);
    });
}
