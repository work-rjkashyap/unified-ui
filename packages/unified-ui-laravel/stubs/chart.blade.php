@props([
    'type'    => 'bar',
    'labels'  => [],
    'datasets'=> [],
    'height'  => 300,
    'options' => [],
])

{{--
    Chart — wrapper for Chart.js charts.
    Requires Chart.js to be loaded (e.g. via CDN or npm).

    Usage:
        <x-chart
            type="bar"
            :labels="['Jan', 'Feb', 'Mar']"
            :datasets="[
                ['label' => 'Revenue', 'data' => [100, 200, 150], 'backgroundColor' => 'oklch(var(--ui-primary))'],
            ]"
            :height="300"
        />
--}}

<div
    x-data="{
        chart: null,

        init() {
            if (typeof Chart === 'undefined') {
                console.warn('[unified-ui] Chart.js is not loaded. Add it to your project.');
                return;
            }

            const ctx = this.$refs.canvas.getContext('2d');
            const defaults = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: 'oklch(var(--ui-muted-foreground))' } },
                },
                scales: {
                    x: { ticks: { color: 'oklch(var(--ui-muted-foreground))' }, grid: { color: 'oklch(var(--ui-border))' } },
                    y: { ticks: { color: 'oklch(var(--ui-muted-foreground))' }, grid: { color: 'oklch(var(--ui-border))' } },
                },
            };

            this.chart = new Chart(ctx, {
                type: '{{ $type }}',
                data: {
                    labels: @json($labels),
                    datasets: @json($datasets),
                },
                options: Object.assign({}, defaults, @json($options)),
            });
        },

        destroy() { this.chart?.destroy(); },
    }"
    x-on:chart-update.window="
        if (chart) {
            chart.data.labels = $event.detail.labels ?? chart.data.labels;
            chart.data.datasets = $event.detail.datasets ?? chart.data.datasets;
            chart.update();
        }
    "
    {{ $attributes->class(['relative']) }}
    style="height: {{ $height }}px"
    data-ui-chart
    data-ui-chart-type="{{ $type }}"
>
    <canvas x-ref="canvas" aria-label="{{ ucfirst($type) }} chart" role="img"></canvas>
</div>
