import AdminPageContent from '@/components/Layout/AdminPageContent';
// import AdminTopic from '@/components/AdminIndex/AdminTopic';
// import AdminAccessChart from '@/components/AdminIndex/AdminAccessChart';
// import AdminDepartmentChart from '@/components/AdminIndex/AdminDepartmentChart';
// import AdminCategoryChart from '@/components/AdminIndex/AdminCategoryChart';
import AdminButtonFunc from '@/components/AdminIndex/AdminButtonFunc';
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
//import './style.css';
import {
    AgChartThemeOverrides,
    ColDef,
    FirstDataRenderedEvent,
    GridApi,
} from 'ag-grid-community';
import { getData } from './data';
import axios from 'axios';


const TopicPage: React.FC = ({ }) => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<any[]>();
    useEffect(() => {
        try {
            axios.get('http://localhost:8080/idea/analytics').then(res => {
                setRowData(res.data);
            })
        } catch (error) {
            console.log(error);
        }
    }, [])
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { headerName: 'Department', field: 'department_name', chartDataType: 'category' },
        { headerName: 'Category', field: 'cate_name', chartDataType: 'category' },
        {
            headerName: 'Idea',
            field: 'idea_title',
            maxWidth: 160,
            aggFunc: 'sum',
            filter: 'agNumberColumnFilter',
            chartDataType: 'series',
        },
        {
            headerName: 'Topc',
            field: 'topic_name',
            maxWidth: 160,
            filter: 'agSetColumnFilter',
            chartDataType: 'category',
        },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1,
            editable: true,
            sortable: true,
            filter: 'agMultiColumnFilter',
            floatingFilter: true,
            resizable: true,
        };
    }, []);
    const chartThemes = useMemo<string[]>(() => {
        return ['ag-pastel-dark'];
    }, []);
    const chartThemeOverrides = useMemo<AgChartThemeOverrides>(() => {
        return {
            cartesian: {
                axes: {
                    category: {
                        label: {
                            rotation: 0
                        },
                    },
                }
            }
        };
    }, []);

    const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
        createQuarterlySalesChart(params.api);
        createSalesByRefChart(params.api);
        createHandsetSalesChart(params.api);
    }, []);

    return (
        <AdminPageContent>
            <>
                <div id="barChart" className="ag-theme-alpine-dark"></div>
            </>
            <>
                <div style={gridStyle} className="ag-theme-alpine-dark">
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        enableCharts={true}
                        chartThemes={chartThemes}
                        chartThemeOverrides={chartThemeOverrides}
                        onFirstDataRendered={onFirstDataRendered}
                    ></AgGridReact>
                </div>

            </>
            <>
                <div id="columnChart" className="ag-theme-alpine-dark"></div>
            </>
            <>
                <div id="pieChart" className="ag-theme-alpine-dark"></div>
            </>
            <>
                <AdminButtonFunc />
            </>
        </AdminPageContent>
    );
}
function createQuarterlySalesChart(gridApi: GridApi) {
    gridApi.createCrossFilterChart({
        chartType: 'column',
        cellRange: {
            columns: ['topic_name', 'idea_title'],
        },
        aggFunc: 'count',
        chartThemeOverrides: {
            common: {
                title: {
                    enabled: true,
                    text: 'Number of Ideas by Topic',
                },
                legend: {
                    enabled: false,
                },
                axes: {
                    category: {
                        label: {
                            enabled: false,
                            rotation: 0
                        },
                    }
                },

            }
        },
        chartContainer: document.querySelector('#columnChart') as any,
    });
}

function createSalesByRefChart(gridApi: GridApi) {
    gridApi.createCrossFilterChart({
        chartType: 'pie',
        cellRange: {
            columns: ['department_name', 'idea_title'],
        },
        aggFunc: 'count',
        chartThemeOverrides: {
            common: {
                title: {
                    enabled: true,
                    text: 'Number of Ideas by Department',
                },
            },
            pie: {
                series: {
                    title: {
                        enabled: false,
                    },
                    calloutLabel: {
                        enabled: false,
                    },
                    //strokes: []
                },
            },
        },
        chartContainer: document.querySelector('#pieChart') as any,
    });
}

function createHandsetSalesChart(gridApi: GridApi) {
    gridApi.createCrossFilterChart({
        chartType: 'bar',
        cellRange: {
            columns: ['cate_name', 'idea_title'],
        },
        aggFunc: 'count',
        chartThemeOverrides: {
            common: {
                title: {
                    enabled: true,
                    text: 'Number of Ideas by Category',
                },
                legend: {
                    enabled: false,
                },
            },
        },
        chartContainer: document.querySelector('#barChart') as any,
    });
}
export default TopicPage;