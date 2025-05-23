/**
 * Chart spec document
 */

import { createElement, L10n, remove } from '@syncfusion/ej2-base';
import { Chart } from '../../../src/chart/chart';
import { Zoom } from '../../../src/chart/user-interaction/zooming';
import { LineSeries } from '../../../src/chart/series/line-series';
import { data, unbindResizeEvents } from '../base/data.spec';
import { ColumnSeries } from '../../../src/chart/series/column-series';
import { DataLabel } from '../../../src/chart/series/data-label';
import { seriesData1 } from '../base/data.spec';
import { EmitType } from '@syncfusion/ej2-base';
import { MouseEvents } from '../../chart/base/events.spec';
import { wheel } from '../../chart/user-interaction/zooming.spec';
import { ILoadedEventArgs, IMouseEventArgs } from '../../../src/chart/model/chart-interface';
import { profile, inMB, getMemoryProfile } from '../../common.spec';
import { Legend, Category } from '../../../src/index';
import { categoryData } from './data.spec';
import { Query } from '@syncfusion/ej2-data';
import { Selection } from '../../../src/chart/user-interaction/selection';
import { Highlight } from '../../../src/chart/user-interaction/high-light';
import { Export } from '../../../src/chart/print-export/export';
import { Data } from '../../../src/common/model/data';

Chart.Inject(LineSeries, Zoom, ColumnSeries, DataLabel, Legend, Category, Selection, Highlight, Export);



