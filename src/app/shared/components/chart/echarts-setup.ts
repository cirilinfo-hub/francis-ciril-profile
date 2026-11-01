import { BarChart, LineChart } from 'echarts/charts';
import { AriaComponent, GridComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';

// Only the pieces the portfolio uses are registered so the lazy chunk stays small.
echarts.use([BarChart, LineChart, GridComponent, TooltipComponent, AriaComponent, CanvasRenderer]);

export { echarts };