describe('Chart Control', () => {
    beforeAll(() => {
        const isDef = (o: any) => o !== undefined && o !== null;
        if (!isDef(window.performance)) {
            console.log("Unsupported environment, window.performance.memory is unavailable");
            this.skip(); //Skips test (in Chai)
            return;
        }
    });
    describe('Chart direct properties and its behavior', () => {
        let chart: Chart;
        let ele: HTMLElement;
        let svg: HTMLElement;
        let text: HTMLElement;
        let trigger: MouseEvents = new MouseEvents();
        let loaded: EmitType<ILoadedEventArgs>;
        beforeAll((): void => {
            ele = createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            chart = new Chart();
        });

        afterAll((): void => {
            chart.destroy();
            ele.remove();
        });
        it('Checking chart instance creation', (done: Function) => {
            loaded = (args: Object): void => {
                expect(chart != null).toBe(true);
                done();
            }
            chart.loaded = loaded;
            chart.appendTo('#container');
        });
        it('Checking with empty options', () => {
            let className: string = document.getElementById('container').className;
            expect(className).toEqual('e-control e-chart e-lib e-chart-focused e-touch');
        });
        it('Checking module name', () => {
            expect(chart.getModuleName()).toBe('chart');
        });
        it('Checking with empty size property', () => {
            svg = document.getElementById('container_svg');
            expect(svg.getAttribute('width') != null).toBe(true);
        });
        it('Checking the null height of the chart', () => {
            svg = document.getElementById('container_svg');
            expect(svg.getAttribute('height')).toEqual('450');
        });
        it('Checking the null width of the chart', (done: Function) => {
            chart.width = null;
            ele.setAttribute('style', 'width:600px');
            chart.loaded = (args: Object) => {
                svg = document.getElementById('container_svg');
                expect(svg.getAttribute('width')).toEqual('600');
                done();
            };
            chart.getPersistData();
            chart.refresh();

        });
        it('Checking the percentage size of the chart', (done: Function) => {
            chart.width = '50%';
            ele.setAttribute('style', 'width:900px');
            chart.loaded = (args: Object) => {
                svg = document.getElementById('container_svg');
                expect(svg.getAttribute('width')).toEqual('450');
                done();
            };
            chart.refresh();

        });
        it('Checking the width of the chart', () => {
            chart.width = '500';
            chart.loaded = null;
            chart.dataBind();

            svg = document.getElementById('container_svg');
            expect(svg.getAttribute('width')).toEqual('500');
        });
        it('Checking the height of the chart', () => {
            chart.height = '500';
            chart.dataBind();

            svg = document.getElementById('container_svg');
            expect(svg.getAttribute('height')).toEqual('500');
        });
        it('Checking both height and width of the chart', () => {
            chart.width = '500';
            chart.height = '300';
            chart.dataBind();

            svg = document.getElementById('container_svg');
            expect(svg.getAttribute('width')).toEqual('500');
            expect(svg.getAttribute('height')).toEqual('300');
        });
        it('Checking with empty title', () => {
            text = document.getElementById('container_ChartTitle');
            expect(text == null).toBe(true);
        });
        it('Checking with  title', () => {
            chart.title = 'Syncfusion Chart Title';
            chart.dataBind();
            text = document.getElementById('container_ChartTitle');
            expect(text.textContent == 'Syncfusion Chart Title').toBe(true);
            expect(text.getAttribute('y') == '25' || text.getAttribute('y') == '23.5').toBe(true);
        });
        it('Checking textoverflow title none', () => {
            chart.width = '100px';
            chart.title = 'Efficiency of oil-fired power production';
            chart.titleStyle.textOverflow = 'None';
            chart.dataBind();
            text = document.getElementById('container_ChartTitle');
            expect(text.getAttribute('text-anchor')).toBe('middle');
            expect(text.getAttribute('y') == '25' || text.getAttribute('y') == '23.5').toBe(true);
        });
        it('Checking textoverflow title wrap', () => {
            chart.titleStyle.textOverflow = 'Wrap';
            chart.dataBind();
            text = document.getElementById('container_ChartTitle');
            expect(text.getAttribute('y') == '25' || text.getAttribute('y') == '23.5').toBe(true);
        });
        it('Checking textoverflow title wrapwithtrim', () => {
            chart.title = 'Efficiency of oil-fired power productionchart';
            chart.dataBind();
            text = document.getElementById('container_ChartTitle');
            expect(text.textContent.indexOf('...') != -1).toBe(true);
            expect(text.getAttribute('y') == '25' || text.getAttribute('y') == '23.5').toBe(true);
        });

        it('Checking textoverflow title trim', () => {
            chart.titleStyle.textOverflow = 'Trim';
            chart.dataBind();
            text = document.getElementById('container_ChartTitle');
            expect(text.textContent.indexOf('...') != -1).toBe(true);
            expect(text.getAttribute('text-anchor')).toBe('middle');
            expect(text.getAttribute('y') == '25' || text.getAttribute('y') == '23.5').toBe(true);
        });
        it('Checking title trim', () => {
            chart.title = 'candidate joined in a year syncfusion Chart Title';
            chart.width = '100';
            chart.dataBind();

            text = document.getElementById('container_ChartTitle');
            expect(text.textContent.indexOf('...') != -1).toBe(true);
        });

        it('Trimmed text and mouse over and out', (done: Function) => {
            loaded = (args: Object): void => {
                chart.loaded = null;
                text = document.getElementById('container_ChartTitle');
                trigger.mousemoveEvent(text, 0, 0, 77, 25);
                let tooltip: Element = document.getElementById('container_EJ2_Title_Tooltip');
                expect(tooltip.textContent).toBe('candidate joined in a year syncfusion Chart Title');
                expect(text.textContent.split('...').length).toEqual(2);
                tooltip.remove();
                chart.mouseEnd(<PointerEvent>trigger.onTouchEnd(text, 0, 0, null, null, 77, 25));
                tooltip = document.getElementById('container_EJ2_Title_Tooltip');
                expect(tooltip.textContent).toBe('candidate joined in a year syncfusion Chart Title');
                expect(text.textContent.split('...').length).toEqual(2);
                tooltip.remove();
                //document.body.removeChild(tooltip);
                done();
            };
            chart.width = '80';
            chart.title = 'candidate joined in a year syncfusion Chart Title';
            chart.loaded = loaded;
            chart.refresh();
        });

        it('Trimmed text and mouse over and out for subtitle', (done: Function) => {
            loaded = (args: Object): void => {
                chart.loaded = null;
                text = document.getElementById('container_ChartSubTitle');
                trigger.mousemoveEvent(text, 0, 0, 77, 25);
                let tooltip: Element = document.getElementById('container_EJ2_Title_Tooltip');
                expect(tooltip.textContent).toBe('syncfusion Chart SubTitle');
                tooltip.remove();
                done();
            };
            chart.subTitleStyle.textOverflow = 'Trim';
            chart.width = '80';
            chart.subTitle = 'syncfusion Chart SubTitle';
            chart.isTouch = false;
            chart.loaded = loaded;
            chart.refresh();
        });

        it('Checking the title font size', () => {
            chart.title = 'Chart Title';
            chart.titleStyle.size = '24px';
            chart.dataBind();
            text = document.getElementById('container_ChartTitle');
            expect(text.getAttribute('font-size')).toEqual('24px');
        });
        it('Checking with  subtitle', function () {
            chart.width = '500px';
            chart.subTitle = 'Chart SubTitle';
            chart.dataBind();
            text = document.getElementById('container_ChartSubTitle');
            expect(text.textContent == 'Chart SubTitle').toBe(true);
            expect(text.getAttribute('y') == '51.25' || text.getAttribute('y') == '49.25').toBe(true);
        });

        it('Checking textoverflow subtitle none', function () {
            chart.subTitle = 'SubTitle';
            chart.titleStyle.textOverflow = 'None';
            chart.dataBind();
            text = document.getElementById('container_ChartSubTitle');
            expect(text.textContent == 'SubTitle').toBe(true);
            expect(text.getAttribute('y') == '51.25' || text.getAttribute('y') == '49.25').toBe(true);
        });

        it('Checking textoverflow subtitle trim', function () {
            chart.width = '100px';
            chart.subTitle = 'Syncfusion Chart SubTitle';
            chart.subTitleStyle.textOverflow = 'Trim';
            chart.dataBind();
            text = document.getElementById('container_ChartSubTitle');
            expect(text.textContent.indexOf('...') != -1).toBe(true);
            expect(text.getAttribute('y') == '51.25' || text.getAttribute('y') == '49.25').toBe(true);
        });

        it('Checking textoverflow subtitle wrap', function () {
            chart.subTitleStyle.textOverflow = 'Wrap';
            chart.dataBind();
            text = document.getElementById('container_ChartSubTitle');
            expect(text.childNodes.length == 3).toBe(true);
            expect(text.getAttribute('y') == '51.25' || text.getAttribute('y') == '49.25').toBe(true);
        });

        it('Checking textAlignment subtitle center and subtitle is in Title width', function () {
            chart.width = '500px';
            chart.title = 'Syncfusion Chart SubTitle';
            chart.subTitle = 'Checking Syncfusion Chart SubTitle width should be in Chart Title width';
            chart.subTitleStyle.textOverflow = 'Trim';
            chart.titleStyle.textOverflow = 'Wrap';
            chart.dataBind();
            text = document.getElementById('container_ChartSubTitle');
            expect(text.textContent.indexOf('...') === -1).toBe(true);
            expect(text.getAttribute('text-anchor')).toBe('middle');
        });

        it('Checking textAlignment subtitle Far', function () {
            chart.subTitleStyle.textAlignment = 'Far';
            chart.dataBind();
            text = document.getElementById('container_ChartSubTitle');
            expect(text.getAttribute('text-anchor')).toBe('end');
        });

        it('Checking textAlignment subtitle Near', function () {
            chart.subTitleStyle.textAlignment = 'Near';
            chart.dataBind();
            text = document.getElementById('container_ChartSubTitle');
            expect(text.getAttribute('text-anchor')).toBe('start');
        });

        it('Checking the subtitle font size', () => {
            chart.subTitleStyle.size = '20px';
            chart.dataBind();
            text = document.getElementById('container_ChartSubTitle');
            expect(text.getAttribute('font-size')).toEqual('20px');
        });

        it('Checking with empty subtitle', function () {
            chart.subTitle = '';
            chart.dataBind();
            text = document.getElementById('container_ChartSubTitle');
            expect(text == null).toBe(true);
        });

        it('Checking the border color', () => {
            chart.border.width = 2;
            chart.border.color = 'green';
            chart.dataBind();
            svg = document.getElementById('container_ChartBorder');
            expect(svg.getAttribute('stroke') == 'green').toBe(true);
            expect(svg.getAttribute('stroke-width') == '2').toBe(true);
        });

        it('Checking the Chart Area border color', () => {
            chart.chartArea.border.color = 'red';
            chart.chartArea.background = 'green';
            chart.chartArea.opacity = 0.5;
            chart.dataBind();
            svg = document.getElementById('container_ChartAreaBorder');
            expect(svg.getAttribute('stroke') == 'red').toBe(true);
            expect(svg.getAttribute('fill') == 'green').toBe(true);
            expect(svg.getAttribute('opacity') == '0.5').toBe(true);
        });
        it('Checking the Chart background', () => {
            chart.background = 'yellow';
            chart.dataBind();
            svg = document.getElementById('container_ChartBorder');
            expect(svg.getAttribute('fill') == 'yellow').toBe(true);
        });

        it('Checking context menu event', () => {
            let menu: Event = document.createEvent('MouseEvent');
            menu.initEvent('contextmenu', true, false);
            ele.dispatchEvent(menu);
            expect(ele).not.toBe(null);
        });

        it('Checking the chart Orientation', () => {
            expect(chart.isOrientation()).toBe(false);
        });

        it('checking with title alignment default', (done: Function) => {
            loaded = (args: ILoadedEventArgs) => {
                text = document.getElementById('container_ChartTitle');
                expect(text.getAttribute('text-anchor')).toBe('middle');
                expect(text.getAttribute('x') == text.children[0].getAttribute('x')).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.title = 'EfficiencyChart of oil power productionchart';
            chart.titleStyle.textOverflow = 'Wrap';
            chart.width = '300';
            chart.refresh();
        });
        it('checking with title alignment Far', () => {
            chart.titleStyle.textAlignment = 'Far';
            chart.loaded = null;
            chart.dataBind();
            text = document.getElementById('container_ChartTitle');
            expect(text.getAttribute('text-anchor')).toBe('end');
            expect(text.getAttribute('x') == text.children[0].getAttribute('x')).toBe(true);
        });
        it('checking with title alignment Near', () => {
            chart.titleStyle.textAlignment = 'Near';
            chart.dataBind();
            text = document.getElementById('container_ChartTitle');
            expect(text.getAttribute('text-anchor')).toBe('start');
            expect(text.getAttribute('x') == text.children[0].getAttribute('x')).toBe(true);
        });
        it('checking chart area background image', (done: Function) => {
            setTimeout(() => {
                let background: HTMLElement = document.getElementById('container_ChartAreaBackground');
                expect(background.getAttribute('href') != null).toBe(true);
                done();
            }, 500);
            chart.chartArea.backgroundImage =
                'https://cdn.syncfusion.com/content/images/freetrials/essential-studio.png?v=03102019101652';
            chart.refresh();
        });
        it('checking chart background image', (done: Function) => {
            setTimeout(() => {
                let background: HTMLElement = document.getElementById('container_ChartBackground');
                expect(background.getAttribute('href') != null).toBe(true);
                done();
            }, 500);
            chart.backgroundImage = 'https://cdn.syncfusion.com/content/images/freetrials/essential-studio.png?v=03102019101652';
            chart.refresh();
        });
        it('Checking with  title in Bottom', function (done) {
            loaded = function (args) {
                text = document.getElementById('container_ChartTitle');
                expect(text.textContent == 'Syncfusion Chart Title').toBe(true);
                expect(text.getAttribute('y') == '276.5').toBe(true);

                done();
            };
            chart.loaded = loaded;
            chart.title = 'Syncfusion Chart Title';
            chart.titleStyle.position = 'Bottom'
            chart.refresh();
        });
        it('Checking with  title in Left', function (done) {
            loaded = function (args) {
                text = document.getElementById('container_ChartTitle');
                expect(text.textContent == 'Syncfusion Chart Title').toBe(true);
                expect(text.getAttribute('y') == '12').toBe(true);

                done();
            };
            chart.loaded = loaded;
            chart.title = 'Syncfusion Chart Title';
            chart.titleStyle.position = 'Left';
            chart.refresh();
        });
        it('checking with title alignment Near for left', () => {
            chart.titleStyle.textAlignment = 'Near';
            chart.titleStyle.position = 'Left';
            chart.dataBind();
            text = document.getElementById('container_ChartTitle');
            expect(text.getAttribute('text-anchor')).toBe('end');
        });
        it('Checking with  title in Right', function (done) {
            loaded = function (args) {
                text = document.getElementById('container_ChartTitle');
                expect(text.textContent == 'Syncfusion Chart Title').toBe(true);
                expect(text.getAttribute('y') == '12').toBe(true);

                done();
            };
            chart.loaded = loaded;
            chart.title = 'Syncfusion Chart Title';
            chart.titleStyle.position = 'Right';
            chart.refresh();
        });
        it('checking with title alignment Near for Right', () => {
            chart.titleStyle.textAlignment = 'Near';
            chart.titleStyle.position = 'Right';
            chart.dataBind();
            text = document.getElementById('container_ChartTitle');
            expect(text.getAttribute('text-anchor')).toBe('start');
        });
        it('Checking with title in Custom', function (done) {
            loaded = function (args) {
                text = document.getElementById('container_ChartTitle');
                expect(text.textContent == 'Syncfusion Chart Title').toBe(true);
                expect(text.getAttribute('y') == '0').toBe(true);

                done();
            };
            chart.loaded = loaded;
            chart.title = 'Syncfusion Chart Title';
            chart.titleStyle.position = 'Custom';
            chart.refresh();
        });
        it('Checking chart container name as empty', function (done) {
            loaded = function () {
                let containerID: HTMLElement = document.getElementById('chart_57723_1');
                expect(containerID.id).toBe('chart_57723_1');
                done();
            };
            chart.loaded = loaded;
            let element: HTMLElement = document.getElementById('container');
            element.setAttribute('id', '');
            chart.refresh();
        });
    });
    describe('Chart checking localization', () => {
        L10n.load({
            'de-DE': {
                'chart': {
                    ZoomIn: 'تكبير',
                    ZoomOut: 'تصغير',
                    Zoom: 'زوم',
                    Pan: 'مقلاة',
                    Reset: 'إعادة تعيين'
                },
            }
        });
        let chart: Chart;
        let ele: HTMLElement;
        let svg: HTMLElement;
        let text: HTMLElement;
        let trigger: MouseEvents = new MouseEvents();
        let loaded: EmitType<ILoadedEventArgs>;
        beforeAll((): void => {
            ele = createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            chart = new Chart();
            chart.appendTo('#container');
        });

        afterAll((): void => {
            chart.destroy();
            ele.remove();
        });
        it('checking zooming tooltit with localization', (done: Function) => {
            loaded = (args: ILoadedEventArgs) => {
                chart.loaded = null;
                trigger.draganddropEvent(ele, 100, 100, 400, 400);
                let targetElement = document.getElementById('container_Zooming_KitCollection');
                trigger.mousemoveEvent(targetElement, 800, 10, 805, 15);
                targetElement = document.getElementById('container_Zooming_Zoom');
                trigger.mouseoverEvent(targetElement);
                expect(document.getElementById('EJ2_Chart_ZoomTip').innerHTML).toEqual("&nbsp;زوم&nbsp;");
                done();
            };
            chart.loaded = loaded;
            chart.zoomSettings = {
                enablePinchZooming: true, enableDeferredZooming: true,
                enableMouseWheelZooming: true, enableSelectionZooming: true
            };
            chart.locale = 'de-DE';
            chart.refresh();
        });
        it('checking zooming tooltit without localization', () => {
            remove(document.getElementById('EJ2_Chart_ZoomTip'));
            chart.locale = '';
            chart.dataBind();

            trigger.draganddropEvent(ele, 100, 100, 400, 400);
            let targetElement = document.getElementById('container_Zooming_KitCollection');
            trigger.mousemoveEvent(targetElement, 800, 10, 805, 15);
            targetElement = document.getElementById('container_Zooming_Zoom');
            trigger.mouseoverEvent(targetElement);
            expect(document.getElementById('EJ2_Chart_ZoomTip').innerHTML).toEqual("&nbsp;Zoom&nbsp;");
        });
    });
    describe('Chart checking center aligned div', () => {
        let chart: Chart;
        let ele: HTMLElement;
        let svg: HTMLElement;
        let text: HTMLElement;
        let trigger: MouseEvents = new MouseEvents();
        let loaded: EmitType<ILoadedEventArgs>;
        beforeAll((): void => {
            ele = createElement('div', { id: 'container' });
            ele.setAttribute('align', 'center');
            document.body.appendChild(ele);
            chart = new Chart({
                primaryYAxis: {
                    rangePadding: 'Round'
                },
                series: [
                    {
                        dataSource: seriesData1, xName: 'x', yName: 'y', fill: 'orange', opacity: 0.7,
                        type: 'Column',
                        animation: { enable: false },
                        marker: {
                            dataLabel: {
                                visible: true,
                                position: 'Top',
                                template: '<div style="background-color:#ed7d31;border-radius: 3px;">${point.y}Million</div>'
                            }
                        }
                    }
                ],
                zoomSettings: {
                    enableSelectionZooming: true,
                    enableMouseWheelZooming: true,
                },
                width: '400px'
            });
            chart.appendTo('#container');
        });

        afterAll((): void => {
            chart.destroy();
            ele.remove();
        });
        it('checking data label template and zooming', (done: Function) => {
            let wheelArgs: unknown = {
                preventDefault: () => {
                    // not applicable
                },
                wheelDelta: 120,
                detail: 3,
                clientX: 210,
                clientY: 100
            };
            loaded = (args: ILoadedEventArgs) => {
                chart.loaded = null;
                let secondaryElement: HTMLDivElement = document.getElementById('container_Secondary_Element') as HTMLDivElement;
                expect(parseInt(secondaryElement.style.top, 10)).toBe(0);
                expect(parseInt(secondaryElement.style.left, 10) === 179 || parseInt(secondaryElement.style.left, 10) === 184).toBe(true);
                let datalabel: HTMLDivElement = document.getElementById('container_Series_0_DataLabel_4') as HTMLDivElement;
                expect(parseInt(datalabel.style.top, 10) === 227 || parseInt(datalabel.style.top, 10) === 228).toBe(true);
                expect(parseInt(datalabel.style.left, 10)).toBe(172);
                trigger.draganddropEvent(ele, 20, 100, 120, 300);
                expect(chart.primaryXAxis.zoomFactor).toBe(1);
                expect(chart.primaryYAxis.zoomFactor).toBe(1);
                expect(chart.primaryXAxis.zoomPosition).toBe(0);
                expect(chart.primaryYAxis.zoomPosition).toBe(0);
                trigger.draganddropEvent(ele, 480, 100, 580, 300);
                expect(chart.primaryXAxis.zoomFactor.toFixed(2)).toBe('0.28');
                expect(chart.primaryYAxis.zoomFactor.toFixed(2) === '0.50' || chart.primaryYAxis.zoomFactor.toFixed(2) === '0.49').toBe(true);
                expect(chart.primaryXAxis.zoomPosition.toFixed(2) === '0.72' || chart.primaryXAxis.zoomPosition.toFixed(2) === '0.71').toBe(true);
                expect(chart.primaryYAxis.zoomPosition.toFixed(2)).toBe('0.30');
                // checking for center aligned div mouse wheel zooming
                chart.zoomModule.chartMouseWheel(<WheelEvent>wheelArgs);
                expect(chart.primaryXAxis.zoomFactor.toFixed(2)).toBe('0.28');
                let temp: string = chart.primaryYAxis.zoomFactor.toFixed(2);
                expect(temp === '0.50' || temp === '0.49').toBe(true);
                temp = chart.primaryXAxis.zoomPosition.toFixed(2);
                expect(temp === '0.72' || temp === '0.71').toBe(true);
                expect(chart.primaryYAxis.zoomPosition.toFixed(2)).toBe('0.30');
                done();
            };
            chart.loaded = loaded;
            chart.refresh();
        });
    });
    it('memory leak', () => {
        profile.sample();
        let average: any = inMB(profile.averageChange)
        //Check average change in memory samples to not be over 10MB
        expect(average).toBeLessThan(10);
        let memory: any = inMB(getMemoryProfile())
        //Check the final memory usage against the first usage, there should be little change if everything was properly deallocated
        expect(memory).toBeLessThan(profile.samples[0] + 0.25);
    })

    describe('Customer issue: series DataBind', () => {
        let chart: Chart;
        let ele: HTMLElement;
        let loaded: EmitType<ILoadedEventArgs>;
        let element: Element;
        let trigger: MouseEvents = new MouseEvents();
        beforeAll((): void => {
            ele = createElement('div', { id: 'seriesData' });
            document.body.appendChild(ele);
            chart = new Chart(
                {
                    primaryXAxis: { valueType: 'Category', rangePadding: 'Normal' },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [{ dataSource: categoryData, xName: 'x', yName: 'y', name: 'Gold', fill: 'red', animation: { enable: false }, type: 'Column' }],
                    height: '400', width: '900',
                    legendSettings: { visible: true, position: 'Right' }
                });
        });

        afterAll((): void => {
            chart.destroy();
            ele.remove();
        });
        it('checking default fill property', (done: Function) => {
            loaded = (args: ILoadedEventArgs) => {
                element = document.getElementById('seriesData_Series_0_Point_1');
                expect(element.getAttribute('fill')).toEqual('red');
                done();
            };
            chart.loaded = loaded;
            chart.appendTo(ele);
        });
        it('checking with changing fill', (done: Function) => {
            loaded = (args: ILoadedEventArgs) => {
                element = document.getElementById('seriesData_Series_0_Point_1');
                expect(element.getAttribute('fill')).toEqual('blue');
                done();
            };
            chart.loaded = loaded;
            chart.series[0].fill = 'blue';
            chart.dataBind();
        });
        it('checking before the legend name chage', () => {
            element = document.getElementById('seriesData_chart_legend_element');
            expect(element.getAttribute('x') === '828' || element.getAttribute('x') === '830').toBe(true);
            element = document.getElementById('seriesData_chart_legend_text_0');
            expect(element.textContent).toEqual('Gold');
        });
        it('checking with changing name', (done: Function) => {
            loaded = (args: ILoadedEventArgs) => {
                element = document.getElementById('seriesData_chart_legend_element');
                expect(element.getAttribute('x') === '741' || element.getAttribute('x') === '749').toBe(true);
                element = document.getElementById('seriesData_chart_legend_text_0');
                expect(element.textContent).toEqual('Olymbic gold medal');
                done();
            };
            chart.loaded = loaded;
            chart.series[0].name = 'Olymbic gold medal';
            chart.dataBind();
        });
        it('checking with local dataSource with query', (done: Function) => {
            loaded = (args: ILoadedEventArgs) => {
                element = document.getElementById('seriesDataSeriesGroup0');
                expect(element.childElementCount).toEqual(3);
                done();
            };
            chart.loaded = loaded;
            chart.series[0].query = new Query().take(2);
            chart.refresh();
        });
        it('checking materialDark', (done: Function) => {
            loaded = (args: ILoadedEventArgs) => {
                element = document.getElementById('seriesDataSeriesGroup0');
                expect(element.childElementCount).toEqual(3);
                done();
            };
            chart.loaded = loaded;
            chart.theme = 'MaterialDark';
            chart.refresh();
        });
        it('checking fabricDark', (done: Function) => {
            loaded = (args: ILoadedEventArgs) => {
                element = document.getElementById('seriesDataSeriesGroup0');
                expect(element.childElementCount).toEqual(3);
                done();
            };
            chart.loaded = loaded;
            chart.theme = 'FabricDark';
            chart.refresh();
        });
        it('checking bootstrapDark', (done: Function) => {
            loaded = (args: ILoadedEventArgs) => {
                element = document.getElementById('seriesDataSeriesGroup0');
                expect(element.childElementCount).toEqual(3);
                done();
            };
            chart.loaded = loaded;
            chart.theme = 'BootstrapDark';
            chart.refresh();
        });
        it('checking chart double click event', (done: Function) => {
            loaded = (args: ILoadedEventArgs) => {
                element = document.getElementById(args.chart.element.id);
                trigger.doubleClickEvent(element);
            };
            chart.chartDoubleClick = (args: IMouseEventArgs) => {
                expect(args.name).toEqual('chartDoubleClick');
                done();
            };
            chart.loaded = loaded;
            chart.refresh();
        });
    });

    describe('Fixed chart area width', () => {
        let chart: Chart;
        let ele: HTMLElement;
        let loaded: EmitType<ILoadedEventArgs>;
        let element: Element;
        beforeAll((): void => {
            ele = createElement('div', { id: 'seriesData' });
            document.body.appendChild(ele);
            chart = new Chart(
                {
                    primaryXAxis: { valueType: 'Category', rangePadding: 'Normal' },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [{ dataSource: categoryData, xName: 'x', yName: 'y', name: 'Gold', fill: 'red', animation: { enable: false }, type: 'Column' }],
                    height: '400', width: '900',
                    chartArea: {
                        width: '600'
                    },
                    legendSettings: { visible: true }
                });
        });

        afterAll((): void => {
            chart.destroy();
            ele.remove();
        });
        it('checking default with pixel width for chart area', (done: Function) => {
            loaded = (args: ILoadedEventArgs) => {
                element = document.getElementById('seriesData_ChartAreaBorder');
                expect(element.getAttribute('width') === '600').toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.appendTo(ele);
        });
        it('checking with legend right position', (done: Function) => {
            loaded = (args: ILoadedEventArgs) => {
                element = document.getElementById('seriesData_ChartAreaBorder');
                expect(element.getAttribute('width') === '600').toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.legendSettings.position = "Right";
            chart.primaryYAxis.opposedPosition = false;
            chart.dataBind();
        });
        it('Checking the space between the chart area and the chart title', (done: Function) => {
            loaded = (args: ILoadedEventArgs) => {
                element = document.getElementById('seriesData_ChartAreaBorder');
                expect(element.getAttribute('height') === '221.25').toBe(true);
                expect(element.getAttribute('width') === '600').toBe(true);
                expect(element.getAttribute('x') === '290').toBe(true);
                expect(element.getAttribute('y') === '60.25').toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.legendSettings.position = 'Bottom';
            chart.chartArea.margin.left = 50;
            chart.chartArea.margin.right = 50;
            chart.chartArea.margin.top = 50;
            chart.chartArea.margin.bottom = 50;
            chart.refresh();
        });
        it('Checking tailwind3 dark theme', (done: Function) => {
            loaded = (args: ILoadedEventArgs) => {
                element = document.getElementById('seriesData_Series_0_Point_0');
                expect(element !== null).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.theme = 'Tailwind3Dark';
            chart.refresh();
        });
    });

    describe('Check the RTL behaviour for title', () => {
        let chart: Chart;
        let ele: HTMLElement;
        let loaded: EmitType<ILoadedEventArgs>;
        let element: Element;
        let trigger: MouseEvents = new MouseEvents();
        beforeAll((): void => {
            ele = createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            chart = new Chart(
                {
                    primaryXAxis: { valueType: 'Category', rangePadding: 'Normal' },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [{ dataSource: categoryData, xName: 'x', yName: 'y', fill: 'red', animation: { enable: false } }],
                    height: '400px', width: '900px',
                    title: 'Syncfusion Chart',
                    titleStyle: {
                        textAlignment: 'Near'
                    },
                    subTitle: 'Since 2012',
                    subTitleStyle: {
                        textAlignment: 'Far'
                    },
                    legendSettings: {
                        visible: true
                    }
                });

        });
        afterAll((): void => {
            chart.destroy();
            ele.remove();
        });
        it('Checking the title with out RTL', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartTitle');
                expect(element.getAttribute('text-anchor') == 'start').toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.appendTo('#container');
        });
        it('Checking the SubTitle with out RTL', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartSubTitle');
                expect(element.getAttribute('text-anchor') == 'end').toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.appendTo('#container');
        });
        it('Checking the title with RTL', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartTitle');
                expect(element.getAttribute('text-anchor') == 'end').toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.enableRtl = true;
            chart.appendTo('#container');
        });
        it('Checking the SubTitle with RTL', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartSubTitle');
                let element2 = document.getElementById('container_Series_0');
                expect(element.getAttribute('text-anchor') == 'start').toBe(true);
                trigger.keyboardEvent('keyup', element2, 'ArrowUp', 'ArrowUp');
                done();
            };
            chart.loaded = loaded;
            chart.appendTo('#container');
        });
        it('chart checking with keyboard navigation', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartSubTitle');
                trigger.keyboardEvent('keydown', element, 'Space', 'Space');
                trigger.keyboardEvent('keydown', element, 'Enter', 'Enter');
                trigger.keyboardEvent('keydown', element, 'Equal', 'Equal');
                trigger.keyboardEvent('keyup', element, 'ArrowUp', 'ArrowUp');
                trigger.keyboardEvent('keydown', element, 'Escape', 'Escape');
                trigger.keyboardEvent('keyup', element, 'ArrowDown', 'ArrowDown');
                trigger.keyboardEvent('keyup', element, 'ArrowLeft', 'ArrowLeft');
                trigger.keyboardEvent('keyup', element, 'ArrowRight', 'ArrowRight');
                trigger.keyboardEvent('keyup', element, 'Tab', 'Tab');
                expect(element).not.toBe(null);
                done();
            };
            chart.highlightMode = 'Point';
            chart.loaded = loaded;
            chart.appendTo('#container');
        });
        it('Chart checking with keyboard navigation and legend', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartTitle');
                trigger.keyboardEvent('keyup', element, 'Tab', 'Tab');
                element = document.getElementById('container_ChartSubTitle');
                trigger.keyboardEvent('keyup', element, 'Tab', 'Tab');
                element = document.getElementById('container_Series_0_Point_0_Symbol');
                trigger.keyboardEvent('keyup', element, 'Tab', 'Tab');
                element = document.getElementById('container_chart_legend_g_0');
                trigger.keyboardEvent('keyup', element, 'Tab', 'Tab');
                trigger.keyboardEvent('keydown', element, 'Space', 'Space');
                trigger.keyboardEvent('keydown', element, 'Enter', 'Enter');
                expect(element).not.toBe(null);
                done();
            };
            chart.legendSettings.visible = true;
            chart.series[0].name = 'Gold';
            chart.series[0].marker.visible = true;
            chart.loaded = loaded;
            chart.appendTo('#container');
        });
    });


    describe('Chart- checking public methods', () => {
        let chart: Chart;
        let ele: HTMLElement;
        let loaded: EmitType<ILoadedEventArgs>;
        let element: Element;
        let trigger: MouseEvents = new MouseEvents();
        beforeAll((): void => {
            ele = createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            chart = new Chart(
                {
                    primaryXAxis: { valueType: 'Category', rangePadding: 'Normal', crosshairTooltip: { enable: true, } },
                    primaryYAxis: { title: 'PrimaryYAxis', crosshairTooltip: { enable: true } },
                    series: [
                        {
                            dataSource: [{ x: 'USA', y: 50 }, { x: 'China', y: 40 },
                            { x: 'Japan', y: 70 }, { x: 'Australia', y: 60 },
                            { x: 'France', y: 50 }, { x: 'Germany', y: null },
                            { x: 'United States', y: 40 }, { x: 'Sweden', y: 30 }],
                            xName: 'x', yName: 'y', fill: 'red', animation: { enable: false },
                            marker: { visible: true, dataLabel: { visible: true } }
                        }
                    ],
                    height: '400px', width: '900px',
                    title: 'Syncfusion Chart',
                    titleStyle: {
                        textAlignment: 'Near'
                    },
                    subTitle: 'Since 2012',
                    subTitleStyle: {
                        textAlignment: 'Far'
                    },
                    tooltip: { enable: true, shared: true, showNearestPoint: false, location: { x: 100, y: 100 } },
                    crosshair: { enable: true },
                    legendSettings: {
                        visible: true
                    }
                });
        });
        afterAll((): void => {
            chart.destroy();
            ele.remove();
        });
        it('Checking the title with position left and alignment Near', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartTitle');
                expect(element.getAttribute('text-anchor')).toBe('start');
                done();
            };
            chart.loaded = loaded;
            chart.titleStyle.textAlignment = 'Far';
            chart.titleStyle.position = 'Left';
            chart.appendTo('#container');
        });
        it('Checking the title with position left and alignment Center', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartTitle');
                expect(element.getAttribute('text-anchor')).toBe('middle');
                done();
            };
            chart.loaded = loaded;
            chart.titleStyle.textAlignment = 'Center';
            chart.titleStyle.position = 'Left';
            chart.appendTo('#container');
        });
        it('Checking the title with position Right and alignment Near', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartTitle');
                expect(element.getAttribute('text-anchor')).toBe('end');
                done();
            };
            chart.loaded = loaded;
            chart.titleStyle.textAlignment = 'Far';
            chart.titleStyle.position = 'Right';
            chart.appendTo('#container');
        });
        it('Checking the title with position Right and alignment Center', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartTitle');
                expect(element.getAttribute('text-anchor')).toBe('middle');
                done();
            };
            chart.loaded = loaded;
            chart.titleStyle.textAlignment = 'Center';
            chart.titleStyle.position = 'Right';
            chart.appendTo('#container');
        });
        it('Checking the title with position left and alignment Near with RTl', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartTitle');
                expect(element.getAttribute('text-anchor')).toBe('end');
                done();
            };
            chart.loaded = loaded;
            chart.titleStyle.textAlignment = 'Far';
            chart.titleStyle.position = 'Left';
            chart.enableRtl = true;
            chart.appendTo('#container');
        });
        it('Checking the title with position left and alignment Center with RTl', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartTitle');
                expect(element.getAttribute('text-anchor')).toBe('middle');
                done();
            };
            chart.loaded = loaded;
            chart.titleStyle.textAlignment = 'Center';
            chart.titleStyle.position = 'Left';
            chart.appendTo('#container');
        });
        it('Checking the title with position Right and alignment Near with RTl', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartTitle');
                expect(element.getAttribute('text-anchor')).toBe('start');
                done();
            };
            chart.loaded = loaded;
            chart.titleStyle.textAlignment = 'Far';
            chart.titleStyle.position = 'Right';
            chart.appendTo('#container');
        });
        it('Checking the title with position Right and alignment Center with RTl', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartTitle');
                expect(element.getAttribute('text-anchor')).toBe('middle');
                done();
            };
            chart.loaded = loaded;
            chart.titleStyle.textAlignment = 'Center';
            chart.titleStyle.position = 'Right';
            chart.appendTo('#container');
        });
        it('Checking the title with position Bottom and alignment far', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartTitle');
                expect(element.getAttribute('text-anchor')).toBe('start');
                done();
            };
            chart.loaded = loaded;
            chart.titleStyle.textAlignment = 'Far';
            chart.titleStyle.position = 'Bottom';
            chart.appendTo('#container');
        });
        it('Checking the title with position Bottom and alignment near', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartTitle');
                expect(element.getAttribute('text-anchor')).toBe('start');
                done();
            };
            chart.loaded = loaded;
            chart.titleStyle.textAlignment = 'Near';
            chart.titleStyle.position = 'Bottom';
            chart.enableRtl = false;
            chart.appendTo('#container');
        });
        it('Apply focusable to Chart sub title', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartSubTitle');
                expect(element !== null).toBe(true);
                expect(element!.getAttribute('tabindex')).toBe('0');
                done();
            };
            chart.loaded = loaded;
            chart.subTitleStyle.accessibility.focusable = true;
            chart.subTitleStyle.textAlignment = 'Near';
            chart.subTitleStyle.position = 'Bottom';
            chart.enableRtl = false;
            chart.appendTo('#container');
        });

        it('Apply focusable to Chart title', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartTitle');
                expect(element !== null).toBe(true);
                expect(element!.getAttribute('tabindex')).toBe('-1');
                done();
            };
            chart.loaded = loaded;
            chart.titleStyle.accessibility.focusable = false;
            chart.titleStyle.textAlignment = 'Near';
            chart.titleStyle.position = 'Bottom';
            chart.enableRtl = false;
            chart.appendTo('#container');
        });
        it('Checking chart canvasMode', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_canvas');
                expect(element !== null).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.enableCanvas = true;
            chart.refresh();
        });
        it('Checking the show tooltip and crosshair methods.', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartTitle');
                expect(element.getAttribute('x')).toBe('10');
                done();
            };
            chart.loaded = loaded;
            chart.showTooltip(200, 200);
            chart.showCrosshair(200, 200);
            chart.hideTooltip();
            chart.hideCrosshair();
            chart.enableCanvas = false;
            chart.theme = 'Fabric'
            chart.tooltip.shared = false;
            chart.refresh();
        });
        it('Checking the show tooltip with Fabric', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartTitle');
                expect(element.getAttribute('x')).toBe('10');
                done();
            };
            chart.loaded = loaded;
            chart.showTooltip(200, 200);
            chart.showCrosshair(200, 200);
            chart.hideTooltip();
            chart.hideCrosshair();
            chart.theme = 'Fluent2HighContrast'
            chart.refresh();
        });
        it('Checking the show tooltip with Fluent2HighContrast', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartTitle');
                expect(element.getAttribute('x')).toBe('10');
                done();
            };
            chart.loaded = loaded;
            chart.showTooltip(200, 200);
            chart.showCrosshair(200, 200);
            chart.hideTooltip();
            chart.hideCrosshair();
            chart.theme = 'Fluent';
            chart.series[0].dataSource = [{ x: 'USA <br> USA', y: 50 }, { x: 'China  <br> China', y: 40 },
            { x: 'Japan  <br> Japan', y: 70 }, { x: 'Australia <br> Australia', y: 60 },
            { x: 'France <br> France', y: 50 }, { x: 'Germany <br> Germany', y: null },
            { x: 'United States  <br> USA', y: 40 }, { x: 'Sweden <br> Sweden', y: 30 }];
            chart.refresh();
        });
        it('Checking the show tooltip with Fluent', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartTitle');
                expect(element.getAttribute('x')).toBe('10');
                done();
            };
            chart.loaded = loaded;
            chart.showTooltip(200, 200);
            chart.showCrosshair(200, 200);
            chart.hideTooltip();
            chart.hideCrosshair();
            chart.theme = 'Fluent2';
            chart.enableRtl = true;
            chart.refresh();
        });
        it('Checking the show tooltip with Fluent2', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartTitle');
                expect(element.getAttribute('x')).toBe('10');
                done();
            };
            chart.loaded = loaded;
            chart.showTooltip(200, 200);
            chart.showCrosshair(200, 200);
            chart.hideTooltip();
            chart.hideCrosshair();
            chart.theme = 'FabricDark'
            chart.refresh();
        });
        it('Checking the show tooltip with FabricDark', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartTitle');
                expect(element.getAttribute('x')).toBe('10');
                done();
            };
            chart.loaded = loaded;
            chart.showTooltip(200, 200);
            chart.showCrosshair(200, 200);
            chart.hideTooltip();
            chart.hideCrosshair();
            chart.theme = 'FluentDark'
            chart.refresh();
        });
        it('Checking refreshLiveData method.', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartTitle');
                expect(element.getAttribute('x')).toBe('10');
                done();
            };
            chart.loaded = loaded;
            chart.showTooltip('Japan', 70, true);
            chart.showCrosshair(200, 200);
            chart.refreshLiveData();
            chart.refresh();
        });
        it('Checking addAxis Method', (done: Function) => {
            loaded = (args: ILoadedEventArgs): void => {
                expect(args.chart.axisCollections.length).toBe(2);
                done();
            };
            chart.loaded = loaded;
            chart.refreshLiveData();
            chart.addAxes([{ name: 'secondary', title: 'SecondaryYAxis' }]);
        });
        it('Checking removeAxis Method', (done: Function) => {
            loaded = (args: ILoadedEventArgs): void => {
                expect(args.chart.axisCollections.length).toBe(2);
                done();
            };
            chart.loaded = loaded;
            chart.selectionMode = 'Series';
            chart.removeAxis(2);
        });
        it('Chart: Data Bind - Checking chart theme', (done: Function) => {
            loaded = (args: ILoadedEventArgs): void => {
                expect(args.chart.theme).toBe('Material3Dark');
                done();
            };
            chart.loaded = loaded;
            chart.theme = 'Material3Dark';
            chart.series[0].name = 'Olymbic gold medal';
        });
        it('Chart Data Bind - checking selectedData Indexes', (done: Function) => {
            loaded = (args: ILoadedEventArgs): void => {
                let chartElement = document.getElementById('container_svg');
                expect(chartElement !== null).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.selectedDataIndexes = [{ series: 0, point: 1 }];
            chart.series[0].name = 'Olymbic Gold Medal';
        });
        it('Chart Data bind - checking highlight color', (done: Function) => {
            loaded = (args: ILoadedEventArgs): void => {
                let chartElement = document.getElementById('container_svg');
                expect(chartElement !== null).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.selectionMode = 'None';
            chart.highlightMode = 'Series';
            chart.highlightColor = 'red';
            chart.refresh();
        });
        it('Chart Data Bind - checking selectedData Indexes with highlight', (done: Function) => {
            loaded = (args: ILoadedEventArgs): void => {
                let chartElement = document.getElementById('container_svg');
                expect(chartElement !== null).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.selectedDataIndexes = [{ series: 0, point: 1 }];
            chart.refresh();
        });
        it('Chart Data Bind - checking enablecanvas as true', (done: Function) => {
            loaded = (args: ILoadedEventArgs): void => {
                let chartElement = document.getElementById('container');
                expect(chartElement !== null).toBe(true);
                done();
            };
            chart.load = (args: ILoadedEventArgs): void => {
                args.chart.selectionModule.selectedDataIndexes = [];
            };
            chart.loaded = loaded;
            chart.selectedDataIndexes = [];
            chart.enableCanvas = true;
            chart.refresh();
        });
        it('Chart Data Bind - checking date time data', (done: Function) => {
            loaded = (args: ILoadedEventArgs): void => {
                let chartElement = document.getElementById('container_svg');
                expect(chartElement !== null).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.enableCanvas = false;
            chart.series[0].dataSource = [
                { x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
                { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: 65 },
            ];
            chart.primaryXAxis.valueType = 'DateTime';
            chart.selectedDataIndexes = null;
            chart.refresh();
        });
        it('Chart Data Bind - checking show tooltip method', (done: Function) => {
            loaded = (args: ILoadedEventArgs): void => {
                let chartElement = document.getElementById('container_svg');
                expect(element !== null).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.showTooltip(1018117800000, 30, true);
            chart.refresh();
        });
        it('Chart Data Bind - checking series properties', (done: Function) => {
            loaded = (args: ILoadedEventArgs): void => {
                let chartElement = document.getElementById('container_svg');
                expect(chartElement !== null).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.isBlazor = true;
            chart.series[0].fill = 'blue';
            chart.series[0].type = 'Line';
            chart.enableExport = false;
            chart.refresh();
        });
       
        it('Chart Data Bind - Checking chart - Title', (done: Function) => {
            loaded = (args: ILoadedEventArgs): void => {
                let chartElement = document.getElementById('container_svg');
                expect(chartElement !== null).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.title = 'Chart Title';
            chart.titleStyle = { position: 'Left', textAlignment: 'Near' };
            chart.enableRtl = true;
            chart.refresh();
        });
        it('Chart Data Bind - Checking chart - Title with rtl', (done: Function) => {
            loaded = (args: ILoadedEventArgs): void => {
                let chartElement = document.getElementById('container_svg');
                expect(chartElement !== null).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.title = 'Chart Title';
            chart.titleStyle = { position: 'Right', textAlignment: 'Near' };
            chart.enableRtl = true;
            chart.refresh();
        });
        it('Chart Data Bind - Title position as bottom and alignment as center ', (done: Function) => {
            loaded = (args: ILoadedEventArgs): void => {
                let chartElement = document.getElementById('container_svg');
                expect(chartElement !== null).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.title = 'Chart Title';
            chart.titleStyle = { position: 'Bottom', textAlignment: 'Center' };
            chart.enableRtl = true;
            chart.selectionMode = 'None';
            chart.selectedDataIndexes = [];
            chart.refresh();
        });
        it('Checking ClearSeries method', (done: Function) => {
            loaded = (args: ILoadedEventArgs): void => {
                expect(args.chart.series.length).toBe(0);
                done();
            };
            chart.load = (args: ILoadedEventArgs): void => {
                args.chart.selectionModule.selectedDataIndexes = [];
            }
            chart.loaded = loaded;
            chart.clearSeries();
        });
    });
    describe('Chart- Checking chart events and elements', () => {
        let chart: Chart;
        let ele: HTMLElement;
        let loaded: EmitType<ILoadedEventArgs>;
        let element: Element;
        let trigger: MouseEvents = new MouseEvents();
        let dataManagerMock: any;
        let dataService: Data;
        beforeAll((): void => {
            ele = createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            dataManagerMock = {
                ready: true,
            };
            dataService = new Data(dataManagerMock);
            chart = new Chart(
                {
                    primaryXAxis: { valueType: 'Category', rangePadding: 'Normal', crosshairTooltip: { enable: true, } },
                    primaryYAxis: { title: 'PrimaryYAxis', crosshairTooltip: { enable: true } },
                    series: [
                        {
                            dataSource: [{ x: 'USA', y: 50 }, { x: 'China', y: 40 },
                            { x: 'Japan', y: 70 }, { x: 'Australia', y: 60 },
                            { x: 'France', y: 50 }, { x: 'Germany', y: null },
                            { x: 'United States', y: 40 }, { x: 'Sweden', y: 30 }],
                            xName: 'x', yName: 'y', fill: 'red', animation: { enable: false },
                            marker: { visible: true, dataLabel: { visible: true } }
                        }
                    ],
                    height: '400px', width: '900px',
                    title: 'Syncfusion Chart',
                    titleStyle: {
                        textAlignment: 'Near'
                    },
                    subTitle: 'Since 2012',
                    subTitleStyle: {
                        textAlignment: 'Far'
                    },
                    highlightMode: 'Series',
                    tooltip: { enable: true },
                    crosshair: { enable: true },
                    legendSettings: {
                        visible: true
                    }
                });
        });
        afterAll((): void => {
            chart.destroy();
            ele.remove();
        });
        it('Checking the chart title element', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container_ChartTitle');
                expect(element !== null).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.appendTo('#container');
        });
        it('Checking the chart primary x axis properties ', (done: Function) => {
            loaded = (args: Object): void => {
                chart.loaded = null;
                element = document.getElementById('container');
                expect(element !== null).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.primaryXAxis.crosshairTooltip.enable = true;
            chart.primaryXAxis.edgeLabelPlacement = 'Hide';
        });
        it('Checking the chart primary Y axis properties ', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container');
                expect(element !== null).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.primaryYAxis.crosshairTooltip.enable = true;
            chart.primaryYAxis.edgeLabelPlacement = 'Hide';
        });
        it('Checking the chart zoom settings ', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('container');
                expect(element !== null).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.refresh();
        });
        it('Checking the chart selection  mode', (done: Function) => {
            loaded = (args: ILoadedEventArgs): void => {
                chart.loaded = null;
                element = document.getElementById('container');
                expect(element !== null).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.selectedDataIndexes = [{ series: 0, point: 1 }];
            chart.refresh();
        });
        it('Checking the chart showTooltip mehtod in touch mode enable', (done: Function) => {
            loaded = (args: ILoadedEventArgs): void => {
                args.chart.isTouch = true;
                args.chart.showTooltip('USA', 50, true);
                args.chart.showTooltip(0, 0);
                args.chart.showCrosshair(0, 0);
                element = document.getElementById('container');
                expect(element !== null).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.selectionMode = 'None';
            chart.selectedDataIndexes = [];
            chart.refresh();
        });
        it('Checking the query and getData method', (done: Function) => {
            loaded = (args: Object): void => {
                dataManagerMock.ready = Promise.resolve();
                const mockQuery: any = { query: 'some query' };
                (dataService as any).dataManager.ready = dataManagerMock.ready;
                const result = dataService.getData(mockQuery);
                let element = document.getElementById('container');
                expect(element !== null).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.refresh();
        });
        it('Checking the checking chart refreshLiveData method', (done: Function) => {
            loaded = (args: ILoadedEventArgs): void => {
                chart.loaded = null;
                args.chart.isBlazor = true;
                args.chart.refreshLiveData();
                args.chart.isBlazor = false; args.chart.enableCanvas = true;
                //args.chart.refreshLiveData();
                element = document.getElementById('container');
                expect(element !== null).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.series[0].width = 3;
        });
        it('Checking the checking chart removeSVG method', (done: Function) => {
            loaded = (args: ILoadedEventArgs): void => {
                chart.loaded = null;
                args.chart.isReact = true;
                args.chart.removeSvg();
                element = document.getElementById('container');
                args.chart.isReact = false;
                expect(element !== null).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.refresh();
        });
        it('Checking the checking chartKeyboard Navigations tab keys', (done: Function) => {
            loaded = (args: ILoadedEventArgs): void => {
                chart.loaded = null;
                element = document.getElementById('container');
                args.chart.chartKeyboardNavigations(<KeyboardEvent>trigger.onTouchEnd(element, 100, 100, 100, 100, 100, 100), element.id, 'Enter');
                args.chart.chartKeyboardNavigations(<KeyboardEvent>trigger.onTouchEnd(element, 100, 100, 100, 100, 100, 100), element.id, 'Space');
                args.chart.chartKeyboardNavigations(<KeyboardEvent>trigger.onTouchEnd(element, 100, 100, 100, 100, 100, 100), element.id, 'Equal');
                args.chart.chartKeyboardNavigations(<KeyboardEvent>trigger.onTouchEnd(element, 100, 100, 100, 100, 100, 100), element.id, 'Minus');
                args.chart.chartKeyboardNavigations(<KeyboardEvent>trigger.onTouchEnd(element, 100, 100, 100, 100, 100, 100), element.id, 'ArrowUp');
                args.chart.chartKeyboardNavigations(<KeyboardEvent>trigger.onTouchEnd(element, 100, 100, 100, 100, 100, 100), element.id, 'ArrowDown');
                args.chart.chartKeyboardNavigations(<KeyboardEvent>trigger.onTouchEnd(element, 100, 100, 100, 100, 100, 100), element.id, 'ArrowLeft');
                args.chart.chartKeyboardNavigations(<KeyboardEvent>trigger.onTouchEnd(element, 100, 100, 100, 100, 100, 100), element.id, 'ArrowRight');
                expect(element !== null).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.selectionMode = 'Series';
            chart.zoomSettings.enableSelectionZooming = true;
            chart.refresh();
        });
        it('Checking the checking chartKeyboard Navigations with keys', (done: Function) => {
            loaded = (args: ILoadedEventArgs): void => {
                chart.loaded = null;
                element = document.getElementById('container');
                args.chart.chartKeyboardNavigations(<KeyboardEvent>trigger.onTouchEnd(element, 100, 100, 100, 100, 100, 100), element.id, 'R');
                args.chart.chartKeyboardNavigations(<KeyboardEvent>trigger.onTouchEnd(element, 100, 100, 100, 100, 100, 100), element.id, 'CtrlP');
                args.chart.chartKeyboardNavigations(<KeyboardEvent>trigger.onTouchEnd(element, 100, 100, 100, 100, 100, 100), 'container_chart_legend_text_0', 'Space');
                args.chart.setTabIndex(null, null);
                args.chart.setAnnotationValue(0, null);
                expect(element !== null).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.series[0].name = 'Gold';
            chart.legendSettings.visible = true;
            chart.enableCanvas = false;
            chart.refresh();
        });
        it('Apply accessibilityRole to Chart container', (done: Function) => {
            loaded = (args: ILoadedEventArgs): void => {
                element = document.getElementById('container');
                expect(element !== null).toBe(true);
                expect(element!.getAttribute('role')).toBe('region');
                done();
            };
            chart.loaded = loaded;
            chart.accessibility.accessibilityRole = 'region';
            chart.refresh();
        });
        it('Apply accessibilityDescription to Chart container', (done: Function) => {
            loaded = (args: ILoadedEventArgs): void => {
                element = document.getElementById('container');
                expect(element !== null).toBe(true);
                expect(element!.getAttribute('aria-label')).toBe('The Chart container');
                done();
            };
            chart.loaded = loaded;
            chart.accessibility.accessibilityDescription = 'The Chart container';
            chart.refresh();
        });
        it('Apply focusable to Chart container', (done: Function) => {
            loaded = (args: ILoadedEventArgs): void => {
                element = document.getElementById('container');
                expect(element !== null).toBe(true);
                expect(element!.getAttribute('tabindex')).toBe('-1');
                done();
            };
            chart.loaded = loaded;
            chart.accessibility.focusable = false;
            chart.refresh();
        });
    });
     describe('Check the RTL behaviour for title', () => {
        let chart: Chart;
        let ele: HTMLElement;
        let ele2: HTMLElement;
        let loaded: EmitType<ILoadedEventArgs>;
        let element: Element;
        let trigger: MouseEvents = new MouseEvents();
        beforeAll((): void => {
            ele = createElement('div', {   id: 'container',
            styles: 'transform: scale(1.5)' });
            ele2 = createElement('div', { id: 'element' });
            document.body.appendChild(ele);
            document.getElementById('container').appendChild(ele2)
            chart = new Chart(
                {
                    primaryXAxis: { valueType: 'Category', rangePadding: 'Normal', labelRotation: 90 },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [{ dataSource: categoryData, xName: 'x', yName: 'y', fill: 'red', animation: { enable: false } }],
                    title: 'Syncfusion Chart',
                    titleStyle: {
                        textAlignment : 'Near'                    
                    },
                    subTitle: 'Since 2012',
                    subTitleStyle: {
                        textAlignment : 'Far'
                    }
                });

        });
        afterAll((): void => {
            chart.destroy();
            ele.remove();
        });
        it('Checking the container with applied scale', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('element0_AxisLabel_7');
                expect(element.textContent == 'Sweden').toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.appendTo('#element');
        });
        it('Checking keyboard navigatin without tooltip', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('element_ChartTitle');
                trigger.keyboardEvent('keyup', element, 'Tab', 'Tab');
                expect(element !== null).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.series[0].type = 'Column';
            chart.tooltip.enable = false;
            chart.highlightMode = 'None';
            chart.appendTo('#element');
        });
        it('Checking keyboard navigating on keydown without tooltip', (done: Function) => {
            loaded = (args: Object): void => {
                element = document.getElementById('element_ChartTitle');
                trigger.keyboardEvent('keydown', element, 'Tab', 'Tab');
                expect(element !== null).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.series[0].type = 'Column';
            chart.tooltip.enable = false;
            chart.highlightMode = 'None';
            chart.appendTo('#element');
        });
    });
});
